import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Car, Users } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function AdminFleet() {
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('cars');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [carForm, setCarForm] = useState({ name: '', category: '', seats: '', fuel: '', transmission: '', pricePerKm: '', minKmPerDay: 250, driverBata: 400, image: '', features: '', desc: '' });
  const [driverForm, setDriverForm] = useState({ name: '', phone: '', experience: '', languages: '', rating: '', trips: '', image: '', bio: '', licenseNo: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [carsRes, driversRes] = await Promise.all([api.get('/cars'), api.get('/drivers')]);
      setCars(carsRes.data.cars);
      setDrivers(driversRes.data.drivers);
    } catch { toast.error('Failed to fetch fleet data'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => { setShowForm(false); setEditing(null); };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...carForm, seats: Number(carForm.seats), pricePerKm: Number(carForm.pricePerKm), minKmPerDay: Number(carForm.minKmPerDay), driverBata: Number(carForm.driverBata), features: carForm.features.split(',').map(f => f.trim()).filter(Boolean) };
      if (editing) { await api.put(`/cars/${editing}`, payload); toast.success('Car updated!'); }
      else { await api.post('/cars', payload); toast.success('Car added to fleet!'); }
      resetForm();
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDriverSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...driverForm, experience: Number(driverForm.experience), rating: Number(driverForm.rating), trips: Number(driverForm.trips), languages: driverForm.languages.split(',').map(l => l.trim()).filter(Boolean) };
      if (editing) { await api.put(`/drivers/${editing}`, payload); toast.success('Driver updated!'); }
      else { await api.post('/drivers', payload); toast.success('Driver added!'); }
      resetForm();
      fetchData();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const deleteCar = async (id) => { if (!confirm('Remove this car?')) return; try { await api.delete(`/cars/${id}`); toast.success('Car removed'); fetchData(); } catch { toast.error('Failed'); } };
  const deleteDriver = async (id) => { if (!confirm('Remove this driver?')) return; try { await api.delete(`/drivers/${id}`); toast.success('Driver removed'); fetchData(); } catch { toast.error('Failed'); } };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fleet Manager</h1>
          <p className="text-gray-500 mt-1">Manage cars and drivers</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-brand-primary)] text-white rounded-xl hover:bg-[#14532D] transition-colors text-sm font-medium">
          <Plus className="w-4 h-4" /> Add {tab === 'cars' ? 'Car' : 'Driver'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => { setTab('cars'); resetForm(); }} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === 'cars' ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><Car className="w-4 h-4" /> Cars ({cars.length})</button>
        <button onClick={() => { setTab('drivers'); resetForm(); }} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === 'drivers' ? 'bg-[var(--color-brand-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}><Users className="w-4 h-4" /> Drivers ({drivers.length})</button>
      </div>

      {/* Car Form */}
      {showForm && tab === 'cars' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">{editing ? 'Edit Car' : 'Add New Car'}</h3>
            <button onClick={resetForm}><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <form onSubmit={handleCarSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required value={carForm.name} onChange={(e) => setCarForm({ ...carForm, name: e.target.value })} placeholder="Car Name *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input required value={carForm.category} onChange={(e) => setCarForm({ ...carForm, category: e.target.value })} placeholder="Category *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input required type="number" value={carForm.seats} onChange={(e) => setCarForm({ ...carForm, seats: e.target.value })} placeholder="Seats *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input required type="number" value={carForm.pricePerKm} onChange={(e) => setCarForm({ ...carForm, pricePerKm: e.target.value })} placeholder="Price/Km (₹) *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={carForm.fuel} onChange={(e) => setCarForm({ ...carForm, fuel: e.target.value })} placeholder="Fuel Type" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={carForm.transmission} onChange={(e) => setCarForm({ ...carForm, transmission: e.target.value })} placeholder="Transmission" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={carForm.image} onChange={(e) => setCarForm({ ...carForm, image: e.target.value })} placeholder="Image URL" className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={carForm.features} onChange={(e) => setCarForm({ ...carForm, features: e.target.value })} placeholder="Features (comma separated)" className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-[var(--color-brand-primary)] text-white rounded-xl text-sm font-medium">{editing ? 'Update' : 'Add Car'}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Driver Form */}
      {showForm && tab === 'drivers' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">{editing ? 'Edit Driver' : 'Add New Driver'}</h3>
            <button onClick={resetForm}><X className="w-5 h-5 text-gray-400" /></button>
          </div>
          <form onSubmit={handleDriverSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required value={driverForm.name} onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })} placeholder="Driver Name *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={driverForm.phone} onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })} placeholder="Phone" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input required type="number" value={driverForm.experience} onChange={(e) => setDriverForm({ ...driverForm, experience: e.target.value })} placeholder="Experience (years) *" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={driverForm.languages} onChange={(e) => setDriverForm({ ...driverForm, languages: e.target.value })} placeholder="Languages (comma separated)" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={driverForm.licenseNo} onChange={(e) => setDriverForm({ ...driverForm, licenseNo: e.target.value })} placeholder="License No" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <input value={driverForm.image} onChange={(e) => setDriverForm({ ...driverForm, image: e.target.value })} placeholder="Photo URL" className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <textarea value={driverForm.bio} onChange={(e) => setDriverForm({ ...driverForm, bio: e.target.value })} placeholder="Bio" rows={2} className="md:col-span-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-[var(--color-brand-secondary)] focus:outline-none" />
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="px-6 py-2.5 bg-[var(--color-brand-primary)] text-white rounded-xl text-sm font-medium">{editing ? 'Update' : 'Add Driver'}</button>
              <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Listings */}
      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading...</div>
      ) : tab === 'cars' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <img src={car.image || 'https://placehold.co/400x200'} alt={car.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{car.name}</h3>
                <p className="text-sm text-gray-500">{car.category} • {car.seats} seats • ₹{car.pricePerKm}/km</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setCarForm({ ...car, features: car.features?.join(', ') || '' }); setEditing(car._id); setShowForm(true); }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium"><Edit className="w-3.5 h-3.5" /> Edit</button>
                  <button onClick={() => deleteCar(car._id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-xl text-xs font-medium"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((d) => (
            <div key={d._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-4 mb-3">
                <img src={d.image || 'https://placehold.co/60'} alt={d.name} className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-gray-900">{d.name}</h3>
                  <p className="text-xs text-gray-500">{d.experience} yrs exp • ⭐ {d.rating}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">{d.languages?.join(', ')}</p>
              <div className="flex gap-2">
                <button onClick={() => { setDriverForm({ ...d, languages: d.languages?.join(', ') || '' }); setEditing(d._id); setTab('drivers'); setShowForm(true); }} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-medium"><Edit className="w-3.5 h-3.5" /> Edit</button>
                <button onClick={() => deleteDriver(d._id)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-700 rounded-xl text-xs font-medium"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
