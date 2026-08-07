import { checkAuth, getUserProfile, updateUserProfile } from "../services/api";
import { logout } from "../services/api";
import SideBarItem from "../components/SideBarItem";
import { useEffect, useContext, useState } from "react";
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
import ProfileInput from "../components/ProfileInput";
import SectionTitle from "../components/SectionTitle";
import toast from "react-hot-toast";

function MyProfile() {
  const navigate = useNavigate();
  const { user, timeLogged } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("Developer");
  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user);

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

  useEffect(() => {
    async function loadUserData() {
      try {
        const data = await getUserProfile();

        setName(data.nome || user);
        setEmail(data.email);
        setCargo(data.cargo);
      } catch (err) {
        toast.error(
          err?.message || "Error loading profile data. Please try again later.",
        );
        navigate("/");
      }
    }

    loadUserData();
  }, [navigate, user]);

  async function handleLogoutClick() {
    try {
      await logout();
      toast.success(`You logged out with success`);
      navigate("/");
    } catch (err) {
      toast.error(err);
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
  const handleSave = async () => {
    try {
      const result = await updateUserProfile(name, email, cargo, newPassword);
      localStorage.setItem("userNome", name);
      toast.success("Saved successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    }
  };

  return (
    <>
      {/* Menu PC */}
      <div className="relative w-screen h-screen hidden lg:block bg-[#2D3035] overflow-x-hidden overflow-y-hidden ">
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-full flex justify-between
             h-18 items-center rounded-t-lg   border-b  border-gray-700 "
          >
            <h1 className="flex  relative text-3xl  items-center text-gray-200">
              <Zap className="relative mr-1 ml-1 " />
              <span className="font-extrabold">Login</span>System
            </h1>
            <div className=" flex  absolute left-1/5 ml-2 right-0">
              <span className="text-gray-500 flex-col  text-[18px]">
                Dashboard {">"}{" "}
                <span className="text-white text-[18px]">My Profile</span>
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
        <nav
          className="  w-[22%] xl:w-[18%] h-full  flex flex-col justify-center
           pl-5 border-r 
         border-gray-600  relative  text-white bg-[#1A1C20] 
           "
        >
          <div className=" flex flex-col items-center   relative ">
            <SideBarItem onClick={() => handleDashboard()}>
              <LayoutDashboard className=" mr-3 " />
              General
            </SideBarItem>
            <SideBarItem>
              <User className=" mr-4 " />
              My Profile
            </SideBarItem>
            <SideBarItem onClick={() => handleTasks()}>
              <ClipboardList className=" mr-4 " />
              Tasks
            </SideBarItem>
            <SideBarItem onClick={() => handleSecurity()}>
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
        <main className="w-full flex justify-center  bottom-1/1 relative">
          {isEditing ? (
            <header
              className="w-[50dvw] h-80 relative top-5 p-2 flex  bg-[#3F434C] 
          rounded-2xl"
            >
              <img className="w-30 h-30 mr-5 relative top-10" src={userImg} />
              <div className=" flex flex-col gap-1">
                <SectionTitle className="text-lg text-gray-400">
                  Name:
                </SectionTitle>
                <ProfileInput
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength={2}
                  maxLength={100}
                />
                <SectionTitle className="text-gray-400 text-lg">
                  Job Title:
                </SectionTitle>
                <ProfileInput
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  minLength={2}
                  maxLength={100}
                />
                <SectionTitle className="text-lg text-gray-400">
                  Email:
                </SectionTitle>
                <ProfileInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  minLength={5}
                  maxLength={254}
                />
                <SectionTitle className="text-white flex items-center gap-2">
                  Senha:
                </SectionTitle>
                <ProfileInput
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={5}
                  maxLength={72}
                  required
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div className="w-full flex justify-end items-baseline text-white ">
                <button
                  onClick={handleSave}
                  className="w-40 bg-[#6366F1] p-2 rounded-xl 
              relative top-2 right-2 hover:bg-[#1F2937] hover:text-white border cursor-pointer"
                >
                  Save changes
                </button>
              </div>
            </header>
          ) : (
            <header
              className="w-[50dvw] relative top-5 p-2 flex  bg-[#3F434C] 
          rounded-2xl gap-1"
            >
              <img className="w-30 h-30 mr-5 " src={userImg} />
              <div className=" w-full flex flex-col gap-0.5">
                <h1 className="text-4xl text-white font-bold"> {name}</h1>
                <SectionTitle className="text-white text-lg">
                  Job Title: <span className="text-gray-400">{cargo}</span>
                </SectionTitle>
                <SectionTitle className="text-white text-lg">
                  Email: <span className="text-gray-400">{email}</span>
                </SectionTitle>
                <SectionTitle className="text-white flex items-center gap-2">
                  Senha:
                  <span className=" tracking-[0.3rem] text-xl">••••••••</span>
                </SectionTitle>
              </div>
              <div className="w-full flex justify-end items-baseline text-white ">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-40 bg-[#6366F1] p-2 rounded-xl 
              relative top-2 right-2 hover:bg-[#1F2937] hover:text-white border cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>
            </header>
          )}
        </main>
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
          <ul
            className=" w-full flex flex-row items-center 
          justify-between py-1 max-[350px]:-ml-2 relative  max-[350px]:text-[16px]
          text-lg min-[600px]:text-2xl min-[600px]:px-[5.5dvw]"
          >
            <SideBarMobile onClick={() => handleDashboard()}>
              <LayoutDashboard />
              <SectionTitle>General</SectionTitle>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleTasks()}>
              <ClipboardList />
              <SectionTitle>Tasks</SectionTitle>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleSecurity()}>
              <Shield />
              <SectionTitle>Security</SectionTitle>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleMyProfile()}>
              <User />
              <SectionTitle>User</SectionTitle>
            </SideBarMobile>
            <SideBarMobile onClick={() => handleLogoutClick()}>
              <LogOut />
              <SectionTitle>Exit</SectionTitle>
            </SideBarMobile>
          </ul>
        </footer>
      </div>
    </>
  );
}
export default MyProfile;
