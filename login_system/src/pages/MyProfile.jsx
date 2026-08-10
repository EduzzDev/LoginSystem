import { checkAuth, getUserProfile, updateUserProfile } from "../services/api";
import { logout } from "../services/api";
import SideBarItem from "../components/SideBarItem";
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Pencil,
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
} from "lucide-react";
import userImg from "../assets/userImg.png";
import { AuthContext } from "../context/authContext";
import SideBarMobile from "../components/SideBarMobile";
import ProfileInput from "../components/ProfileInput";
import SectionTitle from "../components/SectionTitle";
import toast from "react-hot-toast";

function MyProfile() {
  const navigate = useNavigate();
  const { user, timeLogged } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: user,
    email: "",
    cargo: "Developer",
    newPassword: "",
    previewImg: userImg,
  });
  const [imgFile, setImgFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

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

        setProfile((prev) => ({
          ...prev,
          name: data.nome || user,
          email: data.email || "",
          cargo: data.cargo || prev.cargo,
          previewImg: data.urlImg || prev.previewImg,
        }));
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
  async function updateProfile(formData) {
    await updateUserProfile(formData);
    localStorage.setItem("userNome", profile.name);
    toast.success("Saved successfully");
    setIsEditing(false);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("cargo", profile.cargo);
    formData.append("newPassword", profile.newPassword);
    if (imgFile) {
      formData.append("foto", imgFile);
    }

    try {
      await updateProfile(formData);
    } catch (error) {
      toast.error((error && error.message) || "Invalid credentials.");
    }
  };

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, previewImg: imageUrl }));
      setImgFile(file);
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
              <img
                src={profile.previewImg}
                className="w-10 h-10 rounded-4xl"
                alt="preview img"
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
        <main className="w-full flex justify-center  bottom-1/1 relative gao">
          {isEditing ? (
            <header
              className="w-[50dvw] h-80 relative top-5 p-2 flex  bg-[#3F434C] 
          rounded-2xl gap-5"
            >
              <form
                ref={formRef}
                onSubmit={handleSave}
                encType="multipart/form-data"
                className="flex justify-center gap-8"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-30 ml-4 group relative  overflow-hidden rounded-2xl">
                    <img
                      className="w-50 h-30 object-cover transition-transform
                      duration-200 group-hover:scale-115"
                      src={profile.previewImg}
                      alt="Profile preview"
                      onClick={() => fileInputRef.current.click()}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="absolute inset-0 flex items-center justify-center rounded-2xl
                       bg-black/40 opacity-0 transition-all duration-200 group-hover:opacity-100"
                    >
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-full
                       border border-white/20 bg-[#1F2937]/80 text-white shadow-lg"
                      >
                        <Pencil className="h-5 w-5" />
                      </span>
                    </button>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <div className=" flex flex-col gap-1">
                  <SectionTitle className="text-lg text-gray-400">
                    Name:
                  </SectionTitle>
                  <ProfileInput
                    name="name"
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      handleProfileChange("name", e.target.value)
                    }
                    minLength={2}
                    maxLength={100}
                  />
                  <SectionTitle className="text-gray-400 text-lg">
                    Job Title:
                  </SectionTitle>
                  <ProfileInput
                    name="jobTitle"
                    value={profile.cargo}
                    onChange={(e) =>
                      handleProfileChange("cargo", e.target.value)
                    }
                    minLength={2}
                    maxLength={100}
                  />
                  <SectionTitle className="text-lg text-gray-400">
                    Email:
                  </SectionTitle>
                  <ProfileInput
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      handleProfileChange("email", e.target.value)
                    }
                    minLength={5}
                    maxLength={254}
                  />
                  <SectionTitle className="text-white flex items-center gap-2">
                    Senha:
                  </SectionTitle>
                  <ProfileInput
                    value={profile.newPassword}
                    onChange={(e) =>
                      handleProfileChange("newPassword", e.target.value)
                    }
                    minLength={5}
                    maxLength={72}
                    required
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="w-full flex justify-end items-baseline text-white ">
                  <button
                    type="submit"
                    className="w-40 bg-[#6366F1] p-2 rounded-xl
                relative top-5 right-2 hover:bg-[#1F2937] hover:text-white border cursor-pointer"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </header>
          ) : (
            <header
              className="w-[50dvw] relative top-5 p-2 flex  bg-[#3F434C] 
          rounded-2xl gap-1"
            >
              <img
                className="w-30 h-30 mr-5 rounded-3xl "
                src={profile.previewImg}
              />
              <div className=" w-full flex flex-col gap-0.5">
                <h1 className="text-4xl text-white font-bold">
                  {" "}
                  {profile.name}
                </h1>
                <SectionTitle className="text-white text-lg">
                  Job Title:{" "}
                  <span className="text-gray-400">{profile.cargo}</span>
                </SectionTitle>
                <SectionTitle className="text-white text-lg">
                  Email: <span className="text-gray-400">{profile.email}</span>
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
