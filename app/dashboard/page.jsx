import styles from "@/app/styles/dashboard.module.css";
import { products } from "@/data/products";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      {/* Pagination */}
      <div className={styles.pagination}>
        <p className={styles.paginationText}>
          Showing page 1 of 10.Total products found:{products.length}
        </p>
        <div className={styles.paginationButtons}>
          <button className={styles.paginationBtn}>Back</button>
          <button className={styles.paginationBtn}>Next</button>
        </div>
      </div>
      {/* Products */}
      <div className={`${styles.products} ${styles.table}`}>
        {/* Header */}
        <div className={styles.header}>
          <p>Id</p>
          <p>Category</p>
          <p>Name</p>
          <p>Price</p>
          <p>Actions</p>
        </div>
        {/* Body */}
        {products.map(
          (product, index) =>
            index <= 12 && (
              <div key={index} className={styles.body}>
                <p>{product.id}</p>
                <p>{product.category}</p>
                <p>{product.name}</p>
                <p>${product.price}</p>
                <div className={styles.actions}>
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className={`${styles.edit} ${styles.action}`}
                  >
                    Edit
                  </Link>
                  <Link
                    href="/"
                    className={`${styles.delete} ${styles.action}`}
                  >
                    Delete
                  </Link>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Dashboard;
