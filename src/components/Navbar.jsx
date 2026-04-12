import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, User, Heart, Star, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch unread notification count
  useEffect(() => {
    if (!user) return;
    const fetchUnread = async () => {
      try {
        const res = await api.get('/notifications/unread-count');
        setUnreadCount(res.data.count || 0);
      } catch (e) {
        // Silently fail — notification count isn't critical
      }
    };
    fetchUnread();
    // Poll every 30 seconds
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Cars', to: '/car-rental' },
    { label: 'Drivers', to: '/hire-driver' },
    { label: 'Packages', to: '/packages' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav className={`w-full z-50 border-b border-gray-200 transition-all duration-300 ${scrolled ? 'fixed top-0 bg-white/95 backdrop-blur-md shadow-sm' : 'relative bg-[#FAFAFA]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-secondary flex items-center justify-center font-bold text-white rounded shadow-sm text-sm tracking-wider cursor-pointer hover:bg-[#a17525] transition-colors">SLT</div>
            <span className="font-display text-brand-primary text-[22px] font-bold tracking-tight hidden sm:block">Sri Lakshmi Travels</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-8 text-[15px] font-medium text-gray-500">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="hover:text-brand-secondary transition-colors pb-1">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3">

            {/* Notification Bell (logged-in users) */}
            {user && (
              <Link
                to="/notifications"
                className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                id="notification-bell"
              >
                <Bell className="w-5 h-5 text-gray-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            )}

            {/* Desktop Auth/Profile */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin/dashboard" className="text-sm text-purple-600 font-semibold hover:text-purple-800 transition-colors">Admin</Link>
                  )}

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-gray-600 hidden xl:block">{user.name?.split(' ')[0]}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>
                          <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                            <User className="w-4 h-4" /> My Profile
                          </Link>
                          <Link to="/my-bookings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                            <Star className="w-4 h-4" /> My Bookings
                          </Link>
                          <Link to="/my-wishlist" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                            <Heart className="w-4 h-4" /> Wishlist
                          </Link>
                          <Link to="/my-reviews" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                            <Star className="w-4 h-4" /> My Reviews
                          </Link>
                          <div className="border-t border-gray-100 mt-1 pt-1">
                            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 w-full">
                              <LogOut className="w-4 h-4" /> Logout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <Link to="/signin" className="text-sm text-brand-primary font-semibold hover:text-brand-secondary transition-colors">Login</Link>
              )}
              <Link to="/car-rental" className="px-6 py-2.5 rounded-lg bg-gradient-to-b from-[#ca9732] to-[var(--color-brand-secondary)] text-white text-sm font-semibold shadow-md hover:opacity-90 transition-all border border-[#9a7020]">Book Now</Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl p-6 overflow-y-auto" style={{ animation: 'slideIn 0.3s ease' }}>
            <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

            <div className="flex justify-end mb-6">
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/offers" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Offers</Link>
              <Link to="/blog" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Blog</Link>
              <Link to="/faq" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50">FAQ</Link>
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4">
              {user ? (
                <div className="space-y-1">
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50">My Profile</Link>
                  <Link to="/my-bookings" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50">My Bookings</Link>
                  <Link to="/notifications" onClick={() => setMobileOpen(false)} className="block px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-gray-50">
                    Notifications {unreadCount > 0 && <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">{unreadCount}</span>}
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 rounded-lg text-red-500 font-medium hover:bg-red-50">Logout</button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="/signin" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-3 rounded-lg text-brand-primary font-semibold border border-brand-primary hover:bg-brand-accent">Sign In</Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-3 rounded-lg bg-brand-secondary text-white font-semibold hover:opacity-90">Sign Up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}