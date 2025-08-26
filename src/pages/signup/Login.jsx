"use client";

import React, { useState } from "react";
import styles from "./SigninC.module.css";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../../app/api/authApi";
import { toaster } from "@/components/ui/toaster";
import { success } from "zod";
import { useNavigate } from "react-router-dom";
import {
  getToken,
  setToken,
  setUserRole,
  setUser,
} from "@/utils/localStorageMethods";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // API call here
    toaster.promise(login(formData).unwrap(), {
      success: (res) => {
        console.log("Login Response:", res);
        if (res.code === 9011) {
          setToken(res.data?.token);
          setUserRole(res.data?.role);
          setUser(res.data);
          navigate("/");
        }
        return {
          title: res.message || "Successfully logged in!",
          description: "",
        };
      },
      error: (err) => {
        console.error("Login Error:", err);
        return {
          title: err?.message || "Failed to login.",
          description: "",
        };
      },
      loading: { title: "Logging in", description: "Please wait" },
    });
  };

  return (
    <div className={styles.signinWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.signinCard}>
          <h3 className={styles.title}>Login</h3>
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email address
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
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.inputField}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
              style={
                isLoading
                  ? { backgroundColor: "#ccc", cursor: "not-allowed" }
                  : {}
              }
            >
              Sign In
            </button>

            {/* Links */}
            <Link to="/forget-password" className={styles.forgetLink}>
              Forget Password?
            </Link>
            <Link to="/sign-up" className={styles.forgetLink}>
              Sign Up?
            </Link>
            <Link to="/password-reset" className={styles.forgetLink}>
              Reset Password?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
