import styles from "@/app/styles/index.module.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOURMAPS",
  description: "키워드를 통한 검색기능과 지역별 코스별로 여행 코스를 제공하는 웹 페이지입니다.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body className={styles.body}>{children}</body>
    </html>
  );
}
