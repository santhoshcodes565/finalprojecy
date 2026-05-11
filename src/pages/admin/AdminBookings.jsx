import React, { useState, useEffect } from 'react';
import { Calendar, Search, Filter, CheckCircle, XCircle, Truck, Camera, Trash2, IdCard, FileText, Eye } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);

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

  const deleteBooking = async (type, id) => {
    if (!window.confirm('Are you sure you want to remove this booking from history?')) return;
    try {
      await api.delete(`/bookings/${type}/${id}`);
      toast.success('Booking deleted!');
      fetchBookings();
    } catch (err) {
      toast.error('Failed to delete booking');
    }
  };

  const statusColors = {
    pending: 'bg-orange-100 text-orange-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-6 relative">
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
                    <td className="p-4 text-gray-600">{b.type === 'package' ? (b.packageId === 'custom' ? <span className="font-bold text-brand-primary">Custom Tour Inquiry</span> : `Package ${b.packageId.slice(-6)}`) : (b.serviceName || b.carCategory || b.driverType || '—')}</td>
                    <td className="p-4 text-gray-600">{new Date(b.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 font-medium text-gray-900">₹{b.totalAmount || b.advancePaid || '—'}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[b.status] || 'bg-gray-100 text-gray-700'}`}>{b.status}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelectedBookingDetails(b)} className="p-1.5 rounded-lg hover:bg-brand-primary/10 text-brand-primary" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {b.paymentScreenshot && (
                          <button onClick={() => setSelectedImage(b.paymentScreenshot)} className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-600" title="View Payment Screenshot">
                            <Camera className="w-4 h-4" />
                          </button>
                        )}
                        {b.type === 'car' && b.drivingLicense && (
                          <button onClick={() => setSelectedImage(b.drivingLicense)} className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-600" title="View Driving License">
                            <IdCard className="w-4 h-4" />
                          </button>
                        )}
                        {b.type === 'car' && b.idProof && (
                          <button onClick={() => setSelectedImage(b.idProof)} className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-600" title="View Aadhaar / ID Proof">
                            <IdCard className="w-4 h-4" />
                          </button>
                        )}
                        {b.status === 'pending' && (
                          <>
                            <button onClick={() => updateStatus(b.type, b._id, 'confirmed')} className="p-1.5 rounded-lg hover:bg-green-50 text-green-600" title="Confirm"><CheckCircle className="w-4 h-4" /></button>
                            <button onClick={() => updateStatus(b.type, b._id, 'cancelled')} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Cancel"><XCircle className="w-4 h-4" /></button>
                          </>
                        )}
                        {b.status === 'confirmed' && (
                          <button onClick={() => updateStatus(b.type, b._id, 'completed')} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600" title="Mark Complete"><Truck className="w-4 h-4" /></button>
                        )}
                        <button onClick={() => deleteBooking(b.type, b._id)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600" title="Remove Booking"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full relative">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Document Viewer</h3>
            <img src={selectedImage} alt="Document Proof" className="w-full h-auto max-h-[70vh] object-contain rounded-xl border border-gray-100" />
            <button onClick={() => setSelectedImage(null)} className="mt-6 w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
              Close Preview
            </button>
          </div>
        </div>
      )}

      {selectedBookingDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-3">Booking Details</h3>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Customer Name</p><p className="font-semibold text-gray-900">{selectedBookingDetails.fullName}</p></div>
                <div><p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Phone</p><p className="font-semibold text-gray-900">{selectedBookingDetails.phone}</p></div>
                <div><p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Email</p><p className="font-semibold text-gray-900">{selectedBookingDetails.email}</p></div>
                <div><p className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">Service Type</p><p className="font-semibold text-brand-primary capitalize">{selectedBookingDetails.type === 'package' ? (selectedBookingDetails.packageId === 'custom' ? 'Custom Package' : 'Tour Package') : selectedBookingDetails.type}</p></div>
              </div>
              
              <div className="border-t pt-4">
                <p className="text-brand-secondary font-bold mb-3 uppercase tracking-widest text-xs">Requirement Details</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {selectedBookingDetails.travelDate && <div><p className="text-gray-500 text-xs mb-1">Travel Date:</p><p className="font-medium text-gray-900">{new Date(selectedBookingDetails.travelDate).toLocaleDateString()}</p></div>}
                  {selectedBookingDetails.adults !== undefined && <div><p className="text-gray-500 text-xs mb-1">Travellers:</p><p className="font-medium text-gray-900">{selectedBookingDetails.adults} Adults, {selectedBookingDetails.children || 0} Children</p></div>}
                  {selectedBookingDetails.pickupCity && <div><p className="text-gray-500 text-xs mb-1">Pickup City:</p><p className="font-medium text-gray-900">{selectedBookingDetails.pickupCity}</p></div>}
                  {selectedBookingDetails.duration && <div><p className="text-gray-500 text-xs mb-1">Duration:</p><p className="font-medium text-gray-900">{selectedBookingDetails.duration} Days</p></div>}
                </div>
                
                {selectedBookingDetails.customNotes && (
                  <div className="mt-4">
                    <p className="text-gray-500 text-xs mb-2">Customer Notes / Requirements:</p>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-wrap text-gray-700 font-medium">
                      {selectedBookingDetails.customNotes}
                    </div>
                  </div>
                )}
                
                {(selectedBookingDetails.drivingLicense || selectedBookingDetails.idProof) && (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-brand-secondary font-bold mb-3 uppercase tracking-widest text-xs">Uploaded Documents</p>
                    <div className="flex gap-4">
                      {selectedBookingDetails.drivingLicense && (
                        <button onClick={() => setSelectedImage(selectedBookingDetails.drivingLicense)} className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm font-semibold border border-orange-100">
                          <IdCard className="w-4 h-4" />
                          View Driving License
                        </button>
                      )}
                      {selectedBookingDetails.idProof && (
                        <button onClick={() => setSelectedImage(selectedBookingDetails.idProof)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-semibold border border-blue-100">
                          <IdCard className="w-4 h-4" />
                          View Aadhaar / ID Proof
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setSelectedBookingDetails(null)} className="mt-6 w-full py-3.5 bg-brand-primary text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg">
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
