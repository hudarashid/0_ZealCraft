import Axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Signin from '../components/Signin';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`;

const Text = styled.h4`
  margin: 10px 0 10px 0;
  font-weight: 400;
`;
const HasAccount = styled.p`
  font-sized: 6px;
  font-weight: 300;
  text-align: center;
`;

const Register = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [value, setValue] = useState('isCustomer');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCustomer, setIsCustomer] = useState(false);
  const [isUser, setIsSeller] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password does not match!');
      return;
    }

    try {
      const { data } = await Axios.post('/api/ur/register', {
        email,
        password,
        isCustomer,
        isUser,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (data.isUser) {
        navigate('/user/dashboard');
      } else if (data.isCustomer) {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={submitHandler}>
          <Stack gap={2} className="col-md mx-auto">
            <AccountCircleOutlinedIcon
              style={{ margin: '0 auto', fontSize: 50 }}
            />
            <Title>Create An Account</Title>
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
            <FloatingLabel
              controlId="floatingInput"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Password"
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

            <Text>Please select if your are a seller or buyer</Text>
            <InputGroup className="justify-content-md-center">
              <Row>
                <Col>
                  <Form.Check
                    inline
                    id="isCustomer"
                    name="user"
                    label="Buyer"
                    type="radio"
                    value={isCustomer}
                    onChange={() => setIsCustomer(!isCustomer)}
                    required
                  />
                </Col>

                <Col>
                  <Form.Check
                    inline
                    id="isUser"
                    name="user"
                    label="Seller"
                    type="radio"
                    value={isUser}
                    onChange={() => setIsSeller(!isUser)}
                    required
                  />
                </Col>
              </Row>
            </InputGroup>

            <Button type="submit" className="btn-primary mt-2">
              Sign Up
            </Button>
            <HasAccount onClick={handleShowModal}>
              Already have an account? <Link to="#">Sign In</Link> here
            </HasAccount>
            <Signin showModal={showModal} setShowModal={setShowModal} />
          </Stack>
        </Form>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Register;
