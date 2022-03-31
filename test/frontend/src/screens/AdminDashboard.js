import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from 'react-bootstrap/Card';

const AdminDashboard = () => {
  return (
    <div>
      <Helmet>
        <title>ZealCraft</title>
      </Helmet>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Welcome Admin!</h2>
        <Card>
          <Card.Body>
            Click <Link to={`/admin/users`}>here</Link> to view users.
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            Click <Link to={`/admin/customers`}>here</Link> to view customers.
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            Click <Link to={`/admin/categories`}>here</Link> to view product
            categories.
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
