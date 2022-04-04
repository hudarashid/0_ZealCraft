import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import HomeScreen from './Screens/HomeScreen';
import AdminRoute from './components/AdminRoute';
// import CategoryItem from './components/CategoryItem';
import CustomerProtectedRoute from './components/CustomerProtectedRoute';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Signin from './components/Signin';
import UserProtectedRoute from './components/UserProtectedRoute';
import AdminDashboard from './screens/AdminDashboard';
import Home from './screens/Home';
import Register from './screens/Register';
import ResetPassword from './screens/ResetPassword';
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
import CategoryEditScreen from './screens/CategoryEditScreen';
import OrdersScreen from './screens/OrdersScreen';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar />
        </header>
        <main>
          <div>
            <Container>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/signin" element={<Signin />} />
                {/* <Route path="/categories/:slug" element={<CategoryItem />} /> */}
                <Route path="/searchbar" element={<SearchBar />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
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
                      <OrdersScreen />
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
                  path="/customer/dashboard"
                  element={
                    <CustomerProtectedRoute>
                      <CustomerDashboard />
                    </CustomerProtectedRoute>
                  }
                />
                <Route
                  path="/customer/profile"
                  element={
                    <CustomerProtectedRoute>
                      <CustomerProfileScreen />
                    </CustomerProtectedRoute>
                  }
                />
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
