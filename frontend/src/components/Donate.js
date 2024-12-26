import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Card, Nav, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Donate = () => {
  const [donationType, setDonationType] = useState('clothes');
  const [formData, setFormData] = useState({
    items: [{ type: '', quantity: '', description: '', photo: null }],
    pickupAddress: '',
    pickupDate: ''
  });
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const profile = JSON.parse(localStorage.getItem('profile'));

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const handlePhotoChange = (index, e) => {
    const file = e.target.files[0];
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], photo: file };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { type: '', quantity: '', description: '', photo: null }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmitClothes = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('pickupAddress', formData.pickupAddress);
      formDataToSend.append('pickupDate', formData.pickupDate);

      // Filter out items without photos
      const itemsWithoutPhotos = formData.items.map(({ photo, ...item }) => item);
      formDataToSend.append('items', JSON.stringify(itemsWithoutPhotos));

      // Add photos separately
      formData.items.forEach((item, index) => {
        if (item.photo) {
          formDataToSend.append('photos', item.photo);
        }
      });

      const response = await axios.post('http://localhost:5000/api/donations/clothes', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.donation) {
        navigate('/profile');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit clothes donation');
    } finally {
      setLoading(false);
    }
  };

  const handleFundDonation = async (e) => {
    e.preventDefault();
    
    if (!token) {
      navigate('/login');
      return;
    }

    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount < 1) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const orderResponse = await axios.post(
        'http://localhost:5000/api/donations/fund/create-order',
        { amount: donationAmount },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const { orderId, amount: orderAmount, currency } = orderResponse.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency: currency,
        name: 'Chaitra Foundation',
        description: 'Donation',
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              'http://localhost:5000/api/donations/fund/verify',
              {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount: orderAmount
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            if (verifyResponse.data.donation) {
              setSuccess('Thank you for your donation!');
              setAmount('');
              setTimeout(() => {
                navigate('/profile');
              }, 2000);
            }
          } catch (error) {
            setError(error.response?.data?.message || 'Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: profile?.name || '',
          email: profile?.email || '',
          contact: profile?.phone || ''
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();

      razorpayInstance.on('payment.failed', function (response) {
        setError('Payment failed: ' + response.error.description);
        setLoading(false);
      });

    } catch (error) {
      setError(error.response?.data?.message || 'Error processing donation. Please try again.');
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please <Alert.Link href="/login">login</Alert.Link> to make a donation.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Make a Donation</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="clothes">
            <Nav.Item>
              <Nav.Link 
                eventKey="clothes" 
                onClick={() => setDonationType('clothes')}
                active={donationType === 'clothes'}
              >
                Donate Clothes
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="fund" 
                onClick={() => setDonationType('fund')}
                active={donationType === 'fund'}
              >
                Donate Funds
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {donationType === 'clothes' ? (
            <Form onSubmit={handleSubmitClothes}>
              {formData.items.map((item, index) => (
                <div key={index} className="mb-4 p-3 border rounded">
                  <Row>
                    <Col md={10}>
                      <h4>Item {index + 1}</h4>
                    </Col>
                    <Col md={2} className="text-end">
                      {index > 0 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Type of Item</Form.Label>
                    <Form.Control
                      type="text"
                      value={item.type}
                      onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                      placeholder="e.g., Shirts, Pants, Dresses"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      placeholder="e.g., 5, 10"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description (Optional)</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      placeholder="Additional details about the item"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoChange(index, e)}
                    />
                  </Form.Group>

                  {item.photo && (
                    <Image
                      src={URL.createObjectURL(item.photo)}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      thumbnail
                    />
                  )}
                </div>
              ))}

              <Button variant="secondary" onClick={addItem} className="mb-4">
                Add Another Item
              </Button>

              <Form.Group className="mb-3">
                <Form.Label>Pickup Address</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  placeholder="Enter your address for pickup"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Preferred Pickup Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Clothes Donation'}
              </Button>
            </Form>
          ) : (
            <Form onSubmit={handleFundDonation}>
              <Form.Group className="mb-4">
                <Form.Label>Donation Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount in INR"
                  min="1"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Proceed to Pay'}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Donate;
