import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Facebook } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Navbardos from '../components/Navbardos';

const Socialdos = () => {
    const { t } = useLanguage();

    const socials = [
        { name: 'Instagram', icon: <Instagram size={48} />, url: 'https://instagram.com/galaktikdev', color: '#E4405F' },
        {
            name: 'TikTok',
            icon: (
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
            ),
            url: 'https://www.tiktok.com/@galaktikweb',
            color: '#ffffff'
        },
        { name: 'LinkedIn', icon: <Linkedin size={48} />, url: 'https://uk.linkedin.com/company/galaktikcorp', color: '#0077b5' },
        { name: 'Facebook', icon: <Facebook size={48} />, url: 'https://www.facebook.com/profile.php?id=61584513333304', color: '#1877f2' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                background: 'var(--bg-primary)'
            }}
        >
            <SEO
                title="Redes Sociales | Galaktik"
                description="Síguenos en nuestras redes sociales. Conecta con Galaktik en Instagram y TikTok."
                keywords="redes sociales, instagram galaktik, tiktok, contacto social"
            />
            <Navbardos />
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 'var(--nav-height)',
            }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.h1
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}
                    >
                        {t.social.title} <span className="gradient-text">{t.social.titleHighlight}</span>
                    </motion.h1>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        width: '100%',
                        maxWidth: '400px'
                    }}>
                        {socials.map((social, i) => (
                            <motion.a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                                whileHover={{ scale: 1.05, x: 10 }}
                                style={{
                                    padding: '2rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '2rem',
                                    textDecoration: 'none',
                                    color: 'white',
                                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}
                            >
                                <div style={{
                                    color: social.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '1rem',
                                    borderRadius: '50%'
                                }}>
                                    {social.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{social.name}</h3>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Socialdos;
