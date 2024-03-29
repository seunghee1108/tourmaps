"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "/app/globals.css";
import styles from "@/app/styles/index.module.scss";
import Topbar from "@/app/components/Topbar/Topbar";
import Slider from "./slider/page";
import Footer from "./footer/page";

function Index() {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, [hasWindow]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <Topbar />
      </div>
      <div className={`${styles.div} ${styles.box}`}>
        {hasWindow && (
          <video
            className={styles.video}
            autoPlay={true}
            muted={true}
            loop={true}
            src={"/beach.mp4"}
          />
        )}
        <div className={styles.box1}></div>
      </div>

      <div className={styles.banner2}>
        <Link href="/search">
          <form className={styles.form}>
            <input
              type="text"
              id="searchInput"
              placeholder=" 🔍  키워드를 입력하세요 ! "
              className={styles.search}
            />
          </form>
        </Link>
      </div>
      <Slider />
      <Footer/>
    </div>
  );
}

export default Index;
