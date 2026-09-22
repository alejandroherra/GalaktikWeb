import React, { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

// --- ANIMACIONES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SobreNosotros() {
  const { t } = useLanguage();

  const values = useMemo(() => [
    {
      icon: "🧠",
      title: t.software.snValue1Title,
      text: t.software.snValue1Text,
    },
    {
      icon: "🛠️",
      title: t.software.snValue2Title,
      text: t.software.snValue2Text,
    },
    {
      icon: "🌍",
      title: t.software.snValue3Title,
      text: t.software.snValue3Text,
    },
    {
      icon: "📈",
      title: t.software.snValue4Title,
      text: t.software.snValue4Text,
    },
  ], [t]);

  const stats = useMemo(() => [
    { label: t.software.snStat1Label, value: "10" },
    { label: t.software.snStat2Label, value: "150+" },
    { label: t.software.snStat3Label, value: "50+" },
    { label: t.software.snStat4Label, value: "25+" },
  ], [t]);

  const team = useMemo(() => [
    { area: t.software.snTeam1Area, desc: t.software.snTeam1Desc },
    { area: t.software.snTeam2Area, desc: t.software.snTeam2Desc },
    { area: t.software.snTeam3Area, desc: t.software.snTeam3Desc },
    { area: t.software.snTeam4Area, desc: t.software.snTeam4Desc },
  ], [t]);

  const experienceItems = useMemo(() => [
    t.software.snExp1,
    t.software.snExp2,
    t.software.snExp3,
    t.software.snExp4,
    t.software.snExp5,
    t.software.snExp6,
  ], [t]);

  return (
    <div style={mainContainer}>
      <div style={glowTop} />
      <div style={glowBottom} />

      <section style={sectionHero}>
        <div style={contentWrapper}>
          <div style={heroGrid}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.span variants={fadeInUp} style={upperBadge}>
                {t.software.snBadge}
              </motion.span>

              <motion.h1 variants={fadeInUp} style={mainTitle}>
                {t.software.snTitle} <br />
                <span style={gradientText}>{t.software.snTitleSpan}</span>
              </motion.h1>

              <motion.p variants={fadeInUp} style={mainParagraph}>
                {t.software.snDesc}
              </motion.p>

              <motion.div variants={fadeInUp} style={buttonGroup}>


                <motion.button
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                  style={secondaryBtn}
                >
                  {t.software.snBtnContacto}
                </motion.button>
              </motion.div>

              <motion.div variants={fadeInUp} style={locationCard}>
                <div style={locationIconWrap}>
                  <span style={locationIcon}>📍</span>
                </div>

                <div style={locationContent}>
                  <p style={locationLabel}>{t.software.snUbicacionLabel}</p>

                  <p style={locationText}>{t.software.snUbicacion}</p>

                  <div style={locationMeta}>
                    <span style={locationBadge}>{t.software.snPiso}</span>
                    <span style={locationDivider}>•</span>
                    <span style={locationBadge}>{t.software.snOficina}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              style={visualContainer}
            >
              <div style={glassBox}>
                <div style={glassGlow} />
                <div style={graphicContainer}>
                  <div style={bar(1)} />
                  <div style={bar(2)} />
                  <div style={bar(3)} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={sectionStats}>
        <div style={contentWrapper}>
          <div style={statsGrid}>
            {stats.map((s) => (
              <motion.div
                key={s.label}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                viewport={{ once: true }}
                style={statItem}
              >
                <h2 style={statValue}>{s.value}</h2>
                <p style={statLabel}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionValues}>
        <div style={contentWrapper}>
          <div style={centeredHeader}>
            <h2 style={subTitle}>{t.software.snSectEquipo}</h2>
            <p style={subParagraph}>
              {t.software.snSectEquipoDesc}
            </p>
          </div>

          <div style={valuesGrid}>
            {team.map((v) => (
              <motion.div
                key={v.area}
                whileInView="visible"
                initial="hidden"
                variants={fadeInUp}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                style={valueCard}
              >
                <div style={iconCircle}>
                  {v.area.includes("Backend")
                    ? "⚙️"
                    : v.area.includes("Frontend")
                      ? "🎨"
                      : v.area.includes("Inteligencia")
                        ? "🤖"
                        : "📊"}
                </div>
                <h3 style={cardTitle}>{v.area}</h3>
                <p style={cardText}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionValuesAlt}>
        <div style={contentWrapper}>
          <div style={centeredHeader}>
            <h2 style={subTitle}>{t.software.snSectElegirnos}</h2>
            <p style={subParagraph}>
              {t.software.snSectElegirnosDesc}
            </p>
          </div>

          <div style={valuesGrid}>
            {values.map((v) => (
              <motion.div
                key={v.title}
                whileInView="visible"
                initial="hidden"
                variants={fadeInUp}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                style={valueCard}
              >
                <div style={iconCircle}>{v.icon}</div>
                <h3 style={cardTitle}>{v.title}</h3>
                <p style={cardText}>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={sectionMission}>
        <div style={contentWrapper}>
          <div style={missionGrid}>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -50 }}
              viewport={{ once: true }}
              style={missionBox}
            >
              <h4 style={smallTitle}>{t.software.snSectMision}</h4>
              <p style={bigText}>
                {t.software.snMisionText}
              </p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 50 }}
              viewport={{ once: true }}
              style={missionBox}
            >
              <h4 style={smallTitle}>{t.software.snSectVision}</h4>
              <p style={bigText}>
                {t.software.snVisionText}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section style={sectionFocus}>
        <div style={contentWrapper}>
          <div style={focusLayout}>
            <div style={focusLeft}>
              <h2 style={subTitle}>{t.software.snSectExperiencia}</h2>
              <p style={subParagraphLeft}>
                {t.software.snSectExperienciaDesc}
              </p>
            </div>

            <div style={focusRight}>
              {experienceItems.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10, color: "#60a5fa" }}
                  style={focusItem}
                >
                  <div style={checkDot} />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

// --- ESTILOS ---

const mainContainer = {
  backgroundColor: "#020617",
  color: "#f8fafc",
  fontFamily: "'Inter', system-ui, sans-serif",
  position: "relative",
  overflowX: "hidden",
};

const glowTop = {
  position: "absolute",
  top: "-10%",
  right: "-5%",
  width: "600px",
  height: "600px",
  background:
    "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
  filter: "blur(80px)",
  zIndex: 0,
};

const glowBottom = {
  position: "absolute",
  bottom: "5%",
  left: "-10%",
  width: "500px",
  height: "500px",
  background:
    "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
  filter: "blur(80px)",
  zIndex: 0,
};

const contentWrapper = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 25px",
  position: "relative",
  zIndex: 1,
};

const sectionHero = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  padding: "100px 0",
};

const heroGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "60px",
  alignItems: "center",
};

const upperBadge = {
  color: "#60a5fa",
  textTransform: "uppercase",
  letterSpacing: "3px",
  fontSize: "13px",
  fontWeight: 700,
  marginBottom: "25px",
  display: "block",
};

const mainTitle = {
  fontSize: "clamp(45px, 7vw, 80px)",
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "-0.03em",
  margin: "0 0 30px 0",
};

const gradientText = {
  background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const mainParagraph = {
  fontSize: "19px",
  color: "#94a3b8",
  lineHeight: 1.7,
  marginBottom: "45px",
  maxWidth: "580px",
};

const buttonGroup = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap",
};

const primaryBtn = {
  padding: "18px 36px",
  borderRadius: "14px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 15px 30px -10px rgba(59, 130, 246, 0.5)",
};

const secondaryBtn = {
  padding: "18px 36px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontWeight: 700,
  transition: "background-color 0.3s ease, border-color 0.3s ease",
};

const locationCard = {
  marginTop: "30px",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  padding: "20px 22px",
  maxWidth: "520px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "22px",
  backdropFilter: "blur(14px)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
};

const locationIconWrap = {
  minWidth: "56px",
  width: "56px",
  height: "56px",
  borderRadius: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "linear-gradient(135deg, rgba(59,130,246,0.22), rgba(167,139,250,0.22))",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
};

const locationIcon = {
  fontSize: "24px",
};

const locationContent = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const locationLabel = {
  margin: 0,
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "2px",
  color: "#60a5fa",
  fontWeight: 700,
};

const locationText = {
  margin: 0,
  fontSize: "15px",
  color: "#94a3b8",
};

const locationMeta = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "4px",
};

const locationBadge = {
  padding: "6px 12px",
  borderRadius: "999px",
  background: "rgba(96,165,250,0.12)",
  border: "1px solid rgba(96,165,250,0.18)",
  color: "#bfdbfe",
  fontSize: "13px",
  fontWeight: 600,
};

const locationDivider = {
  color: "#64748b",
  fontSize: "14px",
};

const visualContainer = {
  position: "relative",
  display: "flex",
  justifyContent: "center",
};

const glassBox = {
  width: "100%",
  maxWidth: "480px",
  height: "380px",
  background: "rgba(30, 41, 59, 0.4)",
  backdropFilter: "blur(12px)",
  borderRadius: "32px",
  border: "1px solid rgba(255,255,255,0.1)",
  position: "relative",
  padding: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
};

const glassGlow = {
  position: "absolute",
  inset: "auto",
  width: "220px",
  height: "220px",
  borderRadius: "999px",
  background: "rgba(96,165,250,0.16)",
  filter: "blur(60px)",
};

const graphicContainer = {
  display: "flex",
  alignItems: "flex-end",
  gap: "15px",
  height: "150px",
  zIndex: 1,
};

const bar = (index) => ({
  width: "40px",
  height: index === 1 ? "60%" : index === 2 ? "100%" : "75%",
  background: "linear-gradient(to top, #3b82f6, #a78bfa)",
  borderRadius: "8px",
  boxShadow: "0 8px 20px rgba(59,130,246,0.35)",
});

const sectionStats = {
  padding: "80px 0",
  background: "rgba(255,255,255,0.02)",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "40px",
};

const statItem = {
  textAlign: "center",
  padding: "20px",
};

const statValue = {
  fontSize: "52px",
  fontWeight: 900,
  color: "#f8fafc",
  margin: 0,
};

const statLabel = {
  color: "#60a5fa",
  textTransform: "uppercase",
  fontSize: "13px",
  letterSpacing: "2px",
  fontWeight: 700,
  marginTop: "10px",
};

const sectionValues = {
  padding: "140px 0 80px",
};

const sectionValuesAlt = {
  padding: "80px 0 140px",
};

const centeredHeader = {
  textAlign: "center",
  marginBottom: "80px",
};

const subTitle = {
  fontSize: "clamp(32px, 5vw, 56px)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  marginBottom: "25px",
};

const subParagraph = {
  color: "#94a3b8",
  fontSize: "20px",
  maxWidth: "750px",
  margin: "0 auto",
  lineHeight: 1.6,
};

const subParagraphLeft = {
  color: "#94a3b8",
  fontSize: "20px",
  maxWidth: "680px",
  lineHeight: 1.6,
};

const valuesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
};

const valueCard = {
  padding: "45px",
  background: "rgba(255,255,255,0.03)",
  borderRadius: "28px",
  border: "1px solid rgba(255,255,255,0.06)",
  transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
};

const iconCircle = {
  width: "65px",
  height: "65px",
  background: "rgba(59, 130, 246, 0.1)",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "32px",
  marginBottom: "30px",
  border: "1px solid rgba(96,165,250,0.15)",
};

const cardTitle = {
  fontSize: "24px",
  fontWeight: 700,
  marginBottom: "18px",
};

const cardText = {
  color: "#94a3b8",
  lineHeight: 1.7,
  fontSize: "16px",
};

const sectionMission = {
  padding: "100px 0",
  background: "rgba(30, 41, 59, 0.3)",
};

const missionGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "40px",
};

const missionBox = {
  padding: "60px",
  background: "rgba(255,255,255,0.02)",
  borderRadius: "35px",
  border: "1px solid rgba(255,255,255,0.05)",
  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
};

const smallTitle = {
  color: "#60a5fa",
  textTransform: "uppercase",
  fontSize: "14px",
  letterSpacing: "3px",
  marginBottom: "25px",
};

const bigText = {
  fontSize: "22px",
  fontWeight: 500,
  lineHeight: 1.6,
  color: "#f1f5f9",
};

const sectionFocus = {
  padding: "140px 0",
};

const focusLayout = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "80px",
  alignItems: "center",
};

const focusLeft = {
  textAlign: "left",
};

const focusRight = {
  display: "grid",
  gap: "15px",
};

const focusItem = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "22px",
  background: "rgba(255,255,255,0.03)",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.05)",
  transition: "color 0.3s ease, transform 0.3s ease",
  fontWeight: 600,
  cursor: "default",
};

const checkDot = {
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  background: "#3b82f6",
  boxShadow: "0 0 15px rgba(59,130,246,0.5)",
};

