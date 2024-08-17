"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "@/app/config/supabaseClient";
import Feedback from "@/app/components/dashboard/Feedback";
import RoundBtn from "@/app/components/common/RoundBtn";
import FormBtn from "@/app/components/dashboard/FormBtn";

const CategoryUpdate = ({ params }) => {
  const router = useRouter();

  // Get slug from params
  const { slug } = params;

  const [category, setCategory] = useState();
  const [feedback, setFeedback] = useState("");

  //Get category on page load
  useEffect(() => {
    const getCategory = async () => {
      setFeedback("Loading the category,please wait...");

      //No slug
      if (!slug) {
        setFeedback("No category found");
        router.push("/dashboard/categories");
      }

      // Get category
      const { data, error } = await supabase
        .from("categories")
        .select()
        .eq("slug", slug);

      // Handle error
      if (error) {
        setFeedback("Category not found");
        return;
      }

      //  Success
      if (data) {
        setCategory(data[0]);
        setFeedback("");
      }
    };
    getCategory();
  }, []);

  //Update category
  const updateCategory = async (e) => {
    e.preventDefault();
    setFeedback("Updating the category,please wait...");

    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const newSlug = formData.get("slug");

    // Update category on database
    const { data, error } = await supabase
      .from("categories")
      .update({
        name,
        slug: newSlug,
      })
      .eq("slug", slug);
    console.log(data);

    // Error
    if (error) {
      setFeedback("Error updating the category");
      return;
    }

    // Success
    setFeedback("Category updated successfully");
    router.push("/dashboard/categories");
  };

  return (
    <div className={styles.categoryPage}>
      <Feedback text={feedback} />
      {category != null && (
        <form
          onSubmit={updateCategory}
          className={`${styles.categoryForm} ${styles.form}`}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            defaultValue={category.name}
          />
          <input
            type="text"
            placeholder="Slug"
            name="slug"
            defaultValue={category.slug}
          />
          <FormBtn text="Update category" />
        </form>
      )}
    </div>
  );
};

export default CategoryUpdate;
