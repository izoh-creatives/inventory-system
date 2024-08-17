import styles from "@/app/styles/dashboard.module.css";

const Feedback = ({ text }) => {
  return text != "" && <p className={styles.feedback}>{text}</p>;
};

export default Feedback;
