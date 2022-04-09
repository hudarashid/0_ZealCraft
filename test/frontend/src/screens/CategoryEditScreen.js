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
import { isAuth, isAdmin } from '../utils.js';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, category: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

export default function CategoryEditScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: categoryId } = params;
  const navigate = useNavigate();

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
      loadingUpdate: false,
    });

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/cr/category/${categoryId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCategoryName(data.categoryName);
        setCategoryDescription(data.categoryDescription);
        setCategoryStatus(data.categoryStatus);
        setImg(data.img);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };

    fetchData();
  }, [userInfo, categoryId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.put(
        `/api/cr/category/${categoryId}`,
        {
          _id: categoryId,
          categoryName,
          categoryDescription,
          categoryStatus,
          img,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
      });
      toast.success('Category updated successfully');
      setTimeout(() => {
        navigate(`/admin/categories`);
      }, 3000);
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upr', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });
      toast.success('Image uploaded successfully');
      setImg(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Category Detail</title>
      </Helmet>
      <div className="navbar custom-nav">Edit Category: {categoryName}</div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container className="small-container mb-5">
          <Form onSubmit={submitHandler} className="form-custom">
            <Form.Group className="mb-3" controlId="pname">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pdetail">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="status">
              <Form.Label>Category Status</Form.Label>
            </Form.Group>
            <ToggleButtonGroup
              className="mb-3"
              type="radio"
              name="storeStatus"
              defaultValue={categoryStatus}
              onChange={(value) => setCategoryStatus(value)}
            >
              {' '}
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
            <Form.Group className="mb-3" controlId="punit">
              <Form.Label className="mr-3">Image</Form.Label>{' '}
              <img src={img} className="img-thumbnail" alt={categoryName} />
              <Form.Control
                className="mt-3"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {loadingUpload && <LoadingBox></LoadingBox>}
            </Form.Group>
            <div className="mb-3 mr-1" style={{ display: 'flex' }}>
              <Button
                className="btn-cancel"
                type="buttton"
                style={{ marginLeft: 'auto' }}
                onClick={() => navigate(`/admin/categories`)}
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
        </Container>
      )}
    </div>
  );
}
