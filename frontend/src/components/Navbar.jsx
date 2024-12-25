import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            Chaitra Foundation
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
            >
              Home
            </Button>
            
            <Button
              color="inherit"
              component={RouterLink}
              to="/donate"
            >
              Donate
            </Button>
            
            <Button
              color="inherit"
              component={RouterLink}
              to="/contact"
            >
              Contact
            </Button>

            {token ? (
              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
