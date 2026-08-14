import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from "../context/LanguageContext";
import { motion } from 'framer-motion';
import Navbardos from '../components/Navbardos';
import Cuerpo from '../components/Cuerpo';
import SEO from '../components/SEO';

const SobreNosotros = lazy(() => import('../pages/SobreNosotros'));
const Contact = lazy(() => import('../pages/Contact'));

const Homedos = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', minHeight: '100vh', background: 'var(--bg-primary)' }}
    >
      <SEO
        title={t.software.homedosSeoTitle}
        description={t.software.homedosSeoDesc}
        keywords={t.software.homedosSeoKeywords}
      />

      <Navbardos />

      <section id="inicio">
        <Cuerpo />
      </section>

      <section id="sobre-nosotros">
        <Suspense fallback={null}>
          <SobreNosotros />
        </Suspense>
      </section>

      <section id="contacto">
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </section>

      <footer
        style={{
          padding: '4rem 0 2rem',
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--card-border)',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <p
            style={{
              color: 'var(--text-secondary)',
              marginBottom: '1rem',
              fontSize: '1.1rem'
            }}
          >
            {t.software.homedosCta}
          </p>

          <Link
            to="/software-a-medida/cotizar"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {t.software.homedosCtaBtn}
          </Link>

          <div
            style={{
              maxWidth: '960px',
              margin: '3rem auto 0',
              paddingTop: '2rem',
              borderTop: '1px solid var(--card-border)'
            }}
          >
            <div className="section-heading">
              <span className="section-tag">{t.software.cuerpoSectContacto}</span>
              <h2>{t.software.cuerpoContactoTitle}</h2>
              <p>{t.software.cuerpoContactoDesc}</p>
            </div>

            <div className="contact-grid">
              {[
                { icon: "📸", title: t.software.cuerpoContact1Title, value: "@galaktikdev", text: t.software.cuerpoContact1Text, href: "https://instagram.com/galaktikdev" },
                { icon: "📞", title: t.software.cuerpoContact2Title, value: "+506 6145 8451", text: t.software.cuerpoContact2Text, href: "https://wa.me/50661458451" },
                { icon: "✉️", title: t.software.cuerpoContact3Title, value: "galaktikdev@gmail.com", text: t.software.cuerpoContact3Text, href: "mailto:galaktikdev@gmail.com" },
              ].map((item, index) => {
                const isExternal = item.href.startsWith("http");

                return (
                  <a
                    key={item.title}
                    className="contact-card reveal-card"
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="contact-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <strong>{item.value}</strong>
                    <p>{item.text}</p>
                  </a>
                );
              })}
            </div>
          </div>

          <p
            style={{
              color: 'var(--text-tertiary)',
              fontSize: '0.9rem',
              marginTop: '2rem'
            }}
          >
            {t.software.cuerpoFooter}
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default Homedos;