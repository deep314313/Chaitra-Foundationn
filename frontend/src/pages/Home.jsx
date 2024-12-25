import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
}));

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          Welcome to Chaitra Foundation
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 6 }}>
          Making a difference through clothing donations
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Our Mission
              </Typography>
              <Typography>
                To provide clothing to those in need and promote sustainable fashion practices
                through donation and recycling.
              </Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                How It Works
              </Typography>
              <Typography>
                Register, schedule a pickup, and we'll collect your clothing donations.
                It's that simple to make a difference!
              </Typography>
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <StyledPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Impact
              </Typography>
              <Typography>
                Your donations help families in need while reducing textile waste
                and promoting environmental sustainability.
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>

        <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">
            Join Us in Making a Difference
          </Typography>
          <Typography align="center">
            Every piece of clothing you donate can change someone's life.
            Start making a difference today by registering and scheduling your first donation.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
