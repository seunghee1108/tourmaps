const express = require("express");
const fetch = require("node-fetch");
const app = express();

// API 키
const serviceKey =
  "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D";

// 검색 결과를 받아올 엔드포인트
const searchEndpoint =
  "http://apis.data.go.kr/B551011/KorService/searchKeyword";

app.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    // 검색을 위한 URL 생성
    const apiUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?MobileOS=ETC&MobileApp=%EC%95%84%EC%95%84&_type=json&keyword=${keyword}&serviceKey=P1KIeVsld6hivJRj4DBnCnNrNwQJIDQZ6rk97%2FAK2g3U1Y1zrMMi0cRtRq%2BuvWT0vPN8J19qIDIs6FQxZPyhNA%3D%3D`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    // 서버에서 받은 데이터를 클라이언트에게 그대로 전달
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/region", async (req, res) => {
  try {
    const { selectedRegion } = req.query;

    // 검색을 위한 URL 생성
    const apiUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=10&MobileOS=ETC&MobileApp=Test&_type=json&areaCode=${selectedRegion}&contentTypeId=25`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    // JSON 형식으로 데이터 전송
    res.setHeader('Content-Type', 'application/json'); // JSON 형식으로 설정
    res.json(data);

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/course", async (req, res) => {
  try {
    const { currentRegion, currentHashtag } = req.query;
    // 코스 검색을 위한 URL 생성
    const apiUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=Q&areaCode=${currentRegion}&contentTypeId=25&cat1=C01&cat2=${currentHashtag}&_type=json`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    // 서버에서 받은 데이터를 클라이언트에게 전달
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/detail/:title", (req, res) => {
//   const title = req.params.title;
//   res.send(`Detail page for ${title}`);
// });



app.get('/detail', async (req, res) => {
  try {
      const commonInfoResponse = await fetch(
          `http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`
      );
      const introInfoResponse = await fetch(
          `http://apis.data.go.kr/B551011/KorService1/detailIntro1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest`
      );
      const courseInfoResponse = await fetch(
          `http://apis.data.go.kr/B551011/KorService1/detailInfo1?ServiceKey=WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4JLj1szQ%3D%3D&contentTypeId=25&contentId=1942787&MobileOS=ETC&MobileApp=AppTest`
      );

      if (commonInfoResponse.ok && introInfoResponse.ok && courseInfoResponse.ok) {
          const commonInfo = await commonInfoResponse.json();
          const introInfo = await introInfoResponse.json();
          const courseInfo = await courseInfoResponse.json();
          
          res.json({ commonInfo, introInfo, courseInfo });
      } else {
          res.status(500).json({ error: 'Failed to fetch data' });
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
