import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/donations/my-donations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    if (token) {
      fetchProfile();
      fetchDonations();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="py-5">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title className="mb-4">Profile Information</Card.Title>
          <Row>
            <Col md={6}>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
            </Col>
          </Row>
          <Button variant="danger" onClick={handleLogout} className="mt-3">
            Logout
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="mb-4">My Donations</Card.Title>
          {donations.length === 0 ? (
            <p>No donations yet.</p>
          ) : (
            donations.map((donation) => (
              <Card key={donation._id} className="mb-3">
                <Card.Body>
                  <p><strong>Date:</strong> {new Date(donation.pickupDate).toLocaleDateString()}</p>
                  <p><strong>Address:</strong> {donation.pickupAddress}</p>
                  <p><strong>Items:</strong></p>
                  <ul>
                    {donation.items.map((item, index) => (
                      <li key={index}>
                        {item.quantity} {item.type}
                        {item.description && ` - ${item.description}`}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
