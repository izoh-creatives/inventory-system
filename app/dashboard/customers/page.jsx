import styles from "@/app/styles/customers.module.css";

const Customers = () => {
  return (
    <div className={styles.customers}>
      {/* Heading */}
      <h1 className={styles.title}>Customer Management</h1>
      {/* Description */}
      <p className={styles.description}>
        Here you can manage your customers, view their details, and more
      </p>
    </div>
  );
};

export default Customers;
