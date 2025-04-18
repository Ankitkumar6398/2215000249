import React, { useEffect, useState } from 'react';
import './App.css';

const USERS_API = 'https://jsonplaceholder.typicode.com/users';
const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const COMMENTS_API = 'https://jsonplaceholder.typicode.com/comments';

const randomImage = (size = 120) =>
  `https://source.unsplash.com/random/${size}x${size}?sig=${Math.floor(Math.random() * 1000)}`;

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState('feed');

  useEffect(() => {
    fetch(USERS_API).then(res => res.json()).then(setUsers);
    fetch(POSTS_API).then(res => res.json()).then(setPosts);
    fetch(COMMENTS_API).then(res => res.json()).then(setComments);
  }, []);

  const getCommentCount = postId => comments.filter(c => c.postId === postId).length;
  const getUserPostCount = userId => posts.filter(p => p.userId === userId).length;

  const renderFeed = () => (
    <div className="content">
      {posts.slice(0, 10).map(post => (
        <div className="card" key={post.id}>
          <img src={randomImage(150)} alt="post" />
          <div className="card-body">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <span className="badge">{getCommentCount(post.id)} Comments</span>
            <div className="comments">
              {
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTrending = () => (
    <div className="content">
      {posts.slice(0, 5).map(post => (
        <div className="card" key={post.id}>
          <img src={randomImage(150)} alt="trending" />
          <div className="card-body">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <span className="badge">{getCommentCount(post.id)} Comments</span>
            <div className="comments">
              
                
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTopUsers = () => (
    <div className="content">
      {users.slice(0, 5).map(user => (
        <div className="card user" key={user.id}>
          <img src={randomImage(100)} alt="user" />
          <div className="card-body">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span className="badge">{getUserPostCount(user.id)} Posts</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="App">
      <header className="header">
        <h1>📊 Social Media Analytics</h1>
      </header>
      <nav>
        <button onClick={() => setPage('feed')}>📜 Feed</button>
        <button onClick={() => setPage('trending')}>🔥 Trending</button>
        <button onClick={() => setPage('users')}>👑 Top Users</button>
      </nav>
      {page === 'feed' && renderFeed()}
      {page === 'trending' && renderTrending()}
      {page === 'users' && renderTopUsers()}
    </div>
  );
}

export default App;
