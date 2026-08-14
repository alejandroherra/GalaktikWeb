import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Briefcase, DollarSign, FileText, Link as LinkIcon, ChevronRight, ChevronLeft, Send } from 'lucide-react';

const WorkWithUsForm = ({ onSubmit, loading, t }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'frontend',
        experience: '',
        salary: '',
        message: '',
        cv: ''
    });

    const totalSteps = 4;

    const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <div style={{
            background: 'rgba(30, 41, 59, 0.7)', // Darker, less transparent for performance
            backdropFilter: 'blur(10px)', // Reduced blur
            borderRadius: '24px',
            padding: '3rem 2rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: '700px',
            margin: '0 auto',
            minHeight: '500px',
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
                        transition={{ duration: 0.5 }}
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
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
                            transition={{ duration: 0.3 }}
                        >
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{t.work.roleTitle}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {['frontend', 'backend', 'fullstack', 'sales'].map(role => (
                                    <div
                                        key={role}
                                        onClick={() => handleChange('role', role)}
                                        style={{
                                            padding: '1.5rem',
                                            borderRadius: '16px',
                                            border: formData.role === role ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                                            background: formData.role === role ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'transform 0.2s ease, border-color 0.2s ease'
                                        }}
                                    >
                                        <Briefcase size={24} style={{ marginBottom: '0.5rem', color: formData.role === role ? '#818cf8' : 'var(--text-secondary)' }} />
                                        <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{t.work.roles[role]}</div>
                                    </div>
                                ))}
                            </div>
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
                            transition={{ duration: 0.3 }}
                        >
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{t.work.aboutTitle}</h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.work.name}</label>
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
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.work.email}</label>
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
                            transition={{ duration: 0.3 }}
                        >
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{t.work.expTitle}</h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.work.experience}</label>
                                <textarea
                                    rows="3"
                                    value={formData.experience}
                                    onChange={(e) => handleChange('experience', e.target.value)}
                                    placeholder={t.work.experiencePlaceholder}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
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
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.work.salary}</label>
                                <div style={{ position: 'relative' }}>
                                    <DollarSign size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="text"
                                        value={formData.salary}
                                        onChange={(e) => handleChange('salary', e.target.value)}
                                        placeholder={t.work.salaryPlaceholder}
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

                    {step === 4 && (
                        <motion.div
                            key={4}
                            custom={step}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>{t.work.finalTitle}</h3>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.work.message}</label>
                                <textarea
                                    rows="3"
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    placeholder={t.work.moreInfo}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
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
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>{t.work.cv}</label>
                                <div style={{ position: 'relative' }}>
                                    <LinkIcon size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input
                                        type="url"
                                        value={formData.cv}
                                        onChange={(e) => handleChange('cv', e.target.value)}
                                        placeholder={t.work.cvPlaceholder}
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
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            background: '#6366f1',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600'
                        }}
                    >
                        {t.work.next} <ChevronRight size={20} />
                    </button>
                ) : (
                    <button
                        onClick={handleFinalSubmit}
                        disabled={loading}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '12px',
                            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: '600',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        <Send size={20} /> {loading ? 'Enviando...' : t.work.submit}
                    </button>
                )}
            </div>
        </div>
    );
};

export default WorkWithUsForm;
