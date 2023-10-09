import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import {Email, Phone} from '@mui/icons-material';

const Help = () => {
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
                    Need Assistance?
                </Typography>
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

export default Help;
