import { checkAuth, getUserProfile, updateUserProfile } from "../services/api";
import { logout } from "../services/api";
import SideBarItem from "../components/SideBarItem";
import SideBarMobile from "../components/SideBarMobile";
import ProfileInput from "../components/ProfileInput";
import SectionTitle from "../components/SectionTitle";
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Pencil,
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
  CircleHelp,
} from "lucide-react";
import userImg from "../assets/userImg.png";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";
import LockIcon from "@mui/icons-material/Lock";
import Drawer from "@mui/material/Drawer";
import PersonIcon from "@mui/icons-material/Person";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box, InputAdornment, IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function MyProfile() {
  const navigate = useNavigate();
  const { user, timeLogged } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: user,
    email: "",
    cargo: "Developer",
    currentPassword: "",
    newPassword: "",
    previewImg: userImg,
  });
  const [imgFile, setImgFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false)
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
    const result = await updateUserProfile(formData);
    localStorage.setItem("userNome", profile.name);
    if (result?.urlImg) {
      localStorage.setItem("urlImg", result?.urlImg);

      setProfile((prev) => ({ ...prev, previewImg: result?.urlImg }));
    }
    toast.success("Saved successfully");
    setIsEditing(false);
  }
  const handleOpenModalClick = async (e) => {
    e.preventDefault();
    setIsModalOpen(!isModalOpen);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("cargo", profile.cargo);
    formData.append("newPassword", profile.newPassword);
    formData.append("currentPassword", profile.currentPassword);
    if (imgFile) {
      formData.append("foto", imgFile);
    }
    try {
      await updateProfile(formData);
      setIsModalOpen(false);
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
      <div className="relative w-screen h-screen  hidden lg:block bg-[#2D3035] 
      overflow-x-hidden overflow-y-hidden ">
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-full flex justify-between
             h-18 items-center rounded-t-lg   border-b  border-gray-700 "
          >
            <h1 className="flex  relative text-3xl  items-center text-gray-200 2xl:translate-x-4">
              <Zap className="relative mr-1 ml-1 " />
              <span className="font-extrabold ">Login</span>System
            </h1>
            <div className=" flex  absolute left-1/5 2xl:left-1/8 ml-2 right-0">
              <span className="text-gray-500 flex-col text-[18px] ">
                Dashboard {">"}{" "}
                <span className="text-white text-[18px]">My Profile</span>
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
                  className=" w-60 2xl:w-120  h-10  pl-10 relative
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
                <span className="text-white text-[16px] 2xl:text-2xl">{user}</span>
                <span className="text-gray-400 text-[14px] 2xl:text-md">
                  Logado há {timeLogged}{" "}
                </span>
              </div>
              <ChevronDown className="text-white mr-4" />
            </div>
          </div>
        </nav>
        <nav
          className="  w-[22%] xl:w-[18%] 2xl:w-[12%]  h-full  flex flex-col justify-center
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
        <main className="w-full flex justify-center  bottom-1/1 relative ">
          {isEditing ? (
            <header
              className="w-[50dvw] max-[1100px]:w-[58dvw] 
              2xl:max-w-[30dvw] min-[3840px]:w-[22dvw] h-auto min-h-100
                relative top-5 flex flex-col lg:left-10 bg-[#3F434C] 
                 rounded-2xl translate-x-5 pb-8  justify-center mx-px "
            >
              <div className="w-full flex justify-between items-center px-6 py-4">
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setIsEditing(false)}
                  sx={{
                    color: "#818CF8",
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    textTransform: "none",
                    fontSize: "15px",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.2)" },
                  }}
                >
                  Back
                </Button>

                <button
                  type="button"
                  onClick={handleOpenModalClick}
                  className="bg-[#6366F1] px-6 py-2 rounded-xl text-white font-medium
                   hover:bg-[#4F46E5] transition-colors cursor-pointer shadow-md"
                >
                  Save changes
                </button>
              </div>

              <hr className="w-full border-t border-gray-500/30 mb-8" />

              <form
                ref={formRef}
                onSubmit={handleSave}
                encType="multipart/form-data"
                className="w-full h-full flex  mx-auto justify-center "
              >
                <div className="flex flex-col items-center justify-baseline gap-2">
                  <div className="w-30 group relative overflow-hidden
                   rounded-2xl right-4 mr-2 -translate-x-4 mx-auto">
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
                <div className=" flex flex-col gap-1 relative justify-center">
                  <SectionTitle>Name:</SectionTitle>
                  <ProfileInput
                    name="name"
                    type="text"
                    icon={<PersonIcon fontSize="small" />}
                    value={profile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    minLength={2}
                    maxLength={100}
                  />
                  <SectionTitle>Job Title:</SectionTitle>
                  <ProfileInput
                    name="jobTitle"
                    icon={<WorkOutlineOutlinedIcon fontSize="small" />}
                    value={profile.cargo}
                    onChange={(e) => handleProfileChange("cargo", e.target.value)}
                    minLength={2}
                    maxLength={100}
                  />
                  <SectionTitle>Email:</SectionTitle>
                  <ProfileInput
                    name="email"
                    type="email"
                    icon={<EmailOutlinedIcon fontSize="small" />}
                    value={profile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    minLength={5}
                    maxLength={254}
                  />
                  <SectionTitle className=" flex items-center gap-2">
                    Senha:
                  </SectionTitle>
                  <div className="w-full flex flex-row justify-end items-center">
                    <ProfileInput
                      type={mostrarSenha ? "text" : "password"}
                      value={profile.newPassword}
                      icon={<LockIcon fontSize="small" />}
                      onChange={(e) =>
                        handleProfileChange("newPassword", e.target.value)
                      }
                      minLength={5}
                      maxLength={72}
                      required
                      placeholder="•••••••••••"
                    />
                    <button
                      type="button"
                      className=" absolute right-3 text-amber-50 cursor-pointer"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                      {mostrarSenha ? <LockOpenIcon /> : <LockIcon />}
                    </button>
                  </div>
                </div>

                <Dialog
                  open={isModalOpen}
                  maxWidth="sm"
                  fullWidth
                  onClose={() => setIsModalOpen(false)}
                  slotProps={{
                    paper: {
                      sx: {
                        backgroundColor: "#000",
                        color: "#fff",
                        overflow: "visible !important",
                        position: "relative",
                        marginTop: "48px",
                        borderRadius: "14px",
                        m: { xs: 2, sm: 4 },
                        width: { xs: "calc(100% - 32px)", sm: "100%" }
                      },
                    },
                  }}
                >
                  <DialogContent className="text-gray-400 flex justify-center items-center flex-col">
                    <p
                      className="text-gray-400"
                      style={{
                        fontSize: "16px",
                        marginBottom: "16px",
                        fontWeight: "normal",
                      }}
                    >
                      Enter your current password to update your profile
                    </p>
                    <div className="w-full flex flex-row justify-center items-center">
                      <TextField
                        autoFocus
                        fullWidth
                        type={mostrarSenha ? "text" : "password"}
                        label="Current Password"
                        variant="outlined"
                        value={profile.currentPassword}
                        onChange={(e) => handleProfileChange("currentPassword", e.target.value)}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setMostrarSenha(!mostrarSenha)}
                                  edge="end"
                                  sx={{ color: "#6c5ce7" }}
                                >
                                  {mostrarSenha ? <LockOpenIcon /> : <LockIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": { color: "white" },
                          "& .MuiInputLabel-root": { color: "gray" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#6c5ce7",
                            borderRadius: "20px",
                          },
                          "& :hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9D00FF",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9D00FF",
                          },
                        }}
                      />

                    </div>
                  </DialogContent>
                  <DialogActions className="bg-black" sx={{ padding: "18px" }}>
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      sx={{
                        backgroundColor: "#6c5ce7",
                        width: " 12dvw",
                        height: "7dvh",
                        borderRadius: "14px",
                        fontSize: "16px",
                        fontFamily: "system-ui",
                        "&:hover": { backgroundColor: "#5b4bc4" },
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            </header>
          ) : (
            <header
              className="w-[50dvw] 2xl:w-[32dvw]  relative top-5 p-2 flex  bg-[#3F434C] 
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
                  className="w-30 bg-[#6366F1] p-2 rounded-xl 
              relative top-2 xl:right-2 hover:bg-[#1F2937] hover:text-white border cursor-pointer"
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
              <img className="w-10 h-11 rounded-4xl" src={profile.previewImg} alt="previewImg" />
            </div>
          </div>
        </nav>
        <main className="w-full flex justify-center relative ">
          {isEditing ? (
            <header
              className="w-80 h-102 min-[400px]:w-100 min-[600px]:w-120 
               relative top-2 p-2 flex flex-col  bg-[#3F434C] 
          rounded-2xl">
              <div className="w-full flex justify-between items-center px-2 py-2">
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => setIsEditing(false)}
                  sx={{
                    color: "#818CF8",
                    backgroundColor: "rgba(99, 102, 241, 0.1)",
                    textTransform: "none",
                    fontSize: "15px",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.2)" },
                  }}
                >
                  Back
                </Button>

                <button
                  type="button"
                  onClick={handleOpenModalClick}
                  className="bg-[#6366F1] px-4 py-2 rounded-xl text-white font-medium
                   hover:bg-[#4F46E5] transition-colors cursor-pointer shadow-md"
                >
                  Save changes
                </button>
              </div>

              <hr className="w-full border-t border-gray-500/30 mb-5" />

              <form
                ref={formRef}
                onSubmit={handleSave}
                encType="multipart/form-data"
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-30 ml-4 group relative  overflow-hidden rounded-2xl bottom-3.5">
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

                <div className=" w-40 min-[600px]:w-50 ml-5 grid grid-cols-2 gap-2 ">
                  <SectionTitle>
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
                  <SectionTitle>
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
                  <SectionTitle>
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
                  <SectionTitle className="  flex items-center ">
                    Senha:
                  </SectionTitle>
                  <div className=" flex flex-row justify-baseline items-center  ">
                    <ProfileInput
                      type={mostrarSenha ? "text" : "password"}
                      value={profile.newPassword}
                      onChange={(e) =>
                        handleProfileChange("newPassword", e.target.value)
                      }
                      minLength={5}
                      maxLength={72}
                      required
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="-translate-x-10 text-amber-50 cursor-pointer"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                      {mostrarSenha ? <LockOpenIcon /> : <LockIcon />}
                    </button>
                  </div>
                </div>

                <Dialog
                  open={isModalOpen}
                  maxWidth="sm"
                  fullWidth
                  onClose={() => setIsModalOpen(true)}
                  slotProps={{
                    paper: {
                      sx: {
                        backgroundColor: "#000",
                        color: "#fff",
                        overflow: "visible !important",
                        position: "relative",
                        marginTop: "48px",
                        borderRadius: "14px",
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-36px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#2D3035",
                      border: "2px solid #9D00FF",
                      borderRadius: "12px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0px 8px 24px rgba(0,0,0,0.5)",
                      zIndex: 10,
                      fontSize: "2.5rem",
                      color: "white",
                    }}
                  >
                    {mostrarSenha ? (
                      <LockOpenIcon
                        sx={{
                          fontSize: "2.5rem",
                          color: "white",
                        }}
                      />
                    ) : (
                      <LockIcon
                        sx={{
                          fontSize: "2.5rem",
                          color: "white",
                        }}
                      />
                    )}
                  </Box>

                  <DialogTitle
                    className="bg-black text-[#7360ec] flex flex-col justify-center items-center "
                    style={{
                      fontSize: "calc(1rem + 8.5px)",
                      fontWeight: "700",
                      paddingTop: "38px",
                    }}
                  >
                    Confirm Changes
                  </DialogTitle>
                  <DialogContent className="text-gray-400 flex justify-center items-center flex-col">
                    <p
                      className="text-gray-400"
                      style={{
                        fontSize: "16px",
                        marginBottom: "16px",
                        fontWeight: "normal",
                      }}
                    >
                      Enter your current password to update your profile
                    </p>
                    <div className="w-full flex flex-row justify-center items-center">
                      <TextField
                        autoFocus
                        fullWidth
                        type={mostrarSenha ? "text" : "password"}
                        label="Current Password"
                        variant="outlined"
                        value={profile.currentPassword}
                        onChange={(e) => handleProfileChange("currentPassword", e.target.value)}
                        slotProps={{
                          input: {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setMostrarSenha(!mostrarSenha)}
                                  edge="end"
                                  sx={{ color: "#6c5ce7" }}
                                >
                                  {mostrarSenha ? <LockOpenIcon /> : <LockIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": { color: "white" },
                          "& .MuiInputLabel-root": { color: "gray" },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#6c5ce7",
                            borderRadius: "20px",
                          },
                          "& :hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9D00FF",
                          },
                          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#9D00FF",
                          },
                        }}
                      />
                    </div>
                  </DialogContent>
                  <DialogActions className="bg-black flex" sx={{
                    padding: "18px", display: "flex",
                    justifyContent: "space-between",
                  }}>
                    <Button
                      onClick={() => setIsModalOpen(false)}
                      sx={{
                        backgroundColor: "transparent",
                        color: "#7360ec",
                        border: "2px solid #7360ec",
                        minWidth: { xs: "5rem", sm: "12dvw", xl: "20px" },
                        minHeight: { xs: "50%", sm: "5dvh", xl: "30px" },
                        borderRadius: "14px",
                        fontSize: "16px",
                        fontFamily: "system-ui",
                        display: "flex",
                        "&:hover": { backgroundColor: "#5b4bc4", color: "white" },
                      }}>Back</Button>
                    <Button
                      onClick={handleSave}
                      variant="contained"
                      sx={{
                        backgroundColor: "#6c5ce7",
                        borderRadius: "14px",
                        fontSize: "16px",
                        fontFamily: "system-ui",
                        "&:hover": { backgroundColor: "#5b4bc4" },
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </form>
            </header>
          ) : (
            <header
              className="w-80 h-95 min-[400px]:w-100 min-[600px]:w-120 
              relative top-5 p-2 flex flex-col justify-center items-center bg-[#3F434C] 
          rounded-2xl gap-1"
            >
              <img
                className="w-40 h-35 mr-5 rounded-3xl translate-x-2.5 "
                src={profile.previewImg}
              />
              <div className=" w-full flex flex-col items-center gap-0.5 ">
                <h1 className="text-4xl text-white font-bold">
                  {" "}
                  {profile.name}
                </h1>
                <SectionTitle className="text-white">
                  Job Title:{" "}
                  <span className="text-gray-400">{profile.cargo}</span>
                </SectionTitle>
                <SectionTitle className="text-white">
                  Email: <span className="text-gray-400">{profile.email}</span>
                </SectionTitle>
                <SectionTitle className="text-white flex items-center gap-2">
                  Senha:
                  <span className=" tracking-[0.3rem] text-xl">••••••••</span>
                </SectionTitle>
              </div>
              <div className="w-full flex justify-center items-baseline text-white ">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-60  min-[400px]:w-70 bg-[#6366F1] p-2 rounded-xl 
              relative top-2  hover:bg-[#1F2937] hover:text-white border cursor-pointer"
                >
                  Edit Profile
                </button>
              </div>
            </header>
          )}
        </main>
        <footer className="fixed right-0 left-0 bottom-0 p-2 border-t-[#31353a]
         text-gray-200 rounded-t-2xl bg-[#1b1e22] backdrop-blur">
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
              <button className=" w-full flex flex-row p-1.5 mt-4 gap-5 
              cursor-pointer hover:text-green-400 hover:rounded-2xl"
                onClick={() => handleHelp()}>
                <CircleHelp />
                <h2>Help</h2>
              </button>
              <div className="h-px w-full bg-gray-700 my-4" />
              <button className="w-full p-1.5 flex flex-row gap-5 text-amber-50 
               cursor-pointer hover:text-red-700 hover:rounded-2xl"
                onClick={() => handleLogoutClick()}>
                <LogOut className="translate-x-0.5" />
                <h2>Exit</h2>
              </button>
            </div>
          </Drawer>
        </footer>
      </div >
    </>
  );
}
export default MyProfile;
