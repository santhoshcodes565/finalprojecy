import React, { useState, useEffect } from 'react';
import { Users, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ todayBookings: 0, todayRevenue: 0, totalUsers: 0, pendingActions: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, recentRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/recent'),
        ]);
        setStats(statsRes.data);
        setRecentBookings(recentRes.data.bookings);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { title: "Today's Bookings", value: stats.todayBookings, icon: Calendar, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Revenue (Today)", value: `₹${stats.todayRevenue?.toLocaleString()}`, icon: TrendingUp, color: "text-green-600", bg: "bg-green-100" },
    { title: "Registered Users", value: stats.totalUsers?.toLocaleString(), icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { title: "Pending Actions", value: stats.pendingActions, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-100" },
  ];

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
              <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total Revenue (All Time)</p>
          <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue?.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Total Bookings (All Time)</p>
          <p className="text-2xl font-bold text-blue-600">{stats.totalBookings?.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Pending Reviews</p>
          <p className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
          <button onClick={() => navigate('/admin/bookings')} className="text-sm font-medium text-[var(--color-brand-secondary)] hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Service</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {recentBookings.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No bookings yet. They will appear here when users make bookings.</td></tr>
              ) : recentBookings.map((booking, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-gray-900">{booking.fullName}</p>
                    <p className="text-xs text-gray-500">{booking.email}</p>
                  </td>
                  <td className="p-4 text-gray-600">{booking.serviceName || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${booking.type === 'package' ? 'bg-purple-100 text-purple-700' : booking.type === 'car' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}`}>{booking.type}</span>
                  </td>
                  <td className="p-4 text-gray-600">{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>{booking.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
