// SearchComponent.tsx

// import React, { useState } from "react";

// interface SearchProps {
//   onSearch: (keyword: string) => void;
// }

// const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
//   const [searchKeyword, setSearchKeyword] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchKeyword(e.target.value);
//   };

//   const search = () => {
//     onSearch(searchKeyword);
//   };

//   return (

    // <div>
    //   <input
    //     type="text"
    //     value={searchKeyword}
    //     onChange={handleInputChange}
    //     placeholder="검색어를 입력하세요"
    //   />
    //   <button onClick={search}>검색</button>
    // </div>
//   );
// };

// export default SearchComponent;
"use client"

import React, { useState, FormEvent } from 'react';
import { useRouter } from "next/navigation";
import styles from "@/app/styles/search.module.scss";

interface SearchProps {
  onSearchComplete: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchComplete }) => {
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    onSearchComplete(query); // 검색 완료 시 부모 컴포넌트로 검색어 전달
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className={styles.form}>
      <label htmlFor="searchInput">🔍</label>
      <input
        type="text"
        id="searchInput"
        placeholder="가고싶은 여행지를 검색하세요"
        className={styles.search}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default Search;