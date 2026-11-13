import { checkAuth } from "../services/api";
import { logout } from "../services/api";
import SideBarItem from "../components/SideBarItem";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../assets/userImg.png";
import { AuthContext } from "../context/authContext";
import SideBarMobile from "../components/SideBarMobile";
import {
  Bell,
  UserCircle,
  Monitor,
  Zap,
  LogOut,
  ShieldQuestionMark,
  Shield,
  ClipboardList,
  User,
  LayoutDashboard,
  ChevronDown,
  Search,
  MoreHorizontal,
  CircleHelp
} from "lucide-react";
import Drawer from "@mui/material/Drawer";
import NotificationBell from "../components/NotificationBell";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonitorIcon from '@mui/icons-material/Monitor';

function Dashboard() {
  const navigate = useNavigate();
  const { user, timeLogged, imgUser } = useContext(AuthContext);
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    async function verifyUser() {
      try {
        await checkAuth();
      } catch {
        navigate("/");
      }
    }

    verifyUser();
  }, [navigate]);

  async function handleLogoutClick() {
    try {
      await logout();
      alert(`You logged out with success`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  function handleDashboard() {
    navigate("/dashboard");
  }
  function handleTasks() {
    navigate("/tasks");
  }
  function handleMyProfile() {
    navigate("/myProfile");
  }
  function handleSecurity() {
    navigate("/security");
  }
  function handleHelp() {
    navigate("/help");
  }
  return (
    <>
      {/* Menu PC */}
      <div className="relative w-screen h-dvh hidden lg:block bg-[#2D3035] overflow-x-hidden overflow-y-hidden ">
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-full flex justify-between
             h-18 2xl:h-25 items-center rounded-t-lg 
              border-b  border-gray-700 "
          >
            <h1 className="flex relative items-center
             text-gray-200  text-fluid-title">
              <Zap className="2xl:w-10 2xl:h-10 relative mr-1 ml-5 " />
              <span className="font-extrabold">Login</span>System
            </h1>
            <div className="absolute left-1/4 xl:left-[22%] 2xl:left-100">
              <span className="text-gray-500 text-fluid-nav">
                Dashboard {">"}{" "}
                <span className="text-white">General</span>
              </span>
            </div>
            <div className="flex items-center lg:gap-1.5 2xl:gap-8 
             min-[3840px]:gap-12">
              <div className="flex items-center relative">
                <Search
                  className="text-[#9CA3AF] 
                  w-5 2xl:w-6.5 2xl:h-6.5 2xl:left-8.5 left-8 
                  relative z-1  bg-none"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className=" w-60  2xl:w-140 2xl:h-14 h-10  pl-10 relative
                   border-[#3d4044] border rounded-lg
                   bg-[#2D3035] outline-0 text-gray-100 text-fluid-nav"
                />
              </div>

              <NotificationBell />

              <img
                src={userImg || imgUser}
                className=" w-10.5 h-10.5 2xl:w-14.5 2xl:h-14.5 rounded-4xl relative "
                alt="profile picture"
              />
              <div className="flex flex-col">
                <span className="text-white text-fluid-nav">{user}</span>
                <span className="text-gray-400 text-fluid-base">
                  Logado há {timeLogged}{" "}
                </span>
              </div>
              <ChevronDown className="text-white mr-4 2xl:w-10 2xl:h-10" />
            </div>
          </div>
        </nav>
        <nav
          className="absolute left-0 top-18 2xl:top-25 w-65
           2xl:min-w-100 h-[calc(100dvh-4.5rem)] flex flex-col justify-center
           pl-5 border-r 
         border-gray-600 text-white bg-[#1A1C20] z-10
           "
        >
          <div className=" flex flex-col items-center   relative ">
            <SideBarItem>
              <LayoutDashboard className=" mr-3 2xl:h-8 2xl:w-8 " />
              General
            </SideBarItem>
            <SideBarItem onClick={() => handleMyProfile()}>
              <User className=" mr-4 2xl:h-8 2xl:w-8" />
              My Profile
            </SideBarItem>
            <SideBarItem onClick={() => handleTasks()}>
              <ClipboardList className=" mr-4  2xl:h-8 2xl:w-8" />
              Tasks
            </SideBarItem>
            <SideBarItem onClick={() => handleSecurity()}>
              <Shield className=" mr-4 2xl:h-8 2xl:w-8" />
              Security
            </SideBarItem>
            <SideBarItem onClick={() => handleHelp()}>
              <ShieldQuestionMark className=" mr-4 2xl:h-8 2xl:w-8" />
              Help
            </SideBarItem>
            <SideBarItem onClick={() => handleLogoutClick()}>
              <LogOut className=" mr-4 2xl:h-8 2xl:w-8 " />
              Logout
            </SideBarItem>
          </div>
        </nav>
        <main className=" w-full  min-h-[calc(100dvh-4.5rem)] min-w-0
        flex py-6 mx-6 justify-center">
          <article className=" flex flex-row shrink w-150 
          2xl:max-w-155 2xl:h-70 h-65 bg-[#1B1D20] p-2.5 rounded-2xl gap-2">
            <img
              src={userImg || imgUser}
              className=" w-24.5 h-24.5  rounded-4xl relative "
              alt="profile picture"
            />
            <div className="flex flex-col ">
              <h1 className="text-fluid-title text-[#F1F0F8] 
              font-medium translate-y-4 tracking-wide pb-2">
                Welcome-back, {user}!
              </h1>
              <h3 className="text-fluid-nav
               text-[#A78BFA] tracking-widest font-semibold">
                Overview
              </h3>
              <p className="text-fluid-sm
               text-[#A5A8B5] font-mono tracking-wider relative
               translate-y-2.5 w-120  -translate-x-1/5 left-2 mb-2">
                Get an overview of your system, recent activity,
                and <br />
                key security details
              </p>
              <div className="max-h-25 flex flex-row justify-between gap-4 text-center -translate-x-2 shrink ">
                <div className=" w-43 2xl:w-45 p-1.5 rounded-2xl -translate-x-1/2 mt-4
                flex flex-row items-center  gap-2.5 bg-[#292B30] py-3 ">
                  <User className="w-10 h-10 p-1.5 bg-[#343844] rounded-3xl text-white" />
                  <p className="text-fluid-sm text-[#A5A8B5] flex flex-col font-medium">
                    Account status <span className="text-[#6EE7B7] items-center font-semibold ">
                      <span className="mr-0.5">⬤</span> Online </span>
                  </p>
                </div>
                <div className=" w-43 2xl:w-45 p-1.5 rounded-2xl -translate-x-1/2 mt-4
                flex flex-row items-center gap-2.5 bg-[#292B30] py-3">
                  <CalendarMonthIcon
                    sx={{
                      width: "40px",
                      height: "40px",
                      padding: "6px",
                      color: "white",
                      backgroundColor: "#343844",
                      borderRadius: "24px",
                    }}
                  />
                  <p className="text-fluid-sm text-[#A5A8B5] flex flex-col font-medium">
                    Member since <span className="text-[#A78BFA] items-center font-semibold ">
                      12/11/2025 </span>
                  </p>
                </div>
                <div className=" w-43 2xl:w-45 p-1.5 rounded-2xl -translate-x-1/2 mt-4
                flex flex-row items-center gap-2.5 bg-[#292B30] py-3">
                  <MonitorIcon
                    sx={{
                      width: "40px",
                      height: "40px",
                      padding: "8px",
                      color: "white",
                      backgroundColor: "#343844",
                      borderRadius: "24px",
                    }} />
                  <p className="text-fluid-sm text-[#A5A8B5] flex flex-col font-medium">
                    Current access <span className="text-[#6EE7B7] items-center font-semibold ">
                      <span className="mr-0.5">⬤</span> Online </span>
                  </p>
                </div>
              </div>
            </div>

          </article>
        </main>
      </div>
      {/* menu MOBILE*/}
      <div className="w-screen h-screen lg:hidden bg-[#2D3035]">
        <nav className="w-screen lg:hidden  flex justify-center">
          <div
            className="bg-[#1A1C20] w-full flex justify-between gap-2
             h-16 items-center px-3 border-b border-gray-700 text-gray-200 sm:px-4"
          >
            <div className="min-w-0">
              <h1 className="flex items-center whitespace-nowrap text-xl sm:text-2xl">
                <Zap className="mr-1 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="font-extrabold">Login</span>System
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-0 self-center">
              <button type="button" aria-label="Buscar" className="flex h-10 w-10
               items-center justify-center rounded-xl text-gray-400 
               transition-colors hover:bg-white/5 hover:text-white">
                <Search className="h-5 w-5" />
              </button>
              <NotificationBell />
              <div className="flex h-10 w-10 items-center justify-center">
                <img className="h-8 w-8 -translate-y-0.5 rounded-full object-cover sm:h-9 sm:w-9 
                lg:translate-y-0" src={imgUser || userImg} alt="Imagem do perfil" />
              </div>
            </div>
          </div>
        </nav>
        <footer className="fixed right-0 left-0 bottom-0 p-2 border-t-[#31353a] text-gray-200 rounded-t-2xl bg-[#1b1e22] backdrop-blur">
          <ul
            className="
              w-full
               flex flex-row items-center justify-between
               text-lg
               min-[600px]:text-2xl"
          >
            <SideBarMobile onClick={() => handleDashboard()}>
              <LayoutDashboard />
              <h2>General</h2>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleTasks()}>
              <ClipboardList />
              <h2>Tasks</h2>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleSecurity()}>
              <Shield />
              <h2>Security</h2>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleMyProfile()}>
              <User />
              <h2>User</h2>
            </SideBarMobile>
            <SideBarMobile onClick={() => setMoreOpen(true)}>
              <MoreHorizontal />
              <h2>More</h2>
            </SideBarMobile>
          </ul>
          <Drawer anchor="bottom"
            open={moreOpen}
            onClose={() => setMoreOpen(false)}
            ModalProps={{
              keepMounted: true,
            }}
            slotProps={{
              paper: {
                sx: {
                  bottom: "6rem",
                  height: "150px",
                  borderRadius: "16px 16px 0 0",
                  backgroundColor: "#1b1e22",
                  border: "1px solid #31353a",
                  color: "#fff",
                  padding: "10px 20px",
                },
              },
            }}
          >
            <div className="flex flex-col items-baseline  ">
              <button className=" w-full flex flex-row p-1.5 mt-4 gap-5 cursor-pointer hover:text-green-400 hover:rounded-2xl"
                onClick={() => handleHelp()}>
                <CircleHelp />
                <h2>Help</h2>
              </button>
              <div className="h-px w-full bg-gray-700 my-4" />
              <button className="w-full p-1.5 flex flex-row gap-5 text-amber-50  cursor-pointer hover:text-red-700 hover:rounded-2xl"
                onClick={() => handleLogoutClick()}>
                <LogOut className="translate-x-0.5" />
                <h2>Exit</h2>
              </button>
            </div>
          </Drawer>
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
