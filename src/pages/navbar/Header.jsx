import React, { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    alert("Signed out!"); // Replace with real signout logic
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={styles.topHeader}>
      <div className={styles.leftSection}>
        <img src={logo} alt="logo" className={styles.logo} />
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.rightSection} ref={dropdownRef}>
        <div className={styles.avatarWrapper} onClick={() => setOpen(!open)}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            alt="User Avatar"
            className={styles.avatar}
          />
        </div>

        {open && (
          <div className={styles.dropdown}>
            <ul>
              <li onClick={() => navigate("/profile")}>👤 Profile</li>
              <li onClick={handleSignOut}>🚪 Sign Out</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
