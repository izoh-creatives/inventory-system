import Link from "next/link";

import styles from "@/app/styles/home.module.css";
import RoundBtn from "./components/common/RoundBtn";

const Home = () => {
  return (
    <div className={styles.home}>
      {/* Title */}
      <h1 className={styles.title}>Welcome to the Store Management System</h1>
      {/* Description */}
      <p className={styles.description}>
        Discover a world of efficiency and control with our comprehensive Store
        Management System. Streamline your operations, manage inventory
        effortlessly, and delight your customers with seamless experiences. Let
        us empower your business to thrive!
      </p>
      {/* Inventory button */}
      <RoundBtn
        text="Explore Inventory"
        link="/shop"
        customClass={styles.inventoryBtn}
      />
    </div>
  );
};

export default Home;
