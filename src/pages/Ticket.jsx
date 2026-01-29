import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import PriceCalculator from '../components/PriceCalculator';
import { useAuth } from '../context/AuthContext';

const Ticket = () => {
    const { t } = useLanguage();
    const { user, userData } = useAuth();
    const [loading, setLoading] = useState(false);

    const generateTicketId = () => {
        return 'REQ-' + Math.floor(1000 + Math.random() * 9000);
    };

    const handleSubmit = async (data) => {
        setLoading(true);

        const ticketId = generateTicketId();

        // Map plan ID to details
        const planDetails = {
            basic: { name: 'Básico', price: '$149' },
            starter: { name: 'Personalizado', price: '$299' },
            pro: { name: 'Profesional', price: '$1099' },
            another: { name: 'Otro Servicio', price: 'Cotizar' }
        };

        const subServiceDetails = {
            ai: { name: 'Integración IA', price: 'Cotizar' },
            maintenance: { name: 'Mantenimiento Mensual', price: '$29.99/mes' },
            upgrade: { name: 'Actualización Tecnológica', price: 'Cotizar' }
        };

        let selectedPlan = planDetails[data.plan] || { name: data.plan, price: '?' };
        let planDescription = `${selectedPlan.name} (${selectedPlan.price})`;
        let estimatedTotal = selectedPlan.price;

        if (data.plan === 'another' && data.subService) {
            const sub = subServiceDetails[data.subService];
            if (sub) {
                planDescription = `${sub.name} (${sub.price})`;
                estimatedTotal = sub.price;
            }
        }

        try {
            // 1. Save to Firestore
            await setDoc(doc(db, "tickets", ticketId), {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.details,
                websiteUrl: data.websiteUrl,
                plan: planDescription,
                estimatedTotal: estimatedTotal,
                userId: user?.uid || null,
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
                user_name: data.name,
                user_phone: data.phone,
                user_email: data.email,
                to_email: data.email,
                reply_to: data.email,
                plan: planDescription,
                message: `Total Estimado: ${estimatedTotal}\n\nDetalles del Proyecto: ${data.details}`,
                website_url: data.websiteUrl || 'N/A',
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
                title="Cotizador Interactivo - Precios desde $149"
                description="Calcula el precio de tu sitio web en tiempo real. Planes desde $149. Diseño web profesional en Costa Rica."
                keywords="cotizador web, precios paginas web, cuanto cuesta una pagina web, diseño web costa rica"
            />
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.1 }}>
                        {t.ticket.title} <span className="gradient-text">{t.ticket.titleHighlight}</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.ticket.desc}</p>

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

                <PriceCalculator onSubmit={handleSubmit} loading={loading} t={t} />
            </div>
        </motion.div>
    );
};

export default Ticket;
