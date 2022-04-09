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
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
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

export default function CreateProduct() {
  const navigate = useNavigate();
  const [{ loading, error, summary, loadingUpload }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [images, setImages] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState('');
  const [quantityOnHand, setQuantityOnHand] = useState('');
  const [weight, setWeight] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [isFeatured, setIsFeatured] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [uploading, setUploading] = useState('');
  const [storeId, setStoreId] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/pr/categoriesandstores', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        console.log(data);
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  const [productCategory, setProductCategory] = useState('');
  const handleChange = (e) => {
    setProductCategoryId(
      e.target.options[e.target.options.selectedIndex].getAttribute('data-key')
    );
    setProductCategory(
      e.target.options[e.target.options.selectedIndex].getAttribute('value')
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        `/api/pr/create/product`,
        {
          productName: productName,
          productDescription: productDescription,
          images: images,
          unitOfMeasure: unitOfMeasure,
          quantityOnHand: quantityOnHand,
          weight: weight,
          currentPrice: currentPrice,
          discountedPrice: discountedPrice,
          isFeatured: isFeatured,
          productCategory: productCategory,
          productCategoryId: productCategoryId,
          productStatus: productStatus,
          storeId: storeId,
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
      toast.success('Product created successfully');
      navigate(`/user/stores/${storeId}/products`);
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
      setImages(data.secure_url);
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Create Product</title>
      </Helmet>
      <div className="navbar custom-nav">Create Product</div>
      <Container className="small-container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="pimage">
              <Form.Label className="mr-3">Images</Form.Label>
              <img src={images} className="img-thumbnail" alt={productName} />
              <Form.Control
                className="mt-3"
                value={images}
                onChange={(e) => setImages(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imageFile">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={uploadFileHandler} />
              {loadingUpload && <LoadingBox></LoadingBox>}
            </Form.Group>
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
            <Form.Group className="mb-1" controlId="featured">
              <Form.Label>Is Featured</Form.Label>
            </Form.Group>
            <ToggleButtonGroup
              className="mb-3"
              type="radio"
              name="featured"
              defaultValue={isFeatured}
              onChange={(value) => setIsFeatured(value)}
            >
              {' '}
              <ToggleButton
                id="tbg-btn-3"
                value={true}
                variant="outline-success"
              >
                Yes
              </ToggleButton>
              <ToggleButton
                id="tbg-btn-4"
                value={false}
                variant="outline-secondary"
              >
                No
              </ToggleButton>
            </ToggleButtonGroup>
            <Form.Group className="mb-1" controlId="status">
              <Form.Label>Product Status</Form.Label>
            </Form.Group>
            <ToggleButtonGroup
              className="mb-3"
              type="radio"
              name="storeStatus"
              defaultValue={productStatus}
              onChange={(value) => setProductStatus(value)}
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

            <Form.Group controlId="pname">
              <Form.Label>Select Category</Form.Label>
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option key={0} value={'Select Category'}>
                  Select Category
                </option>
                {summary.categories.map((category) => (
                  <option
                    key={category._id}
                    data-key={category._id}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="pname">
              <Form.Label>Select Store</Form.Label>
              <Form.Select
                className="mb-3"
                aria-label="Default select example"
                onChange={(e) =>
                  setStoreId(
                    e.target.options[
                      e.target.options.selectedIndex
                    ].getAttribute('data-key')
                  )
                }
              >
                <option key={0} value={'Select Store'}>
                  Select Store
                </option>
                {summary.stores.map((store) => (
                  <option
                    key={store._id}
                    data-key={store._id}
                    value={store.storeName}
                  >
                    {store.storeName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="mb-3 mt-2" style={{ display: 'flex' }}>
              <Button
                className="btn-cancel"
                type="buttton"
                style={{ marginLeft: 'auto' }}
                onClick={() => navigate(`/user/dashboard`)}
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
        )}
      </Container>
    </div>
  );
}
