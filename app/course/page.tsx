/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import "/app/globals.css";
import styles from "@/app/styles/course.module.scss";
import Topbar from "../components/Topbar/Topbar";

interface SearchResultList {
  addr1: string;
  title: string;
  firstimage: string;
  contentid: string;
}
const hashtags = [
  { name: "가족코스", code: "C0112", image: "/family.png" },
  { name: "나홀로코스", code: "C0113", image: "/man.png" },
  { name: "힐링코스", code: "C0114", image: "/healing.png" },
  { name: "도보코스", code: "C0115", image: "/shoes.png" },
  { name: "캠핑코스", code: "C0116", image: "/camping.png" },
  { name: "맛코스", code: "C0117", image: "/food.png" },
];

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
        <Topbar />/
      </div>
      <div className={styles.course_formButton}>
        {hashtags.map((hashtag) => (
          <img
            key={hashtag.code}
            src={hashtag.image}
            alt={hashtag.name}
            onClick={() => handleHashtagClick(hashtag.code)}
          />
        ))}
      </div>

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TITLE</th>
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
