import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const FloatingChat = () => {
    const { t } = useLanguage();

    return (
        <motion.a
            href="https://wa.me/50664355247"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                left: '2rem',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                background: 'rgba(37, 211, 102, 0.9)', // WhatsApp green with slight transparency
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                fontWeight: '600'
            }}
        >
            <MessageCircle size={24} />
            <span>{t.floatingChat}</span>
        </motion.a>
    );
};

export default FloatingChat;
