"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./reset.module.css";

const Resetpass = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password reset successful:", formData.password);
    // Add your API call here
  };

  return (
    <div className={styles.resetWrapper}>
      <div className={styles.resetCard}>
        <h3 className={styles.heading}>Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.inputField}
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={styles.inputField}
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Reset Password
          </button>
          <h6 className={styles.orText}>OR</h6>
          <Link to="/sign-in" className={styles.forgetLink}>
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Resetpass;
