'use client'
import React, { useState, useEffect } from 'react';
import styles from "@/app/styles/search.module.scss";
import Topbar from '../components/Topbar/Topbar';

interface SearchResultRegion {
  addr1: string;
  addr2: string;
  title: string;
}

const SearchRegionPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);

  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D";

  const handleRegionSearch = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${serviceKey}&numOfRows=10&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=${selectedRegion}&contentTypeId=25`
      );
      if (response.ok) {
        const result = await response.json();
        const extractedResults: SearchResultRegion[] = result.response.body.items.item.map((item: any) => ({
          addr1: item.addr1,
          addr2: item.addr2,
          title: item.title
        }));
        setRegionResult(extractedResults);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
                <th>제목</th>
                <th>주소1</th>
                <th>주소2</th>
              </tr>
            </thead>
            <tbody>
              {regionResult.map((item, index) => (
                <tr key={index} className={styles.row}>
                  <td>{item.title}</td>
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
