import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const clothingTypes = [
  'Shirts',
  'Pants',
  'Dresses',
  'Shoes',
  'Accessories',
  'Children\'s Clothing',
  'Winter Wear',
  'Other'
];

function Donate() {
  const [items, setItems] = useState([{ type: '', quantity: '', description: '' }]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { type: '', quantity: '', description: '' }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/donations',
        {
          items,
          pickupAddress,
          pickupDate
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      toast.success('Donation registered successfully! You will receive a confirmation email and SMS.');
      setItems([{ type: '', quantity: '', description: '' }]);
      setPickupAddress('');
      setPickupDate('');
    } catch (error) {
      toast.error('Failed to register donation. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" gutterBottom align="center">
          Donate Clothes
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            {items.map((item, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Clothing Type"
                    value={item.type}
                    onChange={(e) => handleItemChange(index, 'type', e.target.value)}
                    required
                  >
                    {clothingTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <Button
                    color="error"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            ))}

            <Button
              variant="outlined"
              onClick={addItem}
              sx={{ mb: 3 }}
            >
              Add More Items
            </Button>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pickup Address"
                  multiline
                  rows={3}
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Pickup Date & Time"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              fullWidth
            >
              Schedule Donation Pickup
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Donate;
