'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/styles/index.module.scss";
import Topbar from "@/app/components/Topbar/Topbar";

function Index() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, [hasWindow]);

  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D";

  const search = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=%EC%95%84%EC%95%84&_type=json&keyword=${searchKeyword}&serviceKey=${serviceKey}`
      );
      if (response.ok) {
        const result = await response.json();
        setSearchResult(JSON.stringify(result, null, 2));
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value); // 검색어 업데이트
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>
      <div className={`${styles.div} ${styles.gray}`}>
        <div className={styles.box1}></div>
      </div>
      <div>
        <input
          type="text"
          value={searchKeyword}
          onChange={handleInputChange} // 검색어 변경 핸들러 연결
          placeholder="검색어를 입력하세요"
        />
        <button onClick={search}>검색</button>
        <div id="result">{searchResult}</div>
      </div>
      <div className={`${styles.div} ${styles.yellow}`}></div>
      <div className={`${styles.div} ${styles.purple}`}></div>
      <div className={`${styles.div} ${styles.blue}`}></div>
    </div>
  );
}

export default Index;
