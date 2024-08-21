"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "@/app/config/supabaseClient";
import Loading from "@/app/loading";
import Feedback from "@/app/components/dashboard/Feedback";
import RoundBtn from "@/app/components/common/RoundBtn";
import FormBtn from "@/app/components/dashboard/FormBtn";
import slugify from "slugify";

const CategoryUpdate = ({ params }) => {
  const router = useRouter();

  // Get slug from params
  const { slug } = params;

  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  //Get category on page load
  useEffect(() => {
    const getCategory = async () => {
      setFeedback("Loading the category,please wait...");

      //No slug
      if (!slug) {
        setLoading(false);
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
        setLoading(false);
        setFeedback("Category not found");
        return;
      }

      //  Success
      if (data) {
        setLoading(false);
        setCategory(data[0]);
        setFeedback("");
      }
    };
    getCategory();
  }, []);

  //Update category
  const updateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("Updating the category,please wait...");

    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");

    //Create slug from name
    const newSlug = slugify(name).toLowerCase();

    // Update category on database
    const { data, error } = await supabase
      .from("categories")
      .update({
        name,
        slug: newSlug,
      })
      .eq("slug", slug);

    // Error
    if (error) {
      setLoading(false);
      setFeedback("Error updating the category");
      return;
    }

    // Success
    setLoading(false);
    setFeedback("Category updated successfully");
    router.push("/dashboard/categories");
  };

  if (loading) {
    return <Loading />;
  }

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
          <FormBtn text="Update category" />
        </form>
      )}
    </div>
  );
};

export default CategoryUpdate;
