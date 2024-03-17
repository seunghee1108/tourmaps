"use client";

import React from "react";
import styles from "@/app/styles/footer.module.scss";

function Footer() {

  return (
    <div className={styles.banner}>
    <div>TOURMAPS</div>
    <div>
      <p>이용약관 l 개인정보처리방침</p>
      <p>CEO : 그린</p>
      <p>H.P : 012-3456-7890</p>
      <p>FAX : +82-02-7777-7777</p>
      <p>ADDRESS : 대전광역시 서구 대덕대로</p>
      <p>ⓒ 2024 MK. All rights reserved</p>
    </div>
  </div>
  );
}
export default Footer;