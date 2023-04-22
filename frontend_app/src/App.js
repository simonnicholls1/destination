import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginForm.js';
import HotelDetail from './pages/HotelDetail.js';
import Profile from './pages/Profile.js'
import HotelResults from './pages/HotelResults.js'
import Blog from './pages/Blog.js';
import BlogPost from './pages/BlogPost.js';
import DestinationDetail from './pages/DestinationDetail.js'
import Destination from './pages/Destination.js'

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomePage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/hotels" element={<HotelResults/>}></Route>
      <Route path="/hotel/:id" element={<HotelDetail/>}></Route>
      <Route path="/destinations" element={<Destination/>}></Route>
      <Route path="/destination/:id" element={<DestinationDetail/>}></Route>
      <Route path="/blogs" element={<Blog/>}></Route>
      <Route path="/blog-post/:id" element={<BlogPost/>}></Route>
    </Routes>
  </Router>
);

export default App;