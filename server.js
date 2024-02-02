const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors"); 

app.use(cors());

// API 키
const serviceKey =
  "WRM%2FxwABX2ibu1FMzeh0M4ca55og%2BubZJmgviYSiIEluTOFZkIWMZ3%2BqvAcSS85SpKyryvYtYgt1AX4Lj1szQ%3D%3D";

// 검색 결과를 받아올 엔드포인트
const searchEndpoint =
  "http://apis.data.go.kr/B551011/KorService/searchKeyword";

app.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    // 검색을 위한 URL 생성
    const apiUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?numOfRows=100&MobileOS=ETC&MobileApp=%EC%95%84%EC%95%84&_type=json&keyword=${keyword}&serviceKey=${serviceKey}`;
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

app.get("/searchRegion", async (req, res) => {
  try {
    const { keyword } = req.query;

    // 지역 검색을 위한 URL 생성
    const apiUrl = `https://apis.data.go.kr/B551011/KorService1/areaCode?numOfRows=100&MobileOS=ETC&MobileApp=TUORMAPS&_type=json&serviceKey=${serviceKey}`;

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

app.get("/searchCourse", async (req, res) => {
  try {
    // 코스 검색을 위한 URL 생성
    const apiUrl = `https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${serviceKey}&numOfRows=10&MobileApp=AppTest&MobileOS=ETC&arrange=Q&areaCode=${currentRegion}&contentTypeId=25&cat1=C01&cat2=${currentHashtag}&_type=json`;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
