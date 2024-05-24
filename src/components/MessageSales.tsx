import React, { useState } from 'react';
import axios from 'axios';
import {Button, TextField, Box, Typography} from '@mui/material';
import Alert from "@mui/material/Alert";
import {useAppDispatch} from "../redux/hooks";
import {changeTitle} from "../redux/pageTitleSlice";

type FormData = {
    userName: string;
    userPhone: string;
    userEmail: string;
    message: string;
};

const MessageSales: React.FC = () => {
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        dispatch( changeTitle('Message Sales'))
    },[ ])
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        userPhone: '',
        userEmail: '',
        message: '',
    });
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [formKey, setFormKey] = useState(Date.now());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.northernneckgarbage.com/api/nngc/email/sendToSales', formData);
            //console.log(response.data);
            setShowSuccessAlert(true);
            // Reset form data and key
            setFormData({
                userName: '',
                userPhone: '',
                userEmail: '',
                message: '',
            });
            setFormKey(Date.now());
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            console.error('Error sending message:', error);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    return (
        <Box sx={{
            backgroundColor: '#578af5',
            width: { md: '100%', lg: '50%' },
            mx: 'auto',
            border: '2px solid black',
            borderRadius: 2,
            p: 3
        }}>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center', mb: 3, color: 'white' }}>
                Leave Us a Message
            </Typography>
            {showSuccessAlert && <Alert severity="success" sx={{ mb: 2 }}>Successful message has been sent!</Alert>}
            {showErrorAlert && <Alert severity="error" sx={{ mb: 2 }}>Error in sending message. Please try again.</Alert>}
            <Box component="form" key={formKey} onSubmit={handleSubmit} noValidate
                 sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="User Name"
                    name="userName"
                    autoFocus
                    onChange={handleChange}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            },
                            '&:hover fieldset': {
                                borderColor: 'black'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black'
                            }
                        }
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="User Phone"
                    name="userPhone"
                    onChange={handleChange}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            },
                            '&:hover fieldset': {
                                borderColor: 'black'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black'
                            }
                        }
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="User Email"
                    name="userEmail"
                    type="email"
                    onChange={handleChange}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            },
                            '&:hover fieldset': {
                                borderColor: 'black'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black'
                            }
                        }
                    }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    onChange={handleChange}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 1,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black',
                            },
                            '&:hover fieldset': {
                                borderColor: 'black'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'black'
                            }
                        }
                    }}
                />
                <Button type="submit" fullWidth variant="contained"
                        sx={{mt: 3, mb: 2, backgroundColor: '#1976d2', '&:hover': {backgroundColor: '#115293'}}}>
                    Send to Sales
                </Button>
            </Box>
        </Box>
    );
}

export default MessageSales;
