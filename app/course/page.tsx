"use client";

import React, { useState } from "react";
import styles from "@/app/styles/search.module.scss";
import Topbar from "../components/Topbar/Topbar";

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
}

const SearchRegionPage: React.FC = () => {
  const [searchRegion, setSearchRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResultList[]>([]);

  const [currentRegion, setCurrentRegion] = useState<string>("");
  const [currentHashtag, setCurrentHashtag] = useState<string>("");
  const handleItemClick = (title: string) => {
    // 클릭된 항목의 정보를 사용하여 새로운 페이지 URL을 생성합니다.
    const newPageUrl = `/detail`;
    // 새로운 페이지로 이동합니다.
    window.location.href = newPageUrl;
  };

  const handleHashtagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentHashtag(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=Q&areaCode=${currentRegion}&contentTypeId=25&cat1=C01&cat2=${currentHashtag}&_type=json`, 
      );

      if (response.ok) {
        const result = await response.json();
        const extractedResults: SearchResultList[] =
          result.response.body.items.item.map((item: any) => ({
            addr1: item.addr1,
            addr2: item.addr2,
            title: item.title,
          })
          );
          // console.log(handleSubmit);
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

      <select
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
      </select>

      <button onClick={handleSubmit} className="course_formButton">
        검색
      </button>

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>제목</th>
                <th>주소1</th>
                <th>주소2</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item, index) => (
                <tr key={index} className={styles.row}>
                   <td onClick={() => handleItemClick(item.title)}>{item.title}</td>
                  {/* <td>{item.title}</td> */}
                  <td>{item.addr1}</td>
                  <td>{item.addr2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchRegionPage;