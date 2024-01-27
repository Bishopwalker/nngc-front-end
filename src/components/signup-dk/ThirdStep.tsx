import React, { useContext, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from './Context';
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import {Typography} from "@mui/material";

export default function ThirdStep() {
    const { formValues, handleChange, handleBack, handleNext, variant, margin } = useContext(AppContext);
    const { service,isBusiness, agreenemt } = formValues;

    const isError = useCallback(
        () => !service.value || !!service.error,
        [service]
    );

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isBusiness.value}
                                onChange={handleChange}
                                name='isBusiness'
                                color='primary'
                                required={isBusiness.required}
                            />
                        }
                        label='Commerical Customer'
                    />
                    <FormHelperText error={!!isBusiness.error}>{isBusiness.error}</FormHelperText>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant={variant}
                        margin={margin}
                        fullWidth
                        select
                        SelectProps={{ native: true }}
                        label='Choose A Service'
                        name='service'
                        value={service.value}
                        onChange={handleChange}
                        error={!!service.error}
                        helperText={service.error}
                        required
                    >
                        <option value=''></option>
                        <option value='junk_removal'>Junk Removal</option>
                        <option value='weekly_trash'>Weekly Trash</option>
                        <option value='weekly_trash_recycling'>Weekly Trash w/ Recycling</option>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
                        By signing up you agree to be billed monthly until you cancel your service.
                        There is no contract, cancel anytime. Customer must cancel 30 days in advance.
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreenemt.value}
                                onChange={handleChange}
                                name='agreenemt'
                                color='primary'
                                required={agreenemt.required}
                            />
                        }
                        label='Agree to terms and conditions'
                    />
                    <FormHelperText error={!!agreenemt.error}>{agreenemt.error}</FormHelperText>
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                    Back
                </Button>
                <Button
                    variant='contained'
                    disabled={isError()}
                    color='primary'
                    onClick={!isError() ? handleNext : () => null}
                >
                    Next
                </Button>
            </Box>
        </>
    );
}
