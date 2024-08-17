import styles from "@/app/styles/dashboard.module.css";

const PaginationBtn = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.paginationBtn}>
      {text}
    </button>
  );
};

export default PaginationBtn;
