import React, {useContext, useState} from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import {AppContext} from './Context'

import axios from "axios";
import {useAppDispatch} from "../../redux/hooks";
import {addToken, changeUserLogInfo} from "../../redux/userLogInfoSlice";
import {Navigate} from "react-router-dom";

export default function Confirm() {
  const { formValues, handleBack, handleNext } = useContext(AppContext)
  const { firstName, lastName, email, gender, date, city, phone, houseNumber, streetName, state, zipCode } = formValues

  const dispatch = useAppDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
	// Convert object to JSON string
	let jsonString = JSON.stringify(formValues);

	const jsonObj = JSON.parse(jsonString);
	for (const key in jsonObj) {
	  if (Object.hasOwnProperty.call(jsonObj, key)) {
		jsonObj[key] = jsonObj[key].value;
	  }
	}
	delete jsonObj.agreenemt;
	 delete jsonObj.date;
	//console.log(JSON.stringify(jsonObj, null, 2));
  const handleSubmit = () => {
    // Remove unwanted properties from formValue object
    let form = {}

    Object.keys(formValues).map((name) => {
      form = {
        ...form,
        [name]: formValues[name].value
      }
      return form
    })
    // Do whatever with the values
    //console.log(form)
    // Show last component or success message
   // handleNext()
	const values = JSON.stringify(jsonObj, null, 2);
	console.log(values);
	axios.post('https://api.mocki.io/v2/b6699541/auth/nngc/registration', values)
		.then((response) => {
		console.log('response',response)
		dispatch(changeUserLogInfo(response.data.customerDTO))
		dispatch(addToken({token: response.data.token}))
		if(response.data.token) {
			console.log(response.data.token);
		}
		setIsLoggedIn(true);
	})
	.catch((error) => {
		console.log(error)
	})

  }

  return (
    <>
      <List disablePadding>
        <ListItem>
          <ListItemText primary='First Name' secondary={firstName.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='Last Name' secondary={lastName.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='Email Address' secondary={email.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='House No.' secondary={houseNumber.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='Street Name' secondary={streetName.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='City' secondary={city.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='State' secondary={state.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='Phone' secondary={phone.value || 'Not Provided'} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary='Zip Code' secondary={zipCode.value || 'Not Provided'} />
        </ListItem>

        <Divider />
      </List>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button sx={{ mr: 1 }} onClick={handleBack}>
          Back
        </Button>
        <Button variant='contained' color='success' onClick={handleSubmit}>
          Confirm & Continue
        </Button>
      </Box>
    </>
  )
}
