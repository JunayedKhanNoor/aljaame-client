import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';

const HomeScreen = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery('products', () =>
    fetch('http://localhost:5000/products', {
      method: 'GET',
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} refetch={refetch} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
