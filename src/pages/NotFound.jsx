import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem',
            background: 'var(--bg-primary)',
            color: 'white'
        }}>
            <SEO
                title="Página No Encontrada"
                description="La página que buscas no existe o ha sido movida."
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 style={{ fontSize: '6rem', fontWeight: 'bold', margin: 0, background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Página No Encontrada</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                    Lo sentimos, la página que estás buscando no existe o ha sido movida a otra dirección.
                </p>
                <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Home size={20} /> Volver al Inicio
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
