import { useNotifications } from "../context/useNotifications";
import { useState } from "react";
import { Bell, ShieldAlert, ClipboardList, Info, Clock, ChevronDown } from "lucide-react";
import Popover from '@mui/material/Popover';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';


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

function NotificationItem({ item }) {
    const style = notificationModel[item.type] ?? notificationModel.system;
    const NotificationIcon = style.icon;

    return (
        <article className="group flex w-92 gap-3 border-b border-white/[0.07] sm:px-4 py-2.5 last:border-b-0">
            <div className={`w-[82dvw] min-[420px]:w-full ${style.background} p-2 rounded-2xl hover:bg-white/5  
            `}>
                <div className="min-w-0 flex items-center  ">
                    <div className={`${style.color} flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl`}>
                        <NotificationIcon size={24} />
                    </div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold leading-5 text-gray-100">{item.title}</h3>
                        <span className={`rounded-md px-2 py-0.5 text-[10px] translate-x-2 font-medium ${style.background} ${style.color}`}>
                            {style.label}
                        </span>
                    </div>
                </div>
                <p className="wrap-break-words text-sm leading-5 text-gray-400 translate-x-2.5">
                    {item.message}
                </p>
                <time className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-500 translate-x-2.5" dateTime={item.created_at}>
                    <Clock size={12} />
                    {formatDate(item.created_at)}
                </time>
            </div>
        </article>
    );
}

function NotificationBell() {
    const { notifications, loading, markAllNotificationsAsRead } = useNotifications();
    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const unreadCount = notifications.filter(item => item.is_read === 0);

    const unreadFirstNotifications = [...notifications].sort((first, second) => first.is_read - second.is_read);
    const currentRead = unreadFirstNotifications.filter((item) => item.is_read === 1)
    const unRead = unreadFirstNotifications.filter((item) => item.is_read === 0)
    return (
        <div className="relative flex shrink-0 items-center lg:translate-y-0.5  ">
            <button
                type="button"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                aria-label={`Notificações: ${unreadCount.length}`}
                aria-expanded={isOpen}
                className="relative z-10 flex h-10 w-10 2xl:w-14.5 2xl:h-14.5 items-center justify-center rounded-xl text-gray-400
                 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none 
                 e focus-visible:ring-2 focus-visible:ring-indigo-400">
                <Bell className="h-5 w-5 lg:w-6.5 lg:h-6.5 2xl:w-12.5 2xl:h-12.5 " />
                {unreadCount.length > 0 && (
                    <span className="absolute right-0.5 top-0 flex h-4.5 min-w-4.5 2xl:w-7.5 2xl:h-7.5 items-center justify-center
                    rounded-full bg-red-500 px-1 text-[10px] 2xl:text-[clamp(1.5rem,1rem+1vw,1.6rem)] font-semibold leading-none text-white ring-2 ring-[#1A1C20]">
                        {unreadCount.length > 9
                            ? "9+"
                            : unreadCount.length}
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
                            maxWidth: "calc(100dvw - 20px)",
                            maxHeight: "calc(100dvh - 24px)",
                            overflow: "hidden",
                            bgcolor: "#171923",
                            color: "#F3F4F6",
                            border: "1px solid #34394A",
                            borderRadius: 3,
                        },
                    },
                }}
            >
                <div className="max-h-[calc(100dvh-110px)] w-full 
                wrap-break-word overflow-x-hidden overflow-y-auto
                lg:max-h-120 rounded-2xl bg-[#1F223B] p-4
              text-gray-400 shadow scrollbar-notification">
                    <header className="flex justify-between items-center">
                        <h2 className="text-base font-semibold text-white">
                            Notifications
                        </h2>
                        <div className="flex h-10 w-35 items-center relative
                            justify-center rounded-xl">
                            <button className=" text-[14px] font-medium text-[#A99AFF] hover:text-[#C0B5FF]"
                                onClick={markAllNotificationsAsRead}
                            >
                                Mark all as read
                            </button>
                        </div>
                    </header>
                    {loading ? (
                        <p>Loading</p>
                    ) : notifications.length === 0 ? (
                        <p>You don't have notifications</p>
                    ) : (
                        <>
                            {unRead.map((item) => (
                                <NotificationItem key={item.id} item={item} />
                            ))}

                            {currentRead.length > 0 && (
                                <Accordion
                                    disableGutters
                                    elevation={0}
                                    sx={{
                                        mt: 1,
                                        bgcolor: "transparent",
                                        color: "inherit",
                                        "&:before": { display: "none" },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ChevronDown size={18} className="text-gray-400" />}
                                        sx={{
                                            px: 1,
                                            minHeight: 44,
                                            "& .MuiAccordionSummary-content": { my: 1 },
                                        }}
                                    >
                                        <span className="text-md font-semibold text-[#A99AFF]">
                                            Read <span className="border-2 text-[14px] p-1 rounded-2xl border-[#8c7fd4] bg-[#8c7fd4] text-white">{currentRead.length}</span>
                                        </span>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ p: 0 }}>
                                        {currentRead.map((item) => (
                                            <NotificationItem key={item.id} item={item} />
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            )}
                        </>
                    )}
                </div>
            </Popover>
        </div>
    );
}

export default NotificationBell
