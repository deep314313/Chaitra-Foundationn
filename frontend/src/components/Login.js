import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/Chaitra_Logo.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <Image
              src={logo}
              alt="Chaitra Foundation Logo"
              style={{ width: '150px', marginBottom: '2rem' }}
            />
            <h2 className="text-primary">Welcome Back</h2>
            <p className="text-muted">Login to continue your journey of giving</p>
          </div>
          
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" size="lg" type="submit">
                    Login
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p className="mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary text-decoration-none">
                    Register here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
