import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Bell, Users, Heart, Utensils, Film, Shield } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import Footer from './components/Footer';
import AuthPage from './pages/auth/AuthPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import VerifyPendingPage from './pages/auth/VerifyPendingPage';
import AuthGuard from './components/auth/AuthGuard';
import EmailTest from './components/EmailTest';
import DevVerificationStatus from './components/DevVerificationStatus';

const App = () => {
  const features = [
    {
      icon: Heart,
      title: 'Health Tracking',
      description: 'Track health records, medications, and caregiving schedules for your family.',
    },
    {
      icon: Utensils,
      title: 'Meal Planning',
      description: 'Plan meals, share recipes, and manage dietary preferences.',
    },
    {
      icon: Film,
      title: 'Entertainment',
      description: 'Organize family activities and manage shared entertainment.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other families and share experiences.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Stay updated with important family events and tasks.',
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: "Advanced security measures to protect your family's data.",
    },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <AuthGuard>
          <Navbar />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth/verify-pending" element={<VerifyPendingPage />} />
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <main className="container mx-auto px-4 py-12">
                    <FeatureGrid features={features} />
                  </main>
                </>
              }
            />
          </Routes>
          <Footer />
          
          {/* Development Tools */}
          {!import.meta.env.PROD && (
            <>
              <EmailTest />
              <DevVerificationStatus />
            </>
          )}
        </AuthGuard>
      </div>
    </Router>
  );
};

export default App;