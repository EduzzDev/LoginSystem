import { useEffect, useState } from "react";
import { getNotifications } from "../services/api";
import { NotificationContext } from "./NotificationContext";

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  async function loadNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Erro ao buscar notificações:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loading,
        loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );


}

