import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, CheckCircle, XCircle, Truck } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (filterType) params.type = filterType;
      if (search) params.search = search;
      const res = await api.get('/bookings/all', { params });
      setBookings(res.data.bookings);
    } catch (err) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, [filterStatus, filterType]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBookings();
  };

  const updateStatus = async (type, id, status) => {
    try {
      await api.patch(`/bookings/${type}/${id}/status`, { status });
      toast.success(`Booking ${status}!`);
      fetchBookings();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const statusColors = {
    pending: 'bg-orange-100 text-orange-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings Manager</h1>
          <p className="text-gray-500 mt-1">Manage all customer bookings</p>
        </div>
        <div className="text-sm font-medium text-gray-500">Total: {bookings.length} bookings</div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center">
        <form onSubmit={handleSearch} className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, email, phone..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none text-sm" />
        </form>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none">
          <option value="">All Types</option>
          <option value="package">Tour Package</option>
          <option value="car">Car Rental</option>
          <option value="driver">Driver Hire</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b">
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Service</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{b.fullName}</p>
                      <p className="text-xs text-gray-500">{b.email}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${b.type === 'package' ? 'bg-purple-100 text-purple-700' : b.type === 'car' ? 'bg-blue-100 text-blue-700' : 'bg-teal-100 text-teal-700'}`}>
                        {b.type}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">{b.serviceName || b.carCategory || b.driverType || '—'}</td>
                    <td className="p-4 text-gray-600">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-medium text-gray-900">₹{b.totalAmount || '—'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {b.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(b.type, b._id, 'confirmed')} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600" title="Confirm"><CheckCircle className="w-4 h-4" /></button>
                            <button onClick={() => updateStatus(b.type, b._id, 'cancelled')} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Cancel"><XCircle className="w-4 h-4" /></button>
                          </>
                        )}
                        {b.status === 'confirmed' && (
                          <button onClick={() => updateStatus(b.type, b._id, 'completed')} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600" title="Mark Complete"><Truck className="w-4 h-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
