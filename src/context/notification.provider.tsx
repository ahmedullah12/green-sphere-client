"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket.provider";
import { useUser } from "./user.provider";
import { useGetNotifications } from "../hooks/notification.hook";
import { INotification } from "../types";

type NotificationContextType = {
  notifications: INotification[];
  markAsRead: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  markAsRead: () => {},
});

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const { user } = useUser();
  const { data: notificationsData, isLoading } = useGetNotifications();

  useEffect(() => {
    if (notificationsData?.data) {
      setNotifications(notificationsData.data);
    }
  }, [notificationsData]);

  // Socket event listeners
  useEffect(() => {
    if (socket && user) {
      socket.on("notification", (notification: INotification) => {
        setNotifications((prev) => [notification, ...prev]);
      });

      socket.on("deleteNotification", (notificationId: string) => {
        setNotifications((prev) =>
          prev.filter((notification) => notification._id !== notificationId)
        );
      });

      // Cleanup
      return () => {
        socket.off("notification");
        socket.off("deleteNotification");
      };
    }
  }, [socket, user]);

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
