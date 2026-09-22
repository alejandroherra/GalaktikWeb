import { Link, useLocation, useNavigate } from "react-router-dom";
import { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

const NavBarTech = memo(function NavBarTech() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al cambiar ruta
  useEffect(() => {
    const id = requestAnimationFrame(() => setMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  // Bloquear scroll cuando menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Links del navbar: los que tienen `hash` hacen scroll dentro de /software-a-medida
  // Los que tienen `path` navegan a una ruta diferente
  const navLinks = [
    { name: t.software.navInicio, path: "/software-a-medida", hash: "inicio" },
    { name: t.software.navCotizar, path: "/software-a-medida/cotizar" },
    { name: t.software.navRastrear, path: "/software-a-medida/track" },
    { name: t.nav.socials, path: "/software-a-medida/social" },
    { name: t.software.navContacto, path: "/software-a-medida", hash: "contacto" },
  ];

  const isActive = (link) => {
    if (link.hash) {
      return location.pathname === "/software-a-medida" && location.hash === `#${link.hash}`;
    }
    return location.pathname === link.path;
  };

  const { user } = useAuth();
  const authPath = user ? "/dashboard" : "/software-a-medida/login";
  const authLabel = user
    ? (language === "es" ? "Panel" : "Dashboard")
    : (language === "es" ? "Ingresar" : "Sign In");

  const handleNavClick = useCallback((link) => {
    setMenuOpen(false);

    if (link.hash) {
      // Si ya estamos en /software-a-medida, solo hacemos scroll
      if (location.pathname === "/software-a-medida") {
        const el = document.getElementById(link.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        // Navegamos primero y luego hacemos scroll
        navigate("/software-a-medida");
        setTimeout(() => {
          const el = document.getElementById(link.hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 400);
      }
    } else {
      navigate(link.path);
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "12px 0" : "20px 0",
          backgroundColor: scrolled ? "rgba(3, 7, 18, 0.85)" : "transparent",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid transparent",
          transition:
            "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-bottom 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "44px",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              position: "relative",
              zIndex: 1002,
            }}
          >
            <span
              style={{
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                background:
                  "linear-gradient(to right, #fff 20%, #60a5fa 40%, #8b5cf6 60%, #fb923c 80%, #fff 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Galaktik
            </span>
          </Link>

          {/* Desktop Menu */}
          <div
            className="desktop-menu"
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {navLinks.map((link, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleNavClick(link)}
                style={{
                  color: isActive(link) ? "#ffffff" : "#9ca3af",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  position: "relative",
                  transition: "color 0.3s ease, background 0.3s ease",
                  background: isActive(link)
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link.name}
                {isActive(link) && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: "20%",
                      right: "20%",
                      height: "2px",
                      background: "linear-gradient(90deg, #60a5fa, #8b5cf6)",
                      borderRadius: "2px",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", zIndex: 1002 }}>
            <button
              onClick={toggleLanguage}
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                padding: "0 12px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                cursor: "pointer",
                background: "transparent",
                fontSize: "14px",
                fontWeight: "600",
                height: "44px"
              }}
            >
              {language.toUpperCase()}
            </button>
            
            <Link
              to={authPath}
              className="desktop-menu-btn"
              style={{
                padding: "0 16px",
                fontSize: "14px",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "600",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(90deg, #60a5fa, #8b5cf6)",
                color: "#ffffff",
                border: "none",
                cursor: "pointer",
                height: "44px"
              }}
            >
              {authLabel}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="mobile-menu-button"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "20px",
                lineHeight: 1,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: scrolled ? "68px" : "84px",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(3, 7, 18, 0.98)",
              zIndex: 1001,
              overflowY: "auto",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {navLinks.map((link, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    color: isActive(link) ? "#ffffff" : "#9ca3af",
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: isActive(link)
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  {link.name}
                </button>
              ))}

              <div
                style={{
                  height: "1px",
                  background: "rgba(255,255,255,0.1)",
                  margin: "8px 0",
                  pointerEvents: "none",
                }}
              />

              <Link
                to={authPath}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: "600",
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  textDecoration: "none",
                  marginTop: "16px"
                }}
              >
                {authLabel}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          
          .desktop-menu-btn {
            display: none !important;
          }

          .mobile-menu-button {
            display: flex !important;
          }
        }

        .desktop-menu button:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
      `}</style>
    </>
  );
});

export default NavBarTech;