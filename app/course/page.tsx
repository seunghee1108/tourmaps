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

const regions = [
  { value: "1", label: "서울" },
  { value: "6", label: "부산" },
  { value: "4", label: "대구" },
  { value: "2", label: "인천" },
  { value: "5", label: "광주" },
  { value: "3", label: "대전" },
  { value: "7", label: "울산" },
  { value: "8", label: "세종" },
  { value: "31", label: "경기" },
  { value: "32", label: "강원" },
  { value: "33", label: "충북" },
  { value: "34", label: "충남" },
  { value: "35", label: "경북" },
  { value: "36", label: "경남" },
  { value: "37", label: "전북" },
  { value: "38", label: "전남" },
  { value: "39", label: "제주" },
];

const courses = [
  { value: "C0112", label: "가족코스" },
  { value: "C0113", label: "나홀로코스" },
  { value: "C0114", label: "힐링코스" },
  { value: "C0115", label: "도보코스" },
  { value: "C0116", label: "캠핑코스" },
  { value: "C0117", label: "맛코스" },
];

const SearchRegionPage: React.FC = () => {
  const [searchRegion, setSearchRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResultList[]>([]);

  // const [currentRegion, setCurrentRegion] = useState<string>(
  //   regions[0]?.value ?? ""
  // );
  // const [currentHashtag, setCurrentHashtag] = useState<string>(
  //   courses[0]?.value ?? ""
  // );

  const [currentRegion, setCurrentRegion] = useState<string>("");
  const [currentHashtag, setCurrentHashtag] = useState<string>("");

  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D";

  const handleHashtagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentHashtag(e.target.value);
  };

  
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        // `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?
        // serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=3&contentTypeId=25`

        // &numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=Q&areaCode=${currentRegion}&contentTypeId=25&cat1=C01&cat2=${currentHashtag}&_type=json`
        
       ` https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=6&contentTypeId=25`
        );
        if (response.ok) {
          const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {

        }
        const result = await response.json();
        const extractedResults: SearchResultList[] =
          result.response.body.items.item.map((item: any) => ({
            addr1: item.addr1,
            addr2: item.addr2,
            // cat1: item.cat1,
            // cat2: item.cat2,
            title: item.title,
            // firstimage: item.firstimage,
            // firstimage2: item.firstimage2,
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
                {/* <th>카테고리1</th> */}
                {/* <th>카테고리2</th> */}
                {/* <th>이미지1</th> */}
                {/* <th>이미지2</th> */}
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item, index) => (
                <tr key={index} className={styles.row}>
                  <td>{item.title}</td>
                  <td>{item.addr1}</td>
                  <td>{item.addr2}</td>
                  {/* <td>{item.cat1}</td>  */}
                  {/* <td>{item.cat2}</td> */}
                  {/* <td>{item.firstimage2}</td> */}

                  {/* <td> */}
                  {/* {item.firstimage && (
      <img src={item.firstimage} alt={`이미지${index + 1}`} style={{ width: "100px", height: "100px" }} />
    )}
  </td> */}
                  {/* <td>
    {item.firstimage && (
      <img src={item.firstimage2} alt={`이미지${index + 1}`} style={{ width: "100px", height: "100px" }} />
    )}
  </td> */}
                  {/* <td>{item.firstimage2}</td> */}
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
