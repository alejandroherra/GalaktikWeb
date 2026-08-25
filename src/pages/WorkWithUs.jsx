import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getFirebaseDb } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import WorkWithUsForm from '../components/WorkWithUsForm';

const WorkWithUs = () => {
    const { t } = useLanguage();
    const { user, userData } = useAuth();
    const [loading, setLoading] = useState(false);

    const generateTicketId = () => {
        return 'JOB-' + Math.floor(1000 + Math.random() * 9000);
    };

    const handleSubmit = async (data) => {
        setLoading(true);

        const ticketId = generateTicketId();

        try {
            const db = await getFirebaseDb();
            // 1. Save to Firestore
            await setDoc(doc(db, "tickets", ticketId), {
                ...data,
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
                user_name: data.name,
                user_email: data.email,
                to_email: data.email,
                reply_to: data.email,
                role: data.role,
                experience: data.experience,
                salary: data.salary,
                message: data.message,
                cv: data.cv,
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
                title="Únete al Equipo - Oportunidades 2026"
                description="Buscamos talento en desarrollo y diseño web. Aplica a nuestras vacantes con nuestro nuevo proceso interactivo."
                keywords="empleo desarrollo web, trabajo react, vacantes diseño web, galaktik careers"
            />
            <div className="container">
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

                <WorkWithUsForm onSubmit={handleSubmit} loading={loading} t={t} />
            </div>
        </motion.div>
    );
};

export default WorkWithUs;

