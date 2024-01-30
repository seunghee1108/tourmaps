// export default async function handler(req, res) {
//   const { keyword } = req.query;

//   try {
//     const apiUrl = `http://apis.data.go.kr/B551011/KorService/searchKeyword?serviceKey=P1KIeVsld6hivJRj4DBnCnNrNwQJIDQZ6rk97%2FAK2g3U1Y1zrMMi0cRtRq%2BuvWT0vPN8J19qIDIs6FQxZPyhNA%3D%3D&_type=json&MobileOS=WIN&numOfRows=10&MobileApp=test&arrange=P&keyword=${keyword}`;
//     const response = await fetch(apiUrl);
//     if (response.ok) {
//       const data = await response.json();
//       res.status(200).json(data);
//     } else {
//       console.error('Error:', response.statusText);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
  // } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }
