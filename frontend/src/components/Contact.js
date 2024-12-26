import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <h2>Contact Us</h2>
          <p className="lead">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Your message" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
        
        <Col md={6} className="mt-4 mt-md-0">
          <h3>Our Location</h3>
          <p>E-28 Om Vihar Phase-5</p>
          <p>Uttam Nagar, New Delhi</p>
          <p>110059</p>
          
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              <i className="fas fa-phone"></i>
              +91 9868314313
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              d.gupta9868@gmail.com
            </p>
          </div>
          
          <h3 className="mt-4">Hours of Operation</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
