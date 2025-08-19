// components/Sidebar.jsx
import React from "react";
import styles from "./Sidebar.module.css";
import {
  FaThLarge, FaUserFriends, FaUser, FaBox, FaShoppingCart,
  FaStar, FaTags, FaLock, FaGem, FaFileAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055646.png"
          alt="logo"
          className={styles.logoIcon}
        />
        <span></span>
      </div>
      <nav className={styles.menu}>
        <ul>
          <li className={styles.active}><FaThLarge className={styles.icon} /> <span>DASHBOARD</span></li>
          <li><FaUserFriends className={styles.icon} /> <span>VENDORS</span></li>
          <li><FaUser className={styles.icon} /> <span>USERS</span></li>
          <li onClick={() => navigate("/car-listing") }><FaBox className={styles.icon} /> <span>Add Car</span></li>
          <li onClick={() => navigate("/admin-car")}><FaBox className={styles.icon} /> <span>My car</span></li>
          <li><FaShoppingCart className={styles.icon} /> <span>ORDERS</span></li>
          <li><FaStar className={styles.icon} /> <span>REVIEWS</span></li>
          <li><FaTags className={styles.icon} /> <span>BRANDS</span></li>
          <li><FaLock className={styles.icon} /> <span>AUTHENTICATION</span></li>
          <li><FaGem className={styles.icon} /> <span>ICONS</span></li>
          <li><FaFileAlt className={styles.icon} /> <span>OTHER PAGES</span></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
