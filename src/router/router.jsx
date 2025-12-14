// src/router/router.js
import { createBrowserRouter } from "react-router-dom";

// Layout
import HomeLayout from "../assets/Layouts/HomeLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Lessons from "../pages/Lessons";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Loading from "../pages/Loading";

import ProtectedRoute from "../assets/components/ProtectedRoute";
import AddLesson from "../pages/dashboard/AddLesson";
import LessonDetails from "../pages/LessonDetails";
import UpdateLesson from "../pages/dashboard/UpdateLesson";
import Pricing from "../pages/Pricing";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import Favorites from "../pages/dashboard/Favorites";
import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/signup", element: <Register /> },
      { path: "/lessons", element: <Lessons /> },
      { path: "/profile", element: <Profile /> },

      // Protected Routes (Login Required)
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/add-lesson", element: <AddLesson /> },
          { path: "/my-lessons", element: <MyLessone /> },
          { path: "/lessons/:id", element: <LessonDetails /> },
          { path: "/update-lesson/:id", element: <UpdateLesson /> },
          { path: "/pricing", element: <Pricing /> },
          { path: "/payment-success", element: <PaymentSuccess /> },
          { path: "/payment-cancel", element: <PaymentCancel /> },
          { path: "/favorites", element: <Favorites /> },
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },

      {
        element: <ProtectedRoute adminOnly={true} />,
        children: [
          { path: "/dashboard/admin", element: <AdminDashboard /> },
          { path: "/dashboard/admin/manage-users", element: <ManageUsers /> },
          {
            path: "/dashboard/admin/manage-lessons",
            element: <ManageLessons />,
          },
          {
            path: "/dashboard/admin/reported-lessons",
            element: <ReportedLessons />,
          },
          { path: "/dashboard/admin/profile", element: <AdminProfile /> },
        ],
      },
    ],
  },
]);
