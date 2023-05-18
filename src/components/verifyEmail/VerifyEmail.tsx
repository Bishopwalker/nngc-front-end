import React from 'react';
import { Box, Typography, CssBaseline, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const VerifyEmail = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          flexDirection: 'column',
          marginTop: '-3rem',
        }}
      >
        <img
          src="https://res.cloudinary.com/dfjg2mgcp/image/upload/v1684416264/check_email_1_uhacgv.png"
          alt="Check Email"
          style={{ width: '300px', height: 'auto', marginBottom: '2rem' }}
        />
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 700, mb: '1rem', color: '#2C3E50' }}>
          Verify Your Email
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: '2rem', whiteSpace: 'pre-line' }}>
          We have sent a verification link to your email address.{'\n'}
          Please check your email and follow the instructions to verify your account.
        </Typography>
        <Button variant="contained" color="primary" sx={{ bgcolor: '#2C3E50', '&:hover': { bgcolor: '#2C3E50' } }}>
          Resend Verification Email
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default VerifyEmail;

