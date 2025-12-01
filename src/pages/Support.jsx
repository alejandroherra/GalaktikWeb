import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Support = () => {
    const { t } = useLanguage();

    const options = [
        {
            title: t.support.chat.title,
            desc: t.support.chat.desc,
            btn: t.support.chat.btn,
            icon: <MessageCircle size={48} />,
            url: 'https://wa.me/50664355247',
            color: '#25D366',
            action: 'chat'
        },
        {
            title: t.support.call.title,
            desc: t.support.call.desc,
            btn: t.support.call.btn,
            icon: <Phone size={48} />,
            url: 'tel:+50664355247',
            color: '#6366f1',
            action: 'call'
        },
        {
            title: t.support.track.title,
            desc: t.support.track.desc,
            btn: t.support.track.btn,
            icon: <Search size={48} />,
            url: '/track',
            color: '#8b5cf6',
            action: 'track'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                paddingTop: 'var(--nav-height)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            }}
        >
            <SEO
                title="Soporte y Ayuda"
                description="¿Necesitas ayuda? Contáctanos por WhatsApp, teléfono o rastrea tu ticket. Estamos aquí para ayudarte con tu proyecto web."
                keywords="soporte web, ayuda diseño web, contacto, whatsapp, rastrear ticket"
            />
            <div className="container">
                <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                        {t.support.title} <span className="gradient-text">{t.support.titleHighlight}</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>{t.support.desc}</p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}>
                    {options.map((option, i) => (
                        <motion.a
                            key={i}
                            href={option.url}
                            target={option.action === 'chat' ? "_blank" : "_self"}
                            rel={option.action === 'chat' ? "noopener noreferrer" : ""}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ y: -10 }}
                            style={{
                                padding: '3rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '1.5rem',
                                transition: 'all 0.3s'
                            }}
                        >
                            <div style={{
                                color: option.color,
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1.5rem',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {option.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{option.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{option.desc}</p>
                            </div>
                            <div className={`btn ${option.action === 'chat' ? 'btn-primary' : 'btn-outline'}`} style={{ marginTop: '1rem' }}>
                                {option.btn}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Support;
