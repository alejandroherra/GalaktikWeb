import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const FAQ = () => {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: t.faq.q1,
            answer: t.faq.a1
        },
        {
            question: t.faq.q2,
            answer: t.faq.a2
        },
        {
            question: t.faq.q3,
            answer: t.faq.a3
        },
        {
            question: t.faq.q4,
            answer: t.faq.a4
        },
        {
            question: t.faq.q5,
            answer: t.faq.a5
        },
        {
            question: t.faq.q6,
            answer: t.faq.a6
        },
        {
            question: t.faq.q7,
            answer: t.faq.a7
        },
        {
            question: t.faq.q8,
            answer: t.faq.a8
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
        >
            <SEO
                title="Preguntas Frecuentes"
                description="Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de diseño web, precios, tiempos de entrega y métodos de pago."
                keywords="faq, preguntas frecuentes, diseño web costa rica, precios, soporte"
            />
            <div
                style={{ paddingTop: 'calc(var(--nav-height) + 2rem)', minHeight: '100vh', width: '100%' }}
            >
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                            {t.faq.title} <span className="gradient-text">{t.faq.titleHighlight}</span>
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>{t.faq.desc}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    background: 'var(--card-bg)',
                                    border: '1px solid var(--card-border)',
                                    borderRadius: '16px',
                                    overflow: 'hidden'
                                }}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    style={{
                                        width: '100%',
                                        padding: '1.5rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        textAlign: 'left',
                                        fontSize: '1.1rem',
                                        fontWeight: '600'
                                    }}
                                >
                                    {faq.question}
                                    {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                                </button>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openIndex === index ? 'auto' : 0,
                                        opacity: openIndex === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{ overflow: 'hidden' }}
                                >
                                    <div style={{
                                        padding: '0 1.5rem 1.5rem 1.5rem',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.6'
                                    }}>
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FAQ;
