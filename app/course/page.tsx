/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/course.module.scss";
import Topbar from "../components/Topbar/Topbar";
import { useParams } from "react-router-dom";
import Link from 'next/link';
import { useRouter, usePathname } from "next/navigation";

interface SearchResultRegion {
  name: string;
}

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
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    fetchContent();
  }, [currentRegion, currentHashtag]);

  const fetchContent = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=Q&areaCode=${currentRegion}&contentTypeId=25&cat1=C01&cat2=${currentHashtag}&_type=json`
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
    router.push(`/detail/${contentId}`); // 경로 수정 필요
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
        <img
          src="/travel.png"
          alt="나홀로코스"
          onClick={() => handleHashtagClick("C0113")}
        />
        <img
          src="/healing.png"
          alt="힐링코스"
          onClick={() => handleHashtagClick("C0114")}
        />
        <img
          src="/walk.png"
          alt="도보코스"
          onClick={() => handleHashtagClick("C0115")}
        />
        <img
          src="/camping.png"
          alt="캠핑코스"
          onClick={() => handleHashtagClick("C0116")}
        />
        <img
          src="/food.png"
          alt="맛코스"
          onClick={() => handleHashtagClick("C0117")}
        />
      </div>

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>ADDRESS</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item, index) => (
                <tr key={index} className={styles.row} onClick={() => handleItemClick(item.contentid)}>
                  <td>
                    
                      {item.title}
                  </td>
                  <td>{item.contentid}</td>
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
