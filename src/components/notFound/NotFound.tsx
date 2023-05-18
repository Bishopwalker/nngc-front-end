import React from 'react';
import { Box, Typography, CssBaseline, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const NotFound = () => {
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
          src="https://res.cloudinary.com/dfjg2mgcp/image/upload/v1684412816/rsz_untitled_design_9_1_fgwr5v.png"
          alt="404 Error"
          style={{ width: '300px', height: 'auto', marginBottom: '2rem' }}
        />
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 700, mb: '1rem', color: '#2C3E50' }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: '2rem', whiteSpace: 'pre-line' }}>
          It looks like you took a wrong turn somewhere.{'\n'}
          Don't worry, our dumpster rental service is here to help you clean up the mess{'\n'}
          and get you back on the right path!
        </Typography>
        <Button variant="contained" color="primary" sx={{ bgcolor: '#2C3E50', '&:hover': { bgcolor: '#2C3E50' } }}>
          Return to Homepage
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default NotFound;

