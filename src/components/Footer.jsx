import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" py={3} textAlign="center" bgcolor="primary.main" color="white">
      <Typography variant="body2">
        © {new Date().getFullYear()} - Lilyzakou, Tous droits réservés.
      </Typography>
    </Box>
  );
}

export default Footer;