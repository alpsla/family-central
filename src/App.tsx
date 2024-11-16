// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuthStore } from './lib/store/auth';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import FeatureGrid from './components/FeatureGrid';
// import Footer from './components/Footer';
// import AuthPage from './pages/auth/AuthPage';
// import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
// import VerifyEmailPage from './pages/auth/VerifyEmailPage';
// import VerifyPendingPage from './pages/auth/VerifyPendingPage';
// import AuthGuard from './components/auth/AuthGuard';
// import HomePage from './pages/HomePage';
// import DevVerificationStatus from './components/DevVerificationStatus';
// import { Heart, Users, Film, Shield, Bell, Utensils } from 'lucide-react';

// const features = [
//   {
//     icon: Heart,
//     title: 'Health Tracking',
//     description: 'Track health records, medications, and caregiving schedules'
//   },
//   {
//     icon: Utensils,
//     title: 'Meal Planning',
//     description: 'Plan meals, share recipes, and manage dietary preferences'
//   },
//   {
//     icon: Film,
//     title: 'Entertainment',
//     description: 'Organize family activities and manage shared entertainment'
//   },
//   {
//     icon: Users,
//     title: 'Community',
//     description: 'Connect with other families and share experiences'
//   },
//   {
//     icon: Bell,
//     title: 'Smart Notifications',
//     description: 'Stay updated with important family events and tasks'
//   },
//   {
//     icon: Shield,
//     title: 'Advanced Security',
//     description: 'Keep your family data safe with enterprise-grade security'
//   }
// ];

// export default function App() {
//   const { isAuthenticated, user } = useAuthStore();

//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/auth" element={
//               <AuthGuard>
//                 <AuthPage />
//               </AuthGuard>
//             } />
//             <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
//             <Route path="/verify-email" element={<VerifyEmailPage />} />
//             <Route path="/auth/verify-pending" element={<VerifyPendingPage />} />

//             {/* Landing Page or Dashboard */}
//             <Route
//               path="/"
//               element={
//                 isAuthenticated && user ? (
//                   <AuthGuard requireAuth>
//                     <HomePage />
//                   </AuthGuard>
//                 ) : (
//                   <div className="landing-page">
//                     <Hero />
//                     <div className="container mx-auto px-4">
//                       <FeatureGrid features={features} />
//                     </div>
//                   </div>
//                 )
//               }
//             />

//             {/* Protected Routes */}
//             <Route
//               path="/dashboard"
//               element={
//                 <AuthGuard requireAuth>
//                   <HomePage />
//                 </AuthGuard>
//               }
//             />

//             {/* Redirect all other routes to home */}
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </main>
//         <Footer />
//         <DevVerificationStatus />
//       </div>
//     </Router>
//   );
// }