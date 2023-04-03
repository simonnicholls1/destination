import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginForm.js';
import HotelDetail from './pages/HotelDetail.js';
import Profile from './pages/Profile.js'
import HotelResults from './pages/HotelResults.js'
import Blog from './pages/Blog.js';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomePage/>}></Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/hotels" element={<HotelResults/>}></Route>
      <Route path="/hotel/:id" element={<HotelDetail/>}></Route>
      <Route path="/blog" element={<Blog/>}></Route>
    </Routes>
  </Router>
);

export default App;