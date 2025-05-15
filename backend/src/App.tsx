import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Sidebar from './components/Sidebar';

import Dashboard from './pages/Dashboard';
import VulnerabilityScan from './pages/VulnerabilityScan';
import NetworkMap from './pages/NetworkMap';
import UserEnumeration from './pages/UserEnumeration';
import Settings from './pages/Settings';
import Exploitation from './pages/Exploitation';
import NetworkScan from './pages/NetworkScan';
import Reports from './pages/Reports';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
	<Route path="/network-scan" element={<PageWrapper><NetworkScan /></PageWrapper>} />
        <Route path="/vulnerability-scan" element={<PageWrapper><VulnerabilityScan /></PageWrapper>} />
        <Route path="/network-map" element={<PageWrapper><NetworkMap /></PageWrapper>} />
        <Route path="/user-enumeration" element={<PageWrapper><UserEnumeration /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
        <Route path="/exploitation" element={<PageWrapper><Exploitation /></PageWrapper>} />
        
        <Route path="/reports" element={<PageWrapper><Reports /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-6 overflow-auto">
          <AnimatedRoutes />
        </div>
      </div>
    
  );
}

export default App;
