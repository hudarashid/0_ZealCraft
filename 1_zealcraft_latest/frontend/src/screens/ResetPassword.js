import Axios from 'axios';
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';

const ResetPassword = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match!');
      return;
    }

    try {
      const { data } = await Axios.put('/api/ur/reset-password', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Container fluid="sm" style={{ padding: '70px' }}>
      <Form onSubmit={submitHandler}>
        <Stack gap={2} className="col-md mx-auto">
          <h1>Please reset your password</h1>

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              size="lg"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Confirm Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FloatingLabel>
          <Button type="submit" className="btn-primary mt-2">
            Reset
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default ResetPassword;
