/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import "/app/globals.css";
import styles from "@/app/styles/detail.module.scss";
import Topbar from "../components/Topbar/Topbar";
import { useSearchParams } from "next/navigation";

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

  // const searchParams = useSearchParams()

  const params = useSearchParams();
  const contentId = params.get("contentId");

  // const params = useSearchParams();
  // const contentId = params.get('contentId');
  // console.log(contentId);

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
        `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`
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
        `http://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`
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
        `http://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`
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

        <img src="/location.png" alt="a" className={styles.location} />
      <div className={styles.box}>
        {/* <h2>공통 정보</h2> */}
        {commonInfo &&
          commonInfo.map((info, index) => (
            <div key={index}>
              <h2>" {info.title} "</h2>
              <img
                src={info.firstimage}
                alt="Common Info Image"
                className={styles.image}
              />
              <p className={styles.customFont}>{info.overview}</p>
            </div>
          ))}
      {/* </div> */}


      {/* <div className={styles.box2}> */}
      <img src="/time.png" alt="a" className={styles.course} />

        {/* <h2>소개 정보</h2> */}
        {introInfo &&
          introInfo.map((info, index) => (
            <div key={index}>
              <p className={styles.customFont}>Distance: {info.distance}</p>
              <p className={styles.customFont}>Take Time: {info.taketime}</p>
            </div>
          ))}
      </div>

      <img src="/course.png" alt="a" className={styles.course} />
      <div className={styles.box3}>
        {/* <h2>COURSE</h2> */}
        {courseInfo &&
          courseInfo.map((info, index) => (
            <div key={index}>
               <div className={styles.card}>
              <p className={styles.subName}>{info.subname}</p>
              <p className={styles.customFont}>{info.subdetailoverview}</p></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DetailPage;
