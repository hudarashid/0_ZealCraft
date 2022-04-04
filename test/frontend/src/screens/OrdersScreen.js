import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from 'react-toastify';

export default function OrdersScreen() {
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <div className="navbar custom-nav">Orders</div>
      <Container className="small-container">
        <div className="para">
          <p>Orders will be listed here.</p>
        </div>
        <Button
          className="btn-cancel pull-right"
          onClick={() => navigate('/user/dashboard')}
        >
          Back
        </Button>
        <ToastContainer />
      </Container>
    </div>
  );
}
