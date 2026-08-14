import React, { useState } from "react";
import { motion } from "framer-motion";
import NavBarTech from "../components/Navbardos.jsx";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: "easeOut",
    },
  }),
};

export default function Cotizar() {
  const [formData, setFormData] = useState({
    name: "",
    empresa: "",
    email: "",
    phone: "",
    project: "",
    budget: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);

  const { t } = useLanguage();

  const benefits = [
    { title: t.software.cotizarBenefit1Title, text: t.software.cotizarBenefit1Text },
    { title: t.software.cotizarBenefit2Title, text: t.software.cotizarBenefit2Text },
    { title: t.software.cotizarBenefit3Title, text: t.software.cotizarBenefit3Text },
  ];

  const generateTicketId = () => {
    return "CTZ-" + Math.floor(1000 + Math.random() * 9000);
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const ticketId = generateTicketId();

    try {
      await setDoc(doc(db, "cotizaciones", ticketId), {
        ...formData,
        status: "Pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        type: "Cotizacion",
      });

      const serviceId = "service_94lnmd2";
      const templateId = "template_68chk8k";
      const publicKey = "9kzLpXGFgejAdL5eq";

      const templateParams = {
        user_name: formData.name,
        user_phone: formData.phone,
        user_email: formData.email,
        to_email: formData.email,
        reply_to: formData.email,
        plan: formData.budget,
        message: `Empresa: ${formData.empresa}\nDescripción: ${formData.project}\nPresupuesto: ${formData.budget}\nFecha Objetivo: ${formData.deadline}`,
        ticket_id: ticketId,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      Swal.fire({
        title: t.software.cotizarAlertSuccess,
        html: `
          <div style="text-align: center; padding: 1rem;">
            <p style="font-size: 1.1rem; margin-bottom: 1rem;">${t.software.cotizarAlertDesc}</p>
            <div style="background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: 12px; margin-bottom: 1rem;">
              <p style="font-size: 1.8rem; font-weight: bold; color: #818cf8; margin: 0;">${ticketId}</p>
            </div>
            <p style="font-size: 0.9rem; color: #9ca3af;">${t.software.cotizarAlertSpam}</p>
          </div>
        `,
        confirmButtonColor: "#818cf8",
        confirmButtonText: t.software.cotizarAlertEntendido,
      });

      setFormData({ name: "", empresa: "", email: "", phone: "", project: "", budget: "", deadline: "" });
    } catch (err) {
      Swal.fire({
        title: "❌ Error",
        text: t.software.cotizarAlertError,
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <NavBarTech />

      <section style={heroSection}>
        <div style={heroContainer}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
            style={leftCol}
          >
            <p style={eyebrow}>{t.software.cotizarEyebrow}</p>

            <h1 style={title}>
              {t.software.cotizarTitle}
              <span style={gradientText}> {t.software.cotizarTitleSpan}</span>
            </h1>

            <p style={paragraphPrimary}>
              {t.software.cotizarDesc1}
            </p>

            <p style={paragraphSecondary}>
              {t.software.cotizarDesc2}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
            style={formCard}
          >
            <h2 style={formTitle}>{t.software.cotizarFormTitle}</h2>

            <p style={formText}>
              {t.software.cotizarFormDesc}
            </p>

            <form style={formStyle} onSubmit={handleSubmit}>
              <Input label={t.software.cotizarLabelNombre} placeholder={t.software.cotizarPlaceholderNombre} value={formData.name} onChange={handleChange("name")} />
              <Input label={t.software.cotizarLabelEmpresa} placeholder={t.software.cotizarPlaceholderEmpresa} value={formData.empresa} onChange={handleChange("empresa")} />
              <Input
                label={t.software.cotizarLabelEmail}
                placeholder={t.software.cotizarPlaceholderEmail}
                value={formData.email}
                onChange={handleChange("email")}
              />
              <Input label={t.software.cotizarLabelTelefono} placeholder={t.software.cotizarPlaceholderTelefono} value={formData.phone} onChange={handleChange("phone")} />

              <div style={fieldWrap}>
                <label style={labelStyle}>{t.software.cotizarLabelProyecto}</label>
                <textarea
                  rows={5}
                  placeholder={t.software.cotizarPlaceholderProyecto}
                  style={textareaStyle}
                  value={formData.project}
                  onChange={handleChange("project")}
                />
              </div>

              <Input
                label={t.software.cotizarLabelPresupuesto}
                placeholder={t.software.cotizarPlaceholderPresupuesto}
                value={formData.budget}
                onChange={handleChange("budget")}
              />
              <Input label={t.software.cotizarLabelFecha} placeholder={t.software.cotizarPlaceholderFecha} value={formData.deadline} onChange={handleChange("deadline")} />

              <button type="submit" style={primaryButton} disabled={loading}>
                {loading ? t.software.cotizarBtnSubmitting : t.software.cotizarBtnSubmit}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section style={benefitsSection}>
        <div style={benefitsContainer}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            custom={1}
            style={benefitsHeader}
          >
            <h2 style={benefitsTitle}>{t.software.cotizarBenefitsTitle}</h2>
            <p style={benefitsSubtitle}>
              {t.software.cotizarBenefitsSubtitle}
            </p>
          </motion.div>

          <div style={benefitsGrid}>
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                custom={index + 1}
                whileHover={{ y: -6 }}
                style={benefitCard}
              >
                <h3 style={benefitTitle}>{item.title}</h3>
                <p style={benefitText}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .cotizar-hero-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 34px;
          align-items: start;
        }

        .cotizar-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        @media (max-width: 900px) {
          .cotizar-hero-grid {
            grid-template-columns: 1fr;
          }

          .cotizar-benefits-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .cotizar-page {
            padding-top: 0;
          }

          .cotizar-hero-section {
            padding: 88px 16px 42px;
          }

          .cotizar-benefits-section {
            padding: 12px 16px 70px;
          }

          .cotizar-form-card {
            padding: 22px;
            border-radius: 22px;
          }

          .cotizar-title {
            font-size: 34px !important;
          }

          .cotizar-benefits-title {
            font-size: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}

function Input({ label, placeholder, value, onChange }) {
  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}</label>
      <input type="text" placeholder={placeholder} style={inputStyle} value={value} onChange={onChange} />
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #0f172a 0%, #111827 35%, #0b1120 100%)",
  color: "white",
  fontFamily: "'Segoe UI', system-ui, sans-serif",
};

const heroSection = {
  padding: "110px 20px 60px",
};

const heroContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "grid",
  gap: "34px",
};

heroContainer.className = "cotizar-hero-grid";

const leftCol = {};

const eyebrow = {
  color: "#a78bfa",
  textTransform: "uppercase",
  letterSpacing: "0.25em",
  fontSize: "12px",
  marginBottom: "16px",
};

const title = {
  fontSize: "clamp(34px, 6vw, 60px)",
  lineHeight: 1.05,
  margin: "0 0 22px 0",
  fontWeight: 800,
};

const gradientText = {
  display: "block",
  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 55%, #fb923c 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const paragraphPrimary = {
  color: "rgba(255,255,255,0.72)",
  fontSize: "18px",
  lineHeight: 1.7,
  maxWidth: "620px",
  marginBottom: "22px",
};

const paragraphSecondary = {
  color: "rgba(255,255,255,0.68)",
  fontSize: "16px",
  lineHeight: 1.8,
  maxWidth: "620px",
  marginBottom: "30px",
};

const formCard = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "28px",
  padding: "30px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.28)",
};

const formTitle = {
  margin: "0 0 10px 0",
  fontSize: "28px",
  fontWeight: 800,
};

const formText = {
  color: "rgba(255,255,255,0.68)",
  fontSize: "15px",
  lineHeight: 1.7,
  marginBottom: "24px",
};

const formStyle = {
  display: "grid",
  gap: "16px",
};

const fieldWrap = {
  display: "grid",
  gap: "8px",
};

const labelStyle = {
  fontSize: "14px",
  color: "rgba(255,255,255,0.78)",
  fontWeight: 600,
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  outline: "none",
  fontSize: "15px",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
  minHeight: "140px",
};

const primaryButton = {
  width: "100%",
  marginTop: "6px",
  padding: "14px 24px",
  borderRadius: "14px",
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
  color: "white",
  fontWeight: 700,
  fontSize: "15px",
  transition: "transform 0.25s ease",
  boxShadow: "0 14px 30px rgba(99,102,241,0.25)",
  opacity: 1,
};

const benefitsSection = {
  padding: "20px 20px 100px",
};

const benefitsContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const benefitsHeader = {
  textAlign: "center",
  marginBottom: "44px",
};

const benefitsTitle = {
  fontSize: "clamp(28px, 4vw, 46px)",
  marginBottom: "12px",
  fontWeight: 800,
};

const benefitsSubtitle = {
  color: "rgba(255,255,255,0.68)",
  maxWidth: "720px",
  margin: "0 auto",
  lineHeight: 1.7,
  fontSize: "17px",
};

const benefitsGrid = {
  display: "grid",
  gap: "22px",
};

benefitsGrid.className = "cotizar-benefits-grid";

const benefitCard = {
  position: "relative",
  padding: "30px",
  borderRadius: "22px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  overflow: "hidden",
};

const benefitTitle = {
  margin: "0 0 12px 0",
  fontSize: "24px",
  fontWeight: 700,
};

const benefitText = {
  margin: 0,
  color: "rgba(255,255,255,0.7)",
  lineHeight: 1.7,
  fontSize: "15px",
};
