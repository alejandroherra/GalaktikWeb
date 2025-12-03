import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';

const WorkWithUs = () => {
    const { t } = useLanguage();
    const { user, userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [cv, setCv] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'frontend',
        experience: '',
        salary: '',
        message: ''
    });

    const generateTicketId = () => {
        return 'JOB-' + Math.floor(1000 + Math.random() * 9000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const ticketId = generateTicketId();

        try {
            // 1. Save to Firestore
            await setDoc(doc(db, "tickets", ticketId), {
                ...formData,
                cv: cv,
                status: 'Pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                type: 'Job Application'
            });

            // 2. Send Email
            const serviceId = 'service_94lnmd2';
            const templateId = 'template_68chk8k';
            const publicKey = '9kzLpXGFgejAdL5eq';

            const templateParams = {
                user_name: formData.name,
                user_email: formData.email,
                to_email: formData.email,
                reply_to: formData.email,
                role: formData.role,
                experience: formData.experience,
                salary: formData.salary,
                message: formData.message,
                cv: cv,
                ticket_id: ticketId
            };

            await emailjs.send(serviceId, templateId, templateParams, publicKey);

            // 3. Send Confirmation Email to User
            const confirmationTemplateId = 'template_66k49yn';
            await emailjs.send(serviceId, confirmationTemplateId, templateParams, publicKey);

            // 3. Success
            Swal.fire({
                title: '✅ ' + t.work.success,
                html: `
                    <div style="text-align: center; padding: 1rem;">
                        <p style="font-size: 1.1rem; margin-bottom: 1rem;">${t.work.successTitle}</p>
                        <div style="background: rgba(99, 102, 241, 0.1); padding: 1rem; border-radius: 12px; margin-bottom: 1rem;">
                            <p style="font-size: 1.8rem; font-weight: bold; color: #818cf8; margin: 0;">${ticketId}</p>
                        </div>
                        <p style="color: #fbbf24; font-weight: 600; margin-bottom: 0.5rem;">${t.work.screenshotReminder}</p>
                        <p style="font-size: 0.9rem; color: #9ca3af;">${t.work.trackReminder}</p>
                    </div>
                `,
                icon: 'success',
                confirmButtonText: t.work.understood,
                confirmButtonColor: '#6366f1',
                background: '#1a1b2e',
                color: '#fff',
                width: '500px'
            });

            setFormData({
                name: '',
                email: '',
                role: 'frontend',
                experience: '',
                salary: '',
                message: ''
            });
            setCv('');

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
                title="Trabaja con Nosotros"
                description="Únete a nuestro equipo de desarrolladores y diseñadores web. Envía tu CV y forma parte de Galaktik."
                keywords="empleo diseño web, trabajo desarrollador, unirse equipo, cv desarrollador web"
            />
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.work.title} <span className="gradient-text">{t.work.titleHighlight}</span></h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.work.desc}</p>

                    {user ? (
                        <div style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#4ade80',
                            borderRadius: '20px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <span>●</span> {t.ticket.loggedIn} {userData?.name || user.email}
                        </div>
                    ) : (
                        <div style={{
                            marginTop: '1rem',
                            padding: '0.5rem 1rem',
                            background: 'rgba(251, 191, 36, 0.1)',
                            color: '#fbbf24',
                            borderRadius: '20px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem'
                        }}>
                            <span>●</span> {t.ticket.notLoggedIn}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{
                    background: 'var(--card-bg)',
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '1px solid var(--card-border)'
                }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.name}</label>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.email}</label>
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
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.role}</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
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
                            <option value="frontend" style={{ background: '#1a1b2e' }}>{t.work.roles.frontend}</option>
                            <option value="backend" style={{ background: '#1a1b2e' }}>{t.work.roles.backend}</option>
                            <option value="fullstack" style={{ background: '#1a1b2e' }}>{t.work.roles.fullstack}</option>
                            <option value="sales" style={{ background: '#1a1b2e' }}>{t.work.roles.sales}</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>{t.work.experience}</label>
                        <textarea
                            rows="3"
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
                            placeholder={t.work.cvPlaceholder}
                            value={cv}
                            onChange={(e) => setCv(e.target.value)}
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

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Send size={18} /> {loading ? 'Enviando...' : t.work.submit}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default WorkWithUs;
