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
import EditAdminProfile from "./pages/Admins/AdminProfileEdit";
import CreateAdmin from "./pages/Admins/AdminCreate";
import { Box } from "@chakra-ui/react";
import Listings from "@/pages/Listings";
import ListingView from "@/pages/Listings/ListingView";
import PagesLayout from "@/components/layout/PagesLayout";
import ListingEdit from "./pages/Listings/ListingEdit";
import CarData from "./pages/CarData/CarData";

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
                { path: "edit/:id", element: <ListingEdit /> },
              ],
            },

            { path: "/car-data", element: <CarData /> },
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

  return useRoutes(routes);
}

export default App;
