// AddressForm.tsx
import React, {useState} from 'react';

import {Box, Button, Grid, TextField, Typography,} from "@mui/material";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeUserLogInfo} from "../../redux/userLogInfoSlice";

export interface AddressResult {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postal_code: string;
    county: string;
}

interface AddressFormProps {
    handleClose: () => void;
    token: string;

}

const AddressForm: React.FC<AddressFormProps> = ({
                                                     handleClose,token

                                                 }: AddressFormProps) => {
    const [address, setAddress] = useState<AddressResult>({
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        county: "",
    });
const dispatch = useAppDispatch();
    function transformAddress(address: AddressResult) {
        // Step 2: Split originalAddress.line1 on space character into parts
        const parts = address.line1.split(' ');

        // Step 3: Take the first part as houseNumber
        const houseNumber = parts[0];

        // Step 4: Join the remaining parts as streetName
        const streetName = parts.slice(1).join(' ');

        // Step 5: Create a new object with houseNumber, streetName, and other properties from originalAddress
        // Step 6: Return the new object
        return {
            houseNumber: houseNumber,
            streetName: streetName,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            county: address.county,
        };
    }

// Usage

const userInfo = useAppSelector((state) => state.userInfo);
    const handleSubmit  = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const transformedAddress = transformAddress(address);
     //  console.log(address, "Need to send this to my server endpoint");
       console.log(transformedAddress, "Need to send this to my server endpoint")
 const customer = {
         id: userInfo.id,
           firstName: userInfo.fullName.split(' ')[0],
              lastName: userInfo.fullName.split(' ')[1],
                 email: userInfo.email,
           houseNumber:transformedAddress.houseNumber,
              streetName:transformedAddress.streetName,
                 city: transformedAddress.city,
                 state: transformedAddress.state,
     zipCode: transformedAddress.postal_code,
 }
        try {
           console.log(customer)
            const response = await axios.put(
                `https://localhost:8080/api/nngc/customers/${userInfo.id}`,
                customer,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (response.data) {
                console.log(response.data);
                dispatch(changeUserLogInfo(response.data));
                handleClose();
            } else {
                // Handle the error message from the API response
                console.error(response.data.message);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An error occurred:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Shipping address
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="line1"
                        name="line1"
                        label="Address line 1"
                        fullWidth
                        autoComplete="shipping address-line1"
                        value={address.line1}
                        onChange={(e) =>
                            setAddress({ ...address, line1: e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="line2"
                        name="line2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        value={address.line2}
                        onChange={(e) =>
                            setAddress({ ...address, line2: e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        value={address.state}
                        onChange={(e) =>
                            setAddress({ ...address, state: e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        value={address.postal_code}
                        onChange={(e) =>
                            setAddress({ ...address, postal_code: e.target.value })
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save Address
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}
                            sx={{ marginLeft: 1 }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddressForm;