import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Lessons from "../pages/Lessons/Lessons";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../pages/Profile/Profile";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import AddLesson from "../pages/Dashboard/AddLesson";
import MyLessons from "../pages/Dashboard/MyLessons";
import ManageLessons from "../pages/Dashboard/ManageLessons";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import UpdateLessons from "../pages/Dashboard/UpdateLessons";
import Dashboard from "../pages/Dashboard/Dashboard";
import LessonDetails from "../pages/Lessons/LessonDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "public-lessons",
        element: <Lessons />,
      },
      {
        path: "public-lessons/:id",
        element: (
          <PrivateRoute>
            <LessonDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  {
    path: "forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "add-lesson",
        element: (
          <PrivateRoute>
            <AddLesson />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "my-lessons",
        element: (
          <PrivateRoute>
            <MyLessons />
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateLessons />
          </PrivateRoute>
        ),
      },

      {
        path: "admin/manage-lessons",
        element: (
          <PrivateRoute>
            <ManageLessons />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/add-lesson",
        element: (
          <PrivateRoute>
            <AddLesson />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
