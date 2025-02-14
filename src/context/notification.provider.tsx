"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/UI/Loading";
import { getNotifications, markAllNotificationsAsRead } from "../services/Notification";
import { INotification } from "../types";
import { useSocket } from "./socket.provider";
import { useUser } from "./user.provider";

interface INotificationProviderValues {
  notifications: INotification[];
  markAllAsRead: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const NotificationContext = createContext<INotificationProviderValues | undefined>(
  undefined
);

export function NotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const socket = useSocket();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { user, isLoading: userLoading } = useUser();

  const handleNotifications = async () => {
    try {
      const response = await getNotifications();
      if (response?.data) {
        setNotifications(response.data);
        setIsLoading(false);
        setRetryCount(0);
      } else {
        setRetryCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setRetryCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!user || userLoading) {
      setNotifications([]);
      setIsLoading(false);
      setRetryCount(0);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      handleNotifications();
    }, retryCount * 1000);

    return () => clearTimeout(timeoutId);
  }, [user, userLoading, retryCount]);

  // Socket event listeners
  useEffect(() => {
    if (!socket || !user) return;

    const handleNewNotification = (notification: INotification) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    const handleDeleteNotification = (notificationId: string) => {
      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );
    };

    socket.on("notification", handleNewNotification);
    socket.on("deleteNotification", handleDeleteNotification);

    return () => {
      socket.off("notification", handleNewNotification);
      socket.off("deleteNotification", handleDeleteNotification);
    };
  }, [socket, user]);

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        }))
      );

      socket?.on('notificationsMarkedRead', () => {
      });
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  if (isLoading && !notifications.length && user && !userLoading) {
    return <Loading />;
  }

  return (
    <NotificationContext.Provider
      value={{ notifications, markAllAsRead, isLoading, setIsLoading }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within the NotificationsProvider"
    );
  }
  return context;
};