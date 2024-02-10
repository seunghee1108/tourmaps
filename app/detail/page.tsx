'use client'

import React, { useState, useEffect } from "react";
import styles from "@/app/styles/search.module.scss";
import Topbar from "../components/Topbar/Topbar";


interface SearchResultDetail {
  subname: string;
  subdetailoverview: string;

}



const DetailPage: React.FC = () => {
  const [commonInfo, setCommonInfo] = useState<any>(null);
  const [introInfo, setIntroInfo] = useState<any>(null);
  const [courseInfo, setCourseInfo] = useState<any>(null);
  const [detailnResult, setDetailResult] = useState<SearchResultDetail[]>([]);


  useEffect(() => {
    // 공통 정보 가져오는 API 호출
    fetchCommonInfo();
    // 소개 정보 가져오는 API 호출
    fetchIntroInfo();
    // 코스 정보 가져오는 API 호출
    fetchCourseInfo();
  }, []);

  const fetchCommonInfo = async () => {
    try {
      const response = await fetch(
        `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`,
      );
      if (response.ok) {
        const data = await response.json();
        setCommonInfo(data);
      } else {
        console.error("Error fetching common info:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching common info:", error);
    }
  };

  const fetchIntroInfo = async () => {
    try {
      const response = await fetch(
        `http://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest&_type=json`,
      );
     
      if (response.ok) {
        const data = await response.json();
        setIntroInfo(data);
      } else {
        console.error("Error fetching intro info:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching intro info:", error);
    }
  };

  const fetchCourseInfo = async () => {
    try {
      const response = await fetch(
        `http://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest&_type=json`
      );
      if (response.ok) {
        const data = await response.json();
        setCourseInfo(data);
      } else {
        console.error("Error fetching course info:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching course info:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>
      <div>
        <h1>Detail Page</h1>
        {/* 공통 정보 출력 */}
        {commonInfo && (
          <div>
            <h2>공통 정보</h2>
            {/* 여기에 공통 정보ㄹ를 출력하는 코드 추가 */}
          </div>
        )}
        {/* 소개 정보 출력 */}
        {introInfo && (
          <div>
            <h2>소개 정보</h2>
            {/* 여기에 소개 정보를 출력하는 코드 추가 */}
          </div>
        )}
        {/* 코스 정보 출력 */}
        {courseInfo && (
          <div>
            <h2>코스 정보</h2>
            {/* 여기에 코스 정보를 출력하는 코드 추가 */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
