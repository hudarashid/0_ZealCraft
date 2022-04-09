import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Store } from '../Store';
import Signin from '../components/Signin';

const AllProducts = ({ products }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems },
  } = state;

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === products._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/pr/product/${item._id}`);
    if (data.quantityOnHand < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <>
      <Container>
        {products &&
          products.map((item) => (
            <Card
              border="dark"
              style={{
                padding: '10px',
                marginBottom: '10px',
                color: '#69587c',
              }}
              key={item._id}
            >
              <Card.Header
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  <h4>{item.productName}</h4> {/*({item.productStatus}) */}
                </div>
                <div>
                  <h4>£{item.currentPrice}</h4>
                </div>
              </Card.Header>
              <Row>
                <Col xs={3}>
                  <Card.Img
                    variant="top"
                    src={item.images}
                    alt={item.productName}
                    className="img-thumbnail2 mt-1"
                  />
                </Col>

                <Col>
                  <Row>
                    <Col style={{ paddingTop: '10px', color: '#69587c' }}>
                      <p>Description: {item.productDescription}</p>
                      <p>Category: {item.productCategory}</p>
                      <p>
                        Status :{' '}
                        {item.quantityOnHand > 0 ? (
                          <Badge bg="success">Available</Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <div
                  className="mb-2"
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    color: '#69587c',
                  }}
                >
                  <Button
                    href={`product/slug/${item._id}`}
                    variant="outline-success"
                    size="md"
                    style={{ marginRight: '5px' }}
                  >
                    View Product
                  </Button>
                  {item.quantityOnHand === 0 ? (
                    <Button variant="light" disabled>
                      Out of stock
                    </Button>
                  ) : !userInfo ? (
                    <>
                      <Button onClick={handleShowModal} className="btn-primary">
                        Sign in to Shop
                      </Button>
                      <Signin
                        showModal={showModal}
                        setShowModal={setShowModal}
                      />
                    </>
                  ) : (
                    <Button
                      onClick={() => addToCartHandler(item)}
                      className="btn-primary"
                    >
                      Add to cart
                    </Button>
                  )}
                </div>
              </Row>
            </Card>
          ))}
      </Container>
    </>
  );
};

export default AllProducts;
