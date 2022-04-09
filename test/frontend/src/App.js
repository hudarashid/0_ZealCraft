import React, { useContext } from 'react';
import AllProducts from './screens/AllProducts';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAddressScren from './screens/ShippingAddressScreen';
import AdminRoute from './components/AdminRoute';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import CustomerProtectedRoute from './components/CustomerProtectedRoute';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Signin from './components/Signin';
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminDashboard from './screens/AdminDashboard';
import ShippingAddressScreen from './screens/ShippingAddressScreen';

import Home from './screens/Home';
import Register from './screens/Register';
import ResetPassword from './screens/ResetPassword';
import SearchProducts from './screens/SearchProducts';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import UserListScreen from './screens/UserListScreen';
import CustomerListScreen from './screens/CustomerListScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserDashboard from './screens/UserDashboard';
import CustomerDashboard from './screens/CustomerDashboard';
import StoreScreen from './screens/StoreScreen';
import CreateStore from './screens/CreateStore';
import StoreEditScreen from './screens/StoreEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import CreateProduct from './screens/CreateProduct';
import CustomerEditScreen from './screens/CustomerEditScreen';
import AdminProfileScreen from './screens/AdminProfileScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';
import ForgotPassword from './screens/ForgotPassword';
import CategoryEditScreen from './screens/CategoryEditScreen';
import OrdersScreen from './screens/OrderScreen';
import { Store } from './Store';
import CreateCategory from './screens/CreateCategory';
import OrderListScreen from './screens/OrderListScreen';
import UserOrderScreen from './screens/UserOrderScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      {/* <div className="d-flex flex-column site-container"> */}
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <div>
            <Container>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/allproducts" element={<AllProducts />} />

                <Route path="/shipping" element={<ShippingAddressScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />

                <Route path="/signin" element={<Signin />} />
                <Route path="/search" element={<SearchProducts />} />
                <Route path="/searchbar" element={<SearchBar />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/home" element={<Home />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <AdminRoute>
                      <UserListScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/users/:id"
                  element={
                    <AdminRoute>
                      <UserEditScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/customers"
                  element={
                    <AdminRoute>
                      <CustomerListScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/customers/:id"
                  element={
                    <AdminRoute>
                      <CustomerEditScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <AdminRoute>
                      <CategoriesScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/create-category"
                  element={
                    <AdminRoute>
                      <CreateCategory />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/categories/:id"
                  element={
                    <AdminRoute>
                      <CategoryEditScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/profile"
                  element={
                    <AdminRoute>
                      <AdminProfileScreen />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/user/dashboard"
                  element={
                    <UserProtectedRoute>
                      <UserDashboard />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/stores"
                  element={
                    <UserProtectedRoute>
                      <StoreScreen />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/create-store"
                  element={
                    <UserProtectedRoute>
                      <CreateStore />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/stores/:id"
                  element={
                    <UserProtectedRoute>
                      <StoreEditScreen />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/stores/:id/products"
                  element={
                    <UserProtectedRoute>
                      <ProductListScreen />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/create-product"
                  element={
                    <UserProtectedRoute>
                      <CreateProduct />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/products/:id"
                  element={
                    <UserProtectedRoute>
                      <ProductEditScreen />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/orders"
                  element={
                    <UserProtectedRoute>
                      <OrderListScreen />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/orderhistory"
                  element={
                    <UserProtectedRoute>
                      <OrderHistoryScreen />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/user/profile"
                  element={
                    <UserProtectedRoute>
                      <UserProfileScreen />
                    </UserProtectedRoute>
                  }
                />
                <Route
                  path="/orders/:id"
                  element={
                    <UserProtectedRoute>
                      <UserOrderScreen />
                    </UserProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/customer/dashboard"
                  element={
                    <CustomerProtectedRoute>
                      <CustomerDashboard>
                        <CartScreen />
                      </CustomerDashboard>
                    </CustomerProtectedRoute>
                  }
                />

                <Route path="/customer/cart" element={<CartScreen />} />
                <Route path="/product/slug/:id" element={<ProductScreen />} />
                <Route
                  path="/customer/profile"
                  element={
                    <CustomerProtectedRoute>
                      <CustomerProfileScreen />
                    </CustomerProtectedRoute>
                  }
                />
                <Route
                  path="/customer/orderhistory"
                  element={
                    <CustomerProtectedRoute>
                      <OrderHistoryScreen />
                    </CustomerProtectedRoute>
                  }
                />
                <Route
                  path="/order/:id"
                  element={
                    <CustomerProtectedRoute>
                      <OrderScreen />
                    </CustomerProtectedRoute>
                  }
                ></Route>
                {/* <Route path="/uploads" element={<FileUploadScreen />} />  */}
              </Routes>
            </Container>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
