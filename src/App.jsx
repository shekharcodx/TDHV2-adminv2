import React from "react";

import { useRoutes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Profile from "@/pages/profile/Profile";
import DashboardPage from "@/pages/dash/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/auth/login/Login";
import ForgetPassword from "./pages/auth/forgetPassword/Forgetpass";
import Resetpass from "./pages/auth/resetPassword/Resetpass";
import UnauthorizedPage from "@/components/unauthorised";
import NotFoundPage from "@/components/ErrorPage";
import AllVendors from "./pages/Vendors";
import VendorProfile from "./pages/Vendors/VendorProfile";
import EditVendorProfile from "./pages/Vendors/EditVendorProfile";
import Admins from "./pages/admins";
import AdminProfile from "./pages/admins/AdminProfile";
import EditAdminProfile from "./pages/admins/EditAdminProfile";
import CreateAdmin from "./pages/admins/CreateAdmin";
import { Box } from "@chakra-ui/react";
import Listings from "./pages/listings";

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
            { path: "/create-admin", element: <CreateAdmin /> },
            { path: "/car-listings", element: <Listings /> },
            { path: "/master-data", element: <Box>Data</Box> },
            { path: "/email-templates", element: <Box>Templates</Box> },
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
