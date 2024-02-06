"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/styles/region.module.scss";
import Topbar from "../components/Topbar/Topbar";

interface SearchResultRegion {
  addr1: string;
  addr2: string;
  title: string;
  contentid: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contenttypeid: string;
  createdtime: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  zipcode: string;
}

const SearchRegionPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);
  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D";

  const handleRegionSearch = async () => {
    try {
      const response = await fetch(
        
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D&contentTypeId=25&contentId=YOUR_CONTENT_ID&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&MobileOS=ETC`,

        // ` https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=20&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=${selectedRegion}&contentTypeId=25`,
        {
          headers: {
            Accept: "application/json", // JSON 응답을 요청합니다.
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const items: SearchResultRegion[] = result.response.body.items.item.map(
          (item: any) => ({
            addr1: item.addr1,
            title: item.title,
            contentid: item.contentid,
            areacode: item.areacode,
            booktour: item.booktour,
            cat1: item.cat1,
            cat2: item.cat2,
            cat3: item.cat3,
            contenttupeid: item.contenttypeid,
            createdtime: item.createdtime,
            cpyrthDivCd: item.cpyrhtDivCd,
            mapx: item.mapx,
            mapy: item.mapy,
            mlevel: item.mlevel,
            modifiedtime: item.modifiedtime,
            sigungucode: item.sigungucode,
          })
        );
        setRegionResult(items);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRegion(e.target.value.trim());
  };

  useEffect(() => {
    // 선택된 지역이 변경될 때마다 검색 수행
    if (selectedRegion) {
      handleRegionSearch();
    }
  }, [selectedRegion]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>
      {/* 
      <div className={styles.buttonsContainer}>
      <img
  src="/대전.svg"
  alt="대전"
  className={styles.image}
  onClick={() => setSelectedRegion('1')}
/> */}


      {/* </div> */}
      {/* 
  <button onClick={handleRegionSearch} className={`course_formButton ${styles.searchButton}`}>
    검색
  </button> */}

      <select
        id="regionFilter"
        className={`course_regionFilterSelect ${styles.select}`} // 스타일 클래스 추가
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="">전체</option>
        <option value="1">서울</option>
        <option value="6">부산</option>
        <option value="4">대구</option>
        <option value="2">인천</option>
        <option value="5">광주</option>
        <option value="3">대전</option>
        <option value="7">울산</option>
        <option value="8">세종</option>
        <option value="31">경기</option>
        <option value="32">강원</option>
        <option value="33">충북</option>
        <option value="34">충남</option>
        <option value="35">경북</option>
        <option value="36">경남</option>
        <option value="37">전북</option>
        <option value="38">전남</option>
        <option value="39">제주</option>
      </select>

      <button onClick={handleRegionSearch} className="course_formButton">
        검색
      </button>

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>주소</th>
                <th>제목</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>
                <th>ci</th>

              </tr>
            </thead>
            <tbody>
              {regionResult.map((item, index) => (
                <tr key={index} className={styles.row}>
                  <td>{item.addr1}</td>
                  <td>{item.title}</td>
                  <td>{item.contentid}</td>
                  <td>{item.areacode}</td>
                  <td>{item.booktour}</td>
                  <td>{item.cat1}</td>
                  <td>{item.cat2}</td>
                  <td>{item.cat3}</td>
                  <td>{item.contenttypeid}</td>
                  <td>{item.createdtime}</td>
                  <td>{item.cpyrhtDivCd}</td>
                  <td>{item.mapx}</td>
                  <td>{item.mapy}</td>
                  <td>{item.mlevel}</td>
                  <td>{item.modifiedtime}</td>
                  <td>{item.sigungucode}</td>
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
