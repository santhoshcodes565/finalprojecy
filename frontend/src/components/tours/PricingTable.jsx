import React from 'react';
import { Users, Info } from 'lucide-react';

export default function PricingTable({ price }) {
  // Simulate multiple pricing tiers based on standard price
  const tiers = [
    { pax: '2 Persons', type: 'Couple / Small Family', price: price * 1.2 },
    { pax: '4 Persons', type: 'Small Group', price: price * 1.1 },
    { pax: '6 Persons', type: 'Family Group', price: price },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-neutral-100">
      <div className="bg-brand-primary p-8 text-white">
        <h3 className="text-2xl font-display italic font-black flex items-center gap-3">
          Package Rates
          <div className="bg-brand-secondary/20 px-3 py-1 rounded-lg text-xs font-bold text-brand-secondary uppercase tracking-widest border border-brand-secondary/20">
            Per Head
          </div>
        </h3>
        <p className="text-white/60 text-sm mt-2">Rates vary based on the number of travellers.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-brand-accent/50 text-brand-primary uppercase text-[10px] font-black tracking-widest border-b border-neutral-100">
            <tr>
              <th className="px-8 py-5">Occupancy</th>
              <th className="px-8 py-5">Category</th>
              <th className="px-8 py-5 text-right">Price per head</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50">
            {tiers.map((tier, idx) => (
              <tr key={idx} className="group hover:bg-brand-accent/30 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-neutral-800">{tier.pax}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-neutral-500 text-sm italic font-medium">{tier.type}</td>
                <td className="px-8 py-6 text-right">
                  <span className="text-xl font-black text-brand-primary">₹{Math.round(tier.price).toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-brand-accent/20 flex items-start gap-3 border-t border-neutral-50">
        <Info className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
        <p className="text-[10px] text-neutral-400 font-bold leading-relaxed uppercase tracking-wider">
          Prices are inclusive of stay, breakfast, and private vehicle. GST (5%) will be extra at checkout. Rates are subject to seasonal changes.
        </p>
      </div>
    </div>
  );
}
