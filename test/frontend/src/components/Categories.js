import React, { useEffect, useReducer } from 'react';
import logger from 'use-reducer-logger';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import Col from 'react-bootstrap/esm/Col';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, categories: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Categories = () => {
  const navigate = useNavigate();

  const [{ loading, error, categories }, dispatch] = useReducer(
    logger(reducer),
    {
      categories: [],
      loading: true,
      error: '',
    }
  );

  //fetch data from productCategory model
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/cr');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <div className="categories">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          {categories.map((category) => (
            <Col key={category._id} className="category-container">
              <img
                className="category-img"
                src={category.img}
                alt={category.categoryName}
              />
              <div className="category-info">
                <h1 className="category-title">{category.categoryName}</h1>
                <Button href={`/search`} className="btn-primary">
                  SHOP NOW
                </Button>
              </div>
            </Col>
          ))}
        </>
      )}
    </div>
  );
};

export default Categories;
