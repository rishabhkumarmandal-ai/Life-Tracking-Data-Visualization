
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bell, Check, X, Archive, Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: Date;
  read: boolean;
  category: string;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Daily Goal Completed!',
      message: 'Congratulations! You\'ve completed your daily learning goal.',
      type: 'success',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
      category: 'Achievement'
    },
    {
      id: '2',
      title: 'Fitness Reminder',
      message: 'Don\'t forget your evening workout session.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false,
      category: 'Reminder'
    },
    {
      id: '3',
      title: 'Weekly Report Available',
      message: 'Your weekly progress report is ready to view.',
      type: 'info',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      read: true,
      category: 'Report'
    },
    {
      id: '4',
      title: 'Mood Check-in Missed',
      message: 'You haven\'t logged your mood today. Take a moment to reflect.',
      type: 'warning',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      read: true,
      category: 'Reminder'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const { toast } = useToast();

  // Simulate new notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotifications = [
        {
          title: 'Reading Goal Progress',
          message: 'You\'re 80% through your monthly reading goal!',
          type: 'info' as const,
          category: 'Progress'
        },
        {
          title: 'New Achievement Unlocked',
          message: 'You\'ve maintained your fitness streak for 7 days!',
          type: 'success' as const,
          category: 'Achievement'
        },
        {
          title: 'Budget Alert',
          message: 'You\'ve spent 90% of your entertainment budget this month.',
          type: 'warning' as const,
          category: 'Finance'
        }
      ];

      const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
      
      // Only add new notification 20% of the time
      if (Math.random() < 0.2) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          title: randomNotification.title,
          message: randomNotification.message,
          type: randomNotification.type,
          timestamp: new Date(),
          read: false,
          category: randomNotification.category
        };

        setNotifications(prev => [newNotification, ...prev]);
        
        toast({
          title: "New Notification",
          description: randomNotification.title,
        });
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "Your notification list has been updated.",
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    toast({
      title: "All notifications cleared",
      description: "Your notification list has been cleared.",
    });
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-bold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="px-2 py-1">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check size={16} className="mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={clearAllNotifications}>
            <Archive size={16} className="mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          size="sm"
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
          size="sm"
        >
          Unread ({unreadCount})
        </Button>
        <Button
          variant={filter === 'read' ? 'default' : 'outline'}
          onClick={() => setFilter('read')}
          size="sm"
        >
          Read ({notifications.length - unreadCount})
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'unread' ? 'All caught up! No unread notifications.' : 'Your notification list is empty.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className={`transition-all duration-200 ${!notification.read ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeColor(notification.type)} variant="outline">
                        {notification.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{formatTimestamp(notification.timestamp)}</span>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">{notification.title}</h4>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Check size={14} />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
