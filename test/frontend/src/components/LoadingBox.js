import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
// import CircularProgress from '@mui/material/CircularProgress';
export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    // <div>
    //   <CircularProgress style={{ color: '#ff9100' }} />
    // </div>
  );
}
