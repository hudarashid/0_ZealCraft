import React, { useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import logger from 'use-reducer-logger';

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

const Slider = () => {
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
    <Container className="slider">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <h1 className="home-title">
            A SPACE FOR PASSIONATE CRAFTPEOPLE, ARTIST AND COOKS
          </h1>
          <Button href="/search" className="btn-primary">
            SHOP NOW
          </Button>
          <Carousel className="slider-carousel">
            {categories.map((item) => (
              <Carousel.Item interval={2000}>
                {/* <Carousel.Caption style={{ color: 'black' }}>
                    <p>{item.categoryName}</p>
                  </Carousel.Caption> */}
                <img
                  style={{ margin: '0 auto', width: '50%', height: '50%' }}
                  className="d-block w-100"
                  src={item.img}
                  alt={item.categoryName}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </Container>
  );
};

export default Slider;
