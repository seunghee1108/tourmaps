import express from "express";
import fetch from "node-fetch";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

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
