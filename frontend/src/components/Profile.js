import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Form, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [donations, setDonations] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://chaitrafoundation.onrender.com/api/auth/profile', {
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
        const response = await axios.get('https://chaitrafoundation.onrender.com/api/donations/my-donations', {
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image file (JPG, JPEG, or PNG)');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setSelectedPhoto(file);
      setError(''); // Clear any previous errors
    }
  };

  const handlePhotoUpload = async () => {
    if (!selectedPhoto) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('photo', selectedPhoto);

      console.log('Uploading photo...'); // Debug log

      const response = await axios.put('https://chaitrafoundation.onrender.com/api/auth/profile-photo', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', response.data); // Debug log

      if (response.data.user && response.data.photo) {
        setProfile(prev => ({
          ...prev,
          profilePhoto: response.data.photo
        }));
        setSelectedPhoto(null);
        setError('');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError(error.response?.data?.message || 'Error uploading photo. Please try again.');
    } finally {
      setLoading(false);
    }
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
            <Col md={4} className="text-center mb-4">
              <div className="position-relative d-inline-block">
                <Image
                  src={profile.profilePhoto?.url || 'https://via.placeholder.com/150'}
                  roundedCircle
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  className="mb-3"
                />
                <div className="mt-2">
                  <Form.Group>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="mb-2"
                    />
                  </Form.Group>
                  {selectedPhoto && (
                    <Button variant="primary" onClick={handlePhotoUpload} size="sm" disabled={loading}>
                      {loading ? 'Uploading...' : 'Upload Photo'}
                    </Button>
                  )}
                  {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                  )}
                </div>
              </div>
            </Col>
            <Col md={8}>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Member Since:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
              <Button variant="danger" onClick={handleLogout} className="mt-3">
                Logout
              </Button>
            </Col>
          </Row>
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
                  <Row>
                    <Col md={donation.donationType === 'clothes' ? 8 : 12}>
                      <h5>Donation Type: {donation.donationType}</h5>
                      {donation.donationType === 'clothes' ? (
                        <>
                          <p><strong>Pickup Date:</strong> {new Date(donation.pickupDate).toLocaleDateString()}</p>
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
                        </>
                      ) : (
                        <>
                          <p><strong>Amount:</strong> ₹{donation.amount}</p>
                          <p><strong>Status:</strong> {donation.status}</p>
                          <p><strong>Date:</strong> {new Date(donation.createdAt).toLocaleDateString()}</p>
                        </>
                      )}
                    </Col>
                    {donation.donationType === 'clothes' && donation.items.some(item => item.photo) && (
                      <Col md={4}>
                        <div className="donation-photos">
                          {donation.items.map((item, index) => (
                            item.photo && (
                              <Image
                                key={index}
                                src={item.photo.url}
                                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                thumbnail
                              />
                            )
                          ))}
                        </div>
                      </Col>
                    )}
                  </Row>
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
