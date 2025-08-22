import styles from './Dashboard.module.css';

const CarItem = ({ car }) => {
  return (
    <tr className={styles.carRow}>
      <td>
        <div className={styles.carTitle}>
          <img src={car.image} alt={car.title} />
          <div>
            <p>{car.title}</p>
            <p>{car.type}</p>
          </div>
        </div>
      </td>
      <td>{car.kmDay}</td>
      <td>{car.kmWeek}</td>
      <td>{car.kmMonth}</td>
      <td>
        <span className={`${styles.status} ${styles.pending}`}>Pending</span>
        <button className={styles.editBtn}>View/Edit</button>
      </td>
    </tr>
  );
};

export default CarItem;
