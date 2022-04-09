import React from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const Footer = () => {
  return (
    <Container>
      <ListGroup className="list">
        <ListGroup.Item className="list-item" as="button">
          About
        </ListGroup.Item>
        <ListGroup.Item className="list-item" as="button">
          Contact
        </ListGroup.Item>
        <ListGroup.Item className="list-item" as="button">
          Privacy
        </ListGroup.Item>
      </ListGroup>
      <h1 className="company">@ZealCraft 2022</h1>
    </Container>
  );
};

export default Footer;
