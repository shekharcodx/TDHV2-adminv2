import styles from "./DashboardPage.module.css";
import car1 from "../../assets/car1.jpeg";
import car2 from "../../assets/car2.jpeg";
import car3 from "../../assets/car3.jpeg";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    category: "Sedan",
    image: car1,
    kmDay: "AED 100 / Day",
    kmDayLimit: "22 KM / Day",
    kmWeek: "AED 600 / Week",
    kmWeekLimit: "150 KM / Week",
    kmMonth: "AED 1800 / Month",
    kmMonthLimit: "600 KM / Month",
    status: "pending",
  },
  {
    id: 2,
    name: "Nissan Patrol",
    category: "SUV",
    image: car2,
    kmDay: "AED 150 / Day",
    kmDayLimit: "30 KM / Day",
    kmWeek: "AED 900 / Week",
    kmWeekLimit: "200 KM / Week",
    kmMonth: "AED 2500 / Month",
    kmMonthLimit: "800 KM / Month",
    status: "approved",
  },
  {
    id: 3,
    name: "BMW X5",
    category: "Luxury",
    image: car3,
    kmDay: "AED 300 / Day",
    kmDayLimit: "50 KM / Day",
    kmWeek: "AED 1800 / Week",
    kmWeekLimit: "300 KM / Week",
    kmMonth: "AED 5000 / Month",
    kmMonthLimit: "1000 KM / Month",
    status: "hold",
  },
];

function AllListings() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        {/* <input type="text" placeholder="Search cars..." /> */}
        <button
          className={styles.createBtn}
          onClick={() => navigate("/create-listing")}
        >
          + Create Car
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Km/Day</th>
              <th>Km/Day Limit</th>
              <th>Km/Week</th>
              <th>Km/Week Limit</th>
              <th>Km/Month</th>
              <th>Km/Month Limit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>
                  <div className={styles.titleCell}>
                    <img
                      src={car.image}
                      alt={car.name}
                      className={styles.image}
                    />
                    <div>
                      <h4>{car.name}</h4>
                      <p>{car.category}</p>
                    </div>
                  </div>
                </td>
                <td>{car.kmDay}</td>
                <td>{car.kmDayLimit}</td>
                <td>{car.kmWeek}</td>
                <td>{car.kmWeekLimit}</td>
                <td>{car.kmMonth}</td>
                <td>{car.kmMonthLimit}</td>
                <td>
                  <span
                    className={`${styles.status} ${
                      car.status === "pending"
                        ? styles.pending
                        : car.status === "approved"
                        ? styles.approved
                        : styles.hold
                    }`}
                  >
                    {car.status}
                  </span>
                </td>
                <td>
                  <button className={styles.editBtn}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className={styles.pagination}>
          <span>
            Showing 1–{cars.length} of {cars.length}
          </span>
          <Flex gap="5px">
            <button className={styles.pageBtn}>Prev</button>
            <button className={styles.pageBtn}>Next</button>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default AllListings;
