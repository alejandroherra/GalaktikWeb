import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Ticket from './pages/Ticket';
import Social from './pages/Social';
import WorkWithUs from './pages/WorkWithUs';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import './styles/index.css';

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
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Navbar />
          <AnimatedRoutes />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
