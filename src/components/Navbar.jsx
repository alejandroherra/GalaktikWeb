import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/index.css';
import logoImg from '../assets/logo.png';

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { language, toggleLanguage, t } = useLanguage();
    const { user } = useAuth();

    const links = [
        { name: t.nav.home, path: '/' },
        { name: t.nav.quote, path: '/ticket' },
        { name: t.nav.track, path: '/track' },
        { name: t.nav.socials, path: '/social' },
        { name: t.nav.faq, path: '/faq' },
        { name: t.nav.work, path: '/work-with-us' },
        { name: t.nav.support, path: '/support' },
    ];

    if (location.pathname === '/portfolio') return null;

    return (
        <nav style={{
            height: 'var(--nav-height)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(10,10,10,0.8)'
        }}>
            <div className="container" style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logoImg} alt="Galaktik Logo" style={{ width: '68px', height: '65px' }} />
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <ul style={{ display: 'flex', gap: '2rem' }}>
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link to={link.path} style={{
                                    position: 'relative',
                                    color: location.pathname === link.path ? 'white' : 'var(--text-secondary)',
                                    transition: 'color 0.3s'
                                }}>
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="underline"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-4px',
                                                left: 0,
                                                right: 0,
                                                height: '2px',
                                                background: 'var(--accent-gradient)'
                                            }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button
                            onClick={toggleLanguage}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            <Globe size={16} />
                            {language.toUpperCase()}
                        </button>

                        {user ? (
                            <Link to="/dashboard" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                                Dashboard
                            </Link>
                        ) : (
                            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="mobile-toggle" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={toggleLanguage}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'white',
                            padding: '0.5rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        {language.toUpperCase()}
                    </button>
                    <button onClick={() => setIsOpen(!isOpen)} style={{ color: 'white' }}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: 'var(--nav-height)',
                            left: 0,
                            right: 0,
                            background: 'var(--bg-secondary)',
                            padding: '2rem',
                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                        }}
                    >
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                            {links.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        style={{ fontSize: '1.2rem', color: location.pathname === link.path ? 'white' : 'var(--text-secondary)' }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                {user ? (
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="btn btn-primary"
                                        style={{ width: '100%', textAlign: 'center' }}
                                    >
                                        Ir al Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="btn btn-primary"
                                        style={{ width: '100%', textAlign: 'center' }}
                                    >
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .mobile-toggle { display: none !important; }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
