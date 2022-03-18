import React from 'react'
import styled from 'styled-components';
import { categories } from '../data';
import CategoryItem from './CategoryItem';

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 50px;
`

const Categories = () => {
  return (
        <Container>
          {categories.map((item, index) => (
            <CategoryItem key={index} item={item}/>
          ))}
        </Container>
    )
}

export default Categories