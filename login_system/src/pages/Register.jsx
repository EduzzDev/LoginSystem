import { CircleUserRound } from "lucide-react";
import { Mail } from "lucide-react";
import Input from "../components/Input";
import BoxInput from "../components/BoxInputRegister";
import Wrapper from "../components/Wrapper";
import AuthSwitchLink from "../components/AuthSwitchLink";
import SubmitButton from "../components/SubmitButton";
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
      navigate("/");
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
      <div className="w-full  h-screen flex justify-center items-center bg-linear-to-r from-[#aebcd4] to-blue-500  ">
        <div className=" w-68 min-[500px]:w-82 h-98 bg-white rounded-2xl shadow-gray-500 shadow-2xl flex flex-col items-center">
          <h1 className=" m-5 text-2xl min-[500px]:text-3xl font-sans  text-[#1a1a1a] font-bold ">
            Create Account
          </h1>
          <form
            onSubmit={handleRegister}
            className="flex flex-col items-center  rounded-2xl "
            action=""
          >
            <BoxInput>
              <CircleUserRound className=" w-10 relative " />
              <Input
                placeholder="Name"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                minLength={4}
              />
            </BoxInput>
            <BoxInput>
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
            </BoxInput>
            <BoxInput>
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
            </BoxInput>
            <Wrapper variant="B">
              <UserPlus className="w-10" />
              <SubmitButton>Create Account</SubmitButton>
            </Wrapper>
            <span>
              Have an account?{" "}
              <AuthSwitchLink variant="B">Log in</AuthSwitchLink>
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
