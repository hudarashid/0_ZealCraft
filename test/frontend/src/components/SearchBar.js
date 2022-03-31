import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const SearchBar = ({ showSideBar, setShowSideBar }) => {
  const handleCloseSideBar = () => setShowSideBar(false);
  const handleShowSideBar = () => setShowSideBar(true);

  return (
    <>
      <Offcanvas show={showSideBar} onHide={handleCloseSideBar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchBar;
