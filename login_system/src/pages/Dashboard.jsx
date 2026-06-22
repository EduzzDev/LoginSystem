import { checkAuth } from "../services/api";
import { logout } from "../services/api";
import SideBarItem from "../components/SideBarItem";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, UserCircle } from "lucide-react";
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

function Dashboard() {
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

  function handleTasks() {
    navigate("/tasks");
  }
  function myProfile() {
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
      <div className=" w-screen h-screen hidden lg:block bg-[#2D3035] ">
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-[80%] flex justify-between
             h-18 items-center rounded-t-lg -translate-x-0.5  border-b  border-gray-700 "
          >
            <div className=" flex ml-4">
              <span className="text-gray-500 flex-col  text-[18px] mr-2">
                Dashboard {">"}{" "}
                <span className="text-white text-[18px]">Geral</span>
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
            <SideBarItem>
              <LayoutDashboard className=" mr-3 ml-2" />
              Geral
            </SideBarItem>
            <SideBarItem onClick={() => myProfile()}>
              <User className=" mr-4 ml-1" />
              Meu Perfil
            </SideBarItem>
            <SideBarItem onClick={() => handleTasks()}>
              <ClipboardList className=" mr-4 ml-1" />
              Tarefas
            </SideBarItem>
            <SideBarItem onClick={() => handleSecurity()}>
              <Shield className=" mr-4 ml-1" />
              Segurança
            </SideBarItem>
            <SideBarItem onClick={() => handleHelp()}>
              <ShieldQuestionMark className=" mr-4 ml-1" />
              Ajuda
            </SideBarItem>
            <SideBarItem onClick={() => handleLogoutClick()}>
              <LogOut className=" mr-4 ml-1" />
              Sair
            </SideBarItem>
          </ul>
          <SideBarItem onClick={() => handleLogoutClick()}>
            <LogOut className=" mr-4 ml-1" />
            Sair
          </SideBarItem>
        </nav>
      </div>
      {/* menu MOBILE*/}
      <div className="w-screen h-screen lg:hidden bg-[#2D3035]">
        <nav className="w-screen lg:hidden  flex justify-center">
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
        <footer
          className=" fixed right-0 left-0 bottom-0 p-2
         border-[#31353a] text-gray-200 border-t-2"
        >
          <ul className=" w-full flex flex-row items-center 
          justify-between py-1 px-[1.5dvw] 
          text-lg min-[600px]:text-2xl min-[600px]:px-[5.5dvw]">
            <SideBarMobile >
              <LayoutDashboard />
              <h2>General</h2>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleTasks()}>
              <ClipboardList/>
                <h2>Tasks</h2>
              </SideBarMobile>
                <SideBarMobile onClick={() => handleSecurity()} >
                  <Shield/>
                <h2>Security</h2>
              </SideBarMobile>
               <SideBarMobile onClick={() => myProfile()} >
                  <User/>
                <h2>User</h2>
              </SideBarMobile>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Dashboard;
