"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import styles from "@/app/styles/navbar.module.css";
import { navLinks } from "@/data/navLinks";

const Navbar = () => {
  //Variables
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [menuOpen, setOpen] = useState(false);

  //Open menu
  const openMenu = () => setOpen(true);

  //Close menu
  const closeMenu = () => setOpen(false);

  //Close menu when outside is clicked
  useEffect(() => {
    const closeOnClick = (e) => {
      if (!menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", closeOnClick);

    return () => document.removeEventListener("mousedown", closeOnClick);
  }, []);

  return (
    <div className={styles.navbar}>
      {/* Site name */}
      <Link href="/" className={styles.siteName}>
        <h1>Store Management System</h1>
      </Link>
      {/* Nav links */}
      <div
        ref={menuRef}
        className={`${styles.navLinks} ${menuOpen && styles.open}`}
      >
        {menuOpen && (
          <span onClick={closeMenu} className={styles.closeIcon}>
            X
          </span>
        )}
        {navLinks.map((navLink, index) => {
          const isActive = navLink.link == pathname;
          return (
            <Link
              key={index}
              href={navLink.link}
              onClick={closeMenu}
              className={`${styles.navLink} ${isActive && styles.active}`}
            >
              {navLink.title}
            </Link>
          );
        })}
      </div>
      {/* Add to cart button */}
      <div className={styles.cartBtn}>
        <p className={styles.cartText}>Cart</p>
        <p className={styles.cartLabel}>0</p>
      </div>
      {/* Mobile menu icon */}
      {!menuOpen && (
        <div onClick={openMenu} className={styles.menuIcon}>
          Menu
        </div>
      )}
    </div>
  );
};

export default Navbar;
