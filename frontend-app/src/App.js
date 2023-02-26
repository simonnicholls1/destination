import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage.js';
import LoginPage from './components/LoginForm.js';
import HotelDetail from './components/HotelDetail.js';
import Profile from './components/Profile.js'
import HotelResults from './components/HotelResults.js'
import Blog from './components/Blog.js';

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