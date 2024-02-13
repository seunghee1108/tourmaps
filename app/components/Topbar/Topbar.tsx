// import jwt, { JwtPayload } from 'jsonwebtoken'; // Commented out this import
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/topbar.module.scss"
import Link from "next/link";
import TopNav from "./topnav";

function Topbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState<string>(''); 

  useEffect(() => {
    const loadUserFromToken = () => {
      const token = localStorage.getItem('token');

      if (token) {
        const userName = token; 
        setIsLoggedIn(true);
        setName(userName);
      } else {
        setIsLoggedIn(false);
        setName('');
      }
    };

    loadUserFromToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setName('');
    window.location.href = '/';
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.div1}><TopNav/></div>
      <div className={styles.div2}>
        <Link href="/" >TOUR MAPS</Link>
      </div>
      <div className={styles.div3}>
      <Link className={styles.link} href="/region">REGION</Link>
      <Link className={styles.link} href="/course">COURSE</Link>

      </div>
    </div>
  );
}

export default Topbar;
