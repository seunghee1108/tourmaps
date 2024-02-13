"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/styles/search.module.scss";
import Topbar from "../components/Topbar/Topbar";
import { useParams } from 'react-router-dom'; 

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
  const [commonInfo, setCommonInfo] = useState<SearchResultDetail[]>([]); 
  const [introInfo, setIntroInfo] = useState<SearchResultIntro[]>([]); 
  const [courseInfo, setCourseInfo] = useState<SearchResultInfo[]>([]);
  const { contentId } = useParams();

  useEffect(() => {
    fetchDetailInfo();
  }, []);

  const fetchDetailInfo = async () => {
    try {
      // Fetch common info
      const commonResponse = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`
      );
      if (commonResponse.ok) {
        const commonResult = await commonResponse.json();
        const commonItems: SearchResultDetail[] = commonResult.response.body.items.item.map(
          (item: any) => ({
            title: item.title,
            firstimage: item.firstimage,
            overview: item.overview,
          })
        );
        setCommonInfo(commonItems); 
      } else {
        console.error("Error fetching common info:", commonResponse.statusText);
      }

      // Fetch introduction info
      const introResponse = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`
      );
      if (introResponse.ok) {
        const introResult = await introResponse.json();
        const introItems: SearchResultIntro[] = introResult.response.body.items.item.map(
          (item: any) => ({
            distance: item.distance,
            taketime: item.taketime,
          })
        );
        setIntroInfo(introItems);
      } else {
        console.error("Error fetching introduction info:", introResponse.statusText);
      }

      // Fetch course info
      const courseResponse = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`
      );
      if (courseResponse.ok) {
        const courseResult = await courseResponse.json();
        const courseItems: SearchResultInfo[] = courseResult.response.body.items.item.map(
          (item: any) => ({
            subname: item.subname,
            subdetailoverview: item.subdetailoverview,
          })
        );
        setCourseInfo(courseItems);
      } else {
        console.error("Error fetching course info:", courseResponse.statusText);
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
        {commonInfo && commonInfo.map((info, index) => (
          <div key={index}>
            <h2>Common Info</h2>
            <p>Title: {info.title}</p>
            <img src={info.firstimage} alt="Common Info Image" />
            <p>Overview: {info.overview}</p>
          </div>
        ))}
        {/* 소개 정보 출력 */}
        {introInfo && introInfo.map((info, index) => (
          <div key={index}>
            <h2>Introduction Info</h2>
            <p>Distance: {info.distance}</p>
            <p>Take Time: {info.taketime}</p>
          </div>
        ))}
        {/* 코스 정보 출력 */}
        {courseInfo && courseInfo.map((info, index) => (
          <div key={index}>
            <h2>Course Info</h2>
            <p>Subname: {info.subname}</p>
            <p>Subdetailoverview: {info.subdetailoverview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
