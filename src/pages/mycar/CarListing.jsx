import React, { useState } from 'react';
import styles from './CarListing.module.css';

const carData = {
  Audi: ['A3', 'A4', 'Q7'],
  BMW: ['X5', 'M3', 'i8'],
  Bentley: ['Continental', 'Bentayga'],
  Cadillac: ['Escalade', 'CT5'],
};

const CarListing = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <h2 className={styles.title}>Add Car Details</h2>

        <form className={styles.form}>

          {/* Section 1: Basic Info */}
          <div className={styles.grid}>
            <select className={styles.select}>
              <option value="">Select Location</option>
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
              <option value="">Select Brand</option>
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
              <option value="">
                {selectedBrand ? 'Select Model' : 'Select Brand First'}
              </option>
              {selectedBrand &&
                carData[selectedBrand].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>

            <input className={styles.input} placeholder="Year (e.g. 2023)" />

            <select className={styles.select}>
              <option value="">Select Car Type</option>
              <option value="suv">SUV</option>
              <option value="sedan">Sedan</option>
              <option value="hatchback">Hatchback</option>
            </select>
          </div>

          {/* Section 2: Capacity & Specs */}
          <div className={styles.grid}>
            <input className={styles.input} placeholder="Passenger Capacity" />
            <input className={styles.input} placeholder="Tank Capacity (L)" />
            <input className={styles.input} placeholder="Bags" />
          </div>

          {/* Section 3: Appearance */}
          <div className={styles.grid}>
            <select className={styles.select}>
              <option value="">Interior Color</option>
              <option value="black">Black</option>
              <option value="beige">Beige</option>
            </select>

            <select className={styles.select}>
              <option value="">Exterior Color</option>
              <option value="white">White</option>
              <option value="blue">Blue</option>
            </select>
          </div>

          {/* Section 4: Pricing */}
          <div className={styles.grid}>
            <input className={styles.input} placeholder="Included Mileage (km)" />
            <input className={styles.input} placeholder="Extra Mileage Rate (AED/km)" />
            <input className={styles.input} placeholder="Delivery Charge (AED)" />
            <input className={styles.input} placeholder="Total Charges (AED)" />
            <input className={styles.input} placeholder="Security Deposit (AED)" />
          </div>

          {/* Submit Button (optional) */}
          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button
              type="submit"
              style={{
                backgroundColor: '#5fc0bdff',
                color: '#fff',
                padding: '12px 24px',
                fontSize: '14px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Save Car
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CarListing;
