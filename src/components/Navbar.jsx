import React, { memo, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import "../styles/index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { name: t.nav.home, path: "/websites" },
    { name: t.nav.quote, path: "/ticket" },
    { name: t.nav.track, path: "/track" },
    { name: t.nav.socials, path: "/social" },
    { name: t.nav.faq, path: "/faq" },
    { name: t.nav.work, path: "/work-with-us" },
    { name: t.nav.support, path: "/support" },
  ];

  const authPath = user ? "/dashboard" : "/login";
  const authLabel = user
    ? (language === "es" ? "Panel" : "Dashboard")
    : (language === "es" ? "Ingresar" : "Sign In");

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname],
  );

  if (
    location.pathname === "/portfolio" ||
    location.pathname === "/" ||
    location.pathname === "/contacto" ||
    location.pathname.startsWith("/software-a-medida")
  )
    return null;

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
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                style={{
                  color: isActive(link.path) ? "#ffffff" : "#9ca3af",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  position: "relative",
                  transition: "color 0.3s ease, background 0.3s ease",
                  background: isActive(link.path)
                    ? "rgba(255,255,255,0.05)"
                    : "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTabMain"
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
              </Link>
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
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
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
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
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
              {links.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    color: isActive(link.path) ? "#ffffff" : "#9ca3af",
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "14px 16px",
                    borderRadius: "12px",
                    background: isActive(link.path)
                      ? "rgba(255,255,255,0.08)"
                      : "transparent",
                    textDecoration: "none",
                  }}
                >
                  {link.name}
                </Link>
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
                onClick={() => setIsOpen(false)}
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

        .desktop-menu a:hover {
          color: #ffffff !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }
      `}</style>
    </>
  );
};

export default memo(Navbar);
