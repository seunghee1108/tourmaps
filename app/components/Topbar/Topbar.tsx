// import jwt, { JwtPayload } from 'jsonwebtoken'; // Commented out this import
import React from "react";
import styles from "@/app/styles/topbar.module.scss"
import Link from "next/link";

function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.div2}>
        <Link href="/" >TOUR MAPS</Link>
      </div>
      <div className={styles.div3}>
      <Link className={styles.link} href="/region">REGION</Link>
      <Link className={styles.link} href="/course">COURSE</Link>
      </div>
    </div>
  );
}

export default Topbar;
