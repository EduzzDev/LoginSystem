import Input from "../components/Input";
import BoxInputLogin from "../components/BoxInputLogin";
import Wrapper from "../components/Wrapper";
import AuthSwitchLink from "../components/AuthSwitchLink";
import SubmitButton from "../components/SubmitButton";
import { CircleUserRound, LockIcon } from "lucide-react";
import { Mail } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { LockOpen } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            <span className="relative left-8 min-[500px]:translate-x-8  
            min-[500px]:left-6 min-[500px]:ml-6 top-3.5">
              <button type="button" className="text-blue-800 cursor-pointer underline font-semibold"
                onClick={() => setIsModalOpen(true)}>Forgot password?</button>
            </span>
            <Dialog
              open={isModalOpen}
              maxWidth="sm"
              fullWidth
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: "#0D0D11",
                    overflow: "visible !important",
                    position: "relative",
                    marginTop: "48px",
                    borderRadius: "20px",
                    border: "1px solid #27272A",
                    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.8)",
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
                  bgcolor: "#181820",
                  border: "2px solid #7C3AED",
                  borderRadius: "16px",
                  padding: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 0px 20px rgba(124, 58, 237, 0.4)",
                  zIndex: 10,
                  fontSize: "2.5rem",
                  color: "white",
                }}
              >
                <LockIcon />
              </Box>

              <DialogTitle
                className="text-[#A78BFA] flex flex-col justify-center items-center"
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  paddingTop: "32px",
                }}
              >
                Forgot Your Password?
              </DialogTitle>

              <DialogContent className="text-gray-400 flex justify-center items-center flex-col">
                <p
                  className="text-[#A1A1AA] text-center"
                  style={{
                    fontSize: "16px",
                    marginBottom: "24px",
                    fontWeight: "normal",
                  }}
                >
                  Don't worry! Enter your account's associated email address, and we'll
                  send you a link to reset your password.
                </p>
                <div className="w-full flex flex-row justify-center items-center">
                  <TextField
                    autoFocus
                    fullWidth
                    type="text"
                    label="E-mail"
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-input": { color: "white" },
                      "& .MuiInputLabel-root": { color: "gray" },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#181820",
                        borderRadius: "12px",
                        "& fieldset": {
                          borderColor: "#27272A",
                        },
                        "&:hover fieldset": {
                          borderColor: "#7C3AED",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#7C3AED",
                        },
                      },
                    }}
                  />
                  <button
                    type="button"
                    className="-translate-x-12"
                  ></button>
                </div>
              </DialogContent>
              <DialogActions sx={{ padding: "0px 24px 14px 24px" }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#7C3AED",
                    width: "100%",
                    height: "7dvh",
                    minHeight: "48px",
                    borderRadius: "12px",
                    fontSize: "16px",
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "system-ui",
                    boxShadow: "0 4px 14px 0 rgba(124, 58, 237, 0.39)",
                    "&:hover": { backgroundColor: "#6D28D9" },
                  }}
                >
                  Send Reset Link
                </Button>
              </DialogActions>
              <DialogActions sx={{ padding: "0px 24px 24px 24px", justifyContent: "center" }}>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="text"
                  sx={{
                    color: "#A78BFA",
                    width: "100%",
                    height: "auto",
                    borderRadius: "14px",
                    fontSize: "15px",
                    textTransform: "none",
                    fontFamily: "system-ui",
                    "&:hover": { color: "#FFF", backgroundColor: "transparent" },
                  }}
                >
                  Back to login
                </Button>
              </DialogActions>
            </Dialog>
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
