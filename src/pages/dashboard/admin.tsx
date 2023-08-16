import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

const Dashboard = () => {
  useEffect(() => {
    signIn();
  }, []);

  return <h1>Welcome to Dashboard</h1>;
};

export default Dashboard;
