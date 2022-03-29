import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from 'react-bootstrap/Button';

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
export default function ProductEditScreen() {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [quantityOnHand, setQuantityOnHand] = useState('');
  const [weight, setWeight] = useState('');
  const [currentPrice, setCurrentPrice] = useState(''); 
  const [discountedPrice, setDiscountedPrice] = useState(''); 
  const [isFeatured, setIsFeatured] = useState('');
  const [productStatus, setProductStatus] = useState('');  
  const [productCategory, setProductCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setDescription(data.description);
        setImage(data.image);
        setUnitOfMeasure(data.unitOfMeasure);
        setQuantityOnHand(data.quantityOnHand);
        setWeight(data.weight);
        setCurrentPrice(data.currentPrice);
        setDiscountedPrice(data.discountedPrice);
        setIsFeatured(data.isFeatured);
        setProductStatus(data.productStatus);
        setProductCategory(data.productCategory);
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          description,          
          image,
          unitOfMeasure,
          quantityOnHand,
          weight,
          currentPrice,
          discountedPrice,
          isFeatured,
          productStatus,
          productCategory,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
      });
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });

      toast.success('Image uploaded successfully');
      setImage(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  return (
    <Container className="small-container">
      <Helmet>
        <title>Edit Product ${productId}</title>
      </Helmet>
      <h1>Edit Product {productId}</h1>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Upload File</Form.Label>
            <Form.Control type="file" onChange={uploadFileHandler} />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="unitOfMeasure">
            <Form.Label>Unit Of Measure</Form.Label>
            <Form.Control
              value={unitOfMeasure}
              onChange={(e) => setUnitOfMeasure(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="quantityOnHand">
            <Form.Label>Quantity On Hand</Form.Label>
            <Form.Control
              value={quantityOnHand}
              onChange={(e) => setQuantityOnHand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="weight">
            <Form.Label>Weight</Form.Label>
            <Form.Control
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="currentPrice">
            <Form.Label>Current Price</Form.Label>
            <Form.Control
              value={currentPrice}
              onChange={(e) => setCurrentPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="discountedPrice">
            <Form.Label>Discounted Price</Form.Label>
            <Form.Control
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isFeatured">
            <Form.Label>Is Featured</Form.Label>
            <Form.Control
              value={isFeatured}
              onChange={(e) => setIsFeatured(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productStatus">
            <Form.Label>Product Status</Form.Label>
            <Form.Control
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            />
          </Form.Group>      
          <div className="mb-3">
            <Button disabled={loadingUpdate} type="submit">
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
