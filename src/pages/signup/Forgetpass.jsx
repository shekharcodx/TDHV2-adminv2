"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Forget.module.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    console.log("Password reset link sent to:", email);
    // Add API call here
  };

  return (
    <div className={styles.resetWrapper}>
      <div className={styles.resetCard}>
        <h3 className={styles.title}>Forget Password</h3>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            Send Reset Link
          </button>

          <h6 className={styles.orText}>OR</h6>
          <Link to="/sign-in" className={styles.forgetLink}>
            Back to Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
