"use client";
import { useEffect, useState } from "react";

import styles from "@/app/styles/shop.module.css";
import Loading from "../loading";
import supabase from "../config/supabaseClient";
import RoundBtn from "../components/common/RoundBtn";

const Shop = () => {
  // Variables
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const cdnUrl =
    "https://necsftdazwfszvyasjhz.supabase.co/storage/v1/object/public/images/products";

  //Get categories and products on page load
  useEffect(() => {
    // Get categories
    const getCategories = async () => {
      //Load from database
      const { data, error } = await supabase.from("categories").select();

      // Error
      if (error) {
        setLoading(false);
        setFeedback("There was an error loading the product categories");
      }

      // Success
      setCategories(data);
      setLoading(false);
    };
    // Get products
    const getProducts = async () => {
      //Load from database
      const { data, error } = await supabase.from("products").select();

      // Error
      if (error) {
        setLoading(false);
        setFeedback("There was an error loading the products");
      }

      // Success
      setProducts(data);
      setLoading(false);
    };
    getCategories();
    getProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.shop}>
      {/* Title */}
      <h3 className={styles.title}>Our Shop</h3>
      {/* Search */}
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search products"
          className={styles.searchInput}
        />
        <select name="category">
          <option defaultValue="" disabled>
            Categories
          </option>
          {categories?.length > 0 &&
            categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>
        <select name="prices">
          <option value="">All prices</option>
          <option value="">Under $25</option>
          <option value="">$25-50</option>
          <option value="">$50-$100</option>
          <option value="">Over $100</option>
        </select>
        <select name="sort" className={styles.sort}>
          <option value="">Sort By</option>
          <option value="">Price:Low to High</option>
          <option value="">Name:A to Z</option>
          <option value="">Name:Z to A</option>
        </select>
      </div>
      {/* Inventory */}
      <div className={styles.products}>
        {loading == false && products?.length > 0 ? (
          products.map((product, index) => (
            // Product
            <div key={index} className={styles.product}>
              {/* Image */}
              <img
                src={`${cdnUrl}/${product.slug}/${product.images[0]}`}
                className={styles.image}
              />
              {/* Content */}
              <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>
                  {product.description.length <= 60
                    ? product.description
                    : `${product.description.substring(0, 60)}...`}
                </p>
                <h4 className={styles.price}>${product.price}</h4>
              </div>
              {/* Buttons */}
              <div className={styles.buttons}>
                <button className={`${styles.productBtn} ${styles.detailsBtn}`}>
                  View details
                </button>
                <button className={`${styles.productBtn} ${styles.cartBtn}`}>
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
