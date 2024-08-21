"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/app/styles/dashboard.module.css";
import supabase from "@/app/config/supabaseClient";
import Feedback from "@/app/components/dashboard/Feedback";
import FormBtn from "@/app/components/dashboard/FormBtn";
import Loading from "@/app/loading";
import { products } from "@/data/products";

const ProductUpdate = ({ params }) => {
  const router = useRouter();
  // Get slug from url
  const { slug } = params;

  // Variables
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState();
  const [images, setImages] = useState([]);
  const [feedback, setFeedback] = useState("");
  const cdnUrl =
    "https://necsftdazwfszvyasjhz.supabase.co/storage/v1/object/public/images/products";

  // Get categories
  const getCategories = async () => {
    setFeedback("Getting categories...");

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

  // Get product
  const getProduct = async () => {
    setFeedback("Loading product,please wait...");

    // No slug
    if (!slug) {
      setFeedback("Product not found");
      setLoading(false);
      return;
    }

    // Load product from database
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select()
      .eq("slug", slug);

    // Error
    if (productError) {
      setFeedback("Error loading the product");
      setLoading(false);
      return;
    }

    // Product loaded
    if (productData) {
      // Update product
      setProduct(productData[0]);

      // Get images
      const { data: imagesData, error: imagesError } = await supabase.storage
        .from("images")
        .list(`products/${slug}/`);

      // Error
      if (imagesError) {
        setFeedback("Error loading product images");
      }

      // Images found
      if (imagesData) {
        setImages(imagesData);
      }
      setLoading(false);
      setFeedback("");
    }
  };

  //Get product and categories on page load
  useEffect(() => {
    getCategories();
    getProduct();
  }, []);

  //Handle images
  const handleImages = (e) => {
    setImages(e.target.files);
  };

  //Update product
  const updateProduct = async (e) => {
    // Prevent page refresh
    e.preventDefault();

    // Update user
    setLoading(true);
    setFeedback("Updating product,please wait...");
    const productData = {};

    //Get form data
    const formData = new FormData(e.currentTarget);

    // Assign each form input to its value
    for (const item of formData.entries()) {
      productData[item[0]] = item[1];
    }

    // Destructure product items
    const { name, price, category, description } = productData;

    //Upload images
    const uploadedImages = [];
    if (images.length > 0) {
      for (const image of images) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("images")
          .upload(`products/${product.slug}/${image.name}`, image);

        // Upload error
        if (uploadError) {
          setFeedback(`Error uploading image:${image.name}`);
        }

        // Upload successful
        if (uploadData) {
          uploadedImages.push(image.name);
        }
      }
    }

    //Get product images
    // Get images
    const { data: imagesData, error: imagesError } = await supabase.storage
      .from("images")
      .list(`products/${product.slug}/`);

    //Images there
    if (imagesData) {
      for (const image of imagesData) {
        uploadedImages.push(image.name);
      }
    }

    //After images are uploaded
    // Add product to database
    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        slug,
        price,
        category,
        description,
        images: uploadedImages,
      })
      .eq("slug", product.slug);

    //Product not added
    if (error) {
      setLoading(false);
      setFeedback("Error uploading the product");
      return;
    }

    // Success adding the product
    setLoading(false);
    setFeedback("Product uploaded successfully");
    router.push("/dashboard/inventory");
  };

  //Delete image
  const deleteImage = async (imageName) => {
    // Show notification
    setLoading(true);
    setFeedback(`Deleting image:${imageName}...`);

    // Delete the image
    const { data, error } = await supabase.storage
      .from("images")
      .remove([`products/${product.slug}/${imageName}`]);

    // Delete successful
    if (data) {
      // Get new images
      const { data: imagesData, error: imagesError } = await supabase.storage
        .from("images")
        .list(`products/${product.slug}/`);

      //Images there
      const newImages = [];
      if (imagesData) {
        for (const image of imagesData) {
          newImages.push(image.name);
        }
      }
      // Update image field on database
      const { data, error } = await supabase
        .from("products")
        .update({ images: newImages })
        .eq("slug", slug);

      // Reload the product
      getProduct();

      // Show delete success
      setLoading(false);
      setFeedback("Image deleted successfully");
    }

    // Delete error
    if (error) {
      // Show delete error
      setLoading(false);
      setFeedback("Error deleting the image");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.productUpdate}>
      {/* Feedback */}
      <Feedback text={feedback} />
      {/* Form */}
      {product != null && (
        <form
          onSubmit={updateProduct}
          className={`${styles.productForm} ${styles.form}`}
        >
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            placeholder="Product name"
          />
          <select name="category">
            <option defaultValue="" disabled>
              Category
            </option>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <option
                  key={index}
                  value={category.name}
                  selected={category.name == product.category}
                >
                  {category.name}
                </option>
              ))}
          </select>
          <input
            type="text"
            name="price"
            defaultValue={product.price}
            placeholder="Price in $"
          />
          <textarea
            rows="18"
            name="description"
            defaultValue={product.description}
            placeholder="Description"
          />
          <input
            type="file"
            name="image"
            onChange={handleImages}
            required={product.images.length <= 0 && images.length <= 0}
            multiple
          />
          {product != null && product.images.length > 0 && (
            <div className={styles.productImages}>
              {product.images.map((image, index) => (
                <div key={index} className={styles.productImage}>
                  <img
                    src={`${cdnUrl}/${product.slug}/${image}`}
                    className={styles.img}
                  />
                  <span
                    onClick={() => deleteImage(image)}
                    className={styles.deleteText}
                  >
                    Delete
                  </span>
                </div>
              ))}
            </div>
          )}
          <FormBtn text="Update product" />
        </form>
      )}
    </div>
  );
};

export default ProductUpdate;
