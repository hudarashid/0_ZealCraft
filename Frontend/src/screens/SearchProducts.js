import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Autocomplete } from '@mui/material';
import Button from 'react-bootstrap/Button';
import { Search } from '@material-ui/icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import AllProducts from './AllProducts';
import SearchBox from '../components/SearchBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

const prices = [
  {
    name: '£1 to £50',
    value: '1-50',
  },
  {
    name: '£51 to £200',
    value: '51-200',
  },
];

const SearchProducts = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Painting
  const category = sp.get('category') || 'all';
  const query = sp.get('query') || 'all';
  const price = sp.get('price') || 'all';

  const [{ loading, error, products, countProducts }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );

  //console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `/api/pr/search?query=${query}&category=${category}&price=${price}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [category, error, query, price]);

  const [categories, setCategories] = useState([]);
  //console.log(categories);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/pr/productCategory`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterPrice = filter.price || price;
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}`;
  };

  return (
    <div>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Row style={{ textAlign: 'center', padding: '30px' }}>
        <h4
          style={{
            fontStyle: 'italic',
            fontWeight: '700',
            textDecoration: 'underline',
            color: '#69587c',
          }}
        >
          Search Product
        </h4>
      </Row>
      <Row>
        <Col sm={3} style={{ marginLeft: '20px', color: '#69587c' }}>
          <SearchBox />
          <hr />
          <h4>Categories</h4>

          <ListGroup>
            <Link
              className={'all' === category ? 'text-bold' : ''}
              to={getFilterUrl({ category: 'all' })}
              style={{ textDecoration: 'none' }}
            >
              <ListGroup.Item action variant="light">
                Any
              </ListGroup.Item>
            </Link>
            {categories.map((c) => (
              <Link
                className={c === category ? 'text-bold' : ''}
                to={getFilterUrl({ category: c })}
                style={{ textDecoration: 'none' }}
                key={c}
              >
                <ListGroup.Item action variant="light">
                  {c}
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
          <hr />
          <h4>Price</h4>

          <ListGroup>
            <Link
              className={'all' === price ? 'text-bold' : ''}
              to={getFilterUrl({ price: 'all' })}
              style={{ textDecoration: 'none', color: '#69587c' }}
            >
              <ListGroup.Item action variant="light">
                Any
              </ListGroup.Item>
            </Link>
            {prices.map((p) => (
              <Link
                className={p.value === price ? 'text-bold' : ''}
                to={getFilterUrl({ price: p.value })}
                style={{ textDecoration: 'none' }}
                key={p.value}
              >
                <ListGroup.Item action variant="light">
                  {p.name}
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Col>
        <Col sm={8}>
          <AllProducts products={products} />
        </Col>
      </Row>
    </div>
  );
};

export default SearchProducts;
