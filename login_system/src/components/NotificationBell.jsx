import { useNotifications } from "../context/useNotifications";

import { Bell } from "lucide-react";

function NotificationBell() {
    const { notifications } = useNotifications();

    return (
        <button className="w-10 h-5 jus">
            <Bell className="text-gray-400" />

            {notifications.length > 0 && (
                <div className=" w-5 h-5 text-[14px] font-light bg-[#EF4444] text-white rounded-4xl relative bottom-7.5 left-2.5">{notifications.length}</div>
            )}
        </button>
    );
}

export default NotificationBell