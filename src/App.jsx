import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import UserForm from "./pages/UserForm";
import CarListing from "./pages/CarListing";
import SignupForm from  "./pages/SignupForm";
import Details from "./pages/DetailsForm";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
 <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/car-listing" element={<CarListing />} />
          <Route path="/admin-car" element={<CarListing />} />
          {/* add more routes if needed */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
