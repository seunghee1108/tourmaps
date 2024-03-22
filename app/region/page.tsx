/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import "/app/globals.css";
import styles from "@/app/styles/region.module.scss";
import Topbar from "../components/Topbar/Topbar";

interface SearchResultRegion {
  title: string;
  contentid: string;
  firstimage: string;
  overview: string;
}

const regions = [
  { name: "서울", code: "1", image: "/서울.png" },
  { name: "인천", code: "2", image: "/인천.png" },
  { name: "대전", code: "3", image: "/대전.png" },
  { name: "대구", code: "4", image: "/대구.png" },
  { name: "광주", code: "5", image: "/광주.png" },
  { name: "부산", code: "6", image: "/부산.png" },
  { name: "울산", code: "7", image: "/울산.png" },
  { name: "세종", code: "8", image: "/세종.png" },
  { name: "경기도", code: "31", image: "/경기도.png" },
  { name: "충청북도", code: "33", image: "/충북.png" },
  { name: "충청남도", code: "34", image: "/충남.png" },
  { name: "경상북도", code: "35", image: "/경북.png" },
  { name: "경상남도", code: "36", image: "/경상남도.png" },
  { name: "전라북도", code: "37", image: "/전북.png" },
  { name: "전라남도", code: "38", image: "/전남.png" },
  { name: "제주", code: "39", image: "/제주.png" },
  { name: "강원", code: "32", image: "/강원.png" },
];

const SearchRegionPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);

  const handleRegionSearch = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=30&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=${selectedRegion}&contentTypeId=25`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const items: SearchResultRegion[] = result.response.body.items.item.map(
          (item: any) => ({
            title: item.title,
            contentid: item.contentid,
            firstimage: item.firstimage,
            overview: item.overview,
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

  useEffect(() => {
    // 선택된 지역이 변경될 때마다 검색 수행
    if (selectedRegion) {
      handleRegionSearch();
    }
  }, [selectedRegion]);

  useEffect(() => {
    const fetchOverviews = async () => {
      const newRegionResult = [...regionResult];
      for (let i = 0; i < newRegionResult.length; i++) {
        try {
          const response = await fetchOverview(newRegionResult[i].contentid);
          newRegionResult[i].overview = response;
        } catch (error) {
          console.error("Error fetching overview:", error);
          newRegionResult[i].overview = "";
        }
      }
      setRegionResult(newRegionResult);
    };

    fetchOverviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOverview = async (contentId: string) => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&numOfRows=30&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&MobileOS=ETC&_type=json`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const items: SearchResultRegion[] = result.response.body.items.item.map(
          (item: any) => ({
            title: item.title,
            contentid: item.contentid,
            firstimage: item.firstimage,
            overview: item.overview,
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

  const handleItemClick = (contentId) => {
    // ContentID를 사용하여 세부 정보 페이지 경로를 생성
    window.location.href = `/detail/?contentId=${contentId}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
        <div className={styles.buttonsContainer}>
          {regions.map((region) => (
            <img
              key={region.code}
              src={region.image}
              alt={region.name}
              className={styles.image}
              onClick={() => setSelectedRegion(region.code)}
            />
          ))}
        </div>
      </div>

      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          {regionResult.map((item, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleItemClick(item.contentid)}
            >
              <h3>{item.title}</h3>
              <div className={styles.imageContainer}>
                {item.firstimage ? (
                  <img
                    src={item.firstimage}
                    alt="First Image"
                    className={styles.image}
                  />
                ) : (
                  <img
                    src="/no-pictures.png"
                    alt="Default Image"
                    className={styles.defaultImage}
                  />
                )}
              </div>
              <p className={styles.overviewBox}></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchRegionPage;
