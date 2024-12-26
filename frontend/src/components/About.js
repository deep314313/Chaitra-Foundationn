import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './About.css';

const About = () => {
  const awards = [
    {
      title: "Community Service Excellence",
      year: "2023",
      description: "Recognized for outstanding contribution to community welfare"
    },
    {
      title: "NGO Leadership Award",
      year: "2022",
      description: "Awarded for exemplary leadership in social service"
    }
  ];

  return (
    <div>
      {/* Main About Section */}
      <div className="blue-section">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center mb-3">About Chaitra Foundation</h1>
              <p className="lead text-center mb-0">
                Empowering communities through compassion and action since 2020
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mission and Vision */}
      <div className="bg-light py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h2>Our Mission</h2>
                  <p>
                    To create positive change in communities by providing essential support
                    and resources to those in need, focusing on sustainable development
                    and empowerment.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body>
                  <h2>Our Vision</h2>
                  <p>
                    A world where every individual has access to basic necessities and
                    opportunities for growth, fostering a more equitable and
                    compassionate society.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* People in Need Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5">People We Help</h2>
        <Row className="about-section">
          <Col md={6} className="about-text">
            <h3>Supporting Those in Need</h3>
            <p>
              Every day, countless individuals struggle without access to proper clothing. 
              Through your generous donations, we provide essential clothing to families 
              living in challenging circumstances, helping them maintain dignity and comfort.
            </p>
          </Col>
          <Col md={6}>
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="People in need of clothing" 
              className="img-fluid rounded about-image"
            />
          </Col>
        </Row>

        <Row className="about-section">
          <Col md={6} className="order-md-2 about-text">
            <h3>Making a Difference</h3>
            <p>
              Our clothing donation program has helped thousands of families across India. 
              We work directly with communities to ensure your donations reach those who 
              need them most, creating lasting positive impact.
            </p>
          </Col>
          <Col md={6} className="order-md-1">
            <img 
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Community impact" 
              className="img-fluid rounded about-image"
            />
          </Col>
        </Row>

        <Row className="about-section">
          <Col md={6} className="about-text">
            <h3>Join Our Cause</h3>
            <p>
              Your support makes our work possible. Whether through clothing donations 
              or financial contributions, every act of kindness helps us continue our 
              mission of serving those in need and creating positive change.
            </p>
          </Col>
          <Col md={6}>
            <img 
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Ways to help" 
              className="img-fluid rounded about-image"
            />
          </Col>
        </Row>
      </Container>

      {/* Awards and Recognition */}
      <div className="blue-section">
        <Container>
          <h2 className="text-center mb-4">Awards & Recognition</h2>
          <Row>
            {awards.map((award, index) => (
              <Col md={6} key={index} className="mb-3">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <h3 className="h5">{award.title}</h3>
                    <p className="text-muted mb-2">{award.year}</p>
                    <p className="mb-0">{award.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default About;
