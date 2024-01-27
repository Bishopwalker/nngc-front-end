import React from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import AdminStepForm  from './AdminStepForm'
import {StepsProvider} from './Context'
import GoogleSignInButton from '../google/GoogleSignInButton.jsx'

const theme = createTheme({
    typography: {
        fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
        fontSize: 14,
    },
    palette: {
        primary: {
            main: '#2C3E50',
        },
    },
});

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string
export default function AdminSignUp() {
    // @ts-ignore
    return (
        <>
            <StepsProvider>
                {/*ts-ignore*/}
                {/*<GoogleSignInButton clientId={googleClientId} />*/}

                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
                        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                            <AdminStepForm />
                        </Paper>
                    </Container>
                </ThemeProvider>
            </StepsProvider>
        </>
    )
}
