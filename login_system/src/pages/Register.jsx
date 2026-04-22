import { CircleUserRound } from "lucide-react";
import { Mail } from "lucide-react";
import Input from "../components/Input";
import { LockKeyhole } from "lucide-react";
import { LockOpen } from "lucide-react";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser({ nome, email, senha });
      navigate("/")
    } catch (err) {
      if (err.error === "EMAIL_ALREADY_REGISTERED") {
        setError("Email address is already in use");
      } else {
        setError(err.message || err.error || "Unexpected error!");
      }
    }
  };

  return (
    <>
      <div className="w-full  h-screen flex flex-col justify-center items-center bg-linear-to-r from-[#aebcd4] to-blue-500 opa ">
        <div className=" w-68 min-[500px]:w-82 h-98 md:h-98 bg-white rounded-2xl shadow-gray-500 shadow-2xl flex flex-col items-center">
          <h1 className=" m-5 text-2xl min-[500px]:text-3xl font-sans  text-[#1a1a1a] font-bold ">
            Create Account
          </h1>
          <form
            onSubmit={handleRegister}
            className="  flex flex-col items-center  rounded-2xl "
            action=""
          >
            <div className=" w-50 min-[500px]:w-70 rounded-2xl p-1.5 bg-[#ffffff] border border-[#E5E7EB] flex items-center  relative">
              <CircleUserRound className=" w-10 relative " />
              <Input
                placeholder="Name"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                minLength={4}
              />
            </div>
            <div
              className="w-50 min-[500px]:w-70 p-1.5
             bg-[#ffffff] border border-[#E5E7EB] 
             rounded-2xl flex items-center mt-5  relative"
            >
              <Mail className=" w-10 relative " />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
                required
                minLength={5}
                maxLength={254}
              />
            </div>
            <div className="w-50 min-[500px]:w-70 p-1.5 bg-[#ffffff] border border-[#E5E7EB] 
            rounded-2xl flex items-center mt-5  relative">
              <LockKeyhole className=" w-10 relative " />
              <Input
                type={mostrarSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Password"
                required
                minLength={5}
                maxLength={72}
              />
              <button
                className="w-10 relative"
                onClick={() => setMostrarSenha(!mostrarSenha)}
              >
                {mostrarSenha ? <LockOpen /> : <LockKeyhole />}
              </button>
            </div>
            <div
              className="w-50 h-14 min-[500px]:w-70 text-white text-lg font-bold bg-linear-to-br from-purple-600 to-blue-600 rounded-2xl flex justify-center 
            items-center mt-5 mb-2  relative"
            >
              <UserPlus className="w-10" />
              <button  type="submit" className="w-35">
                Create Account
              </button>
            </div>
            <span>
              Have an account?{" "}
              <a href="/">
                <button type="button" className="text-blue-800 cursor-pointer">
                  Log in
                </button>
              </a>
            </span>
            {error && (
              <p className="w-full flex justify-center text-red-600 font-bold text-px md:text-lg">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
