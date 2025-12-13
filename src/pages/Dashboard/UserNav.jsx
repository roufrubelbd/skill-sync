import React from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo.png";
const UserNav = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="uppercase font-extrabold text-accent">User Dashboard</h2>
      <NavLink className="flex justify-start items-center gap-1" to="/">
        {" "}
        <img className="w-6 h-6 rounded-full" src={logo} alt="logo" />
        Go Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "btn btn-accent btn-outline" : ""
        }
        to="/dashboard"
      >
        User Home
      </NavLink>
      
      <NavLink
        className={({ isActive }) => (isActive ? "btn btn-accent" : "")}
        to="/dashboard/add-lesson"
      >
        Add Lesson
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "btn btn-accent" : "")}
        to="/dashboard/my-lessons"
      >
        My Lessons
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "btn btn-accent" : "")}
        to="/dashboard/my-favorites"
      >
        My Favorites
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "btn btn-accent" : "")}
        to="/dashboard/profile"
      >
        My Profile
      </NavLink>
    </div>
  );
};

export default UserNav;
