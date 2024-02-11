import React from 'react';
import {Button, Container, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import {useAppDispatch} from "../redux/hooks.ts";
import {changeTitle} from "../redux/pageTitleSlice.ts";

const TokenExpiredPage = () => {
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        dispatch( changeTitle('Token Expired'))
    },[ ])
    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">
                Oh Snap, Time Flew By!
            </Typography>
            <Typography variant="body1" paragraph align="center">
                It seems like the token has expired. But fear not, you can log in again and continue from where you left off.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" component={Link} to="/login">
                    Log In
                </Button>
            </div>
            <Typography variant="body2" paragraph align="center" style={{ marginTop: '20px' }}>
                Need help? Feel free to <Link to="/contact">contact us</Link>, we're here to assist!
            </Typography>
        </Container>
    );
};

export default TokenExpiredPage;
