import { checkAuth } from "../services/api";
import { logout } from "../services/api";
import SideBarItem from "../components/SideBarItem";
import { useEffect, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CalendarDays, Star, StarHalf } from "lucide-react";
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

function Tasks() {
  const navigate = useNavigate();
  const { user, timeLogged } = useContext(AuthContext);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const inputRef = useRef(new Map());

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
  function handleMyProfile() {
    navigate("/myProfile");
  }
  function handleSecurity() {
    navigate("/security");
  }
  function handleHelp() {
    navigate("/help");
  }
  function onAddTask(inputValue) {
    const textLimpo = inputValue.trim();
    if (textLimpo.length >= 5) {
      setTasks([...tasks, { text: textLimpo, date: "", important: false }]);
      setInputValue("");
      setShowInput(false);
    }
  }
  function onChangeTask(newTask, index) {
    if (!newTask.trim()) {
      return;
    }
    const changeTask =  tasks.map((currentTask, indexTask) => {
        if (index === indexTask) {
            return {...currentTask, text: newTask}
        }
        return currentTask;
    })
    setTasks(changeTask);
  }

  function handleDateChange(date, index) {
    if (!date.trim()) {
      return;
    }
    const changeDate = [...tasks];
    changeDate[index].date = date;
    setTasks(changeDate);
  }
  function toggleImportant(task, index) {
    const changeTask = [...tasks];
    changeTask[index].important = !changeTask[index].important;
    if (changeTask[index].important === true) {
      const extractTask = changeTask.splice(index, 1)[0];
      changeTask.unshift(extractTask);
      changeTask[0].important = true;
    }
    setTasks(changeTask);
  }
  
  return (
    <>
      {/* Menu PC */}
      <div className="relative w-screen h-screen hidden lg:block bg-[#2D3035] ">
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-[80%] flex justify-between
             h-18 items-center rounded-t-lg -translate-x-0.5  border-b  border-gray-700 "
          >
            <div className=" flex ml-4">
              <span className="text-gray-500 flex-col  text-[18px] mr-2">
                Dashboard {">"}{" "}
                <span className="text-white text-[18px]">Tasks</span>
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
        <nav className=" w-[20%] h-full flex flex-col justify-between mr-4 pl-5 border-r
         border-gray-600  absolute bottom-0 text-white bg-[#1A1C20] ">
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
            <SideBarItem>
              <ClipboardList className=" mr-4 ml-1" />
              Tasks
            </SideBarItem>
            <SideBarItem onClick={() => handleSecurity()}>
              <Shield className=" mr-4 ml-1" />
              Security
            </SideBarItem>
            <SideBarItem onClick={() => handleHelp()}>
              <ShieldQuestionMark className=" mr-4 ml-1" />
              Help
            </SideBarItem>
          </ul>
          <SideBarItem onClick={() => handleLogoutClick()}>
            <LogOut className=" mr-4 ml-1" />
            Logout
          </SideBarItem>
        </nav>
        <main>
          <div className="px-6 lg:ml-[20%] lg:pr-8">
            <div className="w-full h-full hidden lg:flex justify-start relative ">
              {!showInput ? (
                <button
                  className=" w-55 h-10 pl-2 pr-2 text-xl border 
                top-8 relative rounded-xl bg-[#6366F1] border-[#4F46E5]
                 text-[#FFFFFF]  cursor-pointer 
                 hover:bg-[#1F2937] hover:text-white"
                  onClick={() => setShowInput(true)}
                >
                  Add a new task
                </button>
              ) : (
                <>
                  <div className="w-[30%] ml-1 top-8 relative text-lg ">
                    <input
                      className="w-80 ml-4 mb-2  pl-4 pt-2 pb-1 bg-[#6366F1]
                     hover:border-[#4F46E5] hover:border rounded-xl 
                    placeholder:text-white text-[#ffffff] outline-none
                    hover:bg-[#1F2937] hover:placeholder:text-white
                     hover:text-white  cursor-pointer"
                      value={inputValue}
                      min={5}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter your task"
                    />
                    <button
                      onClick={() => onAddTask(inputValue)}
                      className=" w-20 relative p-1 bg-[#6366F1] 
                    ml-5 mr-5 rounded-xl
                   text-white hover:bg-[#1F2937] hover:border-[#6366F1] hover:border
                    cursor-pointer"
                    >
                      Add
                    </button>
                    <button
                      className=" w-20 relative bg-red-400 p-1 
                    rounded-xl text-[#1F2937]  cursor-pointer hover:text-red-400 hover:bg-[#1F2937]
                     hover:border-[#6366F1] hover:border"
                      onClick={() => setShowInput(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
            <article className="w-full text-white flex justify-center flex-col pt-5 mt-8 relative text-2xl overflow-hidden">
              <div className="w-full relative mx-auto pt-2 pb-5 bg-[#494e57] rounded-2xl">
                <div
                  className=" grid grid-cols-3 gap-4 px-6 py-2
               border-b border-[#1a1c1f] font-semibold text-white"
                >
                  <div className=" flex justify-start ">
                    <span>Title</span>
                  </div>
                  <div className="flex justify-center">
                    <span>Expiration Date</span>
                  </div>
                  <div className="flex justify-end lg:justify-center">
                    <span>Important</span>
                  </div>
                </div>
                <div>
                  {tasks.length === 0 ? (
                    <div className="text-left ml-4  py-1.5 h-8 items-center text-gray-400">
                      Add a task
                    </div>
                  ) : (
                    tasks.map((task, index) => (
                      <div
                        className="grid grid-cols-3 gap-4 px-6 items-center border-b border-[#1a1c1f]"
                        key={index}
                      >
                        <div className="flex justify-start w-screen">
                          <input
                            className="w-[30dvw] p-2 pl-2.5 m-1 outline-0 rounded-xl hover:border-2 relative 
                            right-4.5
                             hover:border-gray-200 bg-transparent text-white"
                            type="text"
                            value={task.text}
                            onChange={(e) =>
                              onChangeTask(e.target.value, index)
                            }
                          />
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="w-full flex items-center justify-center text-center">
                            <input
                              ref={(element) => {
                                if (element) {
                                  inputRef.current.set(index, element);
                                } else {
                                  inputRef.current.delete(index);
                                }
                              }}
                              value={task.date}
                              onChange={(e) =>
                                handleDateChange(e.target.value, index)
                              }
                              className={`min-w-40 w-40 max-w-42
                                 cursor-pointer bg-transparent 
                                 outline-none ${!task.date ? "[&::-webkit-datetime-edit]:hidden" : ""} 
                                 [&::-webkit-calendar-picker-indicator]:hidden`}
                              type="date"
                            />
                            <CalendarDays 
                              onClick={() => {
                                const inputOpen = inputRef.current.get(index);
                                if (inputOpen) {
                                  inputOpen.showPicker();
                                }
                              }}
                              size={20}
                              className="shrink-0 relative text-blue-500 right-2 "
                            />
                          </div>
                        </div>
                        <div className="flex justify-center ">
                          <button
                            onClick={() => toggleImportant(task, index)}
                            className="cursor-pointer"
                          >
                            {!task.important ? (
                              <Star />
                            ) : (
                              <Star className="fill-white" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </article>
          </div>
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
            <SideBarMobile>
              <LayoutDashboard onClick={() => handleDashboard()} />
              <h2>General</h2>
            </SideBarMobile>
            <SideBarMobile>
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
            <SideBarMobile onClick={() => handleLogoutClick()}>
              <LogOut />
              <h2>Exit</h2>
            </SideBarMobile>
          </ul>
        </footer>
      </div>
    </>
  );
}
export default Tasks;
