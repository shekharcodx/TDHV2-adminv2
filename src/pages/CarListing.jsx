import React, { useState } from 'react';
import styles from './CarListing.module.css';
import logo from "../assets/logo.png";
const carData = {
  Audi: ['A3', 'A4', 'Q7'],
  BMW: ['X5', 'M3', 'i8'],
  Bentley: ['Continental', 'Bentayga'],
  Cadillac: ['Escalade', 'CT5']
};

const CarListing = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <img src= {logo} alt="Logo" className={styles.logoImage} />

        <div className={styles.profile}>
          <span className={styles.vendor}>ALaina</span>
          <img
            src="https://ui-avatars.com/api/?name=Naveed+Ahsan&background=0070f3&color=fff"
            alt="Profile"
            className={styles.avatar}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.container}>
        <h2 className={styles.title}>Add Car Details</h2>

        <form className={styles.form}>
          <div className={styles.grid}>
            <select className={styles.select}>
              <option value="">Locations</option>
              <option value="dubai">Dubai</option>
              <option value="abu-dhabi">Abu Dhabi</option>
            </select>

            <select
              className={styles.select}
              value={selectedBrand}
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                setSelectedModel('');
              }}
            >
              <option value="">Brand</option>
              {Object.keys(carData).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              className={styles.select}
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
            >
              <option value="">Car Model</option>
              {selectedBrand &&
                carData[selectedBrand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>

            <input className={styles.input} placeholder="Year" />
            <select className={styles.select}>
              <option value="">Car Type</option>
              <option value="suv">SUV</option>
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
            </select>

            <input className={styles.input} placeholder="Capacity (Passengers)" />
            <input className={styles.input} placeholder="Capacity (Tank)" />
            <input className={styles.input} placeholder="Bags" />

            <select className={styles.select}>
              <option value="">Interior Colors</option>
              <option value="black">Black</option>
              <option value="beige">Beige</option>
            </select>

            <select className={styles.select}>
              <option value="">Exterior Colors</option>
              <option value="white">White</option>
              <option value="blue">Blue</option>
            </select>

            <input className={styles.input} placeholder="Included Mileage (km)" />
            <input className={styles.input} placeholder="Extra Mileage Rate (AED/km)" />
            <input className={styles.input} placeholder="Delivery Charge (AED)" />
            <input className={styles.input} placeholder="Total Charges (AED)" />
            <input className={styles.input} placeholder="Security Deposit (AED)" />
          </div>
        </form>
      </main>
    </div>
  );
};

export default CarListing;
