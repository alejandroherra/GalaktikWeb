import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Lock, Mail, User, ArrowRight, ArrowLeft, X } from "lucide-react";
import SEO from "../components/SEO";
import Swal from "sweetalert2";

const Login = () => {
  const { language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, signup, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await resetPassword(email);
      Swal.fire({
        title: language === "es" ? "Correo Enviado" : "Email Sent",
        text:
          language === "es"
            ? "Revisa tu correo para restablecer tu contraseña."
            : "Check your email to reset your password.",
        icon: "success",
        confirmButtonColor: "#6366f1",
        background: "#1a1b2e",
        color: "#fff",
      });
      setIsResetting(false);
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      let msg = err.message.replace("Firebase: ", "");
      if (msg.includes("auth/user-not-found")) {
        msg =
          language === "es"
            ? "No existe una cuenta con este correo."
            : "No account found with this email.";
      }
      setError(msg);
      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#1a1b2e",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        navigate("/dashboard");
      } else {
        // CAPTCHA Logic
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const correctAnswer = num1 + num2;

        const { value: answer } = await Swal.fire({
          title:
            language === "es"
              ? "Verificación de Seguridad"
              : "Security Verification",
          text:
            language === "es"
              ? `¿Cuánto es ${num1} + ${num2}?`
              : `What is ${num1} + ${num2}?`,
          input: "text",
          inputPlaceholder:
            language === "es" ? "Escribe tu respuesta" : "Enter your answer",
          showCancelButton: true,
          confirmButtonText: language === "es" ? "Verificar" : "Verify",
          cancelButtonText: language === "es" ? "Cancelar" : "Cancel",
          background: "#1a1b2e",
          color: "#fff",
          inputValidator: (value) => {
            if (!value) {
              return language === "es"
                ? "¡Necesitas escribir una respuesta!"
                : "You need to write an answer!";
            }
            if (parseInt(value) !== correctAnswer) {
              return language === "es"
                ? "Respuesta incorrecta"
                : "Incorrect answer";
            }
          },
        });

        if (answer) {
          await signup(email, password, name);
          setIsLogin(true);

          Swal.fire({
            title: language === "es" ? "¡Cuenta Creada!" : "Account Created!",
            text:
              language === "es"
                ? `Por favor verifica el correo enviado a ${email} para activar tu cuenta.`
                : `Please verify the email sent to ${email} to activate your account.`,
            icon: "success",
            confirmButtonColor: "#6366f1",
            background: "#1a1b2e",
            color: "#fff",
          }).then(() => {
            window.location.reload();
          });
        } else {
          setLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error(err);
      let msg = err.message.replace("Firebase: ", "");
      if (msg.includes("auth/invalid-credential")) {
        msg =
          language === "es"
            ? "Credenciales inválidas."
            : "Invalid credentials.";
      }
      if (msg.includes("auth/email-already-in-use")) {
        msg =
          language === "es"
            ? "El correo ya está en uso."
            : "Email already in use.";
      }
      if (msg.includes("verify your email")) {
        msg =
          language === "es"
            ? "Por favor verifica tu correo antes de iniciar sesión."
            : "Please verify your email before logging in.";
      }

      setError(msg);

      Swal.fire({
        title: "Error",
        text: msg,
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#1a1b2e",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        paddingTop: "calc(var(--nav-height) + 2rem)",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SEO
        title={
          isResetting
            ? language === "es"
              ? "Recuperar Contraseña"
              : "Reset Password"
            : isLogin
              ? language === "es"
                ? "Iniciar Sesión"
                : "Sign In"
              : language === "es"
                ? "Registrarse"
                : "Sign Up"
        }
        description={
          language === "es"
            ? "Accede a tu cuenta de Galaktik."
            : "Access your Galaktik account."
        }
        keywords="login, registro, galaktik"
      />

      <div
        style={{
          background: "var(--card-bg)",
          padding: "2.5rem",
          borderRadius: "24px",
          border: "1px solid var(--card-border)",
          width: "100%",
          maxWidth: "450px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            background: "rgba(240, 14, 14, 0.1)",
            border: "1px solid rgba(255, 10, 10, 0.2)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            cursor: "pointer",
            transition: "all 0.2s ease",
            zIndex: 50
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <X size={20} strokeWidth={2.5} />
        </button>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
            {isResetting
              ? language === "es"
                ? "Recuperar Contraseña"
                : "Reset Password"
              : isLogin
                ? language === "es"
                  ? "Bienvenido"
                  : "Welcome Back"
                : language === "es"
                  ? "Crear Cuenta"
                  : "Create Account"}
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            {isResetting
              ? language === "es"
                ? "Ingresa tu correo para recibir un enlace"
                : "Enter your email to receive a link"
              : isLogin
                ? language === "es"
                  ? "Accede a tu panel de control"
                  : "Access your dashboard"
                : language === "es"
                  ? "Únete a Galaktik hoy"
                  : "Join Galaktik today"}
          </p>
        </div>

        <form
          onSubmit={isResetting ? handleResetPassword : handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {!isLogin && !isResetting && (
            <div style={{ position: "relative" }}>
              <User
                size={20}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-secondary)",
                }}
              />
              <input
                type="text"
                placeholder={
                  language === "es" ? "Nombre Completo" : "Full Name"
                }
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--card-border)",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          )}

          <div style={{ position: "relative" }}>
            <Mail
              size={20}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-secondary)",
              }}
            />
            <input
              type="email"
              placeholder={
                language === "es" ? "Correo Electrónico" : "Email Address"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--card-border)",
                color: "white",
                outline: "none",
              }}
            />
          </div>

          {!isResetting && (
            <div style={{ position: "relative" }}>
              <Lock
                size={20}
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-secondary)",
                }}
              />
              <input
                type="password"
                placeholder={language === "es" ? "Contraseña" : "Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "1rem 1rem 1rem 3rem",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--card-border)",
                  color: "white",
                  outline: "none",
                }}
              />
            </div>
          )}

          {isLogin && !isResetting && (
            <div style={{ textAlign: "right" }}>
              <button
                type="button"
                onClick={() => setIsResetting(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {language === "es"
                  ? "¿Olvidaste tu contraseña?"
                  : "Forgot password?"}
              </button>
            </div>
          )}

          {error && (
            <div
              style={{
                padding: "0.75rem",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                borderRadius: "8px",
                color: "#fca5a5",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              marginTop: "0.5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {loading
              ? language === "es"
                ? "Procesando..."
                : "Processing..."
              : isResetting
                ? language === "es"
                  ? "Enviar Enlace"
                  : "Send Link"
                : isLogin
                  ? language === "es"
                    ? "Iniciar Sesión"
                    : "Sign In"
                  : language === "es"
                    ? "Registrarse"
                    : "Sign Up"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            borderTop: "1px solid var(--card-border)",
            paddingTop: "1.5rem",
          }}
        >
          {isResetting ? (
            <button
              onClick={() => setIsResetting(false)}
              style={{
                background: "none",
                border: "none",
                color: "#818cf8",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <ArrowLeft size={16} />
              {language === "es"
                ? "Volver al inicio de sesión"
                : "Back to login"}
            </button>
          ) : (
            <>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "0.5rem",
                }}
              >
                {isLogin
                  ? language === "es"
                    ? "¿No tienes una cuenta?"
                    : "Don't have an account?"
                  : language === "es"
                    ? "¿Ya tienes una cuenta?"
                    : "Already have an account?"}
              </p>
              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#818cf8",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                {isLogin
                  ? language === "es"
                    ? "Regístrate aquí"
                    : "Register here"
                  : language === "es"
                    ? "Inicia sesión aquí"
                    : "Login here"}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
