import React from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";

const AdminNav = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="uppercase font-extrabold text-accent">Admin Dashboard</h2>
      <NavLink className="flex justify-start items-center gap-1" to="/">
        {" "}
        <img className="w-6 h-6 rounded-full" src={logo} alt="logo" /> Home
      </NavLink>
      <NavLink to="/dashboard/admin/manage-lessons">Manage Lessons</NavLink>
      <NavLink to="/dashboard/admin/manage-featured-lessons">Manage Featured Lessons</NavLink>
      <NavLink to="/dashboard/admin/manage-users">Manage Users</NavLink>
      <NavLink to="/dashboard/admin/add-lesson">Add Lesson</NavLink>
    </div>
  );
};

export default AdminNav;
