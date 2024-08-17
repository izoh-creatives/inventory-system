import { Poppins } from "next/font/google";

import "./globals.css";
import styles from "@/app/styles/common.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer/page";

const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata = {
  title: "Inventory System",
  description:
    "Discover a world of efficiency and control with our comprehensive Store Management System. Streamline your operations, manage inventory effortlessly, and delight your customers with seamless experiences. Let us empower your business to thrive!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className={styles.page}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
