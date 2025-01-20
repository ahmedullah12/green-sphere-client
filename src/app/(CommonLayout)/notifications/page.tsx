"use client";

import { useNotifications } from "@/src/context/notification.provider";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { formatDistanceToNow } from "date-fns";
import { Bell, Heart, MessageCircle, ThumbsDown, Users } from "lucide-react";

const NotificationPage = () => {
  const { notifications, markAllAsRead } = useNotifications();
console.log(notifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "upvote":
        return <Heart className="text-danger" size={20} />;
      case "downvote":
        return <ThumbsDown className="text-warning" size={20} />;
      case "comment":
        return <MessageCircle className="text-primary" size={20} />;
      case "follow":
        return <Users className="text-success" size={20} />;
      default:
        return null;
    }
  };

  const getNotificationMessage = (notification: any) => {
    switch (notification.type) {
      case "upvote":
        return `liked your post "${notification.post?.title}"`;
      case "downvote":
        return `downvoted your post "${notification.post?.title}"`;
      case "comment":
        return `commented on your post "${notification.post?.title}"`;
      case "follow":
        return "started following you";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-content1">
        <div className="p-1">
          <div className="flex justify-between items-center mb-8">
            <div className="flex item-center gap-3">
              <Bell className="w-8 h-8 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold">Notifications</h1>
            </div>
            <div>
              {notifications.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-white text-sm md:text-md bg-primary dark:bg-default px-1 md:px-2 py-2 rounded-md"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications yet
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification._id}>
                  <div
                    className={`flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg transition-colors ${
                      !notification.read
                        ? "bg-primary-50 dark:bg-primary-900/20"
                        : "hover:bg-default-100"
                    }`}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div className=" flex items-center gap-2 mb-1">
                          <Avatar
                            src={notification.sender?.profilePhoto}
                            name={notification.sender?.name}
                            className="w-10 h-10"
                          />
                          <span className="font-semibold">
                            {notification.sender?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-default-500">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>

                      <p className="text-sm text-default-700">
                        {getNotificationMessage(notification)}
                      </p>

                      <div className="mt-2 text-xs text-default-400">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                  <Divider className="my-2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
