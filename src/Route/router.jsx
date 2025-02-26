import MainLayout from "@/Layout/MainLayout";
import Dashboard from "@/Pages/Dashboard/dashboard";
import Signup from "@/Pages/Shared/Signup";
import Task from "@/Pages/Task/Task";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Update from "@/Pages/Task/Update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <PrivateRoute><Task></Task></PrivateRoute>
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><Update></Update></PrivateRoute>
      }
    ]
  },
  {
    path: "/signup",
    element: <Signup></Signup>
  },
]);

export default router;