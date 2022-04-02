import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Signin from './Signin';
import { Store } from '../Store';
import SearchBar from './SearchBar';

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

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
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    {userInfo && userInfo.isCustomer ? (
                        <>
                            <SearchContainer>
                                <Link onClick={handleShowSideBar} to="#">
                                    <Search style={{ color: 'gray', fontSize: 16 }} />
                                </Link>
                                <SearchBar
                                    showSideBar={showSideBar}
                                    setShowSideBar={setShowSideBar}
                                />
                            </SearchContainer>
                        </>
                    ) : (
                        ''
                    )}
                </Left>
                <Center>
                    <Logo>
                        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                            ZealCraft
                        </Link>
                    </Logo>
                </Center>
                <Right>
                    {userInfo && userInfo.isCustomer ? (
                        <>
                            <MenuItem>
                                <NavDropdown title={userInfo.firstName} id="basic-nav-dropdown">
                                    <LinkContainer to="/customer/dashboard">
                                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/customer/orders">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/customer/search">
                                        <NavDropdown.Item>Search items</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/profile">
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
                            </MenuItem>
                            <MenuItem>
                                <Badge badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)} color="primary">
                                    <Link to="/customer/cart">
                                        <ShoppingCartOutlined />
                                    </Link>
                                </Badge>
                            </MenuItem>
                        </>
                    ) : userInfo && userInfo.isUser ? (
                        <>
                            <MenuItem>
                                <NavDropdown title={userInfo.firstName} id="basic-nav-dropdown">
                                    <LinkContainer to="/user/dashboard">
                                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/user/stores">
                                        <NavDropdown.Item>Stores</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/user/orders">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/profile">
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
                            </MenuItem>
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
                                <LinkContainer to="/profile">
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
                            <MenuItem>
                                <Link to="/register">REGISTER</Link>
                            </MenuItem>
                            <MenuItem onClick={handleShowModal}>
                                <Link to="#">SIGN IN</Link>
                            </MenuItem>
                        </>
                    )}

                    <Signin showModal={showModal} setShowModal={setShowModal} />
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;