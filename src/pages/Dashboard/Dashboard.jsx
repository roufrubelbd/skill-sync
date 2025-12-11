import React from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashBoard from "./UserDashBoard";
import useRole from "../../hooks/useRole";
import LottieLoader from "../../components/LottieLoader";
const Dashboard = () => {
  const { role, isRoleLoading } = useRole();
  if (isRoleLoading) {
    return <LottieLoader />;
  }

  if (role === "admin") {
    return <AdminDashboard></AdminDashboard>;
  }

  if (role === "user") {
    return <UserDashBoard></UserDashBoard>;
  }
};

export default Dashboard;
