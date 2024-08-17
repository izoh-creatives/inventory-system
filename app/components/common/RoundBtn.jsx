import Link from "next/link";

import styles from "@/app/styles/common.module.css";

const RoundBtn = ({ type, text, link, onClick, customClass }) => {
  return link ? (
    <Link href={link}>
      <button className={`${styles.roundBtn} ${customClass}`}>{text}</button>
    </Link>
  ) : (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`${styles.roundBtn} ${customClass}`}
    >
      {text}
    </button>
  );
};

export default RoundBtn;
