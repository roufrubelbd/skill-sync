import React from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
const UserNav = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <NavLink className="flex justify-start items-center gap-1" to="/">
        {" "}
        <img className="w-6 h-6 rounded-full" src={logo} alt="logo" /> Home
      </NavLink>
      <NavLink to="/dashboard/add-lesson">Add Lessons</NavLink>
      <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
      <NavLink to="/dashboard/update-lessons">Update Lessons</NavLink>
    </div>
  );
};

export default UserNav;
