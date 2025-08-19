import React, { useState } from "react";
import styles from "./SignupForm.module.css";

import indiaFlag from "../assets/india-flag.png";
import uaeFlag from "../assets/uae-flag.png";
import usaFlag from "../assets/usa-flag.png";
import { useNavigate } from "react-router-dom";


const countries = [
  { name: "India", code: "+91", flag: indiaFlag },
  { name: "United Arab Emirates", code: "+971", flag: uaeFlag },
  { name: "USA", code: "+1", flag: usaFlag },
];

const SignupForm = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[1]); // Default to UAE
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    businessName: "",
    street: "",
    city: "",
    state: "",
    landline: "",
    mobile: "",
    whatsapp: "",
    mapUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (e) => {
    const country = countries.find((c) => c.name === e.target.value);
    if (country) setSelectedCountry(country);
  };
 const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/details"); // Navigate to DetailsForm
  };
  return (
    <div className={styles.container}>
      {/* Steps Header */}
      <div className={styles.stepsHeader}>
        <div className={`${styles.step} ${styles.active}`}>
          <span>1</span>
          <p>Basic Info</p>
        </div>
        <div className={styles.line}></div>
        <div className={styles.step}>
          <span>2</span>
          <p>Details</p>
        </div>
      </div>

      <h2 className={styles.heading}>Basic Info</h2>

      <div className={styles.grid}>
        {/* Full Name */}
        <div>
          <label className={styles.label}>Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className={styles.input}
          />
        </div>

        {/* Email */}
        <div>
          <label className={styles.label}>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={styles.input}
          />
        </div>

        {/* Business Name */}
        <div className={styles.inputFull}>
          <label className={styles.label}>Legal Business Name</label>
          <input
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Legal Business Name"
            className={styles.inputFull}
          />
        </div>

        {/* Street */}
        <div className={styles.inputFull}>
          <label className={styles.label}>Street</label>
          <input
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street"
            className={styles.inputFull}
          />
        </div>

        {/* Country */}
        <div className={styles.inputFull}>
          <label className={styles.label}>Country</label>
          <div className={styles.countrySelect}>
            <img src={selectedCountry.flag} alt="flag" className={styles.flag} />
            <select
              value={selectedCountry.name}
              onChange={handleCountryChange}
              className={styles.select}
            >
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* City */}
        <div>
          <label className={styles.label}>City</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className={styles.input}
          />
        </div>

        {/* State */}
        <div>
          <label className={styles.label}>State</label>
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            className={styles.input}
          />
        </div>

        {/* Phone Fields */}
        {["landline", "mobile", "whatsapp"].map((field) => (
          <div key={field} className={styles.inputFull}>
            <label className={styles.label}>
              {field.charAt(0).toUpperCase() + field.slice(1)} Number
            </label>
            <div className={styles.phoneField}>
              <div className={styles.phonePrefix}>
                <img
                  src={selectedCountry.flag}
                  alt="flag"
                  className={styles.flag}
                />
                <span>{selectedCountry.code}</span>
              </div>
              <input
                type="tel"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={
                  field.charAt(0).toUpperCase() + field.slice(1) + " Number"
                }
                className={styles.phoneInput}
              />
            </div>
          </div>
        ))}

        {/* Map URL */}
        <div className={styles.inputFull}>
          <label className={styles.label}>Map URL</label>
          <input
            name="mapUrl"
            value={formData.mapUrl}
            onChange={handleChange}
            placeholder="Map URL"
            className={styles.inputFull}
          />
        </div>
      </div>

      <button className={styles.nextButton} onClick={handleEditClick} >Next</button>

      <p className={styles.footer}>
        Already have an account?{" "}
        <a href="#" className={styles.loginLink}>
          Login
        </a>
      </p>
    </div>
  );
};

export default SignupForm;
