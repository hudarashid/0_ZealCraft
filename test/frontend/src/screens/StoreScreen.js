import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
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
        stores: action.payload,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function StoreScreen() {
  const navigate = useNavigate();
  const [{ loading, error, stores }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(
          `/api/sr/mystores`,

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
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Stores</title>
      </Helmet>
      <div className="navbar custom-nav">Stores</div>
      <div style={{ display: 'flex' }}>
        <Button
          style={{ marginLeft: 'auto' }}
          className="btn-primary mb-2"
          onClick={() => navigate(`/user/create-store`)}
        >
          Create Store
        </Button>
      </div>
      <Container className="large-container">
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
                <th>RATING</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store._id}>
                  <td>{store._id}</td>
                  <td>{store.storeName}</td>
                  <td>{store.storeDetail}</td>
                  <td>{store.storeRating}</td>
                  <td>{store.storeStatus}</td>
                  <td>
                    <Button
                      className="btn-primary"
                      onClick={() => navigate(`/user/stores/${store._id}`)}
                    >
                      Edit Store
                    </Button>{' '}
                    <Button
                      className="btn-primary"
                      onClick={() =>
                        navigate(`/user/stores/${store._id}/products`)
                      }
                    >
                      View Products
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <Button
          className="btn-cancel pull-right"
          onClick={() => navigate('/user/dashboard')}
        >
          Back
        </Button>
        <ToastContainer />
      </Container>
    </div>
  );
}
