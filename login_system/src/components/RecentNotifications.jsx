import { useNotifications } from "../context/useNotifications";
import {
    ShieldAlert, ClipboardList,
    Info, Clock, ChevronDown
} from "lucide-react";
import ActivityImg from "../assets/activityImg.png";

const notificationModel = {
    security: {
        label: "Security",
        icon: ShieldAlert,
        color: "text-red-400",
        background: "bg-red-500/10",
    },
    task: {
        label: "Expired task",
        icon: ClipboardList,
        color: "text-blue-400",
        background: "bg-blue-500/10",
    },
    system: {
        label: "System",
        icon: Info,
        color: "text-amber-400",
        background: "bg-amber-500/10",
    }
}

//formata a hora e verifica a disponibilidade
function formatDate(date) {
    if (!date) return "Date not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Date not available";
    }
    return parsedDate.toLocaleString(navigator.language, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function RecentNotifications() {
    const { notifications, loading } = useNotifications();
    const recentNotifications = notifications.slice(0, 3);

    if (loading) return <p>Loading...</p>;

    if (recentNotifications.length === 0) {

        return (
            <>
                <div className="w-full flex flex-col items-center justify-center p-2.5">
                    <img className="w-45" src={ActivityImg} alt="image recent activity" />
                    <h1 className=" font-bold text-fluid-title text-white tracking-wider">
                        No recent activity yet
                    </h1>
                    <h2 className="font-semibold text-gray-500 tracking-wide">
                        Your activity will appear here once you start using the system.
                    </h2>
                </div>
            </>
        )
    }

    return recentNotifications.map((item) => {
        const style = notificationModel[item.type] ?? notificationModel.system;
        const NotificationIcon = style.icon;

        return (
            <article className="  lg:w-155 flex flex-col
            text-fluid-base w-full " key={item.id}>
                <div className=" flex flex-row gap-2.5 min-[380px]:p-4 sm:gap-x-4 p-2 sm:p-4.5
                 lg:pl-3 lg:ml-4 items-center justify-evenly  text-fluid-base">
                    <NotificationIcon className={`${style.color} w-15 `} size={28} />
                    <h3 className="text-white text-fluid-base font-medium sm:tracking-wide">{item.title}</h3>
                    <time className="text-[#A5A8B5] text-fluid-sm font-medium sm:tracking-wide" dateTime={item.created_at}>
                        {formatDate(item.created_at)}
                    </time>
                    <h3 className={`  rounded-xl h-7 
                     sm:px-2 py-0.5 px-1 text-[14px] tracking-widest
                     font-medium ${style.color} ${style.background}`}>
                        {style.label}
                    </h3>
                </div>
                <hr className="border-0 border-t border-[#2D3035]" />
            </article>

        );
    });
}

export default RecentNotifications
