"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import slugify from "slugify";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "@/app/config/supabaseClient";
import Feedback from "@/app/components/dashboard/Feedback";
import FormBtn from "@/app/components/dashboard/FormBtn";

const NewProduct = () => {
  const router = useRouter();

  // Variables
  const [categories, setCategories] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState();
  const [images, setImages] = useState([]);

  // Get categories
  const getCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("categories").select();

    // Error
    if (error) {
      setLoading(false);
      setFeedback("Error getting product categories");
    }

    // Success
    setCategories(data);
    setLoading(false);
    setFeedback("");
  };

  //Get categories on page load
  useEffect(() => {
    getCategories();
  }, []);

  // Handle images
  const handleImages = (e) => setImages(e.target.files);

  //Add product
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("Adding product,please wait...");
    const product = {};

    //Get form data
    const formData = new FormData(e.currentTarget);

    // Assign each form input to its value
    for (const item of formData.entries()) {
      product[item[0]] = item[1];
    }

    // Destructure product items
    const { name, price, category, description } = product;

    //Create product slug from name
    const slug = slugify(name).toLowerCase();

    //Upload images
    const uploadedImages = [];
    if (images.length > 0) {
      for (const image of images) {
        const { data, error } = await supabase.storage
          .from("images")
          .upload(`products/${slug}/${image.name}`, image);

        // Upload error
        if (error) {
          setFeedback(`Error uploading image:${image.name}`);
        }

        // Upload successful
        if (data) {
          uploadedImages.push(image.name);
        }
      }
    }

    //After image is uploaded/in database
    // Add product to database
    const { data, error } = await supabase.from("products").insert({
      name,
      slug,
      price,
      category,
      description,
      images: uploadedImages,
    });

    //Product not added
    if (error) {
      setLoading(false);
      setFeedback("Error uploading the product");
    }

    // Success adding the product
    setLoading(false);
    setFeedback("Product uploaded successfully");
    router.push("/dashboard/inventory");
  };

  return (
    <div className={styles.newProduct}>
      {/* Feedback */}
      <Feedback text={feedback} />
      {/* Form */}
      <form
        onSubmit={addProduct}
        className={`${styles.productForm} ${styles.form}`}
      >
        <input type="text" name="name" placeholder="Product name" required />

        <select name="category" required>
          <option defaultValue="" disabled>
            Category
          </option>
          {categories?.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input type="text" name="price" placeholder="Price in $" required />
        <textarea rows="18" name="description" placeholder="Description" />
        <input
          type="file"
          name="image"
          onChange={handleImages}
          multiple
          required
        />
        <FormBtn text="Add product" />
      </form>
    </div>
  );
};

export default NewProduct;
