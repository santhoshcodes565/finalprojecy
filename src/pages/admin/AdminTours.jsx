import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, RefreshCw, Camera, Compass } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', duration: '', states: '', price: '', image: '', bannerImage: '', description: '', highlights: '', seatsTotal: 50, itinerary: [] });

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await api.get('/tours?all=true');
      setTours(res.data.tours);
    } catch { toast.error('Failed to fetch tours'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTours(); }, []);

  const handleImageUpload = (e, formStateUpdater, fieldName, dayIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (dayIndex !== null) {
        // Handle itinerary day image
        const newItinerary = [...form.itinerary];
        newItinerary[dayIndex] = { ...newItinerary[dayIndex], image: reader.result };
        setForm({ ...form, itinerary: newItinerary });
      } else {
        // Handle main fields
        formStateUpdater(prev => ({ ...prev, [fieldName]: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm({ title: '', duration: '', states: '', price: '', image: '', bannerImage: '', description: '', highlights: '', seatsTotal: 50, itinerary: [] });
    setEditing(null);
    setShowForm(false);
  };

  const handleEdit = (tour) => {
    setForm({ 
      ...tour, 
      highlights: tour.highlights?.join(', ') || '', 
      price: tour.price.toString(), 
      seatsTotal: tour.seatsTotal,
      itinerary: tour.itinerary || []
    });
    setEditing(tour._id);
    setShowForm(true);
  };

  const addItineraryDay = () => {
    setForm({
      ...form,
      itinerary: [...form.itinerary, { day: form.itinerary.length + 1, title: '', location: '', desc: '', image: '' }]
    });
  };

  const updateItineraryDay = (index, field, value) => {
    const newItinerary = [...form.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setForm({ ...form, itinerary: newItinerary });
  };

  const removeItineraryDay = (index) => {
    const newItinerary = form.itinerary.filter((_, i) => i !== index).map((day, i) => ({ ...day, day: i + 1 }));
    setForm({ ...form, itinerary: newItinerary });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        ...form, 
        price: Number(form.price), 
        seatsTotal: Number(form.seatsTotal), 
        highlights: form.highlights.split(',').map(h => h.trim()).filter(Boolean) 
      };
      
      if (editing) {
        await api.put(`/tours/${editing}`, payload);
        toast.success('Tour updated!');
      } else {
        await api.post('/tours', payload);
        toast.success('Tour created!');
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

  const handleRestore = async (id) => {
    try {
      await api.put(`/tours/${id}`, { isActive: true });
      toast.success('Tour restored!');
      fetchTours();
    } catch { toast.error('Failed to restore tour'); }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tours Manager</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove tour packages</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-primary)] text-white rounded-xl hover:bg-[#14532D] transition-all text-sm font-bold shadow-lg">
          <Plus className="w-5 h-5" /> Add New Tour
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
          <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">{editing ? 'Edit Tour Package' : 'Create New Journey'}</h3>
            <button onClick={resetForm} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Tour Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. 7 Days Magical Kerala" className="w-full px-5 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Duration *</label>
                <input required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 7 Days / 6 Nights" className="w-full px-5 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Destination States *</label>
                <input required value={form.states} onChange={(e) => setForm({ ...form, states: e.target.value })} placeholder="e.g. Kerala, Tamil Nadu" className="w-full px-5 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Price per person (₹) *</label>
                <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="24500" className="w-full px-5 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Thumbnail Image</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setForm, 'image')} className="flex-1 text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                  {form.image && <img src={form.image} className="w-12 h-12 rounded-lg object-cover" alt="prev" />}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Hero Banner Image</label>
                <div className="flex items-center gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setForm, 'bannerImage')} className="flex-1 text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                  {form.bannerImage && <img src={form.bannerImage} className="w-12 h-12 rounded-lg object-cover" alt="prev" />}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Tour Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Detailed tour overview..." rows={3} className="w-full px-5 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">Highlights (comma separated)</label>
              <input value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })} placeholder="Houseboat, Tea Gardens, Kathakali Show..." className="w-full px-5 py-3 rounded-2xl border border-gray-200 text-sm focus:ring-2 focus:ring-gold focus:border-gold outline-none" />
            </div>

            {/* Itinerary Section */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-gold" />
                  Itinerary Roadmap
                </h4>
                <button type="button" onClick={addItineraryDay} className="text-xs font-bold text-white bg-brand-primary px-4 py-2 rounded-lg hover:bg-brand-light transition-colors">
                  + Add Travel Day
                </button>
              </div>
              
              <div className="space-y-6">
                {form.itinerary.map((day, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative group animate-slide-up">
                    <button type="button" onClick={() => removeItineraryDay(idx)} className="absolute top-4 right-4 p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 space-y-4">
                        <div className="w-full aspect-video bg-white rounded-xl border border-gray-200 relative overflow-hidden flex items-center justify-center">
                          {day.image ? (
                            <img src={day.image} className="absolute inset-0 w-full h-full object-cover" alt="day" />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-300">
                              <Camera className="w-8 h-8" />
                              <span className="text-[10px] uppercase font-bold tracking-widest">No Image</span>
                            </div>
                          )}
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, null, 'image', idx)} className="absolute inset-0 opacity-0 cursor-pointer" title="Upload Day Image" />
                        </div>
                        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl text-[10px] font-black uppercase text-gray-400 border border-gray-100">
                          <Compass className="w-3 h-3 text-gold" /> Day {day.day}
                        </div>
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={day.title} onChange={(e) => updateItineraryDay(idx, 'title', e.target.value)} placeholder="Day Title (e.g. Arrival & Sunset Cruise)" className="px-5 py-3 rounded-xl border border-gray-100 bg-white text-sm outline-none focus:ring-2 focus:ring-gold" />
                        <input value={day.location} onChange={(e) => updateItineraryDay(idx, 'location', e.target.value)} placeholder="Location" className="px-5 py-3 rounded-xl border border-gray-100 bg-white text-sm outline-none focus:ring-2 focus:ring-gold" />
                        <textarea value={day.desc} onChange={(e) => updateItineraryDay(idx, 'desc', e.target.value)} placeholder="What will happen on this day?" rows={3} className="md:col-span-2 px-5 py-3 rounded-xl border border-gray-100 bg-white text-sm outline-none focus:ring-2 focus:ring-gold" />
                      </div>
                    </div>
                  </div>
                ))}
                {form.itinerary.length === 0 && (
                  <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 text-sm italic">
                    No travel days added yet. Click "+ Add Travel Day" to begin.
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" className="flex-1 py-4 bg-brand-primary text-white rounded-2xl hover:bg-brand-light transition-all text-sm font-bold shadow-xl shadow-brand-primary/20">
                {editing ? '💾 Save Changes' : '🚀 Publish Tour'}
              </button>
              <button type="button" onClick={resetForm} className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all text-sm font-bold">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="p-12 text-center">
           <div className="inline-block w-8 h-8 border-4 border-brand-secondary border-t-brand-primary rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour._id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={tour.image || 'https://placehold.co/400x200/1A3C5E/fff?text=Tour'} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-brand-secondary text-brand-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{tour.duration}</div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[10px] font-bold">{tour.states}</div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif italic font-black text-brand-primary text-xl mb-2">{tour.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2 mb-4 h-8">{tour.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none">Starting from</p>
                    <p className="text-xl font-black text-brand-primary">₹{tour.price?.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none">Availability</p>
                    <p className="text-xs font-bold text-gray-900">{tour.seatsTotal - tour.seatsBooked} Slots left</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button onClick={() => handleEdit(tour)} className="flex items-center justify-center gap-2 py-3 bg-brand-accent text-brand-primary rounded-xl text-xs font-black uppercase hover:bg-gold/10 transition-colors">
                    <Edit className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(tour._id)} className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 rounded-xl text-xs font-black uppercase hover:bg-red-500 hover:text-white transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

