import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import logger from 'use-reducer-logger';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from './LoadingBox';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 50px;
`;
const CategoryContainer = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.7;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  color: black;
  margin-bottom: 20px;
`;
// const linkStyle = styled.a`
//     border: none;
//     padding: 10px;
//     background-color: white;
//     color: gray;
//     cursor: pointer;
//     font-weight: 600;
//     text-decoration: none;
// `

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
  const [{ loading, error, categories }, dispatch] = useReducer(
    logger(reducer),
    {
      categories: [],
      loading: true,
      error: '',
    }
  );

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
    <Container>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <div>error</div>
      ) : (
        categories.map((category) => (
          <CategoryContainer key={category._id}>
            <Image src={category.img} alt={category.categoryName} />
            <Info>
              <Title>{category.categoryName}</Title>
              <Button
                href={`/categories/${category._id}`}
                variant="light"
                active
              >
                SHOP NOW
              </Button>
            </Info>
          </CategoryContainer>
        ))
      )}
    </Container>
  );
};

export default Categories;
