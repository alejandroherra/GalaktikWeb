import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Send, Globe, Briefcase, ShoppingBag, Check, User, Mail, Phone, Link as LinkIcon, FileText, Plus, Cpu, Wrench, ArrowUpCircle, Bot } from 'lucide-react';

const PriceCalculator = ({ onSubmit, loading, t }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        plan: '',
        subService: '', // For 'another' service type
        websiteUrl: '',
        details: '',
        name: '',
        email: '',
        phone: ''
    });

    const totalSteps = 3;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    // Optimized variants - reduced complexity
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 20 : -20,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 20 : -20,
            opacity: 0
        })
    };

    const plans = [
        {
            id: 'basic',
            title: t.pricing.basic,
            price: '$149',
            icon: Globe,
            desc: t.pricing.basicDesc,
            color: '#6366f1'
        },
        {
            id: 'starter',
            title: t.pricing.starter,
            price: '$299',
            icon: Briefcase,
            desc: t.pricing.starterDesc,
            color: '#8b5cf6'
        },
        {
            id: 'pro',
            title: t.pricing.pro,
            price: '$1099',
            icon: ShoppingBag,
            desc: t.pricing.proDesc,
            color: '#ec4899'
        },
        {
            id: 'another',
            title: t.ticket.anotherService,
            price: '...',
            icon: Plus,
            desc: t.ticket.customQuote,
            color: '#10b981'
        }
    ];

    const subServices = [
        {
            id: 'ai',
            title: t.ticket.aiIntegration,
            icon: Cpu,
            color: '#3b82f6'
        },
        {
            id: 'aiAgent',
            title: t.ticket.aiAgent,
            icon: Bot,
            color: '#10b981'
        },
        {
            id: 'maintenance',
            title: t.ticket.maintenance,
            icon: Wrench,
            color: '#f59e0b'
        },
        {
            id: 'upgrade',
            title: t.ticket.upgrade,
            icon: ArrowUpCircle,
            color: '#8b5cf6'
        }
    ];

    return (
        <div style={{
            background: 'rgba(30, 41, 59, 0.7)', // Darker, less transparent for performance
            backdropFilter: 'blur(10px)', // Reduced blur from typical 20px+
            borderRadius: '24px',
            padding: '2rem', // Reduced padding
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '900px',
            margin: '0 auto',
            minHeight: '550px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {/* Progress Bar */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>{t.work.step} {step} {t.work.of} {totalSteps}</span>
                    <span>{Math.round((step / totalSteps) * 100)}% {t.work.completed}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: step / totalSteps }}
                        transition={{ duration: 0.3 }} // Faster transition
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                            transformOrigin: 'left',
                            width: '100%'
                        }}
                    />
                </div>
            </div>

            {/* Form Content */}
            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence mode='wait' custom={step}>
                    {step === 1 && (
                        <motion.div
                            key={1}
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>{t.ticket.step1Title}</h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem'
                            }}>
                                {plans.map((plan) => {
                                    const Icon = plan.icon;
                                    const isSelected = formData.plan === plan.id;
                                    return (
                                        <div
                                            key={plan.id}
                                            onClick={() => {
                                                handleChange('plan', plan.id);
                                                if (plan.id !== 'another') handleChange('subService', '');
                                            }}
                                            style={{
                                                padding: '1.5rem',
                                                borderRadius: '16px',
                                                border: isSelected ? `2px solid ${plan.color}` : '1px solid rgba(255,255,255,0.1)',
                                                background: isSelected ? `rgba(${parseInt(plan.color.slice(1, 3), 16)}, ${parseInt(plan.color.slice(3, 5), 16)}, ${parseInt(plan.color.slice(5, 7), 16)}, 0.1)` : 'rgba(255,255,255,0.02)',
                                                cursor: 'pointer',
                                                transition: 'transform 0.2s ease, border-color 0.2s ease', // Simplified transition
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                position: 'relative'
                                            }}
                                        >
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius: '50%',
                                                background: `rgba(${parseInt(plan.color.slice(1, 3), 16)}, ${parseInt(plan.color.slice(3, 5), 16)}, ${parseInt(plan.color.slice(5, 7), 16)}, 0.2)`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: '0.8rem',
                                                color: plan.color
                                            }}>
                                                <Icon size={24} />
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{plan.title}</h4>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: plan.color }}>{plan.price}</div>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{plan.desc}</p>

                                            {isSelected && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '0.8rem',
                                                    right: '0.8rem',
                                                    background: plan.color,
                                                    borderRadius: '50%',
                                                    width: '20px',
                                                    height: '20px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Check size={12} color="white" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Sub-options for 'Another Service' */}
                            {formData.plan === 'another' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ marginTop: '2rem' }}
                                >
                                    <h4 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t.ticket.customQuote}</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        {subServices.map(sub => (
                                            <div
                                                key={sub.id}
                                                onClick={() => handleChange('subService', sub.id)}
                                                style={{
                                                    padding: '1rem',
                                                    borderRadius: '12px',
                                                    border: formData.subService === sub.id ? `2px solid ${sub.color}` : '1px solid rgba(255,255,255,0.1)',
                                                    background: formData.subService === sub.id ? `rgba(${parseInt(sub.color.slice(1, 3), 16)}, ${parseInt(sub.color.slice(3, 5), 16)}, ${parseInt(sub.color.slice(5, 7), 16)}, 0.1)` : 'rgba(255,255,255,0.02)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <sub.icon size={20} color={sub.color} />
                                                <span style={{ fontWeight: '500' }}>{sub.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key={2}
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{t.ticket.step2Title}</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.ticket.websiteUrl}</label>
                                <div style={{ position: 'relative' }}>
                                    <LinkIcon size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="url"
                                        value={formData.websiteUrl}
                                        onChange={(e) => handleChange('websiteUrl', e.target.value)}
                                        placeholder="https://www.example.com"
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.ticket.details}</label>
                                <div style={{ position: 'relative' }}>
                                    <FileText size={20} style={{ position: 'absolute', left: '1rem', top: '1.5rem', color: 'var(--text-secondary)' }} />
                                    <textarea
                                        rows="6"
                                        value={formData.details}
                                        onChange={(e) => handleChange('details', e.target.value)}
                                        placeholder={t.ticket.detailsPlaceholder}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key={3}
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{t.ticket.step3Title}</h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.ticket.name}</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder={t.work.namePlaceholder}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.ticket.email}</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        placeholder={t.work.emailPlaceholder}
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.ticket.phone}</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        placeholder="+1 234 567 890"
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1rem 1rem 3rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            outline: 'none',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        background: 'transparent',
                        color: step === 1 ? 'rgba(255,255,255,0.2)' : 'white',
                        cursor: step === 1 ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <ChevronLeft size={20} /> {t.work.back}
                </button>

                {step < totalSteps ? (
                    <button
                        onClick={nextStep}
                        disabled={step === 1 && (!formData.plan || (formData.plan === 'another' && !formData.subService))}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            background: (step === 1 && (!formData.plan || (formData.plan === 'another' && !formData.subService))) ? 'rgba(255,255,255,0.1)' : '#6366f1',
                            color: (step === 1 && (!formData.plan || (formData.plan === 'another' && !formData.subService))) ? 'rgba(255,255,255,0.3)' : 'white',
                            border: 'none',
                            cursor: (step === 1 && (!formData.plan || (formData.plan === 'another' && !formData.subService))) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            transition: 'all 0.3s'
                        }}
                    >
                        {t.work.next} <ChevronRight size={20} />
                    </button>
                ) : (
                    <button
                        onClick={handleFinalSubmit}
                        disabled={loading || !formData.name || !formData.email}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                            color: 'white',
                            border: 'none',
                            cursor: (loading || !formData.name || !formData.email) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            opacity: (loading || !formData.name || !formData.email) ? 0.7 : 1
                        }}
                    >
                        <Send size={20} /> {loading ? 'Enviando...' : t.ticket.send}
                    </button>
                )}
            </div>
        </div>
    );
};

export default PriceCalculator;
