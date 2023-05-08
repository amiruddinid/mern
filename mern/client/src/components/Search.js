import React, { useState } from 'react';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSubmit = async event => {
    event.preventDefault();
    const res = await fetch(`/search?keyword=${keyword}`);
    const data = await res.json();
    setPosts(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={event => setKeyword(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}