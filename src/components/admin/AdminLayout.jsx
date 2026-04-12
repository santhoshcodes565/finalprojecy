import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Map, Car, CreditCard, LogOut, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/signin');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Tours', path: '/admin/tours', icon: Map },
    { name: 'Cars & Drivers', path: '/admin/fleet', icon: Car },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Reviews', path: '/admin/reviews', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-[var(--color-brand-primary)] text-white flex flex-col hidden md:flex">
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-brand-secondary)] rounded-lg flex items-center justify-center font-bold text-xl shadow-lg">SLT</div>
            <span className="font-display font-bold text-xl tracking-wider">ADMIN</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map((item) => (
             <NavLink
               key={item.path}
               to={item.path}
               className={({ isActive }) => 
                 `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                   isActive ? 'bg-white/10 text-[var(--color-brand-secondary)] font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                 }`
               }
             >
               <item.icon className="w-5 h-5" />
               {item.name}
             </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-white/10">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
           >
             <LogOut className="w-5 h-5" />
             Logout
           </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 w-full">
           <h2 className="text-xl font-bold text-gray-800">Sri Lakshmi Travels Admin</h2>
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-[var(--color-brand-secondary)] flex items-center justify-center text-gray-600">
               <Users className="w-5 h-5" />
             </div>
             <div className="hidden sm:block">
               <p className="text-sm font-bold text-gray-800">System Admin</p>
               <p className="text-xs text-gray-500">admin@slt.com</p>
             </div>
           </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
