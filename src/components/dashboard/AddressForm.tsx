// AddressForm.tsx
import React, {useState} from 'react';

import {Box, Button, Grid, TextField, Typography,} from "@mui/material";

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

}

const AddressForm: React.FC<AddressFormProps> = ({
                                                     handleClose,

                                                 }: AddressFormProps) => {
    const [address, setAddress] = useState<AddressResult>({
        line1: "",
        line2: "",
        city: "",
        state: "",
        postal_code: "",
        county: "",
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
       console.log(address, "Need to send this to my server endpoint");
        handleClose();
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