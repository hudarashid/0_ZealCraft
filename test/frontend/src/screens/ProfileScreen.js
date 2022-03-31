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

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [image, setImage] = useState(userInfo.image);
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState(userInfo.address);
  const [city, setCity] = useState(userInfo.city);
  const [postalCode, setPostalCode] = useState(userInfo.postalCode);
  const [country, setCountry] = useState(userInfo.country);
  const [phone, setPhone] = useState(userInfo.phone);
  let role = '';
  let url = '/';
  if (userInfo.isAdmin === true) {
    role = 'Admin';
    url = '/admin/dashboard';
  } else if (userInfo.isCustomer === true) {
    role = 'Customer';
    url = '/customer/dashboard';
  } else if (userInfo.isUser === true) {
    role = 'User';
    url = '/user/dashboard';
  }
  const photoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const bodyFormData = new FormData();
      bodyFormData.append('firstName', firstName);
      bodyFormData.append('lastName', lastName);
      // bodyFormData.append('image', photo);
      bodyFormData.append('email', email);
      bodyFormData.append('address', address);
      bodyFormData.append('city', city);
      bodyFormData.append('postalCode', postalCode);
      bodyFormData.append('country', country);
      bodyFormData.append('phone', phone);
      const { data } = await axios.put(`/api/ur/profile`, bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
        // payload: data,
      });
      // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1>Edit Profile</h1>
      {/* {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : ( */}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="imageFile">
          <Form.Label>Upload File</Form.Label>
          <Form.Control type="file" filename="image" onChange={photoChange} />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Profile Photo</Form.Label>
          <br />
          <img src={`/images/${image}`} className="img-thumbnail" alt="hello" />
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
        <div className="mb-3">
          <Button type="submit">Update</Button>
          {loadingUpdate && <LoadingBox></LoadingBox>}
        </div>
      </Form>
      {/* )} */}
      <ToastContainer />
    </Container>
  );
}
