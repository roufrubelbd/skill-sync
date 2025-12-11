import React from "react";
import AdminNav from "./AdminNav";
import UserNav from "./UserNav";
import useRole from "../../hooks/useRole";
import LottieLoader from "../../components/LottieLoader";

const DashboardNavbar = () => {
  const { role, isRoleLoading } = useRole();

    if (isRoleLoading) return <LottieLoader />;

  if (role === "admin") return <AdminNav />;

  if (role === "user") return <UserNav />;
};
export default DashboardNavbar;
