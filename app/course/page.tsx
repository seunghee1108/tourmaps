"use client";

import React, { useState } from "react";
import styles from "@/app/styles/course.module.scss";
import Topbar from "../components/Topbar/Topbar";
import Link from "next/link";

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
  contentId: string;
}

const SearchCoursePage: React.FC = () => {
  const [selectedContentId, setSelectedContentId] = useState<string>("");
  const [searchRegion, setSearchRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResultList[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string>("");
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  

  const handleItemClick = (contentId: string) => {
    setSelectedContentId(contentId);
    // 여행지의 contentid를 추출하고, DetailPage로 이동
    window.location.href = `/detail/${encodeURIComponent(contentId)}`; // 경로 수정 필요
  };

  const handleHashtagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentHashtag(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=Q&areaCode=${currentRegion}&contentTypeId=25&cat1=C01&cat2=${currentHashtag}&_type=json`
      );

      if (response.ok) {
        const result = await response.json();
        const extractedResults: SearchResultList[] =
          result.response.body.items.item.map((item: any) => ({
            addr1: item.addr1,
            addr2: item.addr2,
            title: item.title,
            contentId: item.contentId,
          }));
        setSearchResult(extractedResults);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>
      <div onClick={handleSubmit} className={styles.course_formButton}>
        <img
          src="/family.png"
          alt="가족코스"
          onClick={() => setCurrentHashtag("C0112")}
        />
        <img
          src="/travel.png"
          alt="나홀로코스"
          onClick={() => setCurrentHashtag("C0113")}
        />
        <img
          src="/healing.png"
          alt="힐링코스"
          onClick={() => setCurrentHashtag("C0114")}
        />

        <img
          src="/walk.png"
          alt="도보코스"
          onClick={() => setCurrentHashtag("C0115")}
        />

        <img
          src="/camping.png"
          alt="캠핑코스"
          onClick={() => setCurrentHashtag("C0116")}
        />
        <img
          src="/food.png"
          alt="맛코스"
          onClick={() => setCurrentHashtag("C0117")}
        />
      </div>

      {/* <select
        id="hashtagFilter"
        className="course_hashtagFilterSelect"
        onChange={handleHashtagChange}
      >
        <option value="">전체</option>
        <option value="C0112">#가족코스</option>
        <option value="C0113">#나홀로코스</option>
        <option value="C0114">#힐링코스</option>
        <option value="C0115">#도보코스</option>
        <option value="C0116">#캠핑코스</option>
        <option value="C0117">#맛코스</option>
      </select> */}

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>ADDRESS</th>
                {/* <th>주소2</th> */}
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item, index) => (
                <tr
                  key={index}
                  className={styles.row}
                  onClick={() => handleItemClick(item.contentId)}
                >
            <td>
      {item.contentId ? (
        <Link href={`/detail/${encodeURIComponent(item.contentId)}`}>
          {item.title}
        </Link>
      ) : (
        <span>해당 항목의 contentId가 없습니다.</span>
      )}
    </td>
                  {/* <Link to={`/detail/${contentId}`}>디테일 페이지로 이동</Link> */}
                  <td>{item.title}</td>
                  <td>{item.addr1}</td>
                  {/* <td>{item.addr2}</td> */}
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
