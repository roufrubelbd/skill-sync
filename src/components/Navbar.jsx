import React from "react";
import Logo from "./Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import "../components/Navbar.css";

const Navbar = () => {
  const { user, logOutUser } = useAuth();

  const menus = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-info underline font-bold" : ""
        }
        to="/"
      >
        <li>Home</li>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-info underline font-bold" : ""
        }
        to="/public-lessons"
      >
        <li>Lessons</li>
      </NavLink>
      {user && (
        <>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-info underline font-bold" : ""
            }
            to="/dashboard/my-lessons"
          >
            <li>My Lessons</li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-info underline font-bold" : ""
            }
            to="/dashboard/add-lesson"
          >
            <li>Add Lesson</li>
          </NavLink>
        </>
      )}
      <NavLink
        className={({ isActive }) =>
          isActive ? "text-info underline font-bold" : ""
        }
        to="/pricing"
      >
        <li>Pricing/Upgrade</li>
      </NavLink>
    </>
  );

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className=" bg-base-100 shadow-sm">
      <div className="navbar w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-info"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {menus}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menus}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full">
                    <img
                      alt={user?.displayName || "User"}
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 space-y-2 rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <li className="text-accent font-bold">
                    {user?.displayName || "User"}
                  </li>
                  <li className="btn btn-sm rounded-full hover:btn-warning">
                    <Link to="/dashboard/profile">Profile</Link>
                  </li>
                  <li className="btn btn-sm rounded-full hover:btn-warning">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-warning hover:btn-error btn-sm rounded-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login" className="btn btn-sm btn-warning">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
