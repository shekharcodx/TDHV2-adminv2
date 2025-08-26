"use client";

import React, { useState } from "react";
import styles from "./Changepass.module.css";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    email: "",
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, tempPassword, newPassword, confirmPassword } = formData;

    if (!email || !tempPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log("Password changed for:", email);
    // 🔗 Add API call here
  };

  return (
    <div className={styles.resetWrapper}>
      <div className={styles.resetCard}>
        <h3 className={styles.title}>Change Password</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.inputField}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="tempPassword" className={styles.label}>
            Temporary Password
          </label>
          <input
            type="password"
            id="tempPassword"
            name="tempPassword"
            className={styles.inputField}
            placeholder="Enter temporary password"
            value={formData.tempPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="newPassword" className={styles.label}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className={styles.inputField}
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={styles.inputField}
            placeholder="Re-enter new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
