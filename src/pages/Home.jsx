import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Globe, Zap, Shield, Smartphone, TrendingUp, Users, Clock, Award, Wrench, ArrowUpCircle, ArrowRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import manitosImg from '../assets/manitos.webp';
import travelsImg from '../assets/travels.webp';
import wyndhamImg from '../assets/wyndham.webp';
import logoImg from '../assets/logo.png';
import spaceImg from '../assets/space.webp';
import SEO from '../components/SEO';

const Home = () => {
    const { t } = useLanguage();

    const features = useMemo(() => [
        { icon: <Globe />, title: t.features.global, desc: t.features.globalDesc },
        { icon: <Smartphone />, title: t.features.responsive, desc: t.features.responsiveDesc },
        { icon: <Zap />, title: t.features.fast, desc: t.features.fastDesc },
        { icon: <Shield />, title: t.features.secure, desc: t.features.secureDesc },
        { icon: <Wrench />, title: t.features.maintenance, desc: t.features.maintenanceDesc },
        { icon: <ArrowUpCircle />, title: t.features.upgrade, desc: t.features.upgradeDesc }
    ], [t]);

    const examples = useMemo(() => [
        {
            img: manitosImg,
            title: t.examples.options149,
            link: 'https://hospedajemanito.com/',
            label: t.examples.click149
        },
        {
            img: travelsImg,
            title: t.examples.options299,
            link: 'https://costaricatravelcr.com/tours-de-un-dia/',
            label: t.examples.click299
        },
        {
            img: wyndhamImg,
            title: t.examples.options1099,
            link: 'https://www.wyndhamhotels.com/es-xl/wyndham-garden/sanjose-costa-rica/wyndham-garden-sanjose-escazu/overview',
            label: t.examples.click1099
        }
    ], [t]);

    const pricingBasicFeatures = useMemo(() => [
        t.pricing.features.multiPage,
        t.pricing.features.responsive,
        t.pricing.features.contact,
        t.pricing.features.social,
        t.pricing.features.delivery1
    ], [t]);

    const pricingStarterFeatures = useMemo(() => [
        t.pricing.features.multiPage,
        t.pricing.features.customDesign,
        t.pricing.features.animations,
        t.pricing.features.contact,
        t.pricing.features.social,
        t.pricing.features.delivery1
    ], [t]);

    const pricingProFeatures = useMemo(() => [
        t.pricing.features.multiPage,
        t.pricing.features.backend,
        t.pricing.features.database,
        t.pricing.features.auth,
        t.pricing.features.animations,
        t.pricing.features.support
    ], [t]);

    const benefitsItems = useMemo(() => [
        { icon: <TrendingUp size={32} />, title: t.benefits.revenue, desc: t.benefits.revenueDesc },
        { icon: <Users size={32} />, title: t.benefits.reach, desc: t.benefits.reachDesc },
        { icon: <Clock size={32} />, title: t.benefits.available, desc: t.benefits.availableDesc },
        { icon: <Award size={32} />, title: t.benefits.credibility, desc: t.benefits.credibilityDesc }
    ], [t]);

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
            <SEO
                title="Desarrollo Web Profesional desde $149 - Soluciones Escalables 2026"
                description="Agencia de diseño y desarrollo web en Costa Rica. Creamos sitios web modernos, rápidos y optimizados para tu negocio desde $149. Soluciones 2026."
                keywords="diseño web costa rica, desarrollo web, paginas web, ecommerce, seo, web 2026"
            />

            {/* Hero Section */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(10, 10, 10, 0) 50%)',
                width: '100%',
                padding: '5rem 0'
            }}>
                <div className="container">
                    <div
                        style={{
                            marginBottom: '4rem',
                            maxWidth: '1100px',
                            margin: '2rem auto 4rem auto',
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
                        {/* Static background for performance */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
                                zIndex: 0
                            }}
                        />
                        <h2
                            style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                marginBottom: '1rem',
                                fontWeight: 'bold',
                                position: 'relative',
                                zIndex: 1
                            }}
                        >
                            <span className="gradient-text">{t.hero.whoWeAre}</span>
                            <span
                                style={{
                                    fontSize: '0.9rem',
                                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                                    color: '#000',
                                    padding: '0.2rem 0.8rem',
                                    borderRadius: '20px',
                                    marginLeft: '1rem',
                                    verticalAlign: 'middle',
                                    fontWeight: 'bold',
                                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                                    display: 'inline-block'
                                }}
                            >
                                ✦ {t.hero.sold}
                            </span>
                        </h2>
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
                    </div>

                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '2rem' }}>
                        {t.features.title} <span className="gradient-text">{t.features.titleHighlight}</span>
                    </motion.h2>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 className="gradient-text" style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            borderBottom: '2px solid var(--accent-primary)',
                            paddingBottom: '0.5rem'
                        }}>
                            {t.features.sectionTitle}
                        </h3>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="feature-card"
                                style={{
                                    padding: '1.5rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '16px',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                            >
                                <div style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{feature.icon}</div>
                                <h3 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}>{feature.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{feature.desc}</p>
                            </div>
                        ))}
                    </div>

                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        {t.hero.title} <span className="gradient-text">{t.hero.subtitle}</span>
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem' }}>
                        {t.hero.desc}
                    </p>
                    <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/ticket" className="btn btn-primary">{t.hero.start}</Link>
                        <a href="#pricing" className="btn btn-outline">{t.hero.plans}</a>
                    </motion.div>
                </div>
            </section>

            {/* Examples Section */}
            <section style={{
                padding: '5rem 0',
                backgroundImage: `url(${spaceImg})`,
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
                        gap: '2rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {examples.map((example, index) => (
                            <motion.a
                                key={index}
                                href={example.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03, brightness: 1.1 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    position: 'relative',
                                    height: '400px',
                                    borderRadius: '24px',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    textDecoration: 'none',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                }}
                            >
                                {/* Background Image */}
                                <img
                                    src={example.img}
                                    alt={example.title}
                                    loading="lazy"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: example.img === travelsImg ? 'none' : 'cover',
                                        transform: example.img === travelsImg ? 'scale(1.2)' : 'none',
                                        transformOrigin: 'center center',
                                        zIndex: 0
                                    }}
                                />

                                {/* Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
                                    zIndex: 1,
                                    transition: 'background 0.3s'
                                }} />

                                {/* Content */}
                                <div style={{
                                    position: 'relative',
                                    zIndex: 2,
                                    padding: '2rem',
                                    width: '100%',
                                    textAlign: 'center'
                                }}>
                                    <h3 style={{
                                        fontSize: '1.8rem',
                                        marginBottom: '0.5rem',
                                        color: '#fff',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                    }}>
                                        {example.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--accent-secondary)',
                                        fontWeight: '600',
                                        fontSize: '1.1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {example.label} <ArrowRight size={20} />
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>


            {/* Pricing Section */}
            <section id="pricing" style={{ padding: '5rem 0', width: '100%' }}>
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem' }}>
                        {t.pricing.title} <span className="gradient-text">{t.pricing.titleHighlight}</span>
                    </motion.h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
                        {/* Basic Plan $149 */}
                        <div
                            className="hover-lift"
                            style={{
                                padding: '2.5rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.pricing.basic}</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>$149</div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t.pricing.basicDesc}</p>

                            <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {pricingBasicFeatures.map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Check size={18} color="#6366f1" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/ticket?plan=basic" className="btn btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.pricing.chooseBasic}</Link>
                        </div>

                        {/* Starter Plan $299 (Custom) */}
                        <div
                            className="hover-lift"
                            style={{
                                padding: '2.5rem',
                                background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.1) 0%, rgba(10, 10, 10, 0) 100%)',
                                border: '1px solid var(--accent-primary)',
                                borderRadius: '24px',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: '-12px', right: '2rem',
                                background: 'var(--accent-gradient)', padding: '0.25rem 1rem',
                                borderRadius: '20px', fontSize: '0.875rem', fontWeight: 'bold'
                            }}>
                                {t.pricing.popular}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.pricing.starter}</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>$299</div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t.pricing.starterDesc}</p>

                            <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {pricingStarterFeatures.map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Check size={18} color="#6366f1" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/ticket?plan=starter" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.pricing.chooseStarter}</Link>
                        </div>

                        {/* Pro Plan $1099 */}
                        <div
                            className="hover-lift"
                            style={{
                                padding: '2.5rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.pricing.pro}</h3>
                            <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>$1099</div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>{t.pricing.proDesc}</p>

                            <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {pricingProFeatures.map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Check size={18} color="#6366f1" /> {item}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/ticket?plan=pro" className="btn btn-outline" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.pricing.choosePro}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Software Implementation Section */}
            <section style={{ padding: '5rem 0', background: 'var(--bg-secondary)', width: '100%' }}>
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {t.implementation.title} <span className="gradient-text">{t.implementation.titleHighlight}</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        {t.implementation.desc}
                    </motion.p>

                    <div
                        className="hover-lift"
                        style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            padding: '2.5rem',
                            background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.05) 0%, rgba(10, 10, 10, 0) 100%)',
                            border: '1px solid var(--card-border)',
                            borderRadius: '24px',
                            position: 'relative',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                    >
                        <ul style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {t.implementation.features.map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Check size={18} color="#6366f1" /> {item}
                                </li>
                            ))}
                        </ul>

                        <Link to="/ticket?plan=implementation" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>{t.implementation.btn}</Link>
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
                        <div
                            className="hover-lift"
                            style={{
                                padding: '2.5rem',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
                        </div>

                        {/* Technology Upgrade */}
                        <div
                            className="hover-lift"
                            style={{
                                padding: '2.5rem',
                                background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.05) 0%, rgba(10, 10, 10, 0) 100%)',
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px',
                                position: 'relative',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
                        </div>
                    </div>
                </div>
            </section>


            {/* AI Integration Section */}
            <section style={{ padding: '5rem 0', width: '100%' }}>
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {t.ai.title} <span className="gradient-text">{t.ai.titleHighlight}</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        {t.ai.desc}
                    </motion.p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <div
                            className="hover-lift"
                            style={{
                                padding: '2.5rem',
                                background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.05) 0%, rgba(10, 10, 10, 0) 100%)',
                                border: '1px solid var(--accent-secondary)',
                                borderRadius: '24px',
                                position: 'relative',
                                gridColumn: '1 / -1',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {t.ai.benefits.slice(0, 2).map((item, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Zap size={20} color="#8b5cf6" /> {item}
                                        </li>
                                    ))}
                                </ul>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {t.ai.benefits.slice(2, 4).map((item, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Zap size={20} color="#8b5cf6" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link to="/ticket" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', background: 'linear-gradient(90deg, #8b5cf6 0%, #6366f1 100%)' }}>{t.ai.btn}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Agent Section */}
            <section style={{ padding: '5rem 0', width: '100%' }}>
                <div className="container">
                    <motion.h2 variants={itemVariants} style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {t.aiAgent.title} <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.aiAgent.titleHighlight}</span>
                    </motion.h2>
                    <motion.p variants={itemVariants} style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
                        {t.aiAgent.desc}
                    </motion.p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}>
                        <div
                            className="hover-lift"
                            style={{
                                padding: '2.5rem',
                                background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.05) 0%, rgba(10, 10, 10, 0) 100%)',
                                border: '1px solid #10b981',
                                borderRadius: '24px',
                                position: 'relative',
                                gridColumn: '1 / -1',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                        >
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {t.aiAgent.benefits.slice(0, 2).map((item, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Bot size={20} color="#10b981" /> <span style={{ fontWeight: 500 }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {t.aiAgent.benefits.slice(2, 4).map((item, index) => (
                                        <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <Bot size={20} color="#10b981" /> <span style={{ fontWeight: 500 }}>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link to="/ticket" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)', border: 'none' }}>{t.aiAgent.btn}</Link>
                        </div>
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
                        {benefitsItems.map((benefit, i) => (
                            <div
                                key={i}
                                className="hover-lift"
                                style={{
                                    padding: '2rem',
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '16px',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                            >
                                <div style={{ color: 'var(--accent-primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                    {benefit.icon}
                                </div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{benefit.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer style={{
                padding: '4rem 0 2rem',
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--card-border)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <img
                            src={logoImg}
                            alt="Galaktik Corp Logo"
                            width="120"
                            height="120"
                            style={{
                                height: '120px',
                                width: 'auto',
                                marginBottom: '1.5rem',
                                filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.3))'
                            }}
                            loading="lazy"
                        />
                        <p style={{
                            color: 'var(--text-secondary)',
                            marginBottom: '1rem',
                            fontSize: '1.1rem',
                            fontStyle: 'italic'
                        }}>
                            {t.footer.message}
                        </p>
                        <p style={{
                            color: 'var(--text-tertiary)',
                            fontSize: '0.9rem'
                        }}>
                            © {t.footer.copyright}
                        </p>
                    </motion.div>
                </div>
            </footer>
        <style>{`
          .hover-lift:hover {
            transform: translateY(-4px) scale(1.02) !important;
            box-shadow: 0 12px 40px rgba(99, 102, 241, 0.15) !important;
          }
          .feature-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 8px 30px rgba(99, 102, 241, 0.12) !important;
          }
        `}</style>
        </motion.div >
    );
};

export default Home;
