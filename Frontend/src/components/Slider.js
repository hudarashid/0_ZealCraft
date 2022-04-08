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
      <Title className="home-title">
        A SPACE FOR PASSIONATE CRAFTPEOPLE, ARTIST AND COOKS
      </Title>
      <Button href="/search" className="btn-primary">
        SHOP NOW
      </Button>
    </Container>
  );
};

export default Slider;
