import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await api.get('/payments');
        setPayments(res.data.payments);
        setTotalRevenue(res.data.totalRevenue);
      } catch { toast.error('Failed to fetch payments'); }
      finally { setLoading(false); }
    };
    fetchPayments();
  }, []);

  const statusColors = {
    SUCCESS: 'bg-green-100 text-green-700',
    INITIATED: 'bg-blue-100 text-blue-700',
    PROCESSING: 'bg-yellow-100 text-yellow-700',
    FAILED: 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments Tracker</h1>
          <p className="text-gray-500 mt-1">All transactions and revenue</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-green-700" />
          <span className="text-sm font-bold text-green-700">Total Revenue: ₹{totalRevenue.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading payments...</div>
        ) : payments.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No payments recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500 border-b">
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Method</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{p.userId?.name || '—'}</p>
                      <p className="text-xs text-gray-500">{p.userId?.email || ''}</p>
                    </td>
                    <td className="p-4 text-gray-600">{p.bookingType}</td>
                    <td className="p-4 font-bold text-gray-900">₹{p.amount?.toLocaleString()}</td>
                    <td className="p-4 text-gray-600 uppercase text-xs">{p.method}</td>
                    <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span></td>
                    <td className="p-4 text-gray-600">{new Date(p.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 text-gray-500 text-xs font-mono">{p.transactionId || '—'}</td>
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
