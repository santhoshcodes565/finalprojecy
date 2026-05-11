import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Personal Info');

  const menu = [
    { n: 'Personal Info', i: '👤' },
    { n: 'My Bookings', i: '📋', path: '/my-bookings' },
    { n: 'Saved Trips', i: '❤️', path: '/my-wishlist' },
    { n: 'Notifications', i: '🔔', path: '/notifications' },
    { n: 'My Reviews', i: '⭐', path: '/my-reviews' },
    { n: 'Logout', i: '🚪', text: 'text-error', action: () => { logout(); navigate('/'); } }
  ];

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '', 
      phone: user?.phone || '',
      dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
      gender: user?.gender || 'Male',
      city: user?.city || 'Chennai',
      preferredCarType: user?.preferredCarType || 'SUV',
      receiveWhatsApp: user?.communicationPreferences?.whatsapp ?? true,
      emailPromotions: user?.communicationPreferences?.emailPromotions ?? false,
      emergencyContactName: user?.emergencyContact?.name || '',
      emergencyContactPhone: user?.emergencyContact?.phone || '',
      emergencyContactRelation: user?.emergencyContact?.relation || 'Spouse',
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : '',
        gender: user.gender || 'Male',
        city: user.city || 'Chennai',
        preferredCarType: user.preferredCarType || 'SUV',
        receiveWhatsApp: user.communicationPreferences?.whatsapp ?? true,
        emailPromotions: user.communicationPreferences?.emailPromotions ?? false,
        emergencyContactName: user.emergencyContact?.name || '',
        emergencyContactPhone: user.emergencyContact?.phone || '',
        emergencyContactRelation: user.emergencyContact?.relation || 'Spouse',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        dob: data.dob,
        gender: data.gender,
        city: data.city,
        preferredCarType: data.preferredCarType,
        communicationPreferences: {
          whatsapp: data.receiveWhatsApp,
          emailPromotions: data.emailPromotions
        },
        emergencyContact: {
          name: data.emergencyContactName,
          phone: data.emergencyContactPhone,
          relation: data.emergencyContactRelation
        }
      };
      await updateProfile(payload);
      toast.success("Profile updated successfully!");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update profile.");
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    return name[0].toUpperCase();
  };

  return (
    <div className="bg-warm-white min-h-screen">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 pt-[140px] pb-24 flex flex-col md:flex-row gap-10">
         {/* Sidebar */}
         <div className="w-full md:w-[320px] shrink-0">
            <div className="card-light flex flex-col items-center p-8 text-center mb-6">
               <div className="w-[120px] h-[120px] rounded-full bg-gold/10 flex items-center justify-center font-display text-[48px] text-gold-dark border-4 border-gold/30 mb-4 shadow-[0_0_20px_rgba(201,168,76,0.2)] font-bold">
                  {getInitials(user?.name)}
               </div>
               <button className="text-xs font-bold font-body text-charcoal bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded transition mb-6 shadow-sm border border-gray-200">
                  Change Photo
               </button>
               
               <h2 className="font-heading text-2xl font-bold text-charcoal">{user?.name || 'User'}</h2>
               <p className="font-body text-sm text-text-muted my-1">{user?.email}</p>
               <p className="font-body text-sm text-text-muted">{user?.phone}</p>
               <div className="w-full h-px bg-gray-100 my-4"></div>
               <p className="font-body text-xs font-bold text-gold-dark rounded-full bg-gold/10 px-4 py-1.5 mb-2">
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2024'}
               </p>
            </div>

            <div className="card-light overflow-hidden flex flex-col">
               {menu.map((m) => (
                 <button 
                   key={m.n} 
                   onClick={() => {
                     if (m.action) m.action();
                     else if (m.path) navigate(m.path);
                     else setActiveTab(m.n);
                   }}
                   className={`flex items-center text-left px-6 py-4 border-b border-gray-100 transition-colors last:border-b-0 ${activeTab === m.n ? 'bg-gold/5 border-l-4 border-l-gold-dark font-bold' : 'hover:bg-gray-50 border-l-4 border-l-transparent'} ${m.text || 'text-charcoal'}`}
                 >
                   <span className="w-6 mr-3 text-lg opacity-80">{m.i}</span>
                   <span className="font-body text-sm font-semibold tracking-wide">{m.n}</span>
                 </button>
               ))}
            </div>
         </div>

         {/* Main Panel */}
         <div className="flex-1 card-light p-8 md:p-12">
            <h1 className="font-heading text-3xl font-bold text-charcoal mb-8 border-b border-gray-200 pb-4">Personal Information</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase">Full Name</label>
                   <input type="text" {...register('name')} className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase">Date of Birth</label>
                   <input type="date" {...register('dob')} className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold text-charcoal" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase">Email Address</label>
                   <input type="email" {...register('email')} className="w-full text-sm font-medium bg-gray-50 border-gray-300 rounded text-gray-500 cursor-not-allowed" readOnly title="Email cannot be changed" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase">Phone Number</label>
                   <input type="tel" {...register('phone')} className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold" />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase">Gender</label>
                   <select {...register('gender')} className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold cursor-pointer">
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-text-muted mb-2 ml-1 uppercase">City</label>
                   <select {...register('city')} className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold cursor-pointer text-charcoal">
                     <option value="Chennai">Chennai</option>
                     <option value="Coimbatore">Coimbatore</option>
                     <option value="Madurai">Madurai</option>
                     <option value="Trichy">Trichy</option>
                     <option value="Salem">Salem</option>
                     <option value="Other">Other</option>
                   </select>
                 </div>
               </div>

               <div className="pt-8 border-t border-gray-200">
                 <h2 className="font-heading text-xl font-bold text-charcoal mb-6">Preferred Travel</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-body text-sm font-bold text-text-muted mb-3">Preferred Car Type</p>
                      <div className="flex flex-wrap gap-3">
                         {['Hatchback', 'Sedan', 'SUV', 'Luxury'].map(t => (
                           <label key={t} className="flex items-center space-x-2 font-body text-sm cursor-pointer px-3 py-1.5 border border-gray-200 rounded text-charcoal hover:bg-gold/5 hover:border-gold transition">
                             <input type="radio" value={t} {...register('preferredCarType')} className="w-4 h-4 text-gold focus:ring-gold" />
                             <span>{t}</span>
                           </label>
                         ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-body text-sm font-bold text-text-muted mb-3">Communication</p>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3 text-sm font-body cursor-pointer">
                          <input type="checkbox" {...register('receiveWhatsApp')} className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                          <span className="text-charcoal font-medium">Receive WhatsApp Alerts</span>
                        </label>
                        <label className="flex items-center space-x-3 text-sm font-body cursor-pointer">
                          <input type="checkbox" {...register('emailPromotions')} className="w-4 h-4 rounded border-gray-300 text-gold focus:ring-gold" />
                          <span className="text-charcoal font-medium">Email Promotions & Offers</span>
                        </label>
                      </div>
                    </div>
                 </div>
               </div>
               
               <div className="pt-8 border-t border-gray-200">
                 <h2 className="font-heading text-xl font-bold text-charcoal mb-6">Emergency Contact</h2>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input type="text" {...register('emergencyContactName')} placeholder="Contact Name" className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold" />
                    <input type="tel" {...register('emergencyContactPhone')} placeholder="Phone Number" className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold" />
                    <select {...register('emergencyContactRelation')} className="w-full text-sm font-medium bg-white border-gray-300 rounded focus:ring-gold focus:border-gold">
                       <option value="Spouse">Spouse</option>
                       <option value="Parent">Parent</option>
                       <option value="Friend">Friend</option>
                       <option value="Other">Other</option>
                    </select>
                 </div>
               </div>

               <div className="pt-4 flex justify-end">
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto px-12 py-3.5 text-base disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
               </div>
            </form>
         </div>
      </div>
      
    </div>
  );
};

export default MyProfile;
