import styles from "@/app/styles/dashboard.module.css";
import RoundBtn from "../common/RoundBtn";

const AddBtn = ({ text, link }) => {
  return <RoundBtn text={text} link={link} customClass={styles.addBtn} />;
};

export default AddBtn;
