import styles from "@/app/styles/dashboard.module.css";

const DashboardLayout = ({ children }) => {
  return <div className={styles.adminPage}>{children}</div>;
};

export default DashboardLayout;
