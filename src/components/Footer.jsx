import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-primary border-t border-white/10 pt-16 pb-8 relative overflow-hidden text-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-secondary flex items-center justify-center font-bold text-white shadow-lg rounded">SLT</div>
              <span className="font-display text-white text-xl font-semibold">Sri Lakshmi Travels</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">Premium car rentals and curated tour packages. Providing safe and comfortable journeys.</p>
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-brand-secondary font-semibold">EST. 1995</div>
          </div>
          <div>
            <h4 className="font-display text-brand-secondary text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/car-rental" className="text-gray-400 hover:text-white transition-colors">Cars</Link></li>
              <li><Link to="/hire-driver" className="text-gray-400 hover:text-white transition-colors">Drivers</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-brand-secondary text-xl font-semibold mb-6">Our Fleet</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white cursor-pointer">Swift Dzire</li>
              <li className="hover:text-white cursor-pointer">Toyota Innova</li>
              <li className="hover:text-white cursor-pointer">Tempo Traveller</li>
              <li className="hover:text-white cursor-pointer">Luxury Corporate</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-brand-secondary text-xl font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li>📍 Tamil Nadu, India</li>
              <li>📞 +91 98765 43210</li>
              <li>✉️ info@srilakshmitravels.com</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Sri Lakshmi Travels. All rights reserved.</p>
          <div className="flex gap-4"><span className="hover:text-white cursor-pointer">Privacy</span><span className="hover:text-white cursor-pointer">Terms</span></div>
        </div>
      </div>
    </footer>
  );
}