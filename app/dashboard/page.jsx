"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "../config/supabaseClient";
import Loading from "../loading";
import { products } from "@/data/products";

const Dashboard = () => {
  //Variables
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const totalProducts = products?.length;
  const pageLimit = 12;
  const cdnUrl =
    "https://necsftdazwfszvyasjhz.supabase.co/storage/v1/object/public/images/";

  //Get products
  const getProducts = async () => {
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
  // useEffect(() => {
  //   // getProducts();
  // }, [page]);

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

  // Fetch products on page load
  useEffect(() => {
    getProducts();
  }, []);

  // Loading spinner
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.dashboard}>
      {/* Intro */}
      <div className={styles.intro}>
        {/* Intro text */}
        <p className={styles.introText}>
          Total products found:{products.length}
        </p>
        {/* Pagination */}
        <div className={styles.pagination}>
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
                    href={`/dashboard/inventory/${product.slug}`}
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
