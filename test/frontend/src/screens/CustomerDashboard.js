import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from 'react-bootstrap/Card';
import { Store } from '../Store';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FaUserCircle } from 'react-icons/fa';
import { GoListOrdered } from 'react-icons/go';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import { ImSearch } from 'react-icons/im';

const CustomerDashboard = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>ZealCraft</title>
      </Helmet>
      <div class="navbar custom-nav">
        Customer Dashboard - Welcome {userInfo.firstName}!
      </div>
      <Container>
        <Row className="center">
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <ImSearch className="icon" size={70} />
                <Card.Title>Buy Products</Card.Title>
                <Card.Text>Search items and purchase.</Card.Text>

                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/customer/search`)}
                >
                  Shop
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <GoListOrdered className="icon" size={70} />
                <Card.Title>Orders</Card.Title>
                <Card.Text>
                  View your orders.
                  <br />
                </Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/customer/orders`)}
                >
                  Orders
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="center">
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <MdOutlineLocalGroceryStore className="icon" size={70} />
                <Card.Title>Shopping Cart</Card.Title>
                <Card.Text>Click to view Shopping cart.</Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/customer/cart`)}
                >
                  Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <FaUserCircle className="icon" size={70} />
                <Card.Title>Profile</Card.Title>
                <Card.Text>
                  View profile.
                  <br />
                </Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/customer/profile`)}
                >
                  My Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
