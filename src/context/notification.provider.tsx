// src/lib/NotificationsProvider.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from './socket.provider';

type Notification = {
  _id: string;
  type: string;
  recipient: string;
  sender: any;
  post?: string;
  read: boolean;
  createdAt: string;
};

type NotificationContextType = {
  notifications: Notification[];
  markAsRead: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  markAsRead: () => {},
});

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  console.log("notifications", notifications);

  useEffect(() => {
    if (socket) {
      socket.on('notification', (notification: Notification) => {
        setNotifications(prev => [notification, ...prev]);
      });

      socket.on('deleteNotification', (notificationId: string) => {
        setNotifications(prev => 
          prev.filter(notification => notification._id !== notificationId)
        );
      });

      // Cleanup
      return () => {
        socket.off('notification');
        socket.off('deleteNotification');
      };
    }
  }, [socket]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
      });
      
      setNotifications(prev =>
        prev.map(notification =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);