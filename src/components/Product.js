import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product, refetch }) => {
  return (
    <>
      <Link to={`/product/${product._id}`} refetch={refetch}>
        <Card className="my-3 p-3 rounded">
          <Card.Img src={product.image} variant="top" style={{ height: '200px' }} />

          <Card.Body>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>

            <Card.Text as="h3" className="my-3">
              $ {product.brand}
            </Card.Text>
            <Card.Text as="h3">$ {product.price}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </>
  );
};

export default Product;
