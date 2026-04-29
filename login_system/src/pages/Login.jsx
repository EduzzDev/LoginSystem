import Input from "../components/Input";
import BoxInputLogin from "../components/BoxInputLogin";
import Wrapper from "../components/Wrapper";
import { CircleUserRound } from "lucide-react";
import { Mail } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { LockOpen } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação básica
    if (!email.trim()) {
      setError("Please enter your Email address");
      return;
    }
    if (!senha.trim()) {
      setError("Please enter your Password");
      return;
    }
    try {
      await loginUser({ email, senha });
      navigate("/dashboard");
      setError("");
    } catch (error) {
      const errorMessage = error?.message || "Erro ao fazer login";
      setError(errorMessage);
      console.error("Erro de login:", error);
    }
  };

  return (
    <>
      <div
        className="w-full  h-screen flex flex-col justify-center items-center 
      bg-linear-to-r from-[#aebcd4] to-blue-500  "
      >
        <div
          className=" w-65 min-[500px]:w-82 h-98 bg-white 
        rounded-2xl shadow-gray-500 shadow-2xl flex flex-col 
        items-left"
        >
          <h1 className=" m-8 mb-2 text-4xl min-[500px]:text-4xl font-sans  text-[#1a1a1a] font-bold ">
            Sign In
          </h1>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center  rounded-2xl "
            action=""
          >
            <BoxInputLogin>
              <Mail className=" w-10 relative " />
              <Input
                value={email}
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
              />
            </BoxInputLogin>
            <BoxInputLogin>
              <LockKeyhole className=" w-10 relative" />
              <Input
                value={senha}
                type={mostrarSenha ? "text" : "password"}
                placeholder="Password"
                required
                onChange={(e) => setSenha(e.target.value)}
              />
              <button
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="w-10 relative"
              >
                {mostrarSenha ? <LockOpen /> : <LockKeyhole />}
              </button>
            </BoxInputLogin>
            <Wrapper variant="A">
              <button type="submit" className="w-35">
                Sign In
              </button>
            </Wrapper>
            <div>
              <span>
                New here?{" "}
                <a href="/register">
                  <button
                    type="button"
                    className="text-blue-800 cursor-pointer"
                  >
                    Create an account
                  </button>
                </a>
              </span>
            </div>
            {error && (
              <p className="w-full flex justify-center text-red-600 font-bold text-lg md:text-lg">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
