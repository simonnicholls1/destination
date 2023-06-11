import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import BlogCard from '../components/blog/BlogCards'
import FeaturedBlogCard from '../components/blog/FeaturedBlogCard'

const blogStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center', // Center the div
  paddingTop: '100px',
  paddingBottom: '50px',
  paddingLeft: '30px', // Minimum left padding
  paddingRight: '10px', // Minimum right padding
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '1200px',
  maxWidth: '100%',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // Align content to the left
  width: '100%',
  maxWidth: '1200px', // Max width for the content
};


const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchAllPosts = async () => {
        try {
          const response = await fetch('http://0.0.0.0:8000/destinationapi/posts/');
          if(!response.ok) {
              //throw new Error(response.statusText);
          }
          const data = await response.json();
          setPosts(data);
        } catch(error) {
          setError(error);
        }
      };

      const fetchFeaturedPosts = async () => {
        try {
          const response = await fetch('http://0.0.0.0:8000/destinationapi/posts/featured?no_results=5');
          if(!response.ok) {
              //throw new Error(response.statusText);
          }
          const data = await response.json();
          setFeaturedPosts(data);
        } catch(error) {
          setError(error);
        }
      };

      fetchAllPosts();
      fetchFeaturedPosts();
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
        <div style={blogStyle}>
        <div style={contentStyle}>
          <h2 >Featured Blogs</h2>
          {featuredPosts.map((post, index) => (
            <FeaturedBlogCard key={index} blog={post} />
          ))}
          <h2>Latest Blogs</h2>
          {posts.map((post, index) => (
            <BlogCard key={index} blog={post} />
          ))}
          </div>
        </div>
        <Footer />
      < />
    );
};

export default Blog;
