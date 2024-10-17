import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;  // Flag to track if component is mounted
    
    // Fetch data from JSONPlaceholder API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {  // Only update state if component is still mounted
          setPosts(data.slice(0, 5)); // Limit to first 5 posts
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {  // Only update state if component is still mounted
          setError(error.message);
          setLoading(false);
        }
      });

    // Cleanup function
    return () => {
      isMounted = false;  // Set to false when component unmounts
    };
  }, []);  // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Posts</h1>
      <ul style={styles.postList}>
        {posts.map(post => (
          <li key={post.id} style={styles.postCard}>
            <h2 style={styles.postTitle}>{post.title}</h2>
            <p style={styles.postBody}>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    fontSize: '2em',
    color: '#333',
    marginBottom: '30px',
  },
  postList: {
    listStyleType: 'none',
    padding: 0,
  },
  postCard: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ddd',
  },
  postTitle: {
    fontSize: '1.5em',
    color: '#333',
    marginBottom: '10px',
  },
  postBody: {
    fontSize: '1em',
    color: '#555',
    lineHeight: '1.6',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5em',
    padding: '20px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '1.5em',
  },
};
