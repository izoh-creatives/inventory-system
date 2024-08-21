"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/app/styles/dashboard.module.css";
import { dashboardItems } from "@/data/dashboardItems";
import RoundBtn from "../common/RoundBtn";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.items}>
        {dashboardItems.map((item, index) => {
          return (
            <div key={index} className={styles.item}>
              <p className={styles.title}>{item.title}</p>
              <div className={styles.subItems}>
                {item.items.map((subItem, index) => {
                  const isActive = pathname == subItem.link;
                  return (
                    <Link key={index} href={subItem.link}>
                      <p
                        className={`${styles.subItem} ${
                          isActive && styles.active
                        }`}
                      >
                        {subItem.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <RoundBtn text="Sign Out" />
    </div>
  );
};

export default Sidebar;
