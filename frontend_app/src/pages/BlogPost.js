import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';

const BlogPost = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://your-api-endpoint.com/posts');
          if(!response.ok) {
              throw new Error(response.statusText);
          }
          const data = await response.json();
          setPosts(data);
        } catch(error) {
          setError(error);
        }
      };
      fetchData();
    }, []);

    if(error) {
        return <p>{error.message}</p>
    }

    if (!posts.length) {
        return <p>Loading...</p>;
    }
    
    return (
        <><Navbar /><div>
            <h1>My Blog</h1>
            {posts.map((post, index) => (
                <div key={index}>
                    <h2>{post.title}</h2>
                    <p>Topic: {post.topic}</p>
                    <p>Created at: {new Date(post.created_at).toDateString()}</p>
                    <p>{post.description}</p>
                </div>
            ))}
        </div>
        <Navbar /></>
    );
}
export default BlogPost;
