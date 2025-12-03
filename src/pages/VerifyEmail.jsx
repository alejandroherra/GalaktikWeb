import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, LogOut, Send } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const VerifyEmail = () => {
    const { user, logout, resendVerification } = useAuth();
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // If user is verified or not logged in, redirect
    if (!user) return <Navigate to="/login" />;

    const isSuperAdmin = user.email?.toLowerCase() === 'alejandrohs@live.com';
    if (user.emailVerified || isSuperAdmin) return <Navigate to="/dashboard" />;

    const handleResend = async () => {
        setSending(true);
        setMessage('');
        setError('');
        try {
            await resendVerification();
            setMessage('Verification email sent. Please check your inbox and spam folder.');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please wait a few minutes.');
            } else {
                setError('Error sending email. Please try again later.');
            }
        } finally {
            setSending(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                paddingTop: 'calc(var(--nav-height) + 2rem)',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div style={{
                background: 'var(--card-bg)',
                padding: '3rem',
                borderRadius: '24px',
                border: '1px solid var(--card-border)',
                width: '100%',
                maxWidth: '500px',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Mail size={40} color="#6366f1" />
                </div>

                <h1 style={{ marginBottom: '1rem' }}>Verify Your Email</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                    We have sent a confirmation link to <strong>{user.email}</strong>.<br />
                    Please click the link to activate your account and access the Dashboard.
                </p>

                {message && (
                    <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', borderRadius: '12px', marginBottom: '1.5rem' }}>
                        {message}
                    </div>
                )}

                {error && (
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '12px', marginBottom: '1.5rem' }}>
                        {error}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={handleResend}
                        disabled={sending}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        {sending ? 'Sending...' : 'Resend Verification Email'}
                        {!sending && <Send size={18} />}
                    </button>

                    <button
                        onClick={() => window.location.reload()}
                        className="btn btn-outline"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', borderColor: '#4ade80', color: '#4ade80' }}
                    >
                        I have verified my email
                    </button>

                    <button
                        onClick={logout}
                        className="btn btn-outline"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default VerifyEmail;
