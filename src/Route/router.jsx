import MainLayout from "@/Layout/MainLayout";
import Dashboard from "@/Pages/Dashboard/dashboard";
import Signup from "@/Pages/Shared/Signup";
import Task from "@/Pages/Task/Task";
import {createBrowserRouter} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children : [
        {
          path: '/',
          element: <Dashboard></Dashboard>
        },
        {
          path : '/tasks',
          element: <Task></Task>
        },
        {
          path : '/signup',
          element: <Signup></Signup>
        }
      ]
    },
  ]);

export default router;