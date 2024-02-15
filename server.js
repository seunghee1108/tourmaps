import express from "express";
import fetch from "node-fetch";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// API 키
const serviceKey =
  "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D";

// 검색 결과를 받아올 엔드포인트
const searchEndpoint =
  "http://apis.data.go.kr/B551011/KorService/searchKeyword";

app.prepare().then(() => {
  const server = express();

  // server.get('/detail/:contentId', async (req, res) => {
  //   const { contentId } = req.params; // 요청에서 contentId를 추출합니다.

  //   try {
  //     const commonInfoResponse = await fetch(
  //       `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`
  //       );
  //       const introInfoResponse = await fetch(
  //         `http://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`
  //         );
  //         const courseInfoResponse = await fetch(
  //           `http://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=${contentId}&MobileOS=ETC&MobileApp=AppTest&_type=json`
  //           );

  //           if (commonInfoResponse.ok && introInfoResponse.ok && courseInfoResponse.ok) {
  //             const commonInfo = await commonInfoResponse.json();
  //             const introInfo = await introInfoResponse.json();
  //             const courseInfo = await courseInfoResponse.json();

  //             res.json({ commonInfo, introInfo, courseInfo });
  //           } else {
  //             res.status(500).json({ error: 'Failed to fetch data' });
  //           }
  //         } catch (error) {
  //           console.error('Error fetching data:', error);
  //           res.status(500).json({ error: 'Internal Server Error' });
  //         }
  //       });

  server.get("/detail/:contentId", (req, res) => {
    const contentId = req.params.contentId; // 요청에서 contentId를 추출합니다.
      console.log(contentId);
    return app.render(req, res, "/detail", { contentId });
  });
  


  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
