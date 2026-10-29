import { useNotifications } from "../context/useNotifications";
import { useState } from "react";
import { Bell, ShieldAlert, ClipboardList, Info, CheckCheck, Clock, } from "lucide-react";
import Popover from '@mui/material/Popover';

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



function NotificationBell() {
    const { notifications, loading } = useNotifications();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    return (
        <div className="relative top-1 flex">
            <button
                type="button"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-label={`Notificações: ${notifications.length}`}
                aria-expanded={isOpen}
                className=" z-10 w-10 mb-1 ml-2  ">
                <Bell className="text-gray-400" />
                {notifications.length > 0 && (
                    <span className="absolute right-1.5 h-5 flex-col flex justify-center
                    -top-2 rounded-full bg-red-500 px-1 text-xs text-white">
                        {notifications.length > 9
                            ? "9+"
                            : notifications.length}
                    </span>
                )}
            </button>

            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 400,
                            maxWidth: "calc(100vw - 28px)",
                            maxHeight: 520,
                            overflow: "hidden",
                            bgcolor: "#171923",
                            color: "#F3F4F6",
                            border: "1px solid #34394A",
                            borderRadius: 3,
                        },
                    },
                }}
            >
                <div className="h-100 xl:max-h-120 w-full wrap-break-word overflow-x-hidden overflow-y-auto
                 rounded-2xl bg-[#1F223B] p-4 text-gray-400 shadow scrollbar-notification">
                    <header className="flex justify-between items-center">
                        <h2 className="text-base font-semibold text-white">
                            Notifications
                        </h2>
                        <div className="flex h-10 w-10 items-center relative -translate-x-2.5 mr-2
                            justify-center rounded-xl bg-indigo-500/10">
                            <Bell size={20} className="text-indigo-400" />
                        </div>
                    </header>
                    {loading ? (
                        <p>Loading</p>
                    ) : notifications.length === 0 ? (
                        <p>You don't have notifications</p>
                    ) : (
                        notifications.map((item) => {
                            const style =
                                notificationModel[item.type] ??
                                notificationModel.system;

                            const NotificationIcon = style.icon;
                            return (
                                <article key={item.id} className=" group flex  gap-3 
                                border-b border-white/[0.07] px-4 py-2.5
                                 transition-colors hover:bg-white/3 last:border-b-0 ">

                                    <div className={`w-full ${style.background} p-2 rounded-2xl `}>
                                        <div className="min-w-0 flex  items-center">
                                            <div className={`${style.color}
                                            flex h-10 w-10 shrink-0 items-center
                                            justify-center rounded-2xl`}>
                                                <NotificationIcon size={24} />
                                            </div>

                                            <div className="mb-1 flex
                                                flex-wrap items-center gap-2">
                                                <h3 className="text-sm
                                                    font-semibold leading-5
                                                    text-gray-100" >{item.title}</h3>
                                                <span
                                                    className={`rounded-md
                                                    px-2 py-0.5 text-[10px] translate-x-2
                                                    font-medium ${style.background}
                                                    ${style.color}`}
                                                >
                                                    {style.label}
                                                </span>
                                            </div>

                                        </div>
                                        <p className="wrap-break-words text-sm
                                            leading-5 text-gray-400 translate-x-2.5" >
                                            {item.message}
                                        </p>
                                        <time className="mt-2 flex items-center font-medium
                                             gap-1.5 text-xs text-gray-500 translate-x-2.5" dateTime={item.created_at}>
                                            <Clock size={12} />
                                            {formatDate(item.created_at)}
                                        </time>
                                    </div>
                                </article>
                            )
                        })
                    )}
                </div>
            </Popover>
        </div>
    );
}

export default NotificationBell
