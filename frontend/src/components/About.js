import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
  const awards = [
    {
      year: '2023',
      title: 'Excellence in Social Impact',
      organization: 'National NGO Foundation',
      description: 'Recognized for outstanding contribution to community welfare through clothing donation initiatives'
    },
    {
      year: '2022',
      title: 'Best Sustainable Practices',
      organization: 'Green Earth Initiative',
      description: 'Awarded for implementing eco-friendly practices in clothing collection and distribution'
    },
    {
      year: '2021',
      title: 'Community Service Excellence',
      organization: 'State Government',
      description: 'Honored for exceptional service during the COVID-19 pandemic'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded with a mission to provide dignity through clothing' },
    { year: '2021', event: 'Expanded operations to 3 states' },
    { year: '2022', event: 'Reached 25,000+ beneficiaries' },
    { year: '2023', event: 'Established presence in 7 states with 100+ collection centers' }
  ];

  return (
    <div className="about-page">
      {/* Mission Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h1 className="display-4 mb-4">Our Mission</h1>
              <p className="lead">
                To provide dignity and hope to underprivileged communities through clothing donations,
                while promoting sustainable practices and community engagement.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Vision and Values */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h4 className="text-primary">Our Vision</h4>
                <p>
                  To create a world where every individual has access to dignified clothing,
                  promoting self-respect and confidence in communities across India.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h4 className="text-primary">Our Values</h4>
                <ul className="list-unstyled">
                  <li>✦ Dignity for All</li>
                  <li>✦ Sustainable Practices</li>
                  <li>✦ Community First</li>
                  <li>✦ Transparency</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body>
                <h4 className="text-primary">Our Impact</h4>
                <p>
                  Through our initiatives, we've touched the lives of over 50,000 individuals,
                  providing not just clothing but hope and dignity.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Awards and Recognition */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Awards & Recognition</h2>
          <Row className="g-4">
            {awards.map((award, index) => (
              <Col key={index} md={4}>
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-3">
                      <div className="award-year bg-primary text-white rounded-circle p-2 me-3">
                        <h5 className="mb-0">{award.year}</h5>
                      </div>
                      <h4 className="mb-0">{award.title}</h4>
                    </div>
                    <p className="text-muted mb-2">{award.organization}</p>
                    <p className="mb-0">{award.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Our Journey */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Our Journey</h2>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <Row key={index} className="mb-4">
              <Col md={2} className="text-end">
                <h5 className="text-primary">{milestone.year}</h5>
              </Col>
              <Col md={10}>
                <div className="ps-3 border-start border-primary">
                  <p className="mb-0">{milestone.event}</p>
                </div>
              </Col>
            </Row>
          ))}
        </div>
      </Container>

      {/* Impact Stories */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Impact Stories</h2>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h4>Supporting Education</h4>
                  <p>
                    "Through the School Uniform Program, we've helped 10,000+ students continue their
                    education with dignity. Many families couldn't afford proper uniforms, leading to
                    dropouts. Our program has helped reduce the dropout rate by 60% in partner schools."
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h4>Emergency Relief</h4>
                  <p>
                    "During the 2023 flood relief operations, we provided immediate clothing support to
                    5000+ affected families across Kerala and Karnataka. Our quick response team was
                    able to reach remote areas within 48 hours of the disaster."
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default About;
