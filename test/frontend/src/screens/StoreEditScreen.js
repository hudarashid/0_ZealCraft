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
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
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

export default function UserEditScreen() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    loadingUpdate: false,
  });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: storeId } = params;
  const navigate = useNavigate();

  const [storeName, setStoreName] = useState('');
  const [storeDetail, setStoreDetail] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [additionalPhoto, setAdditionalPhoto] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [storeRating, setStoreRating] = useState('');
  const [storeStatus, setStoreStatus] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/sr/${storeId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setStoreName(data.storeName);
        setStoreDetail(data.storeDetail);
        setBannerImage(data.bannerImage);
        setAdditionalPhoto(data.additionalPhoto);
        setSupportEmail(data.supportEmail);
        setStoreRating(data.storeRating);
        setStoreStatus(data.storeStatus);
        setSupportPhone(data.supportPhone);
        setUserId(data.userId);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [storeId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      // const bodyFormData = new FormData();
      // bodyFormData.append('_id', storeId);
      // bodyFormData.append('storeName', storeName);
      // bodyFormData.append('storeDetail', storeDetail);
      // bodyFormData.append('bannerImage', bannerImage);
      // bodyFormData.append('additionalPhoto', additionalPhoto);
      // bodyFormData.append('supportEmail', supportEmail);
      // bodyFormData.append('storeRating', storeRating);
      // bodyFormData.append('storeStatus', storeStatus);
      // bodyFormData.append('supportPhone', supportPhone);
      // bodyFormData.append('userId', userId);
      const { data } = await axios.put(
        `/api/sr/${storeId}`,
        {
          _id: storeId,
          storeName,
          storeDetail,
          bannerImage,
          additionalPhoto,
          supportEmail,
          storeRating,
          storeStatus,
          supportPhone,
          userId,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
      });
      localStorage.setItem('storeInfo', JSON.stringify(data));
      toast.success('Store updated successfully');
      setTimeout(() => {
        navigate('/user/stores');
      }, 3000);
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Edit Store</title>
      </Helmet>
      <div className="navbar custom-nav">Edit Store: {storeName}</div>
      <Container className="small-container  mb-5">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="detail">
              <Form.Label>Store Detail</Form.Label>
              <Form.Control
                value={storeDetail}
                onChange={(e) => setStoreDetail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bimage">
              <Form.Label>Banner Image</Form.Label>
              <Form.Control
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="aphoto">
              <Form.Label>Additional Photo</Form.Label>
              <Form.Control
                value={additionalPhoto}
                onChange={(e) => setAdditionalPhoto(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Support Email</Form.Label>
              <Form.Control
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
              />{' '}
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
                Update
              </Button>
              {loadingUpdate && <LoadingBox></LoadingBox>}
            </div>
          </Form>
        )}
        <ToastContainer />
      </Container>
    </div>
  );
}
