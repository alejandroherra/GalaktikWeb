import React from 'react';
import { motion } from 'framer-motion';
import { Check, Globe, Zap, Shield, Smartphone, TrendingUp, Users, Clock, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            style={{ paddingTop: 'var(--nav-height)', width: '100%' }}
        >
            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(10, 10, 10, 0) 50%)',
                width: '100%'
            }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{
                            marginBottom: '3rem',
                            maxWidth: '900px',
                            margin: '0 auto 3rem auto',
                            padding: '1.5rem 2.5rem',
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            border: '1px solid rgba(139, 92, 246, 0.2)',
                            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
                            display: 'inline-block',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <motion.div
                            animate={{
                                background: [
                                    'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
                                    'linear-gradient(90deg, transparent 100%, rgba(139, 92, 246, 0.1) 0%, transparent 0%)'
                                ]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 0
                            }}
                        />
                        <p style={{
                            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                            color: '#e0e7ff',
                            margin: 0,
                            lineHeight: '1.6',
                            fontWeight: '500',
                            position: 'relative',
                            zIndex: 1,
                            textShadow: '0 2px 10px rgba(139, 92, 246, 0.3)'
                        }}>
                            <span style={{ color: '#a78bfa' }}>✦</span> {t.hero.teamIntro} <span style={{ color: '#a78bfa' }}>✦</span>
                        </p>
                    </motion.div>

                    <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        {t.hero.title} <span className="gradient-text">{t.hero.subtitle}</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        {t.hero.desc}
                    </motion.p>
                    <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/ticket" className="btn btn-primary">{t.hero.start}</Link>
                        <a href="#pricing" className="btn btn-outline">{t.hero.plans}</a>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '5rem 0', width: '100%' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: <Globe />, title: t.features.global, desc: t.features.globalDesc },
                            { icon: <Smartphone />, title: t.features.responsive, desc: t.features.responsiveDesc },
                            { icon: <Zap />, title: t.features.fast, desc: t.features.fastDesc },
                            { icon: <Shield />, title: t.features.secure, desc: t.features.secureDesc }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                style={{
                                    padding: '2rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '16px'
                                }}
                            >
                                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }}>{feature.icon}</div>
                                <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Examples Section */}
            <section style={{
                padding: '5rem 0',
                backgroundImage: 'url(/src/assets/space.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                width: '100%'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(10, 10, 10, 0.85)',
                    zIndex: 0
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
                        {t.examples.title} <span className="gradient-text">{t.examples.titleHighlight}</span>
                    </motion.h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '3rem',
                        alignItems: 'start'
                    }}>
                        {/* $299 Options - Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t.examples.options299}</h3>
                            {[
                                { id: 1, title: "Hospedaje Manito", price: "$299", optionNum: 1, url: "https://hospedajemanito.com/" },
                                { id: 4, title: "Costa Rica Travel", price: "$299", optionNum: 2, url: "https://costaricatravelcr.com/tours-de-un-dia/" },
                            ].map((ex) => (
                                <motion.a
                                    key={ex.id}
                                    href={ex.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={itemVariants}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    style={{
                                        display: 'block',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        border: '1px solid var(--card-border)',
                                        textDecoration: 'none',
                                        color: 'white',
                                        background: 'var(--card-bg)'
                                    }}
                                >
                                    <div style={{
                                        padding: '1.5rem',
                                        background: 'var(--card-bg)'
                                    }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{ex.title}</h3>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            {t.examples.click299}
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* $1099 Options - Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t.examples.options1099}</h3>
                            {[
                                { id: 3, title: "Roma del Mar", price: "$1099", optionNum: 1, url: "https://romadelmar.com/" },
                                { id: 2, title: "Wyndham Hotel", price: "$1099", optionNum: 2, url: "https://www.wyndhamhotels.com/es-xl/wyndham/san-jose-costa-rica/wyndham-san-jose-herradura-hotel-convention-center/overview" },
                            ].map((ex) => (
                                <motion.a
                                    key={ex.id}
                                    href={ex.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={itemVariants}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    style={{
                                        display: 'block',
                                        borderRadius: '16px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        border: '1px solid var(--accent-primary)',
                                        textDecoration: 'none',
                                        color: 'white',
                                        background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(10, 10, 10, 0) 100%)'
                                    }}
                                >
                                    <div style={{
                                        padding: '1.5rem',
                                        background: 'transparent'
                                    }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{ex.title}</h3>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            {t.examples.click1099}
                                        </span>
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" style={{ padding: '5rem 0', width: '100%' }}>
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
                        {t.pricing.title} <span className="gradient-text">{t.pricing.titleHighlight}</span>
                    </motion.h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                        {/* Basic Plan */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                padding: '2.5rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                position: 'relative'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.pricing.starter}</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>$299</div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t.pricing.starterDesc}</p>

                            <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    t.pricing.features.onePage,
                                    t.pricing.features.responsive,
                                    t.pricing.features.contact,
                                    t.pricing.features.social,
                                    t.pricing.features.delivery1
                                ].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Check size={18} color="#6366f1" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/ticket?plan=starter" className="btn btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.pricing.chooseStarter}</Link>
                        </motion.div>

                        {/* Pro Plan */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                padding: '2.5rem',
                                background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(10, 10, 10, 0) 100%)',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '24px',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: '-12px', right: '2rem',
                                background: 'var(--accent-gradient)', padding: '0.25rem 1rem',
                                borderRadius: '20px', fontSize: '0.875rem', fontWeight: 'bold'
                            }}>
                                {t.pricing.popular}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.pricing.pro}</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>$1099</div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t.pricing.proDesc}</p>

                            <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    t.pricing.features.multiPage,
                                    t.pricing.features.backend,
                                    t.pricing.features.database,
                                    t.pricing.features.auth,
                                    t.pricing.features.animations,
                                    t.pricing.features.support
                                ].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Check size={18} color="#6366f1" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/ticket?plan=pro" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.pricing.choosePro}</Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Maintenance Section */}
            <section style={{ padding: '5rem 0', width: '100%' }}>
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {t.maintenance.title} <span className="gradient-text">{t.maintenance.titleHighlight}</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        {t.maintenance.desc}
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
                        {/* Maintenance Plan */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                padding: '2.5rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                position: 'relative'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.maintenance.plan.title}</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>{t.maintenance.plan.price}</span>
                                <span style={{ color: 'var(--text-secondary)' }}>{t.maintenance.plan.period}</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t.maintenance.plan.desc}</p>

                            <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {t.maintenance.plan.features.map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Check size={18} color="#6366f1" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/ticket?plan=maintenance" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.maintenance.plan.btn}</Link>
                        </motion.div>

                        {/* Technology Upgrade */}
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            style={{
                                padding: '2.5rem',
                                background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.05) 0%, rgba(10, 10, 10, 0) 100%)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                position: 'relative'
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {t.maintenance.upgrade.title} <span className="gradient-text">{t.maintenance.upgrade.titleHighlight}</span>
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t.maintenance.upgrade.desc}</p>

                            <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {t.maintenance.upgrade.features.map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Zap size={18} color="#6366f1" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                                {t.maintenance.upgrade.note}
                            </p>

                            <Link to="/ticket?plan=upgrade" className="btn btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.maintenance.upgrade.btn}</Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', width: '100%' }}>
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {t.benefits.title} <span className="gradient-text">{t.benefits.titleHighlight}</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        {t.benefits.desc}
                    </motion.p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: <TrendingUp size={32} />, title: t.benefits.revenue, desc: t.benefits.revenueDesc },
                            { icon: <Users size={32} />, title: t.benefits.reach, desc: t.benefits.reachDesc },
                            { icon: <Clock size={32} />, title: t.benefits.available, desc: t.benefits.availableDesc },
                            { icon: <Award size={32} />, title: t.benefits.credibility, desc: t.benefits.credibilityDesc }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                style={{
                                    padding: '2rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '16px',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    {benefit.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{benefit.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{benefit.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
