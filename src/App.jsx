import React from "react";

import Layout from "@/components/layout/Layout";
import Profile from "@/pages/profile/Profile";
import CarListing from "@/pages/mycar/CarListing";
import DashboardPage from "@/pages/dash/DashboardPage";
import Cards from "@/pages/dash/Cards";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserForm from "@/pages/spam/UserForm";
import DetailsForm from "./pages/auth/signup/DetailsForm";
import SignupForm from "./pages/auth/signup/SignupForm";
import AllListings from "./pages/mycar/AllListings";
import Login from "./pages/auth/login/Login";
import ForgetPassword from "./pages/auth/forgetPassword/Forgetpass";
import Resetpass from "./pages/auth/resetPassword/Resetpass";
import ChangePass from "@/pages/auth/changePassword/ChangePass";
import EditCar from "./pages/mycar/EditCar";
// Optional: Keep only if used in future

import Details from "./pages/auth/signup/DetailsForm";
import UnauthorizedPage from "@/components/unauthorised";
import NotFoundPage from "@/components/ErrorPage";
import AllVendors from "./pages/Vendors";
import VendorProfile from "./pages/Vendors/VendorProfile";
import EditVendorProfile from "./pages/Vendors/EditVendorProfile";
import Admins from "./pages/admins";
import AdminProfile from "./pages/admins/AdminProfile";
import EditAdminProfile from "./pages/admins/EditAdminProfile";

// 🔧 FIX: Import missing UserForm if it's created
// import UserForm from "./pages/spam/UserForm"; // ← Only if this file exists

function App() {
  const routes = [
    {
      path: "/",
      element: <ProtectedRoute redirect={"/login"} />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            { index: true, element: <DashboardPage /> },
            { path: "/vendors", element: <AllVendors /> },
            { path: "/vendor-profile/:id", element: <VendorProfile /> },
            {
              path: "/edit-vendor-profile/:id",
              element: <EditVendorProfile />,
            },
            { path: "/profile", element: <Profile /> },
            { path: "/admins", element: <Admins /> },
            { path: "/admin-profile/:id", element: <AdminProfile /> },
            {
              path: "/edit-admin-profile/:id",
              element: <EditAdminProfile />,
            },
          ],
        },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/Forget-pass", element: <ForgetPassword /> },
    { path: "/reset-pass", element: <Resetpass /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },
    { path: "*", element: <NotFoundPage /> },
  ];

  return useRoutes(routes);
}

export default App;
