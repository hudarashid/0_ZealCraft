import Axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutStep';
import LoadingBox from '../components/LoadingBox';
import Footer from '../components/Footer';

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

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  cart.currentPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.currentPrice, 0)
  );
  cart.shippingPrice = cart.currentPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.currentPrice);
  cart.totalPrice = cart.currentPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });

      const { data } = await Axios.post(
        '/api/or',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          currentPrice: cart.currentPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(data);
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart, navigate]);

  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <Container>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

        <h1
          className="my-3"
          style={{
            color: '#69587c',
          }}
        >
          Preview Order
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
                  <strong>Name:</strong> {cart.shippingAddress.firstName}{' '}
                  {cart.shippingAddress.lastName} <br />
                  <strong>Address: </strong> {cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  ,{cart.shippingAddress.country}
                </Card.Text>
                <Link to="/shipping">Edit</Link>
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
                  <strong>Method:</strong> {cart.paymentMethod}
                </Card.Text>
                <Link to="/payment">Edit</Link>
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
                  {cart.cartItems.map((item) => (
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
                <Link to="/customer/cart">Edit</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title
                  style={{
                    color: '#69587c',
                  }}
                >
                  Order Summary
                </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{
                      color: '#69587c',
                    }}
                  >
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.currentPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col
                        style={{
                          color: '#69587c',
                        }}
                      >
                        Shipping
                      </Col>
                      <Col
                        style={{
                          color: '#69587c',
                        }}
                      >
                        ${cart.shippingPrice.toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col
                        style={{
                          color: '#69587c',
                        }}
                      >
                        Tax
                      </Col>
                      <Col
                        style={{
                          color: '#69587c',
                        }}
                      >
                        ${cart.taxPrice.toFixed(2)}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{
                      color: '#69587c',
                    }}
                  >
                    <Row>
                      <Col>
                        <strong> Order Total</strong>
                      </Col>
                      <Col>
                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                        onClick={placeOrderHandler}
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </Button>
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
}
