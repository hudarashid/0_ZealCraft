import Axios from 'axios';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/ur/forgot-password', {
        email,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      //navigate('/reset-password');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container fluid="sm" style={{ padding: '70px' }}>
      <Form onSubmit={submitHandler}>
        <Stack gap={2} className="col-md mx-auto">
          <h3>Forgot Password</h3>
          <p>Please enter your email address: </p>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <Button
            type="submit"
            className="btn-primary mt-2"
            onClick={handleShow}
          >
            Reset
          </Button>
        </Stack>
      </Form>
      {userInfo && userInfo._id ? (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>User Verified! </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              textAlign: 'center',
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
            }}
          >
            <p>Please click on the link and reset your password</p>
            <Link to="/reset-password">{userInfo.reset_token}</Link>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <h3>No User Found!</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Please register your account.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default ForgotPassword;
