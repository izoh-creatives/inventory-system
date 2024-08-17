import Link from "next/link";

import styles from "@/app/styles/footer.module.css";

const Footer = () => {
  const designer = "<<<Kibet Frank>>>";

  return (
    <div className={styles.footer}>
      {/* Copyright */}
      <p>© 2024 Store Management System. All rights reserved.</p>
      {/* Designer */}
      <Link href="/about" className={styles.link}>
        <p>{designer} </p>
      </Link>
      {/* Back to top */}
      <Link href="#" className={styles.link}>
        Back to Top
      </Link>
    </div>
  );
};

export default Footer;
