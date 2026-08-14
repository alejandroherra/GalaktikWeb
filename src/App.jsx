import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import WhatsAppButton from './components/WhatsAppButton';
import './styles/index.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const Mainpage = lazy(() => import('./pages/Mainpage'));

const Home = lazy(() => import('./pages/Home'));
const Ticket = lazy(() => import('./pages/Ticket'));
const Social = lazy(() => import('./pages/Social'));
const WorkWithUs = lazy(() => import('./pages/WorkWithUs'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Support = lazy(() => import('./pages/Support'));
const TrackTicket = lazy(() => import('./pages/TrackTicket'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Homedos = lazy(() => import('./pages/Homedos'));
const Cotizar = lazy(() => import('./pages/Cotizar'));
const SobreNosotros = lazy(() => import('./pages/SobreNosotros'));
const Contact = lazy(() => import('./pages/Contact'));

const PageLoader = () => (
  <div style={{
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-primary)'
  }}>
    <div className="loader" style={{
      width: '50px',
      height: '50px',
      border: '3px solid rgba(255,255,255,0.1)',
      borderRadius: '50%',
      borderTopColor: 'var(--accent-primary)',
      animation: 'spin 1s ease-in-out infinite'
    }} />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Suspense fallback={<PageLoader />}><Mainpage /></Suspense>} />
        <Route path="/websites" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
        <Route path="/software-a-medida" element={<Suspense fallback={<PageLoader />}><Homedos /></Suspense>} />
        <Route path="/software-a-medida/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
        <Route path="/software-a-medida/cotizar" element={<Suspense fallback={<PageLoader />}><Cotizar /></Suspense>} />
        <Route path="/software-a-medida/track" element={<Suspense fallback={<PageLoader />}><TrackTicket /></Suspense>} />
        <Route path="/ticket" element={<Suspense fallback={<PageLoader />}><Ticket /></Suspense>} />
        <Route path="/social" element={<Suspense fallback={<PageLoader />}><Social /></Suspense>} />
        <Route path="/faq" element={<Suspense fallback={<PageLoader />}><FAQ /></Suspense>} />
        <Route path="/work-with-us" element={<Suspense fallback={<PageLoader />}><WorkWithUs /></Suspense>} />
        <Route path="/support" element={<Suspense fallback={<PageLoader />}><Support /></Suspense>} />
        <Route path="/track" element={<Suspense fallback={<PageLoader />}><TrackTicket /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
        <Route path="/verify-email" element={<Suspense fallback={<PageLoader />}><VerifyEmail /></Suspense>} />

        <Route path="/dashboard" element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Suspense>
        } />
        <Route path="/admin" element={
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute requireAdmin={true}>
              <Admin />
            </ProtectedRoute>
          </Suspense>
        } />

        <Route path="/sobre-nosotros" element={<Suspense fallback={<PageLoader />}><SobreNosotros /></Suspense>} />
        <Route path="/contacto" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
        <Route path="/portfolio" element={<Suspense fallback={<PageLoader />}><Portfolio /></Suspense>} />

        <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <LanguageProvider>
          <AuthProvider>
            <Router>
              <div className="app">
                <Navbar />
                <AnimatedRoutes />
                <WhatsAppButton />
              </div>
            </Router>
          </AuthProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;