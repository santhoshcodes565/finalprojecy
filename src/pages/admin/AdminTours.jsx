import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', duration: '', states: '', price: '', image: '', description: '', highlights: '', seatsTotal: 50 });

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tours');
      setTours(res.data.tours);
    } catch { toast.error('Failed to fetch tours'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTours(); }, []);

  const handleImageUpload = (e, formStateUpdater, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      formStateUpdater(prev => ({ ...prev, [fieldName]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({ title: '', duration: '', states: '', price: '', image: '', description: '', highlights: '', seatsTotal: 50 });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (tour) => {
    setForm({ ...tour, highlights: tour.highlights?.join(', ') || '', price: tour.price.toString(), seatsTotal: tour.seatsTotal });
    setEditing(tour._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), seatsTotal: Number(form.seatsTotal), highlights: form.highlights.split(',').map(h => h.trim()).filter(Boolean) };
      if (editing) {
        await api.put(`/tours/${editing}`, payload);
        toast.success('Tour updated!');
      } else {
        await api.post('/tours', payload);
        toast.success('Tour created! It will appear on the Packages page.');
      }
      resetForm();
      fetchTours();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to save tour'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Deactivate this tour?')) return;
    try {
      await api.delete(`/tours/${id}`);
      toast.success('Tour deactivated');
      fetchTours();
    } catch { toast.error('Failed to deactivate tour'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tours Manager</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove tour packages</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-brand-primary)] text-white rounded-xl hover:bg-[#14532D] transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" /> Add Tour
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">{editing ? 'Edit Tour' : 'Add New Tour'}</h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Tour Title *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Duration (e.g. 7 Days / 6 Nights) *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input required value={form.states} onChange={(e) => setForm({ ...form, states: e.target.value })} placeholder="States (e.g. Kerala) *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price per person (₹) *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tour Image</label>
              <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setForm, 'image')} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-brand-secondary)] file:text-brand-dark hover:file:bg-yellow-400" />
              {form.image && <img src={form.image.includes('placeholder') ? '' : form.image} alt="Preview" className="h-24 w-full object-cover rounded-xl mt-2 border border-gray-100" />}
            </div>
            <input type="number" value={form.seatsTotal} onChange={(e) => setForm({ ...form, seatsTotal: e.target.value })} placeholder="Total Seats" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} placeholder="Highlights (comma separated)" className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-[var(--color-brand-primary)] text-white rounded-xl hover:bg-[#14532D] transition-colors text-sm font-medium">{editing ? 'Update Tour' : 'Create Tour'}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Tours Grid */}
      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading tours...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={tour.image || 'https://placehold.co/400x200/1A3C5E/fff?text=Tour'} alt={tour.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{tour.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{tour.duration} • {tour.states}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg font-bold text-[var(--color-brand-primary)]">₹{tour.price?.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{tour.seatsAvailable || (tour.seatsTotal - tour.seatsBooked)} seats left</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleEdit(tour)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium hover:bg-blue-100"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => handleDelete(tour._id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-xl text-xs font-medium hover:bg-red-100"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
