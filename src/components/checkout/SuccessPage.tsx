import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const SuccessPage = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">
                Welcome Aboard, Eco-Warrior!
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Congratulations! Your email has been successfully verified and your account is now activated. Welcome to Northern Neck Garbage Collection, where we make the world a cleaner place, one pickup at a time.
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Now that you're a part of our green community, you can schedule pickups, track your waste management, and contribute to a cleaner planet. It's all just a click away!
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" component={Link} to="/dashboard">
                    Go to Dashboard
                </Button>
            </div>
        </Container>
    );
};

export default SuccessPage;
