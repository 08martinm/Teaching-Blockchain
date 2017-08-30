import React from 'react';
import Nav from './components/Nav';
import Splash from './components/Splash';
import Background from './components/Background';
import Explanation from './components/Explanation';
import Blog from './components/Blog';

const Home = () => {
  return (
    <div className='row'>
      <Nav />      
      <Splash />
      <Background />
      <Explanation />
      <Blog />
    </div>
  );
};

export default Home;
