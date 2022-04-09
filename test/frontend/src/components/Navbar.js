import React, { useContext, useState } from 'react';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Signin from './Signin';
import { Store } from '../Store';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showSideBar, setShowSideBar] = useState(false);
  const handleCloseSideBar = () => setShowSideBar(false);
  const handleShowSideBar = () => setShowSideBar(true);

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <Container style={{ marginBottom: '30px' }}>
      <div className="navbar-wrapper">
        <div className="navbar-wrapper-left">
          {userInfo && userInfo.isCustomer ? (
            <>
              <div className="search-container">
                <Link onClick={handleShowSideBar} to="#">
                  <Search style={{ color: 'gray', fontSize: 20 }} />
                </Link>
                <SearchBar
                  showSideBar={showSideBar}
                  setShowSideBar={setShowSideBar}
                />
              </div>
            </>
          ) : (
            ''
          )}
        </div>
        <div className="navbar-wrapper-center">
          <h1 className="logo">
            {userInfo && userInfo.isAdmin ? (
              <Link
                to="/admin/dashboard"
                style={{ textDecoration: 'none', color: '#79589f' }}
              >
                ZealCraft
              </Link>
            ) : userInfo && userInfo.isCustomer ? (
              <Link
                to="/customer/dashboard"
                style={{ textDecoration: 'none', color: '#79589f' }}
              >
                ZealCraft
              </Link>
            ) : userInfo && userInfo.isUser ? (
              <Link
                to="/user/dashboard"
                style={{ textDecoration: 'none', color: '#79589f' }}
              >
                ZealCraft
              </Link>
            ) : (
              <Link to="/" style={{ textDecoration: 'none', color: '#79589f' }}>
                ZealCraft
              </Link>
            )}
          </h1>
        </div>
        <div className="navbar-wrapper-right">
          {userInfo && userInfo.isCustomer ? (
            <>
              <div className="menu-item">
                <NavDropdown
                  title="Menu"
                  id="basic-nav-dropdown"
                  style={{ textDecoration: 'none', color: '#79589f' }}
                >
                  <LinkContainer
                    to="/customer/dashboard"
                    style={{ textDecoration: 'none', color: '#79589f' }}
                  >
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/search">
                    <NavDropdown.Item>Search items</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/customer/orderhistory">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/customer/profile">
                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              </div>
              <div className="menu-item">
                <Badge
                  badgeContent={cart.cartItems.reduce(
                    (a, c) => a + c.quantity,
                    0
                  )}
                  color="primary"
                >
                  <Link to="/customer/cart">
                    <ShoppingCartOutlined />
                  </Link>
                </Badge>
              </div>
            </>
          ) : userInfo && userInfo.isUser ? (
            <>
              <div className="menu-item">
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  <LinkContainer to="/user/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/stores">
                    <NavDropdown.Item>Stores</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/create-product">
                    <NavDropdown.Item>Create Product</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/profile">
                    <NavDropdown.Item>My Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              </div>
            </>
          ) : userInfo && userInfo.isAdmin ? (
            <>
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/admin/dashboard">
                  <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/users">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/customers">
                  <NavDropdown.Item>Customers</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/categories">
                  <NavDropdown.Item>Categories</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/admin/profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <Link className="dropdown-item" to="/" onClick={signoutHandler}>
                  Sign Out
                </Link>
              </NavDropdown>
            </>
          ) : (
            <>
              <div className="menu-item">
                <Link to="/register">REGISTER</Link>
              </div>
              <div className="menu-item" onClick={handleShowModal}>
                <Link to="#">SIGN IN</Link>
              </div>
            </>
          )}

          <Signin showModal={showModal} setShowModal={setShowModal} />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
