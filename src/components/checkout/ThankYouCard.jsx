import React from 'react';
import {Card, Typography} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import styles from './thankyou.module.css';
import "./ballons.css"
const theme = createTheme();

const ThankYouCard = () => {
    return (

        <ThemeProvider   theme={theme}>

                <Card sx={{
                    width: '75%',
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'purple',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                    borderRadius: '15px',
                }}>
                    <Typography variant="h3" component="div" sx={{
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }} >
                        <div  className={styles.delaGothicText}>
                        Thank You For Your Purchase!!!
                        </div>

                    </Typography>
                </Card>

        </ThemeProvider>
    );
};

export default ThankYouCard;
