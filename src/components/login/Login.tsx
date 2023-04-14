import * as React from "react";
//@ts-ignore
import Wizard from "../../components/forms/Wizard";
// @ts-ignore
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeTitle} from "../../redux/pageTitleSlice";
import {Box, Grid, Typography} from "@mui/material";
import {Navigate} from "react-router-dom";
import {Field} from "react-final-form";

import {validateLogin} from "../../components/forms/validate";

// @ts-ignore
import WizardSignup from "../../components/forms/WizardSignup.jsx";
import axios from "axios";
import Error from "../../components/forms/Error";
import {addToken, changeUserLogInfo} from "../../redux/userLogInfoSlice";


const Login = () => {
    const user = useAppSelector(state => state.userInfo)
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        dispatch( changeTitle('Login Form'))
    },[])

    const onSubmit = async (values: any) => {

        // @ts-ignore
        window.alert("Northern Neck Garbage Thanks you for signing up, Click Log in" + JSON.stringify(values, 0, 2))
console.log(values)
        await axios.post('http://localhost:5000/auth/nngc/authenticate', values)
            .then((response) => {
                console.log('response',response)
                dispatch(changeUserLogInfo(response.data.customerDTO))
                dispatch(addToken({token: response.data.token}))

            })
            .catch((error) => {
                console.log(error)
            })

            }

    if (user.token) {
        return <Navigate to="/dashboard" />;
    }
    // @ts-ignore
    return (


    <Box mt={0} mb={4}>
        <Box pb={1} pt={0}>
            <Grid container>
                <Grid item xs={12} sm={12}>
                    <Box sx={{ maxWidth: 400, margin: 'auto', fontFamily: 'Roboto' }}>
                        <Typography variant="h4" align="center" sx={{
                            fontWeight: 'bold',
                            color: '#333',
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            Login
                        </Typography>
                        <WizardSignup
                            onSubmit={onSubmit}
                        >
    <Wizard.Page
        validate={validateLogin}
    >
        <div>
            <label>Email</label>
            <Field
                name="email"
                component="input"
                type="email"
                placeholder="Email"
            />
            <Error name="email" />
        </div>
        <div>
            <label>Password</label>
            <Field
                name="password"
                component="input"
                type="password"
                placeholder="Password"
            />
            <Error name="password" />
        </div>
    </Wizard.Page>
                        </WizardSignup>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    </Box>


    )
}
export default Login