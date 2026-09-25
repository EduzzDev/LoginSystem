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
  CircleHelp,
} from "lucide-react";
import Drawer from "@mui/material/Drawer";
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined';
import QuestionImg from "../assets/questionImg.png"

function HelpPage() {
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
  return (
    <>
      {/* Menu PC */}
      <div className="relative min-h-screen hidden lg:block bg-[#2D3035] overflow-x-hidden overflow-y-auto">
        <nav className="fixed top-0 left-0 z-20 w-screen hidden lg:flex justify-end">
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
              <img
                src={imgUser || userImg}
                className=" w-10 h-10 rounded-4xl"
                alt=""
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
          className="fixed left-0 top-18 w-[22%] xl:w-[18%] h-[calc(100dvh-4.5rem)] flex flex-col justify-center
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
            <SideBarItem onClick={() => handleSecurity()}>
              <Shield className=" mr-4" />
              Security
            </SideBarItem>
            <SideBarItem>
              <ShieldQuestionMark className=" mr-4 " />
              Help
            </SideBarItem>
            <SideBarItem onClick={() => handleLogoutClick()}>
              <LogOut className=" mr-4 " />
              Logout
            </SideBarItem>
          </div>
        </nav>
        <div className="w-full max-w-2xl mt-20 p-2 pb-8 text-gray-100
         z-10 relative lg:ml-[calc(22%+2rem)] xl:ml-[calc(18%+2rem)] rounded-2xl
          bg-[#141925]">
          <div className="w-full bg-[#1F223B] p-2 rounded-xl flex flex-col justify-center h-40 mb-2">
            <div className="flex flex-row items-center justify-between w-full ">
              <div className="flex flex-row items-center">
                <div className="flex flex-row h-12 w-12 items-center justify-center rounded-3xl bg-[#5855e2] m-2">
                  <QuestionMarkOutlinedIcon
                    sx={{ fontSize: 32 }}
                    className="text-white"
                  />
                </div>
                <h1 className="text-2xl ml-2">Frequently asked questions (FAQ)</h1>
              </div>
              <img className="w-40 translate-5" src={QuestionImg} alt="FAQ Image" />
            </div>
            <h2 className="ml-14 translate-x-2 -translate-y-4 mb-4 bottom-4 p-2 relative text-left">
              Find quick answers to the most common questions about <br />
              your account and the system.
            </h2>
          </div>
          <details className="group rounded-xl border border-gray-800
           bg-[#1F223B] p-4 transition-all duration-200
           open:bg-gray-900 open:border-purple-500/50 mb-2">
            <summary className="flex cursor-pointer items-center
             justify-between list-none select-none">
              <div className="flex  items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center
                 justify-center rounded-lg bg-purple-950/60
                 text-purple-400 border border-purple-800/40">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-200">How do I change my password?</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Follow these step-by-step instructions to change your password securely.</p>
                </div>
              </div>
              <svg className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className=" mt-4 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed">
              <p><strong>Step 1:</strong> Go to the My Profile page.<br /> </p>
              <p><strong>Step 2:</strong> Click to edit your profile <br /></p>
              <p><strong>Step 3:</strong> Enter your new password in the Enter passwordfield. <br /></p>
              <p><strong>Step 4:</strong></p><p> Click on Save changes and then enter your current password</p>
            </div>
          </details>
          <details className="group rounded-xl border border-gray-800
           bg-[#1F223B] p-4 transition-all duration-200
           open:bg-gray-900 open:border-purple-500/50 mb-2">
            <summary className="flex cursor-pointer items-center
             justify-between list-none select-none">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center 
                justify-center rounded-lg bg-purple-950/60
                 text-purple-400 border border-purple-800/40">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-200"
                  >
                    How do I manage my tasks?
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Find out how to add, edit or delete your tasks
                  </p>
                </div>
              </div>
              <svg className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed">
              <p><strong>Step 1:</strong> Click the button "Add a new task" to add a new task.</p>
              <p><strong>Step 2:</strong> Keep track of your tasks, organised in the main table.</p>
              <p><strong>Step 3:</strong> Use the action icons to manage dates or mark items as important.</p>
              <p><strong>Step 4:</strong> Click on the bin icon to delete a task.</p>
            </div>
          </details>
          <details className="group rounded-xl border border-gray-800
           bg-[#1F223B] p-4 transition-all duration-200
           open:bg-gray-900 open:border-purple-500/50 mb-2">
            <summary className="flex cursor-pointer items-center
             justify-between list-none select-none">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center 
                justify-center rounded-lg bg-purple-950/60
                 text-purple-400 border border-purple-800/40">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-.75 3h7.5l-.75-3-.75-3M4 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm10 8h2v2h-2v-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-200"
                  >
                    What are active sessions?
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Find out how the registration of devices linked to your account works.
                  </p>
                </div>
              </div>
              <svg className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed">
              <p><strong>Step 1:</strong> When you log in, a new session is created and linked to your account and device.</p>
              <p><strong>Step 2:</strong> The session stores information such as the device, browser, IP address, and login time.</p>
              <p><strong>Step 3:</strong> Active sessions are displayed in the "Active Sessions" section so you can see where your
                account is currently signed in.</p>
              <p><strong>Step 4:</strong> If you don't recognize a device or want to end a session,
                click "Revoke Access" to invalidate that session.</p>
              <p><strong>Step 5:</strong> Your recent security actions, such as successful logins,
                are displayed in "Activity History" with the date, time, and device used.</p>
            </div>
          </details>
          <details className="group rounded-xl border border-gray-800
           bg-[#1F223B] p-4 transition-all duration-200
           open:bg-gray-900 open:border-purple-500/50 mb-2">
            <summary className="flex cursor-pointer items-center
             justify-between list-none select-none">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center 
                justify-center rounded-lg bg-purple-950/60
                 text-purple-400 border border-purple-800/40">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-200"
                  >
                    Having trouble logging in?
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Take a look at some solutions for login errors, incorrect passwords and other access issues.
                  </p>
                </div>
              </div>
              <svg className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed">
              <p><strong>Step 1:</strong> Please check that you have entered your email address and password correctly.</p>
              <p><strong>Step 2:</strong> Please check that Caps Lock is off and try logging in again.</p>
              <p><strong>Step 3:</strong> If you have forgotten your password,
                use the "Forgot password?" option on the login page to start the account recovery process.</p>
              <p><strong>Step 4:</strong> If the problem persists,
                check your connection or contact support for help.</p>
            </div>
          </details>
          <details className="group rounded-xl border border-gray-800
           bg-[#1F223B] p-4 transition-all duration-200
           open:bg-gray-900 open:border-purple-500/50 mb-2">
            <summary className="flex cursor-pointer items-center
             justify-between list-none select-none">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center 
                justify-center rounded-lg bg-purple-950/60
                 text-purple-400 border border-purple-800/40">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-200"
                  >
                    How do I update my account information?
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Find out how to change your name, email, profile picture and other account details.
                  </p>
                </div>
              </div>
              <svg className="h-4 w-4 text-gray-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-300 leading-relaxed">
              <p><strong>Step 1:</strong> Go to your profile and click the "Edit Profile" button.</p>
              <p><strong>Step 2:</strong> Change the relevant details (name, job title, email address or password) and click "Save changes".</p>
              <p><strong>Step 3:</strong> Enter your current password in the confirmation window and click "Confirm" to save the changes.</p>
            </div>
          </details>
        </div >
      </div >

      {/* Menu mobile */}
      < div className="w-screen h-screen lg:hidden bg-[#2D3035]" >
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
      </div >
    </>
  );
}
export default HelpPage;
