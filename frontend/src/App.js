import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoute from './components/AdminRoute';
import CategoryItem from './components/CategoryItem';
import CustomerProtectedRoute from './components/CustomerProtectedRoute';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Signin from './components/Signin';
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminDashboard from './screens/AdminDashboard';
import AllProducts from './screens/AllProducts';
import CustomerProfile from './screens/CustomerProfile';
import Home from './screens/Home';
import Register from './screens/Register';
import ResetPassword from './screens/ResetPassword';
import UserProfile from './screens/UserProfile';

const App = () => {
  return (
    <Router>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/user/userprofile" element={
            <UserProtectedRoute>
              <UserProfile />
            </UserProtectedRoute>
          } />
          <Route path="/customer/customerprofile"
            element={
              <CustomerProtectedRoute>
                <CustomerProfile />
              </CustomerProtectedRoute>
            } />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/categoryitem/:slug" element={<CategoryItem />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </Router>

  )
}

export default App;