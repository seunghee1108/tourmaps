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
  overview: string;
}

const SearchRegionPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);

  const handleRegionSearch = async () => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=20&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=${selectedRegion}&contentTypeId=25`,
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
            addr1: item.addr1,
            title: item.title,
            contentid: item.contentid,
            areacode: item.areacode,
            booktour: item.booktour,
            cat1: item.cat1,
            cat2: item.cat2,
            cat3: item.cat3,
            contenttypeid: item.contenttypeid,
            createdtime: item.createdtime,
            cpyrhtDivCd: item.cpyrhtDivCd,
            mapx: item.mapx,
            mapy: item.mapy,
            mlevel: item.mlevel,
            modifiedtime: item.modifiedtime,
            sigungucode: item.sigungucode,
            overview: item.overview,
            firstimage: item.firstimage,
            firstimage2: item.firstimage2,
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
  }, []);

  const fetchOverview = async (contentId: string) => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&MobileOS=ETC&_type=json`,
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
            addr1: item.addr1,
            title: item.title,
            contentid: item.contentid,
            areacode: item.areacode,
            booktour: item.booktour,
            cat1: item.cat1,
            cat2: item.cat2,
            cat3: item.cat3,
            contenttypeid: item.contenttypeid,
            createdtime: item.createdtime,
            cpyrhtDivCd: item.cpyrhtDivCd,
            mapx: item.mapx,
            mapy: item.mapy,
            mlevel: item.mlevel,
            modifiedtime: item.modifiedtime,
            sigungucode: item.sigungucode,
            overview: item.overview, // overview 초기에 빈 문자열로 설정
            firstimage: item.firstimage,
            firstimage2: item.firstimage2,
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

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Topbar />
      </div>

      <div className={styles.buttonsContainer}>
        <img
          src="/대전.png"
          alt="대전"
          className={styles.image}
          onClick={() => setSelectedRegion("3")}
        />
        <img
          src="/강원.png"
          alt="강원"
          className={styles.image}
          onClick={() => setSelectedRegion("32")}
        />
        <img
          src="/경기도.png"
          alt="경기도"
          className={styles.image}
          onClick={() => setSelectedRegion("31")}
        />
        <img
          src="/경북.png"
          alt="경북"
          className={styles.image}
          onClick={() => setSelectedRegion("35")}
        />
        <img
          src="/경상남도.png"
          alt="경남"
          className={styles.image}
          onClick={() => setSelectedRegion("36")}
        />
        <img
          src="/광주.png"
          alt="광주"
          className={styles.image}
          onClick={() => setSelectedRegion("5")}
        />
        <img
          src="/대구.png"
          alt="대구"
          className={styles.image}
          onClick={() => setSelectedRegion("4")}
        />
        <img
          src="/부산.png"
          alt="부산"
          className={styles.image}
          onClick={() => setSelectedRegion("6")}
        />
        <img
          src="/서울.png"
          alt="서울"
          className={styles.image}
          onClick={() => setSelectedRegion("1")}
        />
        <img
          src="/세종.png"
          alt="세종"
          className={styles.image}
          onClick={() => setSelectedRegion("8")}
        />
        <img
          src="/울산.png"
          alt="울산"
          className={styles.image}
          onClick={() => setSelectedRegion("7")}
        />
        <img
          src="/인천.png"
          alt="인천"
          className={styles.image}
          onClick={() => setSelectedRegion("2")}
        />
        <img
          src="/전남.png"
          alt="전남"
          className={styles.image}
          onClick={() => setSelectedRegion("38")}
        />
        <img
          src="/전북.png"
          alt="전북"
          className={styles.image}
          onClick={() => setSelectedRegion("37")}
        />
        <img
          src="/제주.png"
          alt="제주"
          className={styles.image}
          onClick={() => setSelectedRegion("39")}
        />
        <img
          src="/충남.png"
          alt="충남"
          className={styles.image}
          onClick={() => setSelectedRegion("34")}
        />
        <img
          src="/충북.png"
          alt="충북"
          className={styles.image}
          onClick={() => setSelectedRegion("33")}
        />
      </div>
      <div className={styles.resultContainer}>
        <h2 className={styles.resultTitle}></h2>
        <div className={styles.div3}>
          <table className={styles.table}>
            <thead>
              <tr>
                {/* <th>주소</th> */}
                <th>TITLE</th>
                {/* <th>contentid</th>
                <th>areacode</th>
                <th>booktour</th> */}
                {/* <th>cat1</th>
                <th>cat2</th>
                <th>cat3</th> */}
                {/* <th>contenttypeid</th> */}
                {/* <th>createdtime</th> */}
                {/* <th>cpyrhtDivCd</th> */}
                <th> IMAGE</th>
                {/* <th> firstimage2</th>  */}
                {/* <th>mapx</th> */}
                {/* <th>mapy</th> */}
                {/* <th>mlevel</th> */}
                {/* <th>modifiedtime</th>
                <th>sigungucode</th> */}
                <th>OVERVIEW</th> {/* 추가: overview 표시 */}
              </tr>
            </thead>
            <tbody>
              {regionResult.map((item, index) => (
                <tr
                  key={index}
                  className={styles.row}
                  onClick={() => fetchOverview(item.contentid)}
                >
                  {/* <td>{item.addr1}</td> */}
                  <td>{item.title}</td>
                  {/* <td>{item.contentid}</td>
                  <td>{item.areacode}</td>
                  <td>{item.booktour}</td> */}
                  {/* <td>{item.cat1}</td>
                  <td>{item.cat2}</td>
                  <td>{item.cat3}</td> */}
                  {/* <td>{item.contenttypeid}</td> */}
                  {/* <td>{item.createdtime}</td> */}

                  {/* <td>{item.cpyrhtDivCd}</td> */}
                  <td>
                    {item.firstimage && (
                      <img src={item.firstimage} alt="First Image" />
                    )}
                  </td>
                  {/* <td>
                    {item.firstimage2 && (
                      <img src={item.firstimage2} alt="Second Image" />
                    )}
                  </td> */}
                  {/* <td>{item.mapx}</td> */}
                  {/* <td>{item.mapy}</td> */}
                  {/* <td>{item.mlevel}</td> */}
                  {/* <td>{item.modifiedtime}</td>
                  <td>{item.sigungucode}</td> */}
                  {/* <td>{item.contentid}</td> */}
                  {/* <td>{item.contentid.overview}</td> */}
                  {/* <p> Click </p> */}
                  <td>
                    {item.overview && !item.clicked // overview가 있고 클릭되지 않았을 때
                      ? item.overview
                      : "Click"}
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

export default SearchRegionPage;
