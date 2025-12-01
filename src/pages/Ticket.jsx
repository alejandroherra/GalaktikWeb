import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Ticket = () => {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const selectedPlan = searchParams.get('plan') || 'starter';
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        plan: selectedPlan,
        message: ''
    });

    const generateTicketId = () => {
        return 'REQ-' + Math.floor(1000 + Math.random() * 9000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const ticketId = generateTicketId();

        try {
            // 1. Save to Firestore
            await setDoc(doc(db, "tickets", ticketId), {
                ...formData,
                status: 'Pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                type: 'Quote'
            });

            // 2. Send Email
            const serviceId = 'service_94lnmd2';
            const templateId = 'template_68chk8k';
            const publicKey = '9kzLpXGFgejAdL5eq';

            const templateParams = {
                user_name: formData.name,
                user_phone: formData.phone,
                user_email: formData.email,
                to_email: formData.email,
                reply_to: formData.email,
                plan: formData.plan,
                message: formData.message,
                ticket_id: ticketId
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            // 3. Send Confirmation Email to User
            const confirmationTemplateId = 'template_66k49yn';
            await emailjs.send(serviceId, confirmationTemplateId, templateParams, publicKey);

            // 3. Success
            Swal.fire({
                title: '✅ ' + t.ticket.success,
                html: `
                    <div style="text-align: center; padding: 1rem;">
                        <p style="font-size: 1.1rem; margin-bottom: 1rem;">${t.ticket.successTitle}</p>
                        <div style="background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: 12px; margin-bottom: 1rem;">
                            <p style="font-size: 1.8rem; font-weight: bold; color: #818cf8; margin: 0;">${ticketId}</p>
                        </div>
                        <p style="color: #fbbf24; font-weight: 600; margin-bottom: 0.5rem;">${t.ticket.screenshotReminder}</p>
                        <p style="font-size: 0.9rem; color: #9ca3af;">${t.ticket.trackReminder}</p>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: t.ticket.understood,
                confirmButtonColor: '#6366f1',
                background: '#1a1b2e',
                color: '#fff',
                width: '500px'
            });

            setFormData({
                name: '',
                phone: '',
                email: '',
                plan: selectedPlan,
                message: ''
            });

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al enviar tu solicitud. Por favor intenta de nuevo.',
                icon: 'error',
                confirmButtonColor: '#ef4444',
                background: '#1a1b2e',
                color: '#fff'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100vh', width: '100%' }}
        >
            <SEO
                title="Solicitar Cotización"
                description="Solicita una cotización personalizada para tu proyecto web. Ofrecemos planes desde $149 con entrega rápida y diseño profesional."
                keywords="cotización web, presupuesto web, solicitar diseño web, planes web costa rica"
            />
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.ticket.title} <span className="gradient-text">{t.ticket.titleHighlight}</span></h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.ticket.desc}</p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border)'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.ticket.name}</label>
                        <input
                            type="text"
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
                            value={formData.plan}
                            onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
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
                            <option value="basic" style={{ background: '#1a1b2e' }}>{t.ticket.basicPlan}</option>
                            <option value="starter" style={{ background: '#1a1b2e' }}>{t.ticket.starterPlan}</option>
                            <option value="pro" style={{ background: '#1a1b2e' }}>{t.ticket.proPlan}</option>
                            <option value="maintenance" style={{ background: '#1a1b2e' }}>{t.ticket.maintenance}</option>
                            <option value="upgrade" style={{ background: '#1a1b2e' }}>{t.ticket.upgrade}</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.ticket.details}</label>
                        <textarea
                            rows="4"
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

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Send size={18} /> {loading ? 'Enviando...' : t.ticket.send}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Ticket;
