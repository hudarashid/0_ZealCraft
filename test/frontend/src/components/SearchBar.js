import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { getError } from '../utils';
import { toast } from 'react-toastify';
import SearchBox from './SearchBox';

const SearchBar = ({ showSideBar, setShowSideBar }) => {
  const navigate = useNavigate();
  const handleCloseSideBar = () => setShowSideBar(false);
  const handleShowSideBar = () => setShowSideBar(true);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/pr/productCategory');
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Offcanvas show={showSideBar} onHide={handleCloseSideBar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search for Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SearchBox />
          <hr />
          <Nav className="flex-column w-100 p-2">
            <Nav.Item>
              <strong>CATEGORIES</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={handleCloseSideBar}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchBar;
