import React, { useContext } from 'react'
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
import CartScreen from './screens/CartScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CustomerDashboard from './screens/CustomerDashboard';
import CustomerListScreen from './screens/CustomerListScreen';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import Register from './screens/Register';
import ResetPassword from './screens/ResetPassword';
import SearchProducts from './screens/SearchProducts';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import UserDashboard from './screens/UserDashboard';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';
import { Store } from './Store';

const App = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  return (
    <Router>
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} >

          </Route>
          <Route path="/user/dashboard" element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          } />
          <Route path="/customer/dashboard"
            element={
              <CustomerProtectedRoute>
                <CustomerDashboard>
                  <CartScreen />
                </CustomerDashboard>
              </CustomerProtectedRoute>
            } />
          <Route path="/register" element={<Register />} >

          </Route>
          <Route path="/categoryitem/:slug" element={<CategoryItem />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>} />

          <Route path="/admin/users" element={<UserListScreen />}></Route>
          <Route path="/admin/customers" element={<CustomerListScreen />} />
          <Route path="/admin/categories" element={<CategoriesScreen />} />
          <Route path="/admin/users/:id" element={<UserEditScreen />} />
          <Route path="/customer/orderhistory" element={<OrderHistoryScreen />} />
          <Route path="/customer/cart" element={<CartScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/product/slug/:slug" element={<ProductScreen />} />
          <Route path="/search" element={<SearchProducts />} />
          <Route path="/searchbar" element={<SearchBar />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />}
          ></Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </Router>

  )
}

export default App;