import React from 'react';
import { Send, PhoneCall, MessageCircle } from 'lucide-react';

export default function SidebarBookingForm() {
  return (
    <div className="sticky top-32 bg-brand-primary p-10 rounded-[3rem] text-white shadow-2xl shadow-brand-primary/20 overflow-hidden group">
      {/* Decorative BG element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full -mr-16 -mt-16 transition-transform duration-1000 group-hover:scale-150" />
      
      <div className="relative z-10">
        <h3 className="text-3xl font-display italic font-black mb-2">Book Your Trip</h3>
        <p className="text-brand-secondary text-xs font-black uppercase tracking-[0.2em] mb-8">Personalized Assistance</p>
        
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 px-2">Full Name</label>
            <input 
              type="text" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:bg-white/10 transition-all"
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 px-2">Phone Number</label>
            <input 
              type="tel" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:bg-white/10 transition-all"
              placeholder="+91 00000 00000"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/50 px-2">Preferred Date</label>
            <input 
              type="date" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 focus:bg-white/10 transition-all"
            />
          </div>

          <button className="w-full bg-brand-secondary hover:bg-yellow-600 text-brand-primary font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-brand-secondary/20 mt-6">
            <Send className="w-5 h-5" />
            GET CUSTOM QUOTE
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-white/10 space-y-6">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/40">Or Connect Directly</p>
          <div className="grid grid-cols-2 gap-4">
            <a href="tel:+919841000000" className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <PhoneCall className="w-5 h-5 text-brand-secondary" />
              <span className="text-[10px] font-black uppercase">Call</span>
            </a>
            <a href="https://wa.me/919841000000" className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span className="text-[10px] font-black uppercase">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
