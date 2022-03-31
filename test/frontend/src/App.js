import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import HomeScreen from './Screens/HomeScreen';
import AdminRoute from './components/AdminRoute';
import CategoryItem from './components/CategoryItem';
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
import ProfileScreen from './screens/ProfileScreen';
import UserDashboard from './screens/UserDashboard';
import CustomerDashboard from './screens/CustomerDashboard';

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
                <Route path="/categories/:slug" element={<CategoryItem />} />
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
                  path="/user/dashboard"
                  element={
                    <UserProtectedRoute>
                      <UserDashboard />
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
                <Route path="/admin/users" element={<UserListScreen />}></Route>
                <Route
                  path="/admin/customers"
                  element={<CustomerListScreen />}
                ></Route>
                <Route
                  path="/admin/categories"
                  element={<CategoriesScreen />}
                ></Route>
                <Route
                  path="/admin/users/:id"
                  element={<UserEditScreen />}
                ></Route>
                <Route path="/profile" element={<ProfileScreen />}></Route>
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
