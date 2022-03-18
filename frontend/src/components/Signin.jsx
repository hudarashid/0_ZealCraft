import React, { useRef, useEffect, useCallback } from 'react';
import { TextField } from '@material-ui/core/index';
import ReactDom from "react-dom";
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index:1000;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  z-index: 1000;
  padding: 50px;
  border-radius: 10px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    text-align: center;
    margin: 1rem;
  }
`;

const CloseModalButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Signin = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();
  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      navigate(-1);
    }
  }

  //function to close modal by pressing `esc` button
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        navigate(-1);
      }
    }, [setShowModal, showModal]
  );

  //function to close modal by click outside modal
  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return ReactDom.createPortal(
    <>
      {showModal ?
        <Background onClick={closeModal} ref={modalRef}>
            <ModalWrapper showModal={showModal}>
            <ModalContent>
              <FormControl>
              <h1>Sign In</h1>
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
                
                <Button variant='contained' style={{ backgroundColor: '#F0BF4C', color: 'black' }}>Sign In</Button>
                
                <p><Link to="/resetPassword">Forgot your password?</Link></p>
                <p onClick={()=>setShowModal(false)}>Don't have an account yet? <Link to='/register'>Register</Link></p>
                
              </FormControl>
            </ModalContent>
            
              <CloseModalButton onClick={() => {setShowModal(prev => !prev), navigate(-1)}}>
                <CloseIcon />
              </CloseModalButton>
            
            </ModalWrapper>
        </Background>
        :
        null}
    </>,
    document.getElementById('modal')
    );
}

export default Signin;