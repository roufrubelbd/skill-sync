import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import Profile from "../pages/Profile/Profile";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import AddLesson from "../pages/Dashboard/AddLesson";
import MyLessons from "../pages/Dashboard/MyLessons";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import Dashboard from "../pages/Dashboard/Dashboard";
import LessonDetails from "../pages/Lessons/LessonDetails";
import Pricing from "../pages/Payment/Pricing";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentCancel from "../pages/Payment/PaymentCancel";
import MyFavorites from "../pages/Dashboard/MyFavorites";
import AdminManageLessons from "../pages/Dashboard/AdminManageLessons";
import AdminManageFeaturedLessons from "../pages/Dashboard/AdminManageFeaturedLessons";
import UpdateLesson from "../pages/Dashboard/UpdateLesson";
import PublicLessons from "../pages/Lessons/PublicLessons";
import AuthorProfile from "../pages/Lessons/AuthorProfile";

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
        element: <PublicLessons />,
      },
      {
        path: "public-lessons/:id",
        element: (
          <PrivateRoute>
            <LessonDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "pricing",
        element: (
          <PrivateRoute>
            <Pricing />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <AuthorProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/cancel",
        element: (
          <PrivateRoute>
            <PaymentCancel />
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
        path: "my-favorites",
        element: (
          <PrivateRoute>
            <MyFavorites />
          </PrivateRoute>
        ),
      },
      {
        path: "update-lesson/:id",
        element: (
          <PrivateRoute>
            <UpdateLesson />
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
        path: "admin/manage-lessons",
        element: (
          <PrivateRoute>
            <AdminManageLessons />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-featured-lessons",
        element: (
          <PrivateRoute>
            <AdminManageFeaturedLessons />{" "}
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
