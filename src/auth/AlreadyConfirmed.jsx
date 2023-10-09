import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const AlreadyConfirmedPage = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">
                Oh, We've Met Before!
            </Typography>
            <Typography variant="body1" paragraph align="center">
                It seems like you already have an account with Northern Neck Garbage Collection. No worries, we can pick up right where we left off.
            </Typography>
            <Typography variant="body1" paragraph align="center">
                Log in to manage your pickups, check your recycling stats, and continue your journey towards a greener planet. Yea I made recycling stats up,
                what would that even look like?
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Log In
                </Button>
            </div>
            <Typography variant="body2" paragraph align="center" style={{ marginTop: '20px' }}>
                Forgot your password? Oops, <Link to="/help">Click here to go to another page to get help</Link>.
            </Typography>
        </Container>
    );
};

export default AlreadyConfirmedPage;
