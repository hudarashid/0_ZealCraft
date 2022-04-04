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
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';
import { GoListOrdered } from 'react-icons/go';
import { BiStore } from 'react-icons/bi';

const UserDashboard = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>ZealCraft</title>
      </Helmet>
      <div class="navbar custom-nav">
        User Dashboard - Welcome {userInfo.firstName}!
      </div>
      <Container>
        <Row className="center">
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <BiStore className="icon" size={70} />
                <Card.Title>Stores</Card.Title>
                <Card.Text>View list of stores.</Card.Text>

                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/user/stores`)}
                >
                  Stores
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <GoListOrdered className="icon" size={70} />
                <Card.Title>Orders</Card.Title>
                <Card.Text>View list of orders.</Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/user/orders`)}
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
                <AiOutlineAppstoreAdd className="icon" size={70} />
                <Card.Title>Create Product</Card.Title>
                <Card.Text>Click to create product.</Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/user/create-product`)}
                >
                  Create Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <FaUserCircle className="icon" size={70} />
                <Card.Title>Profile</Card.Title>
                <Card.Text>View profile.</Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/user/profile`)}
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

export default UserDashboard;
