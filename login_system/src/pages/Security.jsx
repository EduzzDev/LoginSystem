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
import DoneIcon from '@mui/icons-material/Done';
import { getUserProfile, revokeUser } from "../services/api";
import toast from 'react-hot-toast';

function Security() {
  const navigate = useNavigate();
  const { user, timeLogged, imgUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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
  function handleSecurity() {
    navigate("/security");
  }
  function handleMyProfile() {
    navigate("/myProfile");
  }
  function handleHelp() {
    navigate("/help");
  }
  //get dos dados de segurança
  useEffect(() => {
    async function loadUserData() {
      try {
        const response = await getUserProfile();
        setUserInfo(response);
      } catch (err) {
        console.error("Error loading security data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  async function handleRevoke(jti) {
    const loadingToast = toast.loading("Revoking access...");
    try {
      await revokeUser(jti);
      setUserInfo(prev => ({
        ...prev,
        session: prev.session.filter(s => s.jti !== jti)
      }));
      toast.dismiss(loadingToast);
      toast.success("Access successfully revoked");
    } catch (err) {
      console.error("Error whilst revoking access:", err);
      toast.dismiss(loadingToast);
      toast.error("Erro ao revogar acesso.");
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center p-8 bg-[#1e1f29] rounded-xs">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Menu PC */}
      <div className="relative w-screen h-screen  hidden lg:block bg-[#2D3035] overflow-x-hidden overflow-y-hidden ">
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-full flex justify-between
             h-18 items-center rounded-t-lg   border-b  border-gray-700 "
          >
            <h1 className="flex  relative text-3xl  items-center text-gray-200">
              <Zap className="relative mr-1 ml-1 " />
              <span className="font-extrabold">Login</span>System
            </h1>
            <div className=" flex  absolute left-1/5 2xl:left-1/8 ml-2 right-0">
              <span className="text-gray-500 flex-col  text-[18px]">
                Dashboard {">"}{" "}
                <span className="text-white text-[18px]">Security</span>
              </span>
            </div>
            <div className="flex items-center gap-4 max-2xl:gap-8  min-[3840px]:gap-12">
              <div className="flex items-center relative">
                <Search
                  className="text-[#9CA3AF] w-5 left-8
                              relative z-1  bg-none"
                />
                <input
                  type="text"
                  placeholder="Buscar"
                  className=" w-60 2xl:w-120 h-10  pl-10 relative
                   border-[#3d4044] border rounded-lg
                   bg-[#2D3035] outline-0 text-gray-100"
                />
              </div>
              <Bell className="text-gray-400" />
              <img
                src={imgUser || userImg}
                className=" w-10 h-10 rounded-4xl"
                alt="imagem de usuario"
              />
              <div className="flex flex-col">
                <span className="text-white text-[16px]">{user}</span>
                <span className="text-gray-400 text-[14px]">
                  Logado há {timeLogged}{" "}
                </span>
              </div>
              <ChevronDown className="text-white mr-4" />
            </div>
          </div>
        </nav>
        <nav
          className="absolute left-0 top-18 w-[22%] xl:w-[18%] 2xl:w-[12%] h-[calc(100vh-4.5rem)] flex flex-col justify-center
           pl-5 border-r 
         border-gray-600 text-white bg-[#1A1C20] 
           "
        >
          <div className=" flex flex-col items-center   relative ">
            <SideBarItem onClick={() => handleDashboard()}>
              <LayoutDashboard className=" mr-3 " />
              General
            </SideBarItem>
            <SideBarItem onClick={() => handleMyProfile()}>
              <User className=" mr-4 " />
              My Profile
            </SideBarItem>
            <SideBarItem onClick={() => handleTasks()}>
              <ClipboardList className=" mr-4 " />
              Tasks
            </SideBarItem>
            <SideBarItem>
              <Shield className=" mr-4" />
              Security
            </SideBarItem>
            <SideBarItem onClick={() => handleHelp()}>
              <ShieldQuestionMark className=" mr-4 " />
              Help
            </SideBarItem>
            <SideBarItem onClick={() => handleLogoutClick()}>
              <LogOut className=" mr-4 " />
              Logout
            </SideBarItem>
          </div>
        </nav>
        {/* PC */}
        <div className=" w-205 max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 p-6 
         text-gray-100 mx-auto space-y-4 z-10 relative translate-y-2   rounded-2xl left-10 md:left-18 md:translate-x-10 ">
          <div className="bg-[#1e1f26] border border-gray-800 rounded-xl p-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold">Account Security</h1>
              <p className="text-sm text-gray-400">Manage your account security and active sessions.</p>
            </div>
            <p className="text-[14px] font-normal">Your account is protected </p>
            <div className="space-y-3">
              <div className="flex  items-center justify-between p-3 bg-[#252630] rounded-lg">
                <div className=" flex flex-row gap-2">
                  <p className="font-medium text-sm px-2"><span className="text-green-500">
                    <DoneIcon />
                  </span> Password</p>
                  <p className="font-medium text-sm ">
                    <span className="text-green-500">
                      <DoneIcon />
                    </span>
                    Sessions
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1e1f26] border border-gray-800 rounded-xl p-6 space-y-4 ">
            <h2 className="text-lg font-semibold">Active Sessions</h2>
            <p className="text-[14px] font-normal">Manage devices currently signed in:</p>

            <div className="space-y-3">
              {userInfo?.session?.map((sessao) => (
                <div key={sessao.jti} className="flex items-center justify-between p-3 bg-[#252630] rounded-lg">
                  <div>
                    <p className="font-medium text-sm">
                      {sessao.device_info} <span className="text-xs text-gray-400">{sessao.ip_address}</span>
                    </p>
                    <span className="text-xs text-green-400">● Active Now</span>
                  </div>

                  <button
                    onClick={() => handleRevoke(sessao.jti)}
                    className="text-xs text-red-400 hover:text-red-300 border
                     border-red-500/30 px-3 py-1.5 rounded-md transition cursor-pointer"
                  >
                    Revoke Access
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1e1f26] border border-gray-800 rounded-xl p-6 space-y-4 col-span-2 max-w-3xl items-center">
            <h2 className="text-lg font-semibold text-center -translate-1.5">Activity History</h2>

            <div className="overflow-x-auto ">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="pb-3 font-medium">Action</th>
                    <th className="pb-3 font-medium">Date and Time</th>
                    <th className="pb-3 font-medium">Device / IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {userInfo?.session?.map((item, index) => {
                    const dataFormatada = new Date(item.created_at).toLocaleString('en-US', {
                      hour12: false
                    }); return (
                      <tr key={item.id || index}>
                        <td className="py-3">Login successfully</td>
                        <td className="py-3 text-gray-400">{dataFormatada}</td>
                        <td className="py-3 text-gray-400">{item.device_info || item.ip_address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Menu Mobile*/}
      <div className="w-full  min-h-screen lg:hidden bg-[#2D3035]">
        <nav className="w-full lg:hidden  flex justify-center">
          <div
            className="bg-[#1A1C20] w-full flex justify-between
             h-18 items-center rounded-t-lg -translate-x-0.5  border-b  border-gray-700 text-gray-200 "
          >
            <div className=" flex ml-1.5">
              <h1 className="flex relative text-2xl  justify-center items-center">
                <Zap className="relative mr-1 ml-1 " />
                <span className="font-extrabold">Login</span>System
              </h1>
            </div>
            <div className=" flex justify-center items-center mr-2 gap-3.5 p-1.5">
              <Search />
              <UserCircle />
            </div>
          </div>
        </nav>

        <div className="w-full mb-5 pt-6 min-[430px]:w-100 md:w-180 md:grid md:grid-cols-2 
        flex flex-col gap-5 p-4 text-gray-100 mx-auto pb-25">
          <div className="bg-[#1e1f26] border border-gray-800 rounded-xl p-5 space-y-4">
            <div>
              <h1 className="text-xl font-bold">Account Security</h1>
              <p className="text-xs text-gray-400 mt-1">Manage your account security and active sessions.</p>
            </div>

            <p className="text-xs font-normal text-gray-300">Your account is protected</p>

            <div className="p-3 bg-[#252630] rounded-lg">
              <div className="flex flex-row items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <DoneIcon className="text-green-500 text-sm" /> Password
                </span>
                <span className="flex items-center gap-1.5">
                  <DoneIcon className="text-green-500 text-sm" /> Sessions
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#1e1f26] border border-gray-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-semibold">Active Sessions</h2>
            <p className="text-xs text-gray-400">Manage devices currently signed in:</p>

            <div className="space-y-3">
              {userInfo?.session?.map((sessao) => (
                <div key={sessao.jti} className="flex items-center justify-between gap-2 p-3
                 bg-[#252630] rounded-lg">
                  <div className="min-w-0">
                    <p className="font-medium text-xs text-gray-200 truncate">
                      {sessao.device_info} <span className="text-[10px] text-gray-400 block">{sessao.ip_address}</span>
                    </p>
                    <span className="text-[10px] text-green-400 font-medium">● Active Now</span>
                  </div>

                  <button
                    onClick={() => handleRevoke(sessao.jti)}
                    className="shrink-0 text-[11px] text-red-400 hover:text-red-300 border border-red-500/30 px-2.5 py-1.5 rounded-md transition cursor-pointer"
                  >
                    Revoke Access
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1e1f26] border border-gray-800 rounded-xl p-5 space-y-4 md:min-w-full">
            <h2 className="text-base font-semibold text-center">Activity History</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[320px] md:min-w-85">
                <thead className="text-gray-400 border-b border-gray-800">
                  <tr>
                    <th className="pb-2 font-medium">Action</th>
                    <th className="pb-2 font-medium">Date and Time</th>
                    <th className="pb-2 font-medium">Device / IP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-gray-300">
                  {userInfo?.session?.map((item, index) => {
                    const dataFormatada = new Date(item.created_at).toLocaleString('en-US', {
                      hour12: false
                    });
                    return (
                      <tr key={item.id || index}>
                        <td className="py-2.5 pr-2">Login successfully</td>
                        <td className="py-2.5 pr-2 text-gray-400 whitespace-nowrap">{dataFormatada}</td>
                        <td className="py-2.5 text-gray-400">{item.device_info || item.ip_address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
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
export default Security;
