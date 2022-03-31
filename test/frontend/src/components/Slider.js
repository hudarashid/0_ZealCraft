import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
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

const Slider = () => {
  return (
    <Container>
      <Title>A SPACE FOR PASSIONATE CRAFT PEOPLE, ARTISTS AND COOKS</Title>
      <Button href="/allproducts" variant="outline-dark">
        SHOP NOW
      </Button>
    </Container>
  );
};

export default Slider;
