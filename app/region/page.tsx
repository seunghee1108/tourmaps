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
  overview: string; // 추가된 부분: overview를 저장할 속성 추가
}

const SearchRegionPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [regionResult, setRegionResult] = useState<SearchResultRegion[]>([]);
  const serviceKey =
    "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D";

  const handleRegionSearch = async () => {
    try {
      const response = await fetch(
        ` https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=20&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=${selectedRegion}&contentTypeId=25`,
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
            overview: "" // overview는 초기에 빈 문자열로 설정
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

  const fetchOverview = async (contentId: string) => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ3D%3D%22;&contentTypeId=25&contentId=${contentId}&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&MobileOS=ETC`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        const overview = result.response.body.items.item.overview;
        return overview;
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
    return ""; // 오류가 발생하면 빈 문자열 반환
  };
  
  const handleClickOverview = async (contentId: string) => {
    try {
      const response = await fetch(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=YOUR_SERVICE_KEY&contentTypeId=25&contentId=${contentId}&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&MobileOS=ETC`
      );
      if (response.ok) {
        const result = await response.json();
        const overview = result.response.body.items.item.overview;
        // 여기서 overview를 어떻게 처리할지에 대한 코드를 추가합니다.
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
      <select
        id="regionFilter"
        className={`course_regionFilterSelect ${styles.select}`} 
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
                <th>주소</th>
                <th>제목</th>
                <th>contentid</th>
                <th>areacode</th>
                <th>booktour</th>
                <th>cat1</th>
                <th>cat2</th>
                <th>cat3</th>
                <th>contenttypeid</th>
                <th>createdtime</th>
                <th>cpyrhtDivCd</th>
                <th>mapx</th>
                <th>mapy</th>
                <th>mlevel</th>
                <th>modifiedtime</th>
                <th>sigungucode</th>
                <th>overview</th> {/* 추가: overview 표시 */}
              </tr>
            </thead>
            <tbody>
              {regionResult.map((item, index) => (
                <tr key={index} className={styles.row} onClick={() => handleClickOverview(item.contentid)}> {/* contentid를 클릭하여 overview 가져오기 */}
                  <td>{item.addr1}</td>
                  <td>{item.title}</td>
                  <td>{item.contentid}</td>
                  <td>{item.areacode}</td>
                  <td>{item.booktour}</td>
                  <td>{item.cat1}</td>
                  <td>{item.cat2}</td>
                  <td>{item.cat3}</td>
                  <td>{item.contenttypeid}</td>
                  <td>{item.createdtime}</td>
                  <td>{item.cpyrhtDivCd}</td>
                  <td>{item.mapx}</td>
                  <td>{item.mapy}</td>
                  <td>{item.mlevel}</td>
                  <td>{item.modifiedtime}</td>
                  <td>{item.sigungucode}</td>
                  <td>{item.overview}</td> {/* 추가: overview 표시 */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
              }

export default SearchRegionPage;
