import { createBrowserRouter } from "react-router";
import HomeLayout from "../assets/Layouts/HomeLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lessons from "../pages/Lessons";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/lessons", element: <Lessons /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/add-lesson", element: <AddLesson /> },
          { path: "/my-lessons", element: <MyLessons /> },
          { path: "/lessons/:id", element: <LessonDetails /> },
          { path: "/update-lesson/:id", element: <UpdateLesson /> },
          { path: "/pricing", element: <Pricing /> },
          { path: "/payment-success", element: <PaymentSuccess /> },
          { path: "/payment-cancel", element: <PaymentCancel /> },
          { path: "/favorites", element: <Favorites /> },
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },
]);
