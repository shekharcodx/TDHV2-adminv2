import React from "react";

import { useRoutes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Profile from "@/pages/Profile/Profile";
import DashboardPage from "@/pages/Dash/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Auth/login/Login";
import ForgetPassword from "./pages/Auth/forgetPassword/Forgetpass";
import Resetpass from "./pages/Auth/resetPassword/Resetpass";
import UnauthorizedPage from "@/components/unauthorised";
import NotFoundPage from "@/components/ErrorPage";
import AllVendors from "./pages/Vendors";
import VendorProfile from "./pages/Vendors/VendorProfile";
import EditVendorProfile from "./pages/Vendors/EditVendorProfile";
import Admins from "./pages/Admins";
import AdminProfile from "./pages/Admins/AdminProfileView";
import EditAdminProfile from "./pages/Admins/EditAdminProfile";
import CreateAdmin from "./pages/Admins/CreateAdmin";
import { Box } from "@chakra-ui/react";
import Listings from "@/pages/Listings";
import ListingView from "@/pages/Listings/ListingView";
import PagesLayout from "@/components/layout/PagesLayout";

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
            { path: "/profile", element: <Profile /> },
            {
              path: "/vendors",
              element: <PagesLayout />,
              children: [
                { index: true, element: <AllVendors /> },
                { path: "view/:id", element: <VendorProfile /> },
                { path: "edit/:id", element: <EditVendorProfile /> },
              ],
            },
            {
              path: "/admins",
              element: <PagesLayout />,
              children: [
                { index: true, element: <Admins /> },
                { path: "view/:id", element: <AdminProfile /> },
                { path: "edit/:id", element: <EditAdminProfile /> },
                { path: "create", element: <CreateAdmin /> },
              ],
            },
            {
              path: "/car-listings",
              element: <PagesLayout />,
              children: [
                { index: true, element: <Listings /> },
                { path: "view/:id", element: <ListingView /> },
              ],
            },

            { path: "/master-data", element: <Box>Data</Box> },
            { path: "/email-templates", element: <Box>Templates</Box> },
          ],
        },
      ],
    },

    { path: "/login", element: <Login /> },
    { path: "/Forget-password", element: <ForgetPassword /> },
    { path: "/reset-password", element: <Resetpass /> },
    { path: "/unauthorized", element: <UnauthorizedPage /> },
    { path: "*", element: <NotFoundPage /> },
  ];

  console.log("ListingView import:", ListingView);

  return useRoutes(routes);
}

export default App;
