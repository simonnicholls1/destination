import React, { useState, useEffect } from 'react';
import Navbar from '../components/common/NavBar';
import Footer from '../components/common/Footer';
import BlogCard from '../components/blog/BlogCards'
import FeaturedBlogCard from '../components/blog/FeaturedBlogCard'

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [featuredPosts, setFeaturedPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchAllPosts = async () => {
        try {
          const response = await fetch('destinationapi/posts/');
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
          const response = await fetch('destinationapi/posts?featured=4');
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
        <div>
          <h1>My Blog</h1>
          <h2>Featured Blogs</h2>
          {featuredPosts.map((post, index) => (
            <FeaturedBlogCard key={index} blog={post} />
          ))}
          <h2>Latest Blogs</h2>
          {posts.map((post, index) => (
            <BlogCard key={index} blog={post} />
          ))}
        </div>
        <Footer />
      < />
    );
};

export default Blog;
