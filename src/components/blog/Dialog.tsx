import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ExampleDialog() {
    // State to manage Dialog's open state
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNavigate = () => {
        window.location.href = 'https://www.northernneckchristian.org/';
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '2rem',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    margin: '0rem 0 2rem 0',
                    color: '#2d3436',
                    fontFamily: 'Montserrat, sans-serif',
                }}
            >
                Sponsored by,
            </Typography>
            <img
                width="250"
                alt="https://www.northernneckchristian.org/"
                src="/src/assets/nncs.jpg"
                onClick={handleClickOpen}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Northern Neck Christian School</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Northern Neck Christian School follows traditional Christian values, and teaches the children self-confidence while walking hand in hand with Christ.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleNavigate}>
                        Visit Site
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}