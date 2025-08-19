import React from "react";
import styles from "./AdminDashboard.module.css";
import logo from "../assets/logo.png";

const cars = [
  {
    id: 1,
    name: "Nissan Altima SR 2024",
    type: "Sedan",
    mileage: "5000 KM / Day",
    price: "AED 150 / Day",
    vendor: "S2E Luxury Rent A Car",
    status: "approved",
  },
  {
    id: 2,
    name: "KIA K5 GT-LINE 2024",
    type: "Sedan",
    mileage: "5000 KM / Day",
    price: "AED 380 / Day",
    vendor: "S2E Luxury Rent A Car",
    status: "approved",
  },
  {
    id: 3,
    name: "Mercedes Benz CLA250 2023",
    type: "Sedan",
    mileage: "5000 KM / Day",
    price: "AED 350 / Day",
    vendor: "S2E Luxury Rent A Car",
    status: "approved",
  },
];

export default function AdminDashboard() {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Drivehub Logo" />
        </div>
        <div className={styles.user}>Vendor portal</div>
      </header>

      <div className={styles.content}>
        <h2 className={styles.title}>All Cars</h2>
        <p>Total Cars: {cars.length}</p>
        <input
          type="text"
          placeholder="Search cars by ID, title, or model"
          className={styles.search}
        />

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Is Featured for</th>
              <th>Mileage</th>
              <th>Vendor Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td className={styles.carInfo}>
                  <div className={styles.carImg}>Image</div>
                  <div>
                    <strong>{car.name}</strong>
                    <p>{car.type}</p>
                  </div>
                </td>
                <td>
                  <select>
                    <option>Select an option</option>
                  </select>
                </td>
                <td>
                  <div>{car.price}</div>
                  <div>{car.mileage}</div>
                </td>
                <td>{car.vendor}</td>
                <td>
                  <span
                    className={
                      car.status === "approved"
                        ? styles.approved
                        : styles.pending
                    }
                  >
                    {car.status}
                  </span>
                  <button className={styles.viewBtn}>View/Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
