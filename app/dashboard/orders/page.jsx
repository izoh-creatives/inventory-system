import styles from "@/app/styles/orders.module.css";

const Orders = () => {
  return (
    <div className={styles.orders}>
      {/* Heading */}
      <h1 className={styles.title}>Order Management</h1>
      {/* Description */}
      <p className={styles.description}>
        Here you can manage your orders, track their status, and more
      </p>
    </div>
  );
};

export default Orders;
