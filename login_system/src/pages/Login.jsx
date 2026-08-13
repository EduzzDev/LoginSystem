import Input from "../components/Input";
import BoxInputLogin from "../components/BoxInputLogin";
import Wrapper from "../components/Wrapper";
import AuthSwitchLink from "../components/AuthSwitchLink";
import SubmitButton from "../components/SubmitButton";
import { CircleUserRound } from "lucide-react";
import { Mail } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { LockOpen } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { Login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Logging into your account...", {
      duration: 4000,
    });
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
      const response = await loginUser({ email, senha });
      await Login(response.nome, response.token);
      setError("");
      navigate("/dashboard");
      toast.dismiss(loadingToast);
      toast.success("Login successful!");
    } catch (error) {
      const errorMessage = error?.message || "Login error";
      setError(errorMessage);
      toast.error(error.message);
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
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="w-10 relative"
              >
                {mostrarSenha ? <LockOpen /> : <LockKeyhole />}
              </button>
            </BoxInputLogin>
            <span className="relative translate-x-8 left-6 ml-6 top-3.5 ">
              <AuthSwitchLink variant="C">Forgot password?</AuthSwitchLink>
            </span>
            <Wrapper variant="A">
              <SubmitButton>Sign In</SubmitButton>
            </Wrapper>
            <span>
              New here?{" "}
              <AuthSwitchLink variant="A">Create an account</AuthSwitchLink>
            </span>
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
