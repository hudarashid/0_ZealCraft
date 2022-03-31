import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from 'react-bootstrap/Card';

const CustomerDashboard = () => {
  return (
    <div>
      <Helmet>
        <title>ZealCraft</title>
      </Helmet>
      <h1>Customer Dashboard</h1>
      <div>
        <h2>Welcome Customer!</h2>
        <Card>
          <Card.Body>
            Click <Link to={`/customer/orders`}>here</Link> to view orders.
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            Click <Link to={`/customer/search`}>here</Link> to search products.
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            Click <Link to={`/customer/cart`}>here</Link> to view cart.
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;
