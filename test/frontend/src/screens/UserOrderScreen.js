import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
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

const UserOrderScreen = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { id: orderId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, order, loadingUpdate }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      order: {},
      error: '',
      loadingUpdate: false,
    }
  );

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/or/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (!userInfo) {
      return navigate('/signin');
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, userInfo, orderId, navigate]);

  const [isDelivered, setIsDelivered] = useState(order.isDelivered);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.put(
        `/api/or/${orderId}`,
        {
          orderId,
          isDelivered,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'UPDATE_SUCCESS',
        payload: data,
      });
      toast.success('Order updated successfully');
      setTimeout(() => {
        navigate(`/user/orders`);
      }, 3000);
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <h1
        className="my-3"
        style={{
          color: '#69587c',
        }}
      >
        Order
      </h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title
                style={{
                  color: '#69587c',
                }}
              >
                Shipping
              </Card.Title>
              <Card.Text
                style={{
                  color: '#69587c',
                }}
              >
                <strong>Name:</strong> {order.shippingAddress.firstName}{' '}
                {order.shippingAddress.lastName}
                <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title
                style={{
                  color: '#69587c',
                }}
              >
                Payment
              </Card.Title>
              <Card.Text
                style={{
                  color: '#69587c',
                }}
              >
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title
                style={{
                  color: '#69587c',
                }}
              >
                Items
              </Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item
                    key={item._id}
                    style={{
                      color: '#69587c',
                    }}
                  >
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.images}
                          alt={item.productName}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/slug/${item._id}`}>
                          {item.productName}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.currentPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        {/* {isDelivered ? (
          <LoadingBox />
        ) : (
          <Col>
            <Card className="mb-3 mr-1">
              <Form onSubmit={submitHandler}>
                <Card.Body>
                  <Card.Title
                    style={{
                      color: '#69587c',
                    }}
                  >
                    Chage Order Status
                  </Card.Title>
                  <Form.Group controlId="pname">
                    <Form.Label>Select Status</Form.Label>
                    <Form.Select
                      className="mb-3"
                      aria-label="Default select example"
                      onChange={(e) =>
                        setIsDelivered(
                          e.target.options[
                            e.target.options.selectedIndex
                          ].getAttribute('data-key')
                        )
                      }
                    >
                      <option key={0} value={'Select Category'}>
                        Select Status
                      </option>
                      <option key={1} data-key={true} value={true}>
                        Delivered
                      </option>
                      <option key={2} data-key={false} value={false}>
                        Not Delivered
                      </option>
                    </Form.Select>
                  </Form.Group>
                  <div style={{ display: 'flex' }}>
                    <Button
                      className="btn-cancel"
                      style={{ marginLeft: 'auto' }}
                      onClick={() => navigate(`/user/orders`)}
                    >
                      Cancel
                    </Button>
                    {'  '}
                    {'  '}
                    <Button type="submit" className="btn-space btn-primary">
                      Update
                    </Button>
                  </div>
                </Card.Body>
              </Form>
            </Card>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </Col>
        )} */}
      </Row>

      <Button
        className="btn-cancel mb-3"
        style={{ marginLeft: 'auto', display: 'flex' }}
        onClick={() => navigate(`/user/orders`)}
      >
        Back
      </Button>
    </div>
  );
};

export default UserOrderScreen;
