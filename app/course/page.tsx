/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import "/app/globals.css";
import styles from "@/app/styles/course.module.scss";
import Topbar from "../components/Topbar/Topbar";

interface SearchResultList {
  addr1: string;
  addr2: string;
  cat1: string;
  cat2: string;
  title: string;
  firstimage: string;
  firstimage2: string;
  contentid: string;
}

const SearchCoursePage = () => {
  const [searchResult, setSearchResult] = useState<SearchResultList[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>("");
  const [currentHashtag, setCurrentHashtag] = useState<string>("");

  useEffect(() => {
    fetchContent();
  }, [currentRegion, currentHashtag]);

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=20&MobileApp=AppTest&MobileOS=ETC&arrange=Q&areaCode=${currentRegion}&contentTypeId=25&cat1=C01&cat2=${currentHashtag}&_type=json`
      );
      if (response.ok) {
        const data = await response.json();
        const items = data.response.body.items.item;
        setSearchResult(items);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleHashtagClick = (hashtag: string) => {
    setCurrentHashtag(hashtag);
  };

  const handleItemClick = (contentId: string) => {
    // contentId를 전달하고 DetailPage로 이동
    window.location.href = `/detail/?contentId=${contentId}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>
      <div className={styles.course_formButton}>
        <img
          src="/family.png"
          alt="가족코스"
          onClick={() => handleHashtagClick("C0112")}
        />
        {/* <p>#가족코스</p> */}
        <img
          src="/man.png"
          alt="나홀로코스"
          onClick={() => handleHashtagClick("C0113")}
        />
        {/* <p>#나홀로코스</p> */}
        <img
          src="/healing.png"
          alt="힐링코스"
          onClick={() => handleHashtagClick("C0114")}
        />
        {/* <p>#힐링코스</p> */}
        <img
          src="/shoes.png"
          alt="도보코스"
          onClick={() => handleHashtagClick("C0115")}
        />
        {/* <p>#도보코스</p> */}
        <img
          src="/camping.png"
          alt="캠핑코스"
          onClick={() => handleHashtagClick("C0116")}
        />
        {/* <p>#캠핑코스</p> */}
        <img
          src="/food.png"
          alt="맛코스"
          onClick={() => handleHashtagClick("C0117")}
        />
        {/* <p>#맛코스</p> */}
      </div>

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
          <thead>
              <tr>
                <th>TITLE</th>
                {/* <th>ADDRESS</th> */}
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item, index) => (
                <tr
                  key={index}
                  className={styles.row}
                  onClick={() => handleItemClick(item.contentid)}
                >
                  <td>{item.title}</td>
                  {/* <td>{item.addr1}</td> */}
                  {/* <td>{item.contentid}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchCoursePage;
