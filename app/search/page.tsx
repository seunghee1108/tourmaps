/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import "/app/globals.css";
import styles from "@/app/styles/search.module.scss";
import Topbar from "../components/Topbar/Topbar";

interface SearchResultItem {
  addr1: string;
  title: string;
  firstimage: string;
}

const SearchPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]);
  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D";

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=ETC&MobileApp=%EC%95%84%EC%95%84&_type=json&keyword=${searchKeyword}&serviceKey=${serviceKey}`
      );
      if (response.ok) {
        const result = await response.json();
        const extractedResults: SearchResultItem[] =
          result.response.body.items.item.map((item: any) => ({
            addr1: item.addr1,
            title: item.title,
            firstimage: item.firstimage,
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
      <div className={styles.top}>
        <Topbar />
      </div>

      <h1 className={styles.title}></h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchKeyword}
          onChange={handleInputChange}
          placeholder=" 검색어를 입력하세요."
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          검색
        </button>
      </div>

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>TITLE</th>
                <th>ADDRESS</th>
                <th>IMAGE</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item, index) => (
                <tr key={index} className={styles.row}>
                  <td>{item.title}</td>
                  <td>{item.addr1}</td>
                  <td>
                    {item.firstimage && (
                      <img
                        src={item.firstimage}
                        alt={`이미지${index + 1}`}
                        className={styles.image}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
