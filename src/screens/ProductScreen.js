import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Modal, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductScreen = ({ refetch }) => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  let [ID, setID] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setID(id);
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);
  const handleModal = () => {
    console.log(ID);
    const url = `http://localhost:5000/products/${id}`;
    fetch(url, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
      });
    handleClose();
    navigate('/');
    return;
  };
  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <ListGroupItem>Brand: ${product.brand}</ListGroupItem>
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Year: {product.year}</ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Button type="button" className="btn btn-primary w-100" disabled>
                  Add To Cart
                </Button>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  variant="danger w-100"
                  onClick={() => {
                    handleShow(product._id);
                  }}
                >
                  Delete Permanently
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, to delete from store?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleModal}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductScreen;
