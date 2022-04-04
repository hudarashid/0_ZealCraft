import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductListScreen() {
  const navigate = useNavigate();
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: storeId } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `/api/pr/${storeId}/products`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo, storeId]);

  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="navbar custom-nav">Products</div>
      <div style={{ display: 'flex' }}>
        <Button
          style={{ marginLeft: 'auto' }}
          className="btn-primary mb-2"
          onClick={() => navigate(`/user/create-product`)}
        >
          Create Product
        </Button>
      </div>
      <Container className="medium-container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Table borderless className="table-custom">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DETAIL</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.productName}</td>
                  <td>{product.productDescription}</td>
                  <td>
                    <Button
                      className="btn-primary"
                      onClick={() => navigate(`/user/products/${product._id}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Button
          className="btn-cancel pull-right"
          onClick={() => navigate('/user/stores')}
        >
          Back
        </Button>
      </Container>
      <ToastContainer />
    </div>
  );
}
