import React from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";

const AdminNav = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <NavLink className="flex justify-start items-center gap-1" to="/">
        {" "}
        <img className="w-6 h-6 rounded-full" src={logo} alt="logo" /> Home
      </NavLink>
      <NavLink to="/dashboard/admin/manage-lessons">Manage Lessons</NavLink>
      <NavLink to="/dashboard/admin/manage-users">Manage Users</NavLink>
      <NavLink to="/dashboard/admin/add-lesson">Add Lessons</NavLink>
    </div>
  );
};

export default AdminNav;
