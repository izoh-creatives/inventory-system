import React from "react";

import styles from "@/app/styles/dashboard.module.css";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return <div className={styles.adminPage}>{children}</div>;
};

export default DashboardLayout;
