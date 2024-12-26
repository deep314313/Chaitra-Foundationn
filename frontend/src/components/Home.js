import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import image from '../assets/image.png';

const Home = () => {
  const impactStats = [
    { number: '50,000+', label: 'Lives Impacted' },
    { number: '7', label: 'States Covered' },
    { number: '100+', label: 'Collection Centers' },
    { number: '10,000+', label: 'Monthly Donations' }
  ];

  const activeStates = [
    { name: 'Karnataka', impact: 'Primary operations hub with 30+ centers' },
    { name: 'Tamil Nadu', impact: 'Supporting 10,000+ families annually' },
    { name: 'Kerala', impact: 'Focus on flood relief and rehabilitation' },
    { name: 'Andhra Pradesh', impact: 'Rural development initiatives' },
    { name: 'Telangana', impact: 'Education support programs' },
    { name: 'Maharashtra', impact: 'Urban poverty alleviation' },
    { name: 'Goa', impact: 'Coastal community support' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-center py-5" style={{
        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/images/hero-bg.jpg")',
        backgroundSize: 'cover',
        color: 'white',
        padding: '100px 0'
      }}>
        <Container>
          <h1 className="display-4 fw-bold mb-4">Empowering Lives Through Giving</h1>
          <p className="lead mb-4">Join us in our mission to provide dignity and hope through clothing donations</p>
          <Button as={Link} to="/donate" variant="primary" size="lg" className="px-4">
            Donate Now
          </Button>
        </Container>
      </div>

      {/* Impact Statistics */}
      <Container className="py-5">
        <Row className="g-4">
          {impactStats.map((stat, index) => (
            <Col key={index} md={3} sm={6}>
              <Card className="text-center h-100 border-0 shadow-sm">
                <Card.Body>
                  <h2 className="display-5 fw-bold text-primary">{stat.number}</h2>
                  <p className="text-muted">{stat.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Our Work Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Our Impact Across India</h2>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="position-relative">
                <img 
                  src={image}
                  alt="India Map" 
                  className="img-fluid" 
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
                {/* Highlight markers for states */}
                <div className="map-markers">
                  {activeStates.map((state, index) => (
                    <div
                      key={index}
                      className="state-marker"
                      style={{
                        position: 'absolute',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#007bff',
                        borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                        cursor: 'pointer'
                      }}
                      title={state.name}
                    />
                  ))}
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="states-list">
                {activeStates.map((state, index) => (
                  <Card key={index} className="mb-3 border-0 shadow-sm">
                    <Card.Body>
                      <h5 className="fw-bold text-primary">{state.name}</h5>
                      <p className="mb-0">{state.impact}</p>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Current Initiatives */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Current Initiatives</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h4>Winter Clothing Drive</h4>
                <p>Providing warm clothes to 5000+ families in northern regions during winter months.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h4>School Uniform Program</h4>
                <p>Supporting education by providing uniforms to 10,000+ underprivileged students.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h4>Emergency Relief</h4>
                <p>Quick response team providing immediate clothing support during natural disasters.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <div className="bg-primary text-white text-center py-5">
        <Container>
          <h2 className="mb-4">Make a Difference Today</h2>
          <p className="lead mb-4">Your donations can help transform lives and bring smiles to those in need</p>
          <Button as={Link} to="/donate" variant="light" size="lg">
            Start Donating
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Home;
