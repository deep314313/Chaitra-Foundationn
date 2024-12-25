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
          <p>123 Charity Street</p>
          <p>Bangalore, Karnataka</p>
          <p>India</p>
          
          <h3 className="mt-4">Contact Information</h3>
          <p>Email: info@chaitrafoundation.org</p>
          <p>Phone: +91 1234567890</p>
          
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
