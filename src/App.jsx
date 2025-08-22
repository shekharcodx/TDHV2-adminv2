import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout/Layout";
import Profile from "./pages/profile/Profile";
import CarListing from "./pages/mycar/CarListing";
import DashboardPage from "./pages/mycar/DashboardPage";
import Cards from "./pages/dash/Cards";

// Optional: Keep only if used in future
// import SignupForm from "./pages/signup/SignupForm";
// import Details from "./pages/signup/DetailsForm";

// 🔧 FIX: Import missing UserForm if it's created
// import UserForm from "./pages/spam/UserForm"; // ← Only if this file exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<Profile/>} /> 
          <Route path="profile" element={<Profile />} />
          {/* Uncomment the next line if UserForm is implemented and imported */}
          {/* <Route path="user-form" element={<UserForm />} /> */}
          <Route path="car-listing" element={<CarListing />} />
          <Route path="admin-car" element={<CarListing />} />
          <Route path="cards" element={<Cards />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
