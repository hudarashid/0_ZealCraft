import axios from 'axios';
import React, { useContext, useState, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import { getError } from '../utils';
import { Store } from '../Store';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function CreateStore() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [storeName, setStoreName] = useState('');
  const [storeDetail, setStoreDetail] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [additionalPhoto, setAdditionalPhoto] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [storeRating, setStoreRating] = useState('');
  const [storeStatus, setStoreStatus] = useState('Active');
  const [supportPhone, setSupportPhone] = useState('');
  const [userId, setUserId] = useState('');

  //   const [radioValue, setRadioValue] = useState('Active');

  //   const radios = [
  //     { name: 'Active', value: 'Active' },
  //     { name: 'Inactive', value: 'Inactive' },
  //   ];

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        `/api/sr/create`,
        {
          storeName: storeName,
          storeDetail: storeDetail,
          bannerImage: bannerImage,
          additionalPhoto: additionalPhoto,
          supportEmail: supportEmail,
          storeRating: storeRating,
          storeStatus: storeStatus,
          supportPhone: supportPhone,
          userId: userId,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
      //   ctxDispatch({ type: 'USER_SIGNIN' });
      localStorage.setItem('storeInfo', JSON.stringify(data));
      toast.success('Store created successfully');
      navigate(`/user/stores`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <Helmet>
        <title>Create Store</title>
      </Helmet>
      <div className="navbar custom-nav">Create Store</div>
      <Container className="small-container">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="storeName">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              placeholder="Store Name"
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="storeDetail">
            <Form.Label>Store Detail</Form.Label>
            <Form.Control
              placeholder="Store Detail"
              onChange={(e) => setStoreDetail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="bannerImage">
            <Form.Label>Banner Image</Form.Label>
            <Form.Control
              placeholder="Banner Image"
              value={'Banner-Image'}
              readOnly
              onChange={(e) => setBannerImage(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="additionalPhoto">
            <Form.Label>Additional Photo</Form.Label>
            <Form.Control
              placeholder="Additional Photo"
              value={'Additional-Photo'}
              readOnly
              onChange={(e) => setAdditionalPhoto(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="supportEmail">
            <Form.Label>Support Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Support Email"
              onChange={(e) => setSupportEmail(e.target.value)}
            />{' '}
          </Form.Group>
          <Form.Group className="mb-3" controlId="storeRating">
            <Form.Label>Store Rating</Form.Label>
            <Form.Control
              value={5}
              readOnly
              onChange={(e) => setStoreRating(e.target.value)}
            />
          </Form.Group>
          <ToggleButtonGroup
            className="mb-3"
            type="radio"
            name="storeStatus"
            defaultValue={storeStatus}
            onChange={(value) => setStoreStatus(value)}
          >
            <ToggleButton
              id="tbg-btn-1"
              value={'Active'}
              variant="outline-success"
            >
              Active
            </ToggleButton>
            <ToggleButton
              id="tbg-btn-2"
              value={'Inactive'}
              variant="outline-secondary"
            >
              Inactive
            </ToggleButton>
          </ToggleButtonGroup>
          <Form.Group className="mb-3" controlId="supportPhone">
            <Form.Label>Support Phone</Form.Label>
            <Form.Control
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
            />
          </Form.Group>
          <div className="mb-3" style={{ display: 'flex' }}>
            <Button
              className="btn-cancel"
              type="buttton"
              style={{ marginLeft: 'auto' }}
              onClick={() => navigate('/user/stores')}
            >
              Cancel
            </Button>
            {'  '}
            {'  '}
            <Button type="submit" className="btn-space btn-primary">
              Create
            </Button>
            {loading && <LoadingBox></LoadingBox>}
          </div>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
}
