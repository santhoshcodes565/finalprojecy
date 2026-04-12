import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy loading public pages
const Home = React.lazy(() => import('./pages/Home.jsx'));
const Features = React.lazy(() => import('./pages/Features.jsx'));
const About = React.lazy(() => import('./pages/About.jsx'));
const Contact = React.lazy(() => import('./pages/Contact.jsx'));
const SignIn = React.lazy(() => import('./pages/SignIn.jsx'));
const SignUp = React.lazy(() => import('./pages/SignUp.jsx'));
const Packages = React.lazy(() => import('./pages/Packages.jsx'));
const TourDetails = React.lazy(() => import('./pages/TourDetails.jsx'));
const CarRental = React.lazy(() => import('./pages/CarRental.jsx'));
const CarDetails = React.lazy(() => import('./pages/CarDetails.jsx'));
const HireDriver = React.lazy(() => import('./pages/HireDriver.jsx'));
const Booking = React.lazy(() => import('./pages/Booking.jsx'));
const PackageBooking = React.lazy(() => import('./pages/PackageBooking.jsx'));
const CarBooking = React.lazy(() => import('./pages/CarBooking.jsx'));
const DriverBooking = React.lazy(() => import('./pages/DriverBooking.jsx'));
const Payment = React.lazy(() => import('./pages/Payment.jsx'));
const MyBookings = React.lazy(() => import('./pages/MyBookings.jsx'));
const MyProfile = React.lazy(() => import('./pages/MyProfile.jsx'));
const NotFound = React.lazy(() => import('./pages/NotFound.jsx'));

// Lazy load Admin Pages
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout.jsx'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const AdminBookings = React.lazy(() => import('./pages/admin/AdminBookings.jsx'));
const AdminUsers = React.lazy(() => import('./pages/admin/AdminUsers.jsx'));
const AdminTours = React.lazy(() => import('./pages/admin/AdminTours.jsx'));
const AdminFleet = React.lazy(() => import('./pages/admin/AdminFleet.jsx'));
const AdminPayments = React.lazy(() => import('./pages/admin/AdminPayments.jsx'));
const AdminReviews = React.lazy(() => import('./pages/admin/AdminReviews.jsx'));

// Scroll setup
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// Loading spinner
const LoadingFallback = () => (
  <div className="min-h-screen bg-brand-primary flex flex-col items-center justify-center">
    <div className="w-20 h-20 bg-brand-secondary rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-6 animate-pulse shadow-md">SLT</div>
    <div className="flex gap-2">
      <div className="w-3 h-3 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="w-3 h-3 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-3 h-3 bg-brand-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    </div>
    <p className="text-brand-accent mt-8 font-sans tracking-widest text-sm uppercase opacity-70">Preparing your journey...</p>
  </div>
);

// Public Layout (Navbar + Footer)
const PublicLayout = () => (
  <>
    <Navbar />
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
    <Footer />
  </>
);

// Protected Admin Route
const AdminRoute = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingFallback />;
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/signin" replace />;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <AdminLayout />
    </Suspense>
  );
};

// Protected User Route (login required)
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to="/signin" replace />;
  return <Outlet />;
};

export default function App() {
  console.log("App.jsx is running with explicit admin routes");
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: { fontFamily: '"DM Sans", sans-serif', background: '#333', color: '#fff' },
            success: {
              style: { background: 'var(--color-brand-primary)', border: '1px solid var(--color-brand-secondary)' },
              iconTheme: { primary: 'var(--color-brand-secondary)', secondary: 'var(--color-brand-accent)' },
            },
          }} 
        />

        {/* WhatsApp button */}
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all z-[999]"
          aria-label="Contact us on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.562 0 5.826-4.738 10.564-10.564 10.564z" fillRule="evenodd" clipRule="evenodd"/>
          </svg>
        </a>

        <Routes>
          {/* ADMIN ROUTES — Flat structure to avoid wildcard conflicts */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="tours" element={<AdminTours />} />
            <Route path="fleet" element={<AdminFleet />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="features" element={<Features />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="login" element={<Navigate to="/signin" replace />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="packages" element={<Packages />} />
            <Route path="packages/:id" element={<TourDetails />} />
            <Route path="car-rental" element={<CarRental />} />
            <Route path="car-rental/:id" element={<CarDetails />} />
            <Route path="hire-driver" element={<HireDriver />} />

            {/* Protected user routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="booking" element={<Booking />} />
              <Route path="booking/package/:id" element={<PackageBooking />} />
              <Route path="booking/car/:id" element={<CarBooking />} />
              <Route path="booking/driver" element={<DriverBooking />} />
              <Route path="payment" element={<Payment />} />
              <Route path="my-bookings" element={<MyBookings />} />
              <Route path="my-profile" element={<MyProfile />} />
            </Route>
          </Route>

          {/* 404 — MUST be at top level, not inside any layout */}
          <Route path="*" element={<PublicLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
