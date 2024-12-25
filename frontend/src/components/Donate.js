import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Donate = () => {
  const [formData, setFormData] = useState({
    items: [{ type: '', quantity: '', description: '' }],
    pickupAddress: '',
    pickupDate: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { type: '', quantity: '', description: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/donations', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit donation');
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
      
      <Form onSubmit={handleSubmit}>
        {formData.items.map((item, index) => (
          <div key={index} className="mb-4 p-3 border rounded">
            <h4>Item {index + 1}</h4>
            
            <Form.Group className="mb-3">
              <Form.Label>Type of Item</Form.Label>
              <Form.Control
                type="text"
                value={item.type}
                onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                placeholder="e.g., Clothes, Books, Furniture"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                placeholder="e.g., 5, 10kg, 2 boxes"
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

            {formData.items.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeItem(index)}
                className="mt-2"
              >
                Remove Item
              </Button>
            )}
          </div>
        ))}

        <Button
          variant="secondary"
          type="button"
          onClick={addItem}
          className="mb-4"
        >
          Add Another Item
        </Button>

        <Form.Group className="mb-3">
          <Form.Label>Pickup Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.pickupAddress}
            onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preferred Pickup Date</Form.Label>
          <Form.Control
            type="date"
            value={formData.pickupDate}
            onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" size="lg">
          Submit Donation
        </Button>
      </Form>
    </Container>
  );
};

export default Donate;
