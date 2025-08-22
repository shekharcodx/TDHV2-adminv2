import styles from './Dashboard.module.css';
import CarItem from './CarItem';

const dummyCar = {
  image: '/car-image.png',
  title: 'Test 1',
  type: 'Sedan',
  kmDay: 'AED 100 / Day\n22 KM / Day',
  kmWeek: 'AED / Week\nKM / Week',
  kmMonth: 'AED / Month\nKM / Month',
};

const CarTable = () => {
  return (
    <div className={styles.tableWrapper}>
      <input type="text" placeholder="Search products..." className={styles.search} />
      <button className={styles.createBtn}>+ Create Listing</button>
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image / Title</th>
            <th>km/day</th>
            <th>km/week</th>
            <th>km/month</th>
            <th>Status/Edit</th>
          </tr>
        </thead>
        <tbody>
          <CarItem car={dummyCar} />
        </tbody>
      </table>
      
      <div className={styles.pagination}>
        <button>Previous</button>
        <span>Page 1 of 0</span>
        <button>Next</button>
      </div>
    </div>
  );
};

export default CarTable;
