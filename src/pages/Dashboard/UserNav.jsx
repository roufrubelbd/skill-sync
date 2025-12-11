import React from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
const UserNav = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="uppercase font-extrabold text-accent">User Dashboard</h2>
      <NavLink className="flex justify-start items-center gap-1" to="/">
        {" "}
        <img className="w-6 h-6 rounded-full" src={logo} alt="logo" /> Home
      </NavLink>
      <NavLink to="/dashboard/add-lesson">Add Lesson</NavLink>
      <NavLink to="/dashboard/my-lessons">My Lessons</NavLink>
      <NavLink to="/dashboard/my-favorites">My Favorites</NavLink>
      <NavLink to="/dashboard/update-lesson">Update Lesson</NavLink>
    </div>
  );
};

export default UserNav;
