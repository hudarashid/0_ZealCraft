import styled from "styled-components";
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h1`
    width: 75%;
    font-size: 50px;
    font-weight: 800;
    font-style: italic;
    text-align: center;
    margin-bottom: 20px;
`;

const Button = styled.button`
    border: 1px solid gray;
    padding: 10px;
    background-color: white;
    color: black;
    cursor: pointer;
    font-weight: 600;
`;

const Slider = () => {
  
  return (
    <Container>
          <Title>A SPACE FOR PASSIONATE CRAFTPEOPLE, ARTIST AND COOKS</Title>
          <Link to='/allproducts'>SHOP NOW</Link>
    </Container>
  );
};

export default Slider;