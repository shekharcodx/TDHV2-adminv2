// components/Sidebar.jsx
import React from "react";
import styles from "./Sidebar.module.css";
import {
  FaThLarge, FaUserFriends, FaUser, FaBox, FaShoppingCart,
  FaStar, FaTags, FaLock, FaGem, FaFileAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png"; 
const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img
          src={logo}
          alt="logo"
          className={styles.logoIcon}
        />
        <span></span>
      </div>
      <nav className={styles.menu}>
        <ul>
          <li  onClick={() => navigate("/card")}className={styles.active}><FaThLarge className={styles.icon} /> <span>DASHBOARD</span></li>
          <li  onClick={() => navigate("/profile")} ><FaUserFriends className={styles.icon} /> <span>VENDOR PROFILE</span></li>
          
          <li onClick={() => navigate("/car-listing") }><FaBox className={styles.icon} /> <span>Add Car</span></li>
          <li onClick={() => navigate("/DashboardPage")}><FaBox className={styles.icon} /> <span>My car</span></li>
          
          <li><FaStar className={styles.icon} /> <span>REVIEWS</span></li>

          
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
