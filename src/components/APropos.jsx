import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const APropos = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#ffffff' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#333333' }}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ color: '#555555', lineHeight: 1.6 }}>
          Welcome to our professional platform. We are dedicated to providing the best services to our clients.
          Our team of experts is here to assist you with any inquiries you may have. Feel free to explore our
          website and learn more about what we offer.
        </Typography>
        <Typography variant="body2" sx={{ color: '#777777', marginTop: 2 }}>
          "Your satisfaction is our priority."
        </Typography>
        <Typography variant="body2" sx={{ color: '#777777', marginTop: 1 }}>
          Contact us at: hissazakou@gmail.com
        </Typography>
      </Paper>
    </Box>
  );
};

export default APropos;