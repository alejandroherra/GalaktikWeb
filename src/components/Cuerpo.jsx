import React, { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../styles/cuerpo.css";

const MainPage = memo(function MainPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const services = useMemo(() => [
    {
      title: t.software.cuerpoService1Title,
      text: t.software.cuerpoService1Desc,
      color: "#8b5cf6",
      route: "/software-a-medida",
      icon: "⚙️",
    },
    {
      title: t.software.cuerpoService2Title,
      text: t.software.cuerpoService2Desc,
      color: "#fb923c",
      route: "/websites",
      icon: "🌐",
    },
    {
      title: t.software.cuerpoService3Title,
      text: t.software.cuerpoService3Desc,
      color: "#22c55e",
      route: "/cotizar",
      icon: "🤖",
    },
  ], [t]);

  const clients = useMemo(() => [
    {
      name: "Mayka",
      project: t.software.cuerpoClient1Project,
      color: "#8b5cf6",
    },
    {
      name: "Concentrix CR3",
      project: t.software.cuerpoClient2Project,
      color: "#fb923c",
    },
    {
      name: "Mondaisa Escazú",
      project: t.software.cuerpoClient3Project,
      color: "#22c55e",
    },
    {
      name: "TELUS Digital",
      project: t.software.cuerpoClient4Project,
      color: "#06b6d4",
    },
  ], [t]);

  const strengths = useMemo(() => [
    {
      icon: "👨‍💻",
      title: t.software.cuerpoStrength1Title,
      text: t.software.cuerpoStrength1Text,
    },
    {
      icon: "🧩",
      title: t.software.cuerpoStrength2Title,
      text: t.software.cuerpoStrength2Text,
    },
    {
      icon: "🌍",
      title: t.software.cuerpoStrength3Title,
      text: t.software.cuerpoStrength3Text,
    },
    {
      icon: "📈",
      title: t.software.cuerpoStrength4Title,
      text: t.software.cuerpoStrength4Text,
    },
  ], [t]);

  const capabilities = useMemo(() => [
    {
      title: "Backend Development",
      desc: t.software.cuerpoCap1Desc,
      icon: "🛠️",
    },
    {
      title: "Frontend Development",
      desc: t.software.cuerpoCap2Desc,
      icon: "✨",
    },
    {
      title: "Inteligencia Artificial",
      desc: t.software.cuerpoCap3Desc,
      icon: "🧠",
    },
    {
      title: "Business Strategy",
      desc: t.software.cuerpoCap4Desc,
      icon: "🚀",
    },
  ], [t]);

  return (
    <main className="page-wrapper">
      <section className="hero reveal">
        <h1 className="main-title">
          {t.software.cuerpoH1}
          <span> {t.software.cuerpoH1Span}</span>
        </h1>

        <p className="hero-description">
          {t.software.cuerpoDesc}
        </p>

        <div className="hero-actions">
          <button
            className="primary-button pressable"
            onClick={() => navigate("/software-a-medida/cotizar")}
          >
            {t.software.cuerpoBtnCotizar}
          </button>


        </div>
      </section>

      <section className="services-section reveal">
        <div className="section-heading">
          <span className="section-tag">{t.software.cuerpoSectServicios}</span>
          <h2>{t.software.cuerpoServiciosTitle}</h2>
          <p>
            {t.software.cuerpoServiciosDesc}
          </p>
        </div>

        <div className="cards-grid">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="info-card clickable reveal-card"
              style={{ animationDelay: `${index * 0.08}s` }}
              onClick={() => navigate(service.route)}
            >
              <div className="card-top-row">
                <div className="card-icon">{service.icon}</div>
                <div
                  className="card-accent"
                  style={{ background: service.color }}
                />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="card-link">{t.software.cuerpoCardLink}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section reveal">
        <div className="section-heading left">
          <span className="section-tag">{t.software.cuerpoSectSoftware}</span>
          <h2>{t.software.cuerpoSoftwareTitle}</h2>
          <p>
            {t.software.cuerpoSoftwareDesc}
          </p>
        </div>

        <div className="strength-grid">
          {strengths.map((item, index) => (
            <article
              key={item.title}
              className="info-card reveal-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="capabilities-grid">
          {capabilities.map((item, index) => (
            <article
              key={item.title}
              className="mini-cap-card reveal-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <span className="mini-cap-icon">{item.icon}</span>
              <div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stats-section reveal">
        <div className="section-heading left">
          <span className="section-tag">{t.software.cuerpoSectExperiencia}</span>
          <h2>{t.software.cuerpoExperienciaTitle}</h2>
        </div>

        <div className="stats-grid">
          <article className="stat-card">
            <strong>150+</strong>
            <span>{t.software.cuerpoStat1Label}</span>
          </article>

          <article className="stat-card">
            <strong>5 años</strong>
            <span>{t.software.cuerpoStat2Label}</span>
          </article>

          <article className="stat-card">
            <strong>10 expertos</strong>
            <span>{t.software.cuerpoStat3Label}</span>
          </article>
        </div>
      </section>

      <section className="clients-section reveal">
        <div className="section-heading">
          <span className="section-tag">{t.software.cuerpoSectClientes}</span>
          <h2>{t.software.cuerpoClientesTitle}</h2>
          <p>
            {t.software.cuerpoClientesDesc}
          </p>
        </div>

        <div className="clients-grid">
          {clients.map((client, index) => (
            <article
              key={client.name}
              className="client-card reveal-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div
                className="client-line"
                style={{ background: client.color }}
              />
              <h3>{client.name}</h3>
              <p>{client.project}</p>
            </article>
          ))}
        </div>
      </section>


    </main>
  );
});

export default MainPage;
