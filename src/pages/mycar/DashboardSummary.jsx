import styles from './Dashboard.module.css';

const DashboardSummary = () => {
  return (
    <div className={styles.summary}>
      <div className={styles.card}>Total Cars <p>1/0</p></div>
      <div className={styles.card}>Total Active Cars <p>0</p></div>
      <div className={styles.card}>Total Inactive Cars <p>1</p></div>
    </div>
  );
};

export default DashboardSummary;
