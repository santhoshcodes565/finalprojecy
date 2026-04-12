import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck, Trash2, Package, CreditCard, Truck, Clock, Info } from 'lucide-react';
import api from '../api/axios';

const ICON_MAP = {
  booking: Package,
  payment: CreditCard,
  driver: Truck,
  reminder: Clock,
  system: Info,
};

const COLOR_MAP = {
  booking: { bg: '#EFF6FF', border: '#3B82F6', icon: '#2563EB' },
  payment: { bg: '#F0FDF4', border: '#22C55E', icon: '#16A34A' },
  driver: { bg: '#FEF9EE', border: '#D4A017', icon: '#B8860B' },
  reminder: { bg: '#FFF7ED', border: '#F97316', icon: '#EA580C' },
  system: { bg: '#F5F3FF', border: '#8B5CF6', icon: '#7C3AED' },
};

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/notifications?page=${pageNum}&limit=15`);
      setNotifications(res.data.notifications || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all read:', error);
    }
  };

  const markRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Failed to mark read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString('en-IN');
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(180deg, #E8F4F8 0%, #fff 100%)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: '#1A3C5E' }}>
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#1A3C5E', fontFamily: "'Playfair Display', serif" }}>
                Notifications
              </h1>
              <p className="text-sm text-gray-500">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-blue-50"
              style={{ color: '#1A3C5E' }}
            >
              <CheckCheck className="w-4 h-4" />
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-3 border-gray-200 rounded-full" style={{ borderTopColor: '#1A3C5E' }} />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#E8F4F8' }}>
              <Bell className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-400 mb-1">No notifications yet</h3>
            <p className="text-sm text-gray-400">When you book a trip or receive updates, they'll appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notif) => {
              const NotifIcon = ICON_MAP[notif.type] || Info;
              const colors = COLOR_MAP[notif.type] || COLOR_MAP.system;

              return (
                <div
                  key={notif._id}
                  className={`rounded-xl p-4 flex items-start gap-4 border transition-all duration-200 hover:shadow-md group ${
                    notif.isRead ? 'bg-white border-gray-100' : 'border-l-4'
                  }`}
                  style={!notif.isRead ? { borderLeftColor: colors.border, background: colors.bg } : {}}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: notif.isRead ? '#F3F4F6' : colors.bg, border: `1px solid ${notif.isRead ? '#E5E7EB' : colors.border}30` }}
                  >
                    <NotifIcon className="w-5 h-5" style={{ color: notif.isRead ? '#9CA3AF' : colors.icon }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-sm font-semibold ${notif.isRead ? 'text-gray-500' : 'text-gray-800'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(notif.createdAt)}</span>
                    </div>
                    <p className={`text-sm mt-1 leading-relaxed ${notif.isRead ? 'text-gray-400' : 'text-gray-600'}`}>
                      {notif.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!notif.isRead && (
                      <button
                        onClick={() => markRead(notif._id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif._id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => fetchNotifications(p)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                  p === page ? 'text-white' : 'text-gray-500 hover:bg-gray-100'
                }`}
                style={p === page ? { background: '#1A3C5E' } : {}}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
