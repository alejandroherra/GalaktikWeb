import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';

const WorkWithUs = () => {
    const { t } = useLanguage();
    const form = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'frontend',
        experience: '',
        salary: '',
        message: '',
        cv: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // EmailJS Configuration
        const serviceId = 'service_94lnmd2';
        const templateId = 'template_68chk8k';
        const publicKey = '9kzLpXGFgejAdL5eq';

        emailjs.sendForm(serviceId, templateId, form.current, publicKey)
            .then((result) => {
                console.log(result.text);
                alert(t.work.success);
                setFormData({
                    name: '',
                    email: '',
                    role: 'frontend',
                    experience: '',
                    salary: '',
                    message: '',
                    cv: ''
                });
            }, (error) => {
                console.error('EmailJS Error:', error);
                alert(`Error sending email: ${error.text || JSON.stringify(error)}`);
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100vh', width: '100%' }}
        >
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.work.title} <span className="gradient-text">{t.work.titleHighlight}</span></h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.work.desc}</p>
                </div>

                <form ref={form} onSubmit={handleSubmit} style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border)'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.name}</label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.email}</label>
                        <input
                            type="email"
                            name="user_email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.role}</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="custom-select"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="frontend">{t.work.roles.frontend}</option>
                            <option value="backend">{t.work.roles.backend}</option>
                            <option value="fullstack">{t.work.roles.fullstack}</option>
                            <option value="sales">{t.work.roles.sales}</option>
                        </select>
                        <style>{`
              .custom-select option {
                background: #1a1a1a;
                color: #000;
                padding: 0.75rem;
              }
              .custom-select option:hover {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
              }
              .custom-select option:checked {
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
              }
            `}</style>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.experience}</label>
                        <textarea
                            rows="3"
                            name="experience"
                            required
                            placeholder={t.work.experiencePlaceholder}
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.salary}</label>
                        <input
                            type="text"
                            name="salary"
                            required
                            placeholder={t.work.salaryPlaceholder}
                            value={formData.salary}
                            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.message}</label>
                        <textarea
                            rows="3"
                            name="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.cv}</label>
                        <input
                            type="url"
                            name="cv"
                            placeholder={t.work.cvPlaceholder}
                            value={formData.cv}
                            onChange={(e) => setFormData({ ...formData, cv: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Send size={18} /> {t.work.submit}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default WorkWithUs;
