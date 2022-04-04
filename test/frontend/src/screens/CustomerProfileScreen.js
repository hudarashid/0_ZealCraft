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
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

export default function CustomerProfileScreen() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const role = 'Customer';

  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();
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

  const photoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/ur/profile`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
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
    fetchData();
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/ur/profile`,
        {
          _id: userInfo._id,
          firstName,
          lastName,
          photo,
          email,
          address,
          city,
          postalCode,
          country,
          phone,
          isAdmin,
          isCustomer,
          isUser,
        },
        {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully');
      setTimeout(() => {
        navigate('/customer/dashboard');
      }, 3000);
    } catch (error) {
      dispatch({ type: 'UPDATE_FAIL' });
      toast.error(getError(error));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="navbar custom-nav">Edit Profile</div>
      <Container className="small-container mb-5">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" filename="image" onChange={photoChange} />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Profile Photo</Form.Label>
            <br />
            <img
              src={`/images/${image}`}
              className="img-thumbnail"
              alt="hello"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />{' '}
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="disabled">
            <Form.Label>Role</Form.Label>
            <Form.Control value={role} />
          </Form.Group>
          <div className="mb-3 mr-1" style={{ display: 'flex' }}>
            <Button
              className="btn-cancel"
              type="buttton"
              style={{ marginLeft: 'auto' }}
              onClick={() => navigate(`/customer/dashboard`)}
            >
              Cancel
            </Button>
            {'  '}
            {'  '}
            <Button type="submit" className="btn-space btn-primary">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
}
