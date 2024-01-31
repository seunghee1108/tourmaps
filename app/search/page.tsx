"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "@/app/styles/search.module.scss";
import Topbar from "../components/Topbar/Topbar";

interface SearchResultItem {
  addr1: string;
  addr2: string;
  cat1: string;
  cat2: string;
  title: string;
  firstimage: string;
  firstimage2: string;
}

const SearchPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]);
  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D";

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=%EC%95%84%EC%95%84&_type=json&keyword=${searchKeyword}&serviceKey=${serviceKey}`
      );
      if (response.ok) {
        const result = await response.json();
        const extractedResults: SearchResultItem[] =
          result.response.body.items.item.map((item: any) => ({
            addr1: item.addr1,
            addr2: item.addr2,
            cat1: item.cat1,
            cat2: item.cat2,
            title: item.title,
            firstimage: item.firstimage,
            firstimage2: item.firstimage2,
          }));
        setSearchResult(extractedResults);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value.trim());
  };

  return (
    <div className={styles.container}>
      <h1>검색 페이지</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchKeyword}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div className={styles.resultContainer}>
        <h2>검색 결과</h2>
        <ul>
          {searchResult.map((item, index) => (
            <li key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.addr1}</p>
                <p>{item.addr2}</p>
                <p>{item.cat1}</p>
                <p>{item.cat2}</p>
                <p>{item.title}</p>
                <p>{item.firstimage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
