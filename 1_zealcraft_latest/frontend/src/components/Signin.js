import Axios from 'axios';
import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useContext,
} from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';

const Signin = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('/api/ur/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (data.isUser) {
        navigate('/user/dashboard');
      } else if (data.isCustomer) {
        navigate('/customer/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // useEffect(() => {}, []);

  return ReactDom.createPortal(
    <>
      {
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          keyboard={true}
        >
          <Modal.Header closeButton={handleCloseModal}>
            <Modal.Title style={{ textAlign: 'center' }}>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={submitHandler}>
              <Stack gap={2} className="col-md mx-auto">
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
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="lg"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>
                <Button
                  type="submit"
                  className="btn-primary mt-2"
                  onClick={handleCloseModal}
                >
                  Sign In
                </Button>
              </Stack>

              <p
                onClick={handleCloseModal}
                style={{ textAlign: 'center', margin: '20px' }}
              >
                <Link to="/forgot-password">Forgot your password?</Link>
              </p>
              <p onClick={handleCloseModal} style={{ textAlign: 'center' }}>
                Don't have an account yet? <Link to="/register">Register</Link>
              </p>
            </Form>
          </Modal.Body>
        </Modal>
      }
    </>,
    document.getElementById('modal')
  );
};

export default Signin;
