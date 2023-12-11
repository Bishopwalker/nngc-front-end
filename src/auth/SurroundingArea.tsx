import React from 'react';
import {Box, Button, Container, Typography} from '@mui/material';
import {Email, Phone} from '@mui/icons-material';
import MessageSales from '../components/MessageSales';
import {Link} from "react-router-dom";


const SurroundingAreas = () => {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: '#f4f4f4',
                    padding: '2rem',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginTop: '2rem'
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                    Just Outside Our Normal Service Area
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', marginBottom: '1rem' }}>
                    You're just outside of our normal service area, but we've got you covered. Reach out to us for special rates!
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333' }}>
                        <Email color="primary" />
                        <Link to="mailto:sales@northernneckgarbage.com" color="secondary">
                            sales@northernneckgarbage.com
                        </Link>
                    </Typography>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333' }}>
                        <Phone color="primary" />
                        <span>804-220-0029</span>
                    </Typography>
                </Box>

                <Button variant="contained" color="primary" href="mailto:bishop@northernneckgarbage.com">
                    Contact Us
                </Button>

                <Box sx={{ marginTop: '2rem', width: '100%' }}>
                    <MessageSales />
                </Box>
            </Box>
        </Container>
    );
};

export default SurroundingAreas;