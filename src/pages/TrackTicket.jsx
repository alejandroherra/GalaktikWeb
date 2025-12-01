import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const TrackTicket = () => {
    const { t } = useLanguage();
    const [ticketId, setTicketId] = useState('');
    const [ticketData, setTicketData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!ticketId.trim()) return;

        setLoading(true);
        setError('');
        setTicketData(null);

        try {
            const docRef = doc(db, "tickets", ticketId.trim());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTicketData(docSnap.data());
            } else {
                setError(t.track.notFound);
            }
        } catch (err) {
            console.error("Error fetching ticket:", err);
            setError(t.track.error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'text-yellow-400';
            case 'in review': return 'text-blue-400';
            case 'closed': return 'text-green-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return <Clock size={48} className="text-yellow-400" />;
            case 'in review': return <Search size={48} className="text-blue-400" />;
            case 'closed': return <CheckCircle size={48} className="text-green-400" />;
            default: return <AlertCircle size={48} className="text-gray-400" />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100vh', width: '100%' }}
        >
            <SEO
                title="Rastrear Ticket"
                description="Rastrea el estado de tu solicitud o ticket. Ingresa tu número de ticket para ver el progreso de tu proyecto."
                keywords="rastrear ticket, seguimiento proyecto, estado solicitud, tracking"
            />
            <div className="container" style={{ maxWidth: '600px' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        {t.track.title} <span className="gradient-text">{t.track.titleHighlight}</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.track.desc}</p>
                </div>

                <div style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '24px',
                    padding: '2rem'
                }}>
                    <form onSubmit={handleSearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                        <input
                            type="text"
                            value={ticketId}
                            onChange={(e) => setTicketId(e.target.value)}
                            placeholder={t.track.placeholder}
                            style={{
                                flex: '1 1 250px',
                                minWidth: '250px',
                                padding: '1rem',
                                borderRadius: '12px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid var(--card-border)',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                flex: '1 1 auto',
                                minWidth: '150px'
                            }}
                        >
                            {loading ? t.track.searching : <><Search size={20} /> {t.track.btn}</>}
                        </button>
                    </form>

                    {error && (
                        <div style={{
                            padding: '1rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '12px',
                            color: '#fca5a5',
                            textAlign: 'center',
                            marginBottom: '1rem'
                        }}>
                            {error}
                        </div>
                    )}

                    {ticketData && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ marginBottom: '1.5rem' }}>
                                {getStatusIcon(ticketData.status)}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {t.track.status}: <span className={getStatusColor(ticketData.status)}>{ticketData.status}</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                {t.track.lastUpdate}: {ticketData.updatedAt ? new Date(ticketData.updatedAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                            </p>

                            <div style={{
                                textAlign: 'left',
                                background: 'rgba(255, 255, 255, 0.03)',
                                padding: '1.5rem',
                                borderRadius: '16px'
                            }}>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{t.track.ticketId}</p>
                                <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>{ticketId}</p>

                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{t.track.client}</p>
                                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{ticketData.name}</p>

                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{t.track.details}</p>
                                <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>{ticketData.message || ticketData.role}</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TrackTicket;
