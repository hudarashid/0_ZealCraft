import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Card from 'react-bootstrap/Card';

const UserDashboard = () => {
    return (
        <div>
            <Helmet>
                <title>ZealCraft</title>
            </Helmet>
            <h1>User Dashboard</h1>
            <div>
                <h2>Welcome User!</h2>
                <Card>
                    <Card.Body>
                        Click <Link to={`/user/stores`}>here</Link> to view your stores.
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        Click <Link to={`/user/orders`}>here</Link> to view orders.
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        Click <Link to={`/profile`}>here</Link> to view profile.
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default UserDashboard;