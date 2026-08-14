import React, { Suspense, lazy, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

const Earth3D = lazy(() => import("../components/Earth3D"));
const Venus3D = lazy(() => import("../components/Venus3d"));

export default function MainPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const origWarn = console.warn;
    const origError = console.error;
    const suppress =
      (orig) =>
      (msg, ...args) => {
        if (
          typeof msg === "string" &&
          (msg.includes("THREE.") || msg.includes("Context Lost"))
        )
          return;
        orig(msg, ...args);
      };
    console.warn = suppress(origWarn);
    console.error = suppress(origError);
    return () => {
      console.warn = origWarn;
      console.error = origError;
    };
  }, []);

  const destinations = useMemo(
    () => [
      {
        label: t.software.mpPlanetSoftware,
        sublabel: t.software.mpPlanetSublabel,
        route: "/software-a-medida",
        glowColor: "#4f9cf6",
        Component: Earth3D,
      },
      {
        label: t.software.mpPlanetWeb,
        sublabel: t.software.mpPlanetWebSublabel,
        route: "/websites",
        glowColor: "#e8660a",
        Component: Venus3D,
      },
    ],
    [t],
  );

  return (
    <div className="main-container">
      <SEO
        title="Galaktik Corp - Desarrollo de Software e Inteligencia Artificial"
        description="Agencia experta en desarrollo de software a medida, inteligencia artificial y diseño web moderno en Costa Rica. Impulsa tu negocio con soluciones tecnológicas escalables desde $149."
        keywords="desarrollo de software costa rica, inteligencia artificial, paginas web, galaktik corp, software a medida, diseño web"
        canonical="/"
      />
      <header className="header-section">
        <h1 className="main-logo">Galaktik</h1>
      </header>

      <div className="planets-grid">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="planet-wrapper"
            onClick={() => navigate(dest.route)}
          >
            <div className="canvas-container">
              <Suspense
                fallback={
                  <div className="loader" aria-hidden="true">
                    {t.software.mpLoading}
                  </div>
                }
              >
                <dest.Component glowColor={dest.glowColor} />
              </Suspense>
            </div>

            <div className="planet-info">
              <h2 style={{ color: dest.glowColor }}>{dest.label}</h2>
              <span>{dest.sublabel}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="footer-text">{t.software.cuerpoFooter}</p>

      <style>{`
        .main-container {
          min-height: 100vh;
          background: radial-gradient(circle at 50% 30%, #0b0f19 0%, #030712 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
          color: white;
          padding: 40px 20px;
          overflow-x: hidden;
        }

        .header-section {
          text-align: center;
          margin-bottom: 40px;
          z-index: 10;
        }

        .main-logo {
          margin: 0;
          font-size: clamp(28px, 6vw, 52px);
          font-weight: 900;
          letter-spacing: -0.02em;
          background: linear-gradient(
            to right,
            #fff 20%,
            #60a5fa 40%,
            #8b5cf6 60%,
            #fb923c 80%,
            #fff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .planets-grid {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 60px;
          width: 100%;
          max-width: 1200px;
          flex-wrap: wrap;
        }

        .planet-wrapper {
          position: relative;
          width: 350px; /* Tamaño fijo igual para ambos */
          height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          outline: none;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .canvas-container {
          width: 100%;
          height: 350px; /* Espacio para el planeta */
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          -webkit-user-select: none;
        }

        .planet-info {
          margin-top: 20px;
          text-align: center;
          pointer-events: none; /* Que el click pase al padre */
        }

        .planet-info h2 {
          margin: 0;
          font-size: 20px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 15px currentColor;
        }

        .planet-info span {
          font-size: 12px;
          opacity: 0.6;
          letter-spacing: 1px;
        }

        .loader {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 2px;
          animation: pulse 1.5s infinite;
        }

        .footer-text {
          margin-top: 60px;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .planets-grid {
            gap: 20px;
          }
          .planet-wrapper {
            width: 280px;
            height: 380px;
          }
          .canvas-container {
            height: 280px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .planet-wrapper {
            animation: none !important;
          }
          .loader {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
