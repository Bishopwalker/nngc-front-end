import React, {useEffect, useState} from 'react';
import {Box, Button, CssBaseline, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ThankYouCard from "./ThankYouCard.jsx";
import "./ballons.css"

const theme = createTheme();

const Balloon = ({ color, left }) => (
    <div className={`balloon ${color}`} style={{ left: `${left}%` }}></div>
);

const ThankYouPage = () => {
    const [balloonCount, setBalloonCount] = useState(0);
    const [showBalloons, setShowBalloons] = useState(true);
    const balloonColors = ['red', 'blue', 'green', 'yellow'];

    useEffect(() => {
        let interval;
        if (showBalloons) {
            interval = setInterval(() => {
                setBalloonCount(prevCount => prevCount + 1);
            }, 300);
        }
        return () => clearInterval(interval);
    }, [showBalloons]);

    const balloons = Array.from({ length: balloonCount }, (_, index) => ({
        color: balloonColors[index % balloonColors.length],
        left: Math.random() * 100
    }));

    const handleToggleBalloons = () => {
        if (showBalloons) {
            setBalloonCount(0);
        }
        setShowBalloons(!showBalloons);
    };
    return (
        <Box className="balloon-container">

            { balloons.map((balloon, index) => (
                <Balloon key={index} color={balloon.color} left={balloon.left} />
            ))}

        <ThemeProvider  theme={theme}>
            <CssBaseline />
            <Box

                 sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '50vh',
                    flexDirection: 'column',
                    marginTop: '-3rem',
                }}
            >

                <ThankYouCard/>
                <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 700, mb: '1rem', color: '#2C3E50' }}>
                    Thank You From Northern Neck Garbage Collection!
                </Typography>
                <Typography variant="h5" align="center" sx={{ mb: '2rem', whiteSpace: 'pre-line',color:"#d2ba23" }}>
                    We appreciate your purchase of our service.{'\n'}
                    At NNGC, we are thrilled to have you as a customer and are committed to providing you with <b id='green'  >DGS</b>... Dang Good Service!{'\n'}

                </Typography>
                <Typography variant="h5" align="center"  sx={{ color:'#3bce69', mb: '2rem', whiteSpace: 'pre-line' }}>
                    For Faster Checkout in the future, please create an account.{'\n'}  If this is the first time all you have to do is go to the email address you entered to purchase and click our link
                 to verify your email address.{'\n'} Afterwards your login info will be your email and your password will be your phone number. 10 digits no spaces.{'\n'} You can log in to update your billing, change your address or add addtional service.
                </Typography>
                <Typography variant="h5" align="center" sx={{ mb: '2rem',color:"#d2ba23" }}>
                   Username:  <b id='green' >YourEmail.com{'\n'}</b>
                </Typography>
                <Typography variant="h5" align="center" sx={{ mb: '2rem',color:"#d2ba23" }}>
                     Password:<b id='green'> YourPhoneNumber (1112223333)</b>

                </Typography>
            </Box>
            <Button
                variant='contained'
                color='primary'
                onClick={handleToggleBalloons}
            >
                {showBalloons ? 'Stop Balloons' : 'Start Balloons'}
            </Button>
        </ThemeProvider>

</Box>
    );
};

export default ThankYouPage;
