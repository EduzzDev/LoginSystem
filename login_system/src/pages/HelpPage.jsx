import { checkAuth } from "../services/api";
import { logout } from "../services/api";
import SideBarItem from "../components/SideBarItem";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { User } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Shield } from "lucide-react";
import { ShieldQuestionMark } from "lucide-react";
import { LogOut } from "lucide-react";
import { Zap } from "lucide-react";
import userImg from "../assets/userImg.png";
import { AuthContext } from "../context/authContext";
import SideBarMobile from "../components/SideBarMobile";
import { UserCircle } from "lucide-react";

function HelpPage() {
  const navigate = useNavigate();
  const { user, timeLogged } = useContext(AuthContext);

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
  return (
    <>
      {/* Menu PC */}
      <div className=" w-screen h-screen hidden lg:block bg-[#2D3035] ">
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-[80%] flex justify-between
             h-18 items-center rounded-t-lg -translate-x-0.5  border-b  border-gray-700 "
          >
            <div className=" flex ml-4">
              <span className="text-gray-500 flex-col  text-[18px] mr-2">
                Dashboard {">"}{" "}
                <span className="text-white text-[18px]">Help</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center relative">
                <Search
                  className="text-[#9CA3AF] w-5 left-8
                              relative z-1  bg-none"
                />
                <input
                  type="text"
                  placeholder="Buscar"
                  className=" w-60 h-10  pl-10 relative
                   border-[#3d4044] border rounded-lg
                   bg-[#2D3035] outline-0 text-gray-100"
                />
              </div>
              <Bell className="text-gray-400" />
              <img src={userImg} className="w-10" alt="" />
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
        <nav className=" w-[20%] h-full flex flex-col justify-between pl-6 border-r border-gray-600  absolute bottom-0 text-white bg-[#1A1C20] ">
          <h1 className="flex relative text-3xl top-4.5 items-center text-gray-200">
            <Zap className="relative mr-1 ml-1 " />
            <span className="font-extrabold">Login</span>System
          </h1>
           <ul className="flex flex-col items-baseline">
            <SideBarItem onClick={() => handleDashboard()}>
              <LayoutDashboard className=" mr-3 ml-2" />
              General
            </SideBarItem>
            <SideBarItem onClick={() => handleMyProfile()}>
              <User className=" mr-4 ml-1" />
              My Profile
            </SideBarItem>
            <SideBarItem onClick={() => handleTasks()}>
              <ClipboardList className=" mr-4 ml-1" />
              Tasks
            </SideBarItem>
            <SideBarItem onClick={() => handleSecurity()}>
              <Shield className=" mr-4 ml-1" />
              Security
            </SideBarItem>
            <SideBarItem>
              <ShieldQuestionMark className=" mr-4 ml-1" />
              Help
            </SideBarItem>
          </ul>
          <SideBarItem onClick={() => handleLogoutClick()}>
            <LogOut className=" mr-4 ml-1" />
            Logout
          </SideBarItem>
        </nav>
      </div>
    </>
  );
}
export default HelpPage;
