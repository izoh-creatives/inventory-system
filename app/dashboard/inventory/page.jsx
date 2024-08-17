"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "@/app/config/supabaseClient";
import AddBtn from "@/app/components/dashboard/AddBtn";
import PaginationBtn from "@/app/components/dashboard/PaginationBtn";

const Inventory = () => {
  //Variables
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const totalProducts = products?.length;
  const pageLimit = 12;
  const cdnUrl =
    "https://necsftdazwfszvyasjhz.supabase.co/storage/v1/object/public/images/";

  //Get products
  const getProducts = async () => {
    setLoading(true);
    setFeedback("Getting products,please wait...");
    let from = page * pageLimit;
    let to = from + pageLimit;

    // Avoid repeating product
    if (page > 0) {
      from += 1;
    }

    // Load from database
    const { data, error } = await supabase
      .from("products")
      .select()
      .range(from, to)
      .limit(pageLimit);

    // Error
    if (error) {
      setLoading(false);
      setFeedback("Error getting the products");
      return;
    }

    // Products loaded
    setProducts(data);
    setLoading(false);
    return;
  };

  //Fetch products on page load or page change
  useEffect(() => {
    getProducts();
  }, [page]);

  //Load previous page
  const goBack = () => {
    setLoading(true);
    //No previous page
    if (page == 0) {
      setLoading(false);
      return;
    }
    setPage(page - 1);
    setLoading(false);
  };

  // Load next page
  const goNext = () => {
    setLoading(true);
    // No next page
    if (page >= products.length - 1) {
      setLoading(false);
      return;
    }
    setPage(page + 1);
    setLoading(false);
  };

  //Delete a product
  const deleteProduct = async (slug) => {
    setLoading(true);
    // Delete on database
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("slug", slug);

    // Error
    if (error) {
      setLoading(false);
      setFeedback("Error deleting the product");
      return;
    }

    // Product deleted on database
    setProducts(products.filter((product) => product.slug !== slug));
    setLoading(false);
    setFeedback("Product deleted successfully");
  };

  return (
    <div className={styles.inventory}>
      {/* Intro */}
      <div className={styles.intro}>
        {/* Text */}
        <p className={styles.introText}>
          {totalProducts > 0
            ? `${totalProducts} products found`
            : "No products found"}
        </p>
        {/* Buttons */}
        <div className={styles.introButtons}>
          {/* Pagination */}
          {totalProducts > 0 && (
            <div className={styles.pagination}>
              <PaginationBtn text="Back" onClick={goBack} />
              <PaginationBtn text="Next" onClick={goNext} />
            </div>
          )}
          {/* Add product button */}
          <AddBtn text="Add New" link="/dashboard/inventory/new" />
        </div>
      </div>
      {/* Products */}
      {totalProducts > 0 && (
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
              index <= pageLimit && (
                <div key={index} className={styles.body}>
                  <p>{product.id}</p>
                  <p>{product.category}</p>
                  <p>{product.name}</p>
                  <p>${product.price}</p>
                  <div className={styles.actions}>
                    <Link
                      href={`/dashboard/inventory/${product.slug}`}
                      className={`${styles.edit} ${styles.action}`}
                    >
                      Edit
                    </Link>
                    <span
                      onClick={() => deleteProduct(product.slug)}
                      className={`${styles.delete} ${styles.action}`}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Inventory;
