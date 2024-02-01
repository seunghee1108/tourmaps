'use client'

import React, { useState } from 'react';
import styles from "@/app/styles/search.module.scss";
import Topbar from '../components/Topbar/Topbar';

interface SearchResultRegion {
  name: string;
}

const SearchRegionPage: React.FC = () => {
  const [searchRegion, setsearchRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);
  const [selectedHashtag, setSelectedHashtag] = useState<string>('');

  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D";

  const handleRegionSearch = async () => {
    try {
      const response = await fetch(
        ` https://apis.data.go.kr/B551011/KorService1/areaCode1?numOfRows=100&MobileOS=ETC&MobileApp=TUORMAPS&_type=json&serviceKey=WRM%252FxwABX2ibu1FMzeh0M4ca55og%252BubZJmgviYSiIEluTOFZkIWMZ3%252BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%25%253D`
      );
      if (response.ok) {
        const result = await response.json();
        const extractedResults: SearchResultRegion[] =
          result.response.body.items.item.map((item: any) => ({
            name: item.name,
          }));
        setRegionResult(extractedResults); // 지역 검색 결과 상태 업데이트
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchRegion(e.target.value.trim());
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>

      <select
        id="regionFilter"
        className={`course_regionFilterSelect ${styles.select}`} // 스타일 클래스 추가
        onChange={(e) => handleRegionSearch()}
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
      <div>
        <h2>지역 검색 결과</h2>
        <ul>
          {regionResult.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchRegionPage;
