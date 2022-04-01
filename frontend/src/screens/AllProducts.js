import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


const AllProducts = ({ products }) => {

  return (
    <>
      <Container>
        {products && products.map((product) => (
          <Card border="dark" style={{ padding: '10px', marginBottom: '10px' }} key={product._id}>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h4>{product.productName}</h4>
                ({product.productStatus})
              </div>
              <div>
                <h4>£{product.currentPrice}</h4>
              </div>
            </Card.Header>
            <Row>
              <Col xs={3}>
                <Card.Img style={{ width: '175px', height: '100px', margin: '5px' }} variant="top" src={product.image} alt={product.productName} />
              </Col>

              <Col>
                <Row>
                  <Col style={{ paddingTop: '10px' }}>
                    <p>Description: {product.productDescription}</p>
                    <p>Category: {product.productCategory}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <div className="mb-2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="warning" size="md" style={{ marginRight: '5px' }}>
                  Buy Now
                </Button>
                <Button variant="outline-success" size="md">
                  Add to Cart
                </Button>
              </div>
            </Row>
          </Card>
        ))
        }
      </Container>
    </>
  )
}

export default AllProducts;
