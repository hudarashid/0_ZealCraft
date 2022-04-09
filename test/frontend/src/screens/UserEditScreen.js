import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, user: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function UserEditScreen() {
  const [{ loading, error, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: userId } = params;
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [isCustomer, setIsCustomer] = useState('');
  const [isUser, setIsUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/ur/admin/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUser(data.user);
        setImage(data.image);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setAddress(data.address);
        setCity(data.city);
        setPostalCode(data.postalCode);
        setCountry(data.country);
        setPhone(data.phone);
        setIsAdmin(data.isAdmin);
        setIsCustomer(data.isCustomer);
        setIsUser(data.isUser);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userId, userInfo, successDelete]);

  let role = '';
  if (isAdmin === true) {
    role = 'Admin';
  } else if (isCustomer === true) {
    role = 'Customer';
  } else if (isUser === true) {
    role = 'User';
  }

  const deleteHandler = async (user) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/ur/admin/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        navigate(`/admin/users`);
        dispatch({ type: 'DELETE_SUCCESS' });
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
        });
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div className="navbar custom-nav">User Profile: {firstName}</div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container className="small-container mb-5">
          <Form className="form-custom">
            <Form.Group className="mb-3" controlId="photo">
              <Form.Label className="mr-3">Profile Photo</Form.Label>
              <img src={image} className="img-thumbnail" alt="hello" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control value={firstName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control value={lastName} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} readOnly />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control value={address} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control value={city} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control value={postalCode} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control value={country} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control value={phone} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control value={role} plaintext readonly />
            </Form.Group>
            <div className="mb-3" style={{ display: 'flex' }}>
              <Button
                className="btn-cancel"
                type="buttton"
                style={{ marginRight: 'auto' }}
                onClick={() => navigate(`/admin/users`)}
              >
                Cancel
              </Button>
              <Button
                className="btn-delete"
                type="button"
                style={{ marginLeft: 'auto' }}
                variant="danger"
                onClick={() => deleteHandler(user)}
              >
                Delete
              </Button>
            </div>
          </Form>
          {loadingDelete && <LoadingBox></LoadingBox>}
        </Container>
      )}
    </div>
  );
}
