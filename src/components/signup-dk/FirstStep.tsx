import React, {useCallback, useContext} from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {AppContext} from './Context'
import Snackbar from '@mui/material/Snackbar'
import Alert, {AlertColor} from '@mui/material/Alert'

export default function FirstStep() {

  const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const [snackbarMessage, setSnackbarMessage] = React.useState('')

  const { formValues, handleChange, handleNext, variant, margin, warning } = useContext(AppContext)
  const { firstName, lastName, email, county, password } = formValues

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ firstName, lastName, email, county, password }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, firstName, lastName, email, county, password]
  )

  //Show warning message when the county is not northumberland
  React.useEffect(() => {
    if(warning){
setSnackbarMessage(warning)
        setOpenSnackbar(true)
    }
  },[warning])

  return (
    <>
        <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
        >
            <Alert onClose={() => setOpenSnackbar(false)} severity="warning">
                {snackbarMessage}
            </Alert>
        </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            select
            SelectProps={{
              native: true
            }}
            label='county'
            name='county'
            value={county.value}
            onChange={handleChange}
            error={!!county.error}
            helperText={county.error}
            required={county.required}
          >
            <option value=''> </option>
            <option value='northumberland'>Northumberland County</option>
            <option value='lancaster'>Lancaster County</option>
            <option value='richmond'>Richmond County</option>
            <option value='westmoreland'>Westmoreland County</option>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='First Name'
            name='firstName'
            placeholder='Your first name'
            value={firstName.value}
            onChange={handleChange}
            error={!!firstName.error}
            helperText={firstName.error}
            required={firstName.required}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Last Name'
            name='lastName'
            placeholder='Your last name'
            value={lastName.value}
            onChange={handleChange}
            error={!!lastName.error}
            helperText={lastName.error}
            required={lastName.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Email'
            name='email'
            placeholder='Your email address'
            type='email'
            value={email.value}
            onChange={handleChange}
            error={!!email.error}
            helperText={email.error}
            required={email.required}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Password'
            name='password'
            placeholder='Your password'
            type='password'
            value={password.value}
            onChange={handleChange}
            error={!!password.error}
            helperText={password.error}
            required={password.required}
          />
        </Grid>

      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color='primary'
          onClick={!isError() ? handleNext : () => null}
        >
          Next
        </Button>
      </Box>
    </>
  )
}
