import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import CategoryItem from './components/CategoryItem';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import AllProducts from './screens/AllProducts';
import Home from './screens/Home';
import Register from './screens/Register';

const App = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/categoryitem/:slug" element={<CategoryItem />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </Router>

  )
}

export default App;