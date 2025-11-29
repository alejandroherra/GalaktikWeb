import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';

const Ticket = () => {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const selectedPlan = searchParams.get('plan') || 'starter';
    const form = useRef();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        plan: selectedPlan,
        message: ''
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
                alert(t.ticket.success);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    plan: 'starter',
                    message: ''
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
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.ticket.title} <span className="gradient-text">{t.ticket.titleHighlight}</span></h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.ticket.desc}</p>
                </div>

                <form ref={form} onSubmit={handleSubmit} style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border)'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.ticket.name}</label>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.ticket.phone}</label>
                        <input
                            type="tel"
                            name="user_phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.ticket.email}</label>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.ticket.plan}</label>
                        <select
                            name="plan"
                            value={formData.plan}
                            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
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
                            <option value="starter">{t.ticket.starterPlan}</option>
                            <option value="pro">{t.ticket.proPlan}</option>
                            <option value="maintenance">{t.ticket.maintenance}</option>
                            <option value="upgrade">{t.ticket.upgrade}</option>
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

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.ticket.details}</label>
                        <textarea
                            rows="4"
                            name="message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder={t.ticket.detailsPlaceholder}
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

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Send size={18} /> {t.ticket.send}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Ticket;
