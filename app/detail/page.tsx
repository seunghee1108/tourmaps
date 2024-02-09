"use client";

import React, { useState } from "react";
import styles from "@/app/styles/search.module.scss";
import Topbar from "../components/Topbar/Topbar";

const DetailPage: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>
      <div>
        <h1>Detail Page</h1>
      </div>
    </div>
  );
};

export default DetailPage;
