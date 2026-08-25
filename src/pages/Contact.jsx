import React from "react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import NavBarTech from "../components/Navbardos.jsx";
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

const floatIn = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const mainContainer = {
  width: "100%",
  minHeight: "100vh",
  background: "var(--bg-primary)",
  position: "relative",
  overflow: "hidden",
};

const glowTop = {
  position: "absolute",
  top: "-200px",
  right: "-100px",
  width: "400px",
  height: "400px",
  background:
    "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
  pointerEvents: "none",
  zIndex: 0,
};

const glowBottom = {
  position: "absolute",
  bottom: "-200px",
  left: "-100px",
  width: "400px",
  height: "400px",
  background:
    "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
  pointerEvents: "none",
  zIndex: 0,
};

const glowCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)",
  pointerEvents: "none",
  zIndex: 0,
};

const heroSection = {
  position: "relative",
  zIndex: 1,
  padding: "120px 0 80px",
};

const contentWrapper = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 24px",
};

const heroGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  alignItems: "center",
};

const badge = {
  display: "inline-block",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  background: "rgba(99,102,241,0.12)",
  color: "#818cf8",
  marginBottom: "16px",
};

const mainTitle = {
  fontSize: "clamp(2rem, 4vw, 3.2rem)",
  fontWeight: "800",
  lineHeight: 1.15,
  color: "#fff",
  marginBottom: "20px",
};

const gradientText = {
  background: "linear-gradient(135deg, #60a5fa, #8b5cf6, #fb923c)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline",
};

const mainParagraph = {
  fontSize: "1rem",
  lineHeight: 1.7,
  color: "var(--text-secondary)",
  marginBottom: "12px",
  maxWidth: "540px",
};

const secondaryParagraph = {
  fontSize: "0.95rem",
  lineHeight: 1.7,
  color: "var(--text-secondary)",
  marginBottom: "28px",
  maxWidth: "540px",
};

const heroButtons = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const primaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 28px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "#fff",
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const secondaryBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 28px",
  borderRadius: "12px",
  fontSize: "14px",
  fontWeight: "600",
  background: "rgba(255,255,255,0.05)",
  color: "#fff",
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.1)",
  cursor: "pointer",
  transition: "background-color 0.3s ease, border-color 0.3s ease",
};

const heroCard = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
  padding: "36px",
  backdropFilter: "blur(12px)",
};

const heroCardInner = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const miniBadge = {
  fontSize: "11px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "#818cf8",
  marginBottom: "4px",
};

const heroCardTitle = {
  fontSize: "1.3rem",
  fontWeight: "700",
  color: "#fff",
};

const heroCardText = {
  fontSize: "0.9rem",
  lineHeight: 1.6,
  color: "var(--text-secondary)",
  marginBottom: "12px",
};

const heroContactList = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginTop: "8px",
};

const heroContactItem = {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.03)",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.05)",
  cursor: "default",
};

const heroContactLabel = {
  fontSize: "13px",
  fontWeight: "600",
  color: "var(--text-secondary)",
  flexShrink: 0,
};

const heroContactValue = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#fff",
  textAlign: "right",
  wordBreak: "break-word",
};

const officeSection = {
  position: "relative",
  zIndex: 1,
  padding: "80px 0 120px",
};

const officeGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "60px",
  alignItems: "center",
};

const officeInfoCard = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const sectionTag = {
  display: "inline-block",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  background: "rgba(99,102,241,0.12)",
  color: "#818cf8",
  marginBottom: "4px",
  width: "fit-content",
};

const officeTitle = {
  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
  fontWeight: "800",
  lineHeight: 1.2,
  color: "#fff",
};

const officeText = {
  fontSize: "0.95rem",
  lineHeight: 1.7,
  color: "var(--text-secondary)",
};

const officeAddressBox = {
  display: "flex",
  gap: "16px",
  alignItems: "flex-start",
  padding: "20px",
  background: "rgba(255,255,255,0.03)",
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.06)",
  margin: "8px 0",
};

const officeIcon = {
  fontSize: "1.5rem",
  flexShrink: 0,
};

const officeStrong = {
  color: "#fff",
  fontSize: "0.95rem",
};

const officeAddress = {
  color: "var(--text-secondary)",
  fontSize: "0.85rem",
  marginTop: "4px",
};

const officeButtons = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "8px",
};



export default function Contacto() {
  const { t } = useLanguage();
  return (
    <LazyMotion features={domAnimation}>
      <div style={mainContainer}>
        <NavBarTech />

        <style>
          {`
            .hero-card-desktop-offset {
              margin-top: 80px;
            }

            @media (max-width: 900px) {
              .hero-grid,
              .office-grid {
                grid-template-columns: 1fr !important;
                gap: 32px !important;
              }

              .hero-card-desktop-offset {
                margin-top: 0;
              }
            }

            @media (max-width: 768px) {
              .hero-contact-item {
                flex-direction: column;
                align-items: flex-start;
              }

              .hero-contact-value {
                text-align: left !important;
              }
            }
          `}
        </style>

        <div style={glowTop} />
        <div style={glowBottom} />
        <div style={glowCenter} />

        <section style={heroSection}>
          <div style={contentWrapper}>
            <div className="hero-grid" style={heroGrid}>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
              >
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  style={badge}
                >
                  {t.software.contactBadge}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  style={mainTitle}
                >
                  {t.software.contactTitle}
                  <span style={gradientText}> {t.software.contactTitleSpan}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7 }}
                  style={mainParagraph}
                >
                  {t.software.contactDesc}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.48, duration: 0.7 }}
                  style={secondaryParagraph}
                >
                  {t.software.contactDesc2}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.58, duration: 0.7 }}
                  style={heroButtons}
                >
                  <a href="mailto:galaktikdev@gmail.com" style={primaryBtn}>
                    {t.software.contactBtnEscribir}
                  </a>
                  <a href="tel:+50661458451" style={secondaryBtn}>
                    {t.software.contactBtnLlamar}
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                className="hero-card-desktop-offset"
                variants={floatIn}
                initial="hidden"
                animate="visible"
                custom={2}
                style={heroCard}
              >
                <div style={heroCardInner}>
                  <div style={miniBadge}>{t.software.contactInfoBadge}</div>
                  <h3 style={heroCardTitle}>{t.software.contactInfoTitle}</h3>
                  <p style={heroCardText}>
                    {t.software.contactInfoDesc}
                  </p>

                  <div style={heroContactList}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      style={heroContactItem}
                      className="hero-contact-item"
                    >
                      <span style={heroContactLabel}>{t.software.contactInstagram}</span>
                      <span
                        style={heroContactValue}
                        className="hero-contact-value"
                      >
                        @galaktikdev
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      style={heroContactItem}
                      className="hero-contact-item"
                    >
                      <span style={heroContactLabel}>{t.software.contactTelefono}</span>
                      <span
                        style={heroContactValue}
                        className="hero-contact-value"
                      >
                        +506 6145 8451
                      </span>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      style={heroContactItem}
                      className="hero-contact-item"
                    >
                      <span style={heroContactLabel}>{t.software.contactCorreo}</span>
                      <span
                        style={heroContactValue}
                        className="hero-contact-value"
                      >
                        galaktikdev@gmail.com
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section style={officeSection}>
          <div style={contentWrapper}>
            <div className="office-grid" style={officeGrid}>
              <motion.div
                variants={slideRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                style={officeInfoCard}
              >
                <span style={sectionTag}>{t.software.contactSectOficinas}</span>
                <h2 style={officeTitle}>
                  {t.software.contactOficinasTitle}
                </h2>
                <p style={officeText}>
                  {t.software.contactOficinasDesc}
                </p>

                <div style={officeAddressBox}>
                  <div style={officeIcon}>📍</div>
                  <div>
                    <strong style={officeStrong}>
                      {t.software.contactOficinaNombre}
                    </strong>
                    <p style={officeAddress}>
                      {t.software.contactOficinaDireccion}
                    </p>
                  </div>
                </div>

                <div style={officeButtons}>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Plaza+Atlantis+Escazu+San+Jose"
                    target="_blank"
                    rel="noreferrer"
                    style={primaryBtn}
                  >
                    {t.software.contactBtnUbicacion}
                  </a>

                  <a href="tel:+50661458451" style={secondaryBtn}>
                    {t.software.contactBtnCoordinar}
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.25 }}
                style={{
                  width: '100%',
                  height: '450px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.075778353205!2d-84.1336244!3d9.9276471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fd00750d48a7%3A0x4f405bd90817300d!2sGalaktik%20Corp!5e0!3m2!1ses!2scr!4v1787618219312!5m2!1ses!2scr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}
