'use client'
import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState(null);

  const search = async () => {
    try {
      const response = await fetch('/api/tourist-sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={search}>검색</button>
      {result && (
        <div>
          <h2>검색 결과</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
