"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "@/app/config/supabaseClient";
import Feedback from "@/app/components/dashboard/Feedback";
import RoundBtn from "@/app/components/common/RoundBtn";
import FormBtn from "@/app/components/dashboard/FormBtn";

const NewCategory = ({ category }) => {
  const router = useRouter();

  // Variables
  const [name, setName] = useState();
  const [slug, setSlug] = useState();
  const [feedback, setFeedback] = useState("");

  // Reset form
  const resetForm = () => {
    setName("");
    setSlug("");
  };

  //Create category
  const newCategory = async () => {
    setFeedback("Creating a new category...");

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
      <form className={`${styles.categoryForm} ${styles.form}`}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <FormBtn text="Add category" />
      </form>
    </div>
  );
};

export default NewCategory;
