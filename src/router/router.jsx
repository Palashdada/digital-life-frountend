import { createBrowserRouter } from "react-router";
import HomeLayout from "../assets/Layouts/HomeLayout";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/lessons", element: <Lessons /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);
