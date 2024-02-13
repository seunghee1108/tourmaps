"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/search.module.scss";
import Topbar from "../components/Topbar/Topbar";
import { useParams } from "react-router-dom";

interface SearchResultDetail {
  title: string;
  firstimage: string;
  overview: string;
}

interface SearchResultIntro {
  distance: string;
  taketime: string;
}

interface SearchResultInfo {
  subname: string;
  subdetailoverview: string;
}

const DetailPage: React.FC = () => {
  const [commonInfo, setCommonInfo] = useState<SearchResultDetail[]>([]); //
  const [introInfo, setIntroInfo] = useState<SearchResultIntro[]>([]);
  const [courseInfo, setCourseInfo] = useState<SearchResultInfo[]>([]);
  const [detailnResult, setDetailResult] = useState<SearchResultDetail[]>([]);
  const [introResult, setIntroResult] = useState<SearchResultIntro[]>([]);
  const [infoResult, setInfoResult] = useState<SearchResultInfo[]>([]);
  const { contentId } = useParams();

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
        `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`
      );
      if (response.ok) {
        const result = await response.json();
        const items: SearchResultDetail[] = result.response.body.items.item.map(
          (item: any) => ({
            title: item.title,
            firstimage: item.firstimage,
            overview: item.overview,
          })
        );
        setCommonInfo(items);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchIntroInfo = async () => {
    try {
      const response = await fetch(
        `http://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&ccontentId=1942787&MobileOS=ETC&MobileApp=AppTest&_type=json`
      );

      if (response.ok) {
        const result = await response.json();
        const items: SearchResultIntro[] = result.response.body.items.item.map(
          (item: any) => ({
            distance: item.distance,
            taketime: item.taketime,
          })
        );
        setIntroInfo(items);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCourseInfo = async () => {
    try {
      const response = await fetch(
        `http://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest&_type=json`
      );
      if (response.ok) {
        const result = await response.json();
        const items: SearchResultInfo[] = result.response.body.items.item.map(
          (item: any) => ({
            subname: item.subname,
            subdetailoverview: item.subdetailoverview,
          })
        );
        setCourseInfo(items);
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
      <div>
        <h1>Detail Page</h1>

        {/* 공통 정보 출력 */}
        <h2>Common Info</h2>
        {commonInfo &&
          commonInfo.map((info, index) => (
            <div key={index}>
              <h2>공통 정보</h2>
              <p>Title: {info.title}</p>
              <img src={info.firstimage} alt="Common Info Image" />
              <p>Overview: {info.overview}</p>
            </div>
          ))}

        {/* 소개 정보 출력 */}
        <h2>Introduction Info</h2>
        {introInfo &&
          introInfo.map((info, index) => (
            <div key={index}>
              <h2>소개 정보</h2>
              <p>Distance: {info.distance}</p>
              <p>Take Time: {info.taketime}</p>
              {/* 여기에 소개 정보를 출력하는 코드 추가 */}
            </div>
          ))}

        {/* 코스 정보 출력 */}
        <h2>Course Info</h2>
        {courseInfo &&
          courseInfo.map((info, index) => (
            <div key={index}>
              <h2>코스 정보</h2>
              <p>Subname: {info.subname}</p>
              <p>Subdetailoverview: {info.subdetailoverview}</p>
              {/* 여기에 코스 정보를 출력하는 코드 추가 */}
            </div>
          ))}
      </div>
    </div>
  );
};
export default DetailPage;
