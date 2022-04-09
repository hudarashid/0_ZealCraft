import axios from 'axios';
import { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
import Signin from '../components/Signin';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: slug } = params;

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      product: [],
      loading: true,
      error: '',
    });
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/pr/product/${slug}`);
        console.log(result);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, cart } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/pr/product/${product._id}`);
    if (data.quantityOnHand < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    navigate('/customer/cart');
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <Row
        style={{
          justifyContent: 'space-around',
          padding: '15px',
          color: '#69587c',
        }}
      >
        <Col md={5}>
          <img
            className="img-large"
            src={product.images}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1
                style={{
                  color: '#69587c',
                }}
              >
                {product.productName}
              </h1>
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                color: '#69587c',
              }}
            >
              Price : ${product.currentPrice}
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                color: '#69587c',
              }}
            >
              Discount : ${product.discountedPrice}
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                color: '#69587c',
              }}
            >
              Description:
              <p>{product.productDescription}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item
                  style={{
                    color: '#69587c',
                  }}
                >
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.currentPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    color: '#69587c',
                  }}
                >
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.quantityOnHand > 0 ? (
                        <Badge bg="success">Available</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.quantityOnHand === 0 ? (
                  <Button variant="light" disabled>
                    Out of stock
                  </Button>
                ) : !userInfo ? (
                  <>
                    <Button onClick={handleShowModal}>Sign in to Shop</Button>
                    <Signin showModal={showModal} setShowModal={setShowModal} />
                  </>
                ) : (
                  <Button onClick={() => addToCartHandler()}>
                    Add to cart
                  </Button>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
