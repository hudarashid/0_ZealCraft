import React from 'react'
import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <Footer />
    </div>
  )
}

export default Home;