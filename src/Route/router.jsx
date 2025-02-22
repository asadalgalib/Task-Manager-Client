import MainLayout from "@/Layout/MainLayout";
import Dashboard from "@/Pages/Dashboard/dashboard";
import Signup from "@/Pages/Shared/Signup";
import Task from "@/Pages/Task/Task";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup></Signup>
  },
  {
    path: "/user",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/user/tasks',
        element: <PrivateRoute><Task></Task></PrivateRoute>
      },
      {
        path: '/user/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
      }
    ]
  }
]);

export default router;