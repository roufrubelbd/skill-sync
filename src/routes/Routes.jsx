import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Lessons from "../pages/Lessons/Lessons";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/lessons',
        element: <Lessons />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  {
    path: '/dashboard',
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
            {/* <Statistics /> */}
          </PrivateRoute>
        ),
      },
      {
        path: 'add-lesson',
        element: (
          <PrivateRoute>
            {/* <AddLesson /> */}
          </PrivateRoute>
        ),
      },
      {
        path: 'my-lessons',
        element: (
          <PrivateRoute>
            {/* <MyLessons /> */}
          </PrivateRoute>
        ),
      },
      {
        path: 'admin/manage-users',
        element: (
          <PrivateRoute>
            {/* <ManageUsers /> */}
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            {/* <Profile /> */}
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            {/* <MyOrders /> */}
          </PrivateRoute>
        ),
      },
    ],
  },
])