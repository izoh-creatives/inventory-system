import styles from "@/app/styles/dashboard.module.css";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.adminPage}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
