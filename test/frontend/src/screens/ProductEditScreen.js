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
      return { ...state, summary: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
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

export default function ProductEditScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: productId } = params;
  const navigate = useNavigate();

  const [
    { loading, error, loadingUpdate, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
    loadingUpdate: false,
  });

  const [product, setProduct] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [images, setImages] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [quantityOnHand, setQuantityOnHand] = useState('');
  const [weight, setWeight] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [isFeatured, setIsFeatured] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [storeId, setStoreId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [storeName, setStoreName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/pr/products/${productId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setProduct(data.product);
        setProductName(data.product.productName);
        setProductDescription(data.product.productDescription);
        setImages(data.product.images);
        setUnitOfMeasure(data.product.unitOfMeasure);
        setQuantityOnHand(data.product.quantityOnHand);
        setWeight(data.product.weight);
        setCurrentPrice(data.product.currentPrice);
        setDiscountedPrice(data.product.discountedPrice);
        setIsFeatured(data.product.isFeatured);
        setProductCategoryId(data.product.productCategoryId);
        setStoreId(data.product.storeId);
        setCategoryName(data.category.categoryName);
        setStoreName(data.store.storeName);
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
  }, [productId, userInfo, successDelete]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.put(
        `/api/pr/products/${productId}`,
        {
          _id: productId,
          productName,
          productDescription,
          images,
          unitOfMeasure,
          quantityOnHand,
          weight,
          currentPrice,
          discountedPrice,
          isFeatured,
          productCategoryId,
          storeId,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
      });
      toast.success('Product updated successfully');
      setTimeout(() => {
        navigate(`/user/stores/${storeId}/products`);
      }, 3000);
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        dispatch({ type: 'DELETE_REQUEST' });
        await axios.delete(`/api/pr/products/${productId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        navigate(`/user/stores/${storeId}/products`);
        toast.success('Product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
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
        <title>Product Detail</title>
      </Helmet>
      <div className="navbar custom-nav">Edit Product: {productName}</div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container className="small-container mb-5">
          <Form onSubmit={submitHandler} className="form-custom">
            <Form.Group className="mb-3" controlId="pname">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pdetail">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pimage">
              <Form.Label>Images</Form.Label>
              <Form.Control
                value={images}
                onChange={(e) => setImages(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="punit">
              <Form.Label>Unit Of Measure</Form.Label>
              <Form.Control
                value={unitOfMeasure}
                onChange={(e) => setUnitOfMeasure(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pquantity">
              <Form.Label>Quantity On Hand</Form.Label>
              <Form.Control
                value={quantityOnHand}
                onChange={(e) => setQuantityOnHand(e.target.value)}
              />{' '}
            </Form.Group>
            <Form.Group className="mb-3" controlId="pweight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Current Price</Form.Label>
              <Form.Control
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="supportPhone">
              <Form.Label>Is Featured</Form.Label>
              <Form.Control
                value={isFeatured}
                onChange={(e) => setIsFeatured(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="supportPhone">
              {/* <Form.Label>Product Category</Form.Label>
            <Form.Control defaultValue={productCategoryId} readonly />
          </Form.Group> */}
              <Form.Label>Product Category</Form.Label>
              <Form.Control disabled defaultValue={categoryName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="supportPhone">
              <Form.Label>Store</Form.Label>
              <Form.Control disabled defaultValue={storeName} />
            </Form.Group>
            <div className="mb-3 mr-1" style={{ display: 'flex' }}>
              {/* &nbsp; */}
              <Button
                className="btn-delete"
                type="button"
                style={{ marginRight: 'auto' }}
                variant="danger"
                onClick={() => deleteHandler(product)}
              >
                Delete
              </Button>
              <Button
                className="btn-cancel"
                style={{ marginLeft: 'auto' }}
                onClick={() => navigate(`/user/stores/${storeId}/products`)}
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
      )}
    </div>
  );
}
