// GoogleSignInButton.jsx

import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleSignInButton = () => {
    const handleSignInClick = () => {
        window.location.href = 'http://localhost:8080/auth/nngc/google/login';
    };

    return (
        <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleSignInClick}
            style={{ backgroundColor: '#4285F4', color: 'white' }} // Google's color
        >
            Sign in with Google
        </Button>
    );
};

export default GoogleSignInButton;
