"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "@/app/styles/dashboard.module.css";
import Loading from "@/app/loading";
import supabase from "@/app/config/supabaseClient";
import AddBtn from "@/app/components/dashboard/AddBtn";

const DashboardCategories = () => {
  const router = useRouter();

  // Variables
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  //Load categories on page load
  useEffect(() => {
    const getCategories = async () => {
      setFeedback("Fetching categories,please wait...");

      // Load categories from database
      const { data, error } = await supabase.from("categories").select();

      // Handle error
      if (error) {
        setFeedback("Error fetching the categories");
        setLoading(false);
      }

      // Success
      setFeedback("");
      setCategories(data);
      setLoading(false);
    };
    getCategories();
  }, []);

  //Delete category
  const deleteCategory = async (slug) => {
    setFeedback("Deleting the category...");

    // Delete on database
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("slug", slug);

    // Error
    if (error) {
      setLoading(false);
      setFeedback("Error deleting the category");
    }

    // Success
    setCategories(categories.filter((category) => category.slug != slug));
    setLoading(false);
    setFeedback("Category deleted");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.categories}>
      {/* Add new category */}
      <div className={styles.addBtn}>
        <AddBtn text="Add New" link="/dashboard/categories/new" />
      </div>
      {/* Categories table */}
      {loading == false && categories?.length > 0 ? (
        <div className={styles.table}>
          <div className={styles.header}>
            <p>Name</p>
            <p>Slug</p>
            <p>Action</p>
          </div>
          {categories.map((category, index) => (
            <div key={index} className={`${styles.body} ${styles.category}`}>
              <p>{category.name}</p>
              <p>{category.slug}</p>
              <div className={styles.actions}>
                <Link
                  href={`/dashboard/categories/${category.slug}`}
                  className={`${styles.edit} ${styles.action}`}
                >
                  Edit
                </Link>
                <p
                  onClick={() => deleteCategory(category.slug)}
                  className={`${styles.delete} ${styles.action}`}
                >
                  Delete
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No categories found</p>
      )}
    </div>
  );
};

export default DashboardCategories;
