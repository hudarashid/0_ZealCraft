import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, FormControlLabel } from '@material-ui/core/index';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Signin from '../components/Signin';


const Container = styled.div`
   
`
const Wrapper = styled.div`
    padding: 40px;
    display: flex;
    justify-content: center;
`
const Icon = styled.div``

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
`

const Text = styled.h4`
    margin: 10px 0 10px 0;
    font-weight: 400;
`
const HasAccount = styled.p`
    font-sized: 6px;
    font-weight: 300;
    text-align: center;
`

const Register = () => {
  const [value, setValue] = useState('buyer');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(prev => !prev);
  }

  return (
    <Container>
      <Wrapper>
        <FormControl>
          <AccountCircleOutlinedIcon style={{ margin: '0 auto', fontSize: 50 }} />
          <Title>Create An Account</Title>
          <TextField
            variant="outlined"
            label="Email"
            margin="normal"
            fullWidth required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            margin="normal"
            fullWidth required
          />
          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            margin="normal"
            fullWidth required
          />


          <Text>Please select if your are a seller or buyer</Text>
          <RadioGroup
            value={value}
            onChange={handleChange}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '10px 0 10px 0' }}
          >
            <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
            <FormControlLabel value="seller" control={<Radio />} label="Seller" />
          </RadioGroup>

          <Button variant='contained' style={{ backgroundColor: '#F0BF4C', color: 'black', marginBottom: '20px' }}>Sign Up</Button>
          <HasAccount onClick={openModal}>Already have an account?
            <Link to="/signin">Sign In</Link> here
          </HasAccount>
          <Signin showModal={showModal} setShowModal={setShowModal} />
        </FormControl >
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Register;