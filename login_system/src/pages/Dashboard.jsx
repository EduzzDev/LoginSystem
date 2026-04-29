import { checkAuth } from "../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyUser() {
      try {
        await checkAuth();
      } catch {
        navigate("/");
      }
    }

    verifyUser();
  });

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default Dashboard;
