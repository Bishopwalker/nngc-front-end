import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Checkbox from '@mui/material/Checkbox'
import {AppContext} from './Context'
import {useJsApiLoader} from "@react-google-maps/api";
import {libraries} from '../google/mapsConfig';

export default function SecondStep() {
  const { formValues, handleChange, handleBack, handleNext, variant, margin } = useContext(AppContext)
  const { city, date, phone, agreenemt, houseNumber, streetName, state, zipCode } = formValues

  const isError = useCallback(
    () =>
      Object.keys({ city, date, phone, agreenemt }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, city, date, phone, agreenemt, houseNumber, streetName, state, zipCode]
  )

  const streetNameRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Your API Key
    libraries
  });
  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (isLoaded && streetNameRef.current && window.google?.maps?.places) {
      const autocomplete = new window.google.maps.places.Autocomplete(streetNameRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'us'    },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        // Assuming you want to update the streetName when a place is selected
        console.log(place)
        if (place.formatted_address) {

          // Create an event-like object with the same structure that your handleChange function expects
          const getAddressComponent = (type: string) => {
            return place.address_components?.find(component => component.types.includes(type))?.short_name || '';
          };

          // Extract the street address, city, state, and zip code using the helper function
          const streetAddress = getAddressComponent('route');
          const localCity = getAddressComponent('locality');
          const localState = getAddressComponent('administrative_area_level_1');
          const postalCode = getAddressComponent('postal_code');

          // Update the form values using handleChange
          handleChange({ target: { name: 'streetName', value: streetAddress } });
          handleChange({ target: { name: 'city', value: localCity } });
          handleChange({ target: { name: 'state', value: localState } });
          handleChange({ target: { name: 'zipCode', value: postalCode } });

        }
      });
    }
  }, [isLoaded, streetNameRef, handleChange]);


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='House No.'
            name='houseNumber'
            placeholder='Enter your House No.'
            value={houseNumber.value}
            onChange={handleChange}
            error={!!houseNumber.error}
            helperText={houseNumber.error}
            required={houseNumber.required}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Street Name'
            name='streetName'
            placeholder='ex. Cella Haven lane...'
            value={streetName.value}
            onChange={handleChange}
            error={!!streetName.error}
            helperText={streetName.error}
            required={streetName.required}
            inputRef={streetNameRef}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='City'
            name='city'
            placeholder='Enter your City'
            value={city.value}
            onChange={handleChange}
            error={!!city.error}
            helperText={city.error}
            required={city.required}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='State'
            name='state'
            placeholder='Enter your State Name'
            value={state.value}
            onChange={handleChange}
            error={!!state.error}
            helperText={state.error}
            required={state.required}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Phone number'
            name='phone'
            placeholder='i.e: xxx-xxx-xxxx'
            value={phone.value}
            onChange={handleChange}
            error={!!phone.error}
            helperText={phone.error}
            required={phone.required}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant={variant}
            margin={margin}
            fullWidth
            label='Zip Code'
            name='zipCode'
            placeholder='i.e: xxxxx'
            value={zipCode.value}
            onChange={handleChange}
            error={!!zipCode.error}
            helperText={zipCode.error}
            required={zipCode.required}
          />
        </Grid>
        <Grid item xs={12}>
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
        <Button variant='contained' disabled={isError()} color='primary' onClick={!isError() ? handleNext : () => null}>
          Next
        </Button>
      </Box>
    </>
  )
}
