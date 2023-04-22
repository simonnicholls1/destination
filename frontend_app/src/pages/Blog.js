import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import BlogCard from '../components/blog/BlogCards'

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('destinationapi/posts/');
          if(!response.ok) {
              throw new Error(response.statusText);
          }
          const data = await response.json();
          setPosts(data);
        } catch(error) {
          setError(error);
        }
      };
      //fetchData();
    }, []);

    if (error) {
    return <p>{error.message}</p>;
  }

  if (!posts.length) {
    // return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>My Blog</h1>
        {posts.map((post, index) => (
          <BlogCard key={index} post={post} /> // Use the BlogCard component
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Blog;
