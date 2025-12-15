import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Customer Development Landing Page (Primary)
import CustomerDevLanding from './pages/CustomerDevLanding';
import SimpleHeader from './components/CustomerDev/SimpleHeader';
import SimpleFooter from './components/CustomerDev/SimpleFooter';

// Admin routes (keep for logging and iteration tracking)
import ContactFormDashboard from './components/ContactFormDashboard';
import AdminDashboard from './components/AdminDashboard';
import DatabaseChecker from './components/DatabaseChecker';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Routes>
            {/* Main Customer Development Landing Page */}
            <Route
              path="/"
              element={
                <>
                  <SimpleHeader />
                  <CustomerDevLanding />
                  <SimpleFooter />
                </>
              }
            />

            {/* Admin Routes (for iteration tracking) */}
            <Route path="/admin/contact-dashboard" element={<ContactFormDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/database" element={<DatabaseChecker />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;