// components/Header.jsx
import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.topHeader}>
      <div className={styles.leftSection}>
        <h2 className={styles.logo}>Ekka</h2>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.rightSection}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
          alt="User Avatar"
          className={styles.avatar}
        />
        <span className={styles.icon}>🔔</span>
        <span className={styles.icon}>⚙️</span>
      </div>
    </div>
  );
};

export default Header;
