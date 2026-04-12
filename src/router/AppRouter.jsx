import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import Layout from '../components/layout/Layout';
import AuthLayout from '../components/layout/AuthLayout';

// Page Loader
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-accent">
    <div className="flex flex-col items-center gap-4">
      <svg className="animate-spin h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p className="text-brand-primary font-medium text-sm">Loading...</p>
    </div>
  </div>
);

// Lazy load public pages
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const Features = lazy(() => import('../pages/Features'));
const CarRental = lazy(() => import('../pages/CarRental'));
const CarDetails = lazy(() => import('../pages/CarDetails'));
const CarBooking = lazy(() => import('../pages/CarBooking'));
const DriverBooking = lazy(() => import('../pages/DriverBooking'));
const HireDriver = lazy(() => import('../pages/HireDriver'));
const Packages = lazy(() => import('../pages/Packages'));
const TourDetails = lazy(() => import('../pages/TourDetails'));
const PackageBooking = lazy(() => import('../pages/PackageBooking'));
const Booking = lazy(() => import('../pages/Booking'));
const Payment = lazy(() => import('../pages/Payment'));
const AdvancePayment = lazy(() => import('../pages/AdvancePayment'));
const CancelBooking = lazy(() => import('../pages/CancelBooking'));
const MyBookings = lazy(() => import('../pages/MyBookings'));
const MyProfile = lazy(() => import('../pages/MyProfile'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const NotFound = lazy(() => import('../pages/NotFound'));

// New pages
const Gallery = lazy(() => import('../pages/Gallery'));
const Blog = lazy(() => import('../pages/Blog'));
const FAQ = lazy(() => import('../pages/FAQ'));
const Offers = lazy(() => import('../pages/Offers'));
const TestimonialsPage = lazy(() => import('../pages/TestimonialsPage'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const BookingConfirmation = lazy(() => import('../pages/BookingConfirmation'));
const MyWishlist = lazy(() => import('../pages/MyWishlist'));
const MyReviews = lazy(() => import('../pages/MyReviews'));
const Notifications = lazy(() => import('../pages/Notifications'));
const OTPVerify = lazy(() => import('../pages/OTPVerify'));
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));

// Lazy load admin pages
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminBookings = lazy(() => import('../pages/admin/AdminBookings'));
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers'));
const AdminTours = lazy(() => import('../pages/admin/AdminTours'));
const AdminFleet = lazy(() => import('../pages/admin/AdminFleet'));
const AdminPayments = lazy(() => import('../pages/admin/AdminPayments'));
const AdminReviews = lazy(() => import('../pages/admin/AdminReviews'));

const router = createBrowserRouter([
  // ─── ADMIN ROUTES (no public navbar/footer) ───
  {
    path: '/admin',
    element: <Suspense fallback={<PageLoader />}><AdminRoute><AdminLayout /></AdminRoute></Suspense>,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense> },
      { path: 'bookings', element: <Suspense fallback={<PageLoader />}><AdminBookings /></Suspense> },
      { path: 'users', element: <Suspense fallback={<PageLoader />}><AdminUsers /></Suspense> },
      { path: 'tours', element: <Suspense fallback={<PageLoader />}><AdminTours /></Suspense> },
      { path: 'fleet', element: <Suspense fallback={<PageLoader />}><AdminFleet /></Suspense> },
      { path: 'payments', element: <Suspense fallback={<PageLoader />}><AdminPayments /></Suspense> },
      { path: 'reviews', element: <Suspense fallback={<PageLoader />}><AdminReviews /></Suspense> },
    ],
  },

  // ─── PUBLIC ROUTES (with navbar + footer) ───
  {
    path: '/',
    element: <Layout />,
    children: [
      // Public pages
      { index: true, element: <Suspense fallback={<PageLoader />}><Home /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> },
      { path: 'features', element: <Suspense fallback={<PageLoader />}><Features /></Suspense> },
      { path: 'car-rental', element: <Suspense fallback={<PageLoader />}><CarRental /></Suspense> },
      { path: 'car-rental/:id', element: <Suspense fallback={<PageLoader />}><CarDetails /></Suspense> },
      { path: 'hire-driver', element: <Suspense fallback={<PageLoader />}><HireDriver /></Suspense> },
      { path: 'packages', element: <Suspense fallback={<PageLoader />}><Packages /></Suspense> },
      { path: 'tour/:id', element: <Suspense fallback={<PageLoader />}><TourDetails /></Suspense> },
      { path: 'gallery', element: <Suspense fallback={<PageLoader />}><Gallery /></Suspense> },
      { path: 'testimonials', element: <Suspense fallback={<PageLoader />}><TestimonialsPage /></Suspense> },
      { path: 'blog', element: <Suspense fallback={<PageLoader />}><Blog /></Suspense> },
      { path: 'faq', element: <Suspense fallback={<PageLoader />}><FAQ /></Suspense> },
      { path: 'offers', element: <Suspense fallback={<PageLoader />}><Offers /></Suspense> },

      // Protected user routes
      { path: 'booking', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><Booking /></ProtectedRoute></Suspense> },
      { path: 'book/car/:id', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><CarBooking /></ProtectedRoute></Suspense> },
      { path: 'book/driver/:id', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><DriverBooking /></ProtectedRoute></Suspense> },
      { path: 'book/package/:id', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><PackageBooking /></ProtectedRoute></Suspense> },
      { path: 'payment', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><Payment /></ProtectedRoute></Suspense> },
      { path: 'payment/advance', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><AdvancePayment /></ProtectedRoute></Suspense> },
      { path: 'booking/cancel/:id', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><CancelBooking /></ProtectedRoute></Suspense> },
      { path: 'booking/success', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><BookingConfirmation /></ProtectedRoute></Suspense> },
      { path: 'my-bookings', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><MyBookings /></ProtectedRoute></Suspense> },
      { path: 'my-wishlist', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><MyWishlist /></ProtectedRoute></Suspense> },
      { path: 'my-reviews', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><MyReviews /></ProtectedRoute></Suspense> },
      { path: 'notifications', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><Notifications /></ProtectedRoute></Suspense> },
      { path: 'profile', element: <Suspense fallback={<PageLoader />}><ProtectedRoute><MyProfile /></ProtectedRoute></Suspense> },
    ],
  },

  // ─── AUTH ROUTES (no navbar/footer) ───
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Suspense fallback={<PageLoader />}><Login /></Suspense> },
      { path: '/signin', element: <Suspense fallback={<PageLoader />}><SignIn /></Suspense> },
      { path: '/signup', element: <Suspense fallback={<PageLoader />}><SignUp /></Suspense> },
      { path: '/register', element: <Suspense fallback={<PageLoader />}><Register /></Suspense> },
      { path: '/forgot-password', element: <Suspense fallback={<PageLoader />}><ForgotPassword /></Suspense> },
      { path: '/otp-verify', element: <Suspense fallback={<PageLoader />}><OTPVerify /></Suspense> },
    ],
  },

  // ─── 404 ───
  { path: '*', element: <Suspense fallback={<PageLoader />}><NotFound /></Suspense> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
