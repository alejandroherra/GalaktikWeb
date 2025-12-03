import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/index.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for performance
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

// Loading component
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
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/social" element={<Social />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/work-with-us" element={<WorkWithUs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/track" element={<TrackTicket />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin={true}>
            <Admin />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
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
                <Suspense fallback={<PageLoader />}>
                  <AnimatedRoutes />
                </Suspense>
              </div>
            </Router>
          </AuthProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
