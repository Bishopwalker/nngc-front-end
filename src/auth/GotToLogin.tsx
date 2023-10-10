import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {Email, Phone} from '@mui/icons-material';
import {Link} from "react-router-dom";

const GotToLogin = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                <Typography variant="h4" gutterBottom>
              Got To Login or Create an account In order to purchase
                </Typography>
                <Link to='/login' >
                    <Button variant="contained" color="primary"> Login </Button>
                </Link>
                <Typography variant="h6" textAlign="center" pb={1}>
                    <Email sx={{ color: '#26C9FF', marginRight: '0.5rem' }} />
                    Email:
                    <a href="mailto:bishop@northernneckgarbage.com" style={{ textDecoration: 'underline', color: 'inherit' }}>
                        bishop@northernneckgarbage.com
                    </a>
                </Typography>
                <Typography variant="h6" textAlign="center" pb={1} onClick={() => window.location.href = 'tel:+18042200029'}>
                    <Phone sx={{ color: '#26C9FF', marginRight: '0.5rem' }} />
                    Phone: 804-220-0029
                </Typography>
            </Box>
        </Container>
    );
};
export default GotToLogin;