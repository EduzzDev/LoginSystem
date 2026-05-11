import { checkAuth } from "../services/api";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import userImg from "../assets/userImg.png";
import { AuthContext } from "../context/authContext";

function Dashboard() {
  const navigate = useNavigate();
  const { nome } = useContext(AuthContext);

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

  return (
    < >
      <div className=" w-screen h-screen bg-[#2D3035] ">
        {/* Menu PC */}
        <nav className="w-screen hidden  lg:flex justify-end">
          <div
            className="bg-[#1A1C20] w-[80%] flex justify-between
             h-18 items-center rounded-t-lg -translate-x-0.5"
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
                <span className="text-white text-[16px]">{nome}</span>
                <span className="text-gray-400 text-[14px]">Logado há 2h</span>
              </div>
              <ChevronDown className="text-white mr-4" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Dashboard;
