import { useState } from "react";
import BoxInputLogin from "../components/BoxInputLogin";
import Wrapper from "../components/Wrapper";
import SubmitButton from "../components/SubmitButton";
import { Mail } from "lucide-react";
import Input from "../components/Input";
import AuthSwitchLink from "../components/AuthSwitchLink";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <>
      <div
        className="w-full  h-screen flex flex-col justify-center items-center 
      bg-linear-to-r from-[#aebcd4] to-blue-500 overflow-hidden "
      >
        <div
          className=" w-75 min-[500px]:w-88 h-95 min-[500px]:h-90 bg-white 
        rounded-2xl shadow-gray-500 shadow-2xl flex flex-col 
        items-center"
        >
          <h1
            className=" w-65 relative m-6 text-3xl min-[500px]:text-3xl
            
           font-sans  text-[#1a1a1a] font-bold"
          >
            Recover Password
          </h1>
          <p
            className="min-[500px]:w-80 w-66  relative  text-md font-sans 
           font-bold text-gray-600 text-center"
          >
            Enter your email address, and we'll send you a link to reset your
            password
          </p>
          <form className="flex flex-col items-center  rounded-2xl " action="">
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
            <Wrapper variant="A">
              <SubmitButton>Send Link</SubmitButton>
            </Wrapper>
            <span>
              <AuthSwitchLink variant="B">Remember password?</AuthSwitchLink>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
