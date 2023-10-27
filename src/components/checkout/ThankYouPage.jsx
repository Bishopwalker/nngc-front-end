import React from 'react';
import {Box, CssBaseline, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ThankYouCard from "./ThankYouCard.jsx";
import "./ballons.css"

const theme = createTheme();

const ThankYouPage = () => {
    return (
        <div >

        <ThemeProvider theme={theme} class>
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
                <Typography variant="h6" align="center" sx={{ mb: '2rem', whiteSpace: 'pre-line' }}>
                    We appreciate your purchase of our service.{'\n'}
                    At NNGC, we are thrilled to have you as a customer and are committed to providing you with <b color="Green">DGS</b>... Dang Good Service!{'\n'}
                    Looking forward to serving you.
                </Typography>

            </Box>
        </ThemeProvider>

</div>
    );
};

export default ThankYouPage;
