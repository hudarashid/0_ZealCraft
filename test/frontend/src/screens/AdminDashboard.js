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
import { FaUsersCog } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { BiCategoryAlt } from 'react-icons/bi';

const AdminDashboard = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>ZealCraft</title>
      </Helmet>
      <div class="navbar custom-nav">
        Admin Dashboard - Welcome {userInfo.firstName}!
      </div>
      <Container>
        <Row className="center">
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <FaUsersCog className="icon" size={70} />
                <Card.Title>Users</Card.Title>
                <Card.Text>View list of sellers.</Card.Text>

                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/admin/users`)}
                >
                  Users
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <FaUsersCog className="icon" size={70} />
                <Card.Title>Customers</Card.Title>
                <Card.Text>View list of buyers.</Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/admin/customers`)}
                >
                  Customers
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="center">
          <Col md={4}>
            <Card className="m-3 card-custom">
              <Card.Body>
                <BiCategoryAlt className="icon" size={70} />
                <Card.Title>Categories</Card.Title>
                <Card.Text>View list of Categories.</Card.Text>
                <Button
                  className="btn-primary"
                  onClick={() => navigate(`/admin/categories`)}
                >
                  Categories
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
                  onClick={() => navigate(`/admin/profile`)}
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

export default AdminDashboard;
