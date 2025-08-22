import DashboardSummary from './DashboardSummary';
import CarTable from './CarTable';

const DashboardPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <DashboardSummary />
      <CarTable />
    </div>
  );
};

export default DashboardPage;
