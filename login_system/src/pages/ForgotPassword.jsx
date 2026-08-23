import { useState } from "react";
import BoxInputLogin from "../components/BoxInputLogin";
import Wrapper from "../components/Wrapper";
import SubmitButton from "../components/SubmitButton";
import { UserKey, Eye, EyeOff } from "lucide-react";
import Input from "../components/Input";
import AuthSwitchLink from "../components/AuthSwitchLink";


function ForgotPassword() {
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <div
        className="w-full  h-screen flex flex-col justify-center items-center 
      bg-linear-to-r from-[#aebcd4] to-blue-500 overflow-hidden "
      >
        <div
          className=" w-75 min-[500px]:w-88 h-108 min-[500px]:h-105 bg-white 
        rounded-2xl shadow-gray-500 shadow-2xl flex flex-col
        items-center"
        >
          <h1
            className=" w-65 relative m-6 text-3xl min-[500px]:text-3xl
            
           font-sans  text-[#1a1a1a] font-bold text-center"
          >
            Reset Password
          </h1>
          <p
            className="min-[500px]:w-80 w-66  relative  text-md font-sans 
           font-bold text-gray-600 text-center bottom-1.5"
          >
            Your new password must be different
            from previously used passwords.
          </p>
          <form className="flex flex-col items-center  rounded-2xl relative bottom-2" action="">
            <BoxInputLogin>
              <UserKey className=" w-10 relative " />
              <Input
                value={newPassword}
                label="password"
                type={showNewPassword ? "password" : "text"}
                onChange={(e) => setnewPassword(e.target.value)}
                required
                placeholder="New password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="w-10 relative"
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
              </button>
            </BoxInputLogin>
            <BoxInputLogin>
              <UserKey className=" w-10 relative " />
              <Input
                value={confirmPassword}
                label="password"
                type={showConfirmPassword ? "password" : "text"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="New password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="w-10 relative"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
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
