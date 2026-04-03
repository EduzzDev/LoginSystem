import { CircleUserRound } from "lucide-react";
import { Mail } from "lucide-react";
import Input from "../components/Input";
import { LockKeyhole } from "lucide-react";
import { LockOpen } from "lucide-react";
import { UserPlus } from "lucide-react";
import { useState } from "react";

function Register() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  return (
    <>
      <div className="w-full  h-screen flex flex-col justify-center items-center bg-linear-to-r from-[#aebcd4] to-blue-500 ">
        <div className=" w-65 min-[500px]:w-80 h-90 md:h-88 bg-white rounded-2xl shadow-gray-500 shadow-2xl flex flex-col items-center">
          <h1 className=" m-5 text-2xl min-[500px]:text-3xl font-sans  text-[#1a1a1a] font-bold ">
            Create Account
          </h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="  flex flex-col items-center  rounded-2xl "
            action=""
          >
            <div className=" w-50 min-[500px]:w-70 rounded-2xl p-1 bg-[#ffffff] border border-[#E5E7EB] flex items-center  relative">
              <CircleUserRound className=" w-10 relative " />
              <Input placeholder="Name" type="text" required />
            </div>
            <div className="w-50 min-[500px]:w-70 p-1 bg-[#ffffff] border border-[#E5E7EB] rounded-2xl flex items-center mt-5  relative">
              <Mail className=" w-10 relative " />
              <Input type="email" placeholder="Email" />
            </div>
            <div className="w-50 min-[500px]:w-70 p-1 bg-[#ffffff] border border-[#E5E7EB] rounded-2xl flex items-center mt-5  relative">
              <LockKeyhole className=" w-10 relative " />
              <Input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Password"
              />
              <button
                className="w-10 relative"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <LockOpen /> : <LockKeyhole />}
              </button>
            </div>
            <div className="w-50 h-15 min-[500px]:w-70 text-white text-lg font-bold bg-linear-to-br from-purple-600 to-blue-600 rounded-2xl flex justify-center items-center mt-5  relative">
              <UserPlus className="w-10" />
              <button type="submit" className="w-35">
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
