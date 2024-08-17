import styles from "@/app/styles/dashboard.module.css";

const FormBtn = ({ text }) => {
  return (
    <button type="submit" className={styles.formBtn}>
      {text}
    </button>
  );
};

export default FormBtn;
