import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const Slider = () => {
  return (
    <Container className="slider">
      <h1 className="home-title">
        A SPACE FOR PASSIONATE CRAFTPEOPLE, ARTIST AND COOKS
      </h1>
      <Button href="/search" className="btn-primary">
        SHOP NOW
      </Button>
    </Container>
  );
};

export default Slider;
