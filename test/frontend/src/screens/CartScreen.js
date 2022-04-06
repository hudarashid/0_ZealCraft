import React, { useContext } from 'react';
import { Store } from '../Store';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (product, quantity) => {
    const { data } = await axios.get(`/api/pr/product/${product._id}`);
    if (data.quantityOnHand < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
  };

  const removeItemHandler = (product) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: product });
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <div style={{ padding: '10px' }}>
        <h1
          style={{
            color: '#69587c',
          }}
        >
          Shopping Cart
        </h1>
        <Row>
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/search">Go Shopping</Link>
              </MessageBox>
            ) : (
              <>
                <ListGroup>
                  {cartItems.map((product) => (
                    <ListGroup.Item
                      key={product._id}
                      style={{
                        color: '#69587c',
                      }}
                    >
                      <Row
                        className="align-items-center"
                        style={{
                          justifyContent: 'space-around',
                          color: '#69587c',
                        }}
                      >
                        <Col md={6}>
                          <img
                            src={product.images}
                            alt={product.productName}
                            className="img-fluid rounded img-thumbnail"
                          ></img>{' '}
                          <Link to={`/product/${product._id}`}>
                            {product.productName}
                          </Link>
                        </Col>
                        <Col md={3}>
                          <Button
                            onClick={() =>
                              updateCartHandler(product, product.quantity - 1)
                            }
                            variant="light"
                            disabled={product.quantity === 1}
                          >
                            <i className="fas fa-minus-circle"></i>
                          </Button>{' '}
                          <span>{product.quantity}</span>{' '}
                          <Button
                            variant="light"
                            onClick={() =>
                              updateCartHandler(product, product.quantity + 1)
                            }
                            disabled={
                              product.quantity === product.quantityOnHand
                            }
                          >
                            <i className="fas fa-plus-circle"></i>
                          </Button>
                        </Col>
                        <Col md={1}>${product.currentPrice}</Col>
                        <Col md={1}>
                          <Button
                            onClick={() => removeItemHandler(product)}
                            variant="light"
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Link to="/search">Continue Shopping</Link>
              </>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{
                      color: '#69587c',
                    }}
                  >
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) : £
                      {cartItems.reduce(
                        (a, c) => a + c.currentPrice * c.quantity,
                        0
                      )}
                    </h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className="d-grid">
                      {cartItems.length === 0 ? (
                        <Button variant="light" disabled>
                          Proceed to Checkout
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={checkoutHandler}
                            className="btn-primary"
                          >
                            Proceed to Checkout
                          </Button>
                        </>
                      )}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
