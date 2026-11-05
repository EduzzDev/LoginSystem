import { useEffect, useState } from "react";
import { getNotifications, isRead } from "../services/api";
import { NotificationContext } from "./NotificationContext";

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  async function loadNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Error retrieving notifications:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function markAllNotificationsAsRead() {
    try {
      const unreadNotifications = notifications.filter(item => item.is_read === 0)

      await Promise.all(unreadNotifications.map(item => {
        return isRead({ id: item.id, is_read: 1 })
      }))
      const currentNotifications = notifications.map((item) => {
        if (item.is_read === 0) {
          return { ...item, is_read: 1 }
        }
        return item;
      })

      setNotifications(currentNotifications);
    } catch (err) {
      return console.error("Error when marking notifications as read:", err);
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        loadNotifications,
        markAllNotificationsAsRead
      }}
    >
      {children}
    </NotificationContext.Provider>
  );


}

