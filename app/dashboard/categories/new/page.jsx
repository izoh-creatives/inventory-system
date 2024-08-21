"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "@/app/config/supabaseClient";
import Feedback from "@/app/components/dashboard/Feedback";
import RoundBtn from "@/app/components/common/RoundBtn";
import FormBtn from "@/app/components/dashboard/FormBtn";
import slugify from "slugify";

const NewCategory = ({ category }) => {
  const router = useRouter();

  // Variables
  const [name, setName] = useState();
  const [feedback, setFeedback] = useState("");

  // Reset form
  const resetForm = () => {
    setName("");
  };

  //Create category
  const newCategory = async () => {
    setFeedback("Creating a new category...");

    // Create slug from name
    const slug = slugify(name).toLowerCase();

    // Add to database
    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug });

    // Handle error
    if (error) {
      setFeedback("Error creating the category");
      return;
    }

    // Success
    resetForm();
    setFeedback("Category successfully created");
    router.push("/dashboard/categories");
  };

  return (
    <div className={styles.categoryPage}>
      {/* Feedback */}
      <Feedback text={feedback} />
      {/* Form */}
      <form
        onSubmit={newCategory}
        className={`${styles.categoryForm} ${styles.form}`}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormBtn text="Add category" />
      </form>
    </div>
  );
};

export default NewCategory;
