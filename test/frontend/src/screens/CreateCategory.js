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
import MessageBox from '../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'CREATE_FAIL':
      return { ...state, loading: false };
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

export default function CreateCategory() {
  const navigate = useNavigate();
  const [{ loading, loadingUpload }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryStatus, setCategoryStatus] = useState('');
  const [img, setImg] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        `/api/cr/create-category`,
        {
          categoryName: categoryName,
          categoryDescription: categoryDescription,
          categoryStatus: categoryStatus,
          img: img,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS', payload: data });
      toast.success('Category created successfully');
      navigate(`/admin/categories`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
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
        <title>Create Category</title>
      </Helmet>
      <div className="navbar custom-nav">Create Category</div>
      <Container className="small-container">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="pimage">
            <Form.Label className="mr-3">Image</Form.Label>
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

          <div className="mb-3 mt-2" style={{ display: 'flex' }}>
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
              Create
            </Button>
            {loading && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      </Container>
    </div>
  );
}
