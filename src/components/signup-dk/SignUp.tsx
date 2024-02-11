import React from 'react'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import StepForm from './StepForm'
import {StepsProvider} from './Context'
import GoogleSignInButton from '../google/GoogleSignInButton.jsx'
import { Helmet } from 'react-helmet'
import {useAppDispatch} from "../../redux/hooks";
import {changeTitle} from "../../redux/pageTitleSlice";
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
export default function SignUp() {
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        dispatch( changeTitle('Sign Up'))
    },[ ])
    // @ts-ignore
    return (
      <>
          <Helmet>
              <title>Sign Up - Northern Neck Garbage Collection</title>
              <meta name="description" content="Join Northern Neck Garbage Collection for reliable and eco-friendly waste management services." />
              <meta name="keywords" content="sign up, waste management, garbage collection, eco-friendly, Northern Neck" />
          </Helmet>
    <StepsProvider>
        {/*ts-ignore*/}
        {/*<GoogleSignInButton clientId={googleClientId} />*/}

        <ThemeProvider theme={theme}>
		  <CssBaseline />
		  <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
			<Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
			  <StepForm />
			</Paper>
		  </Container>
		</ThemeProvider>
    </StepsProvider>
      </>
  )
}
