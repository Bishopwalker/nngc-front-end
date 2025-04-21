import React, {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Card,
    Grid,
    Container,
    CardActions,
    CardHeader,
    CardContent,
    CardMedia,
    CardActionArea,
    Modal,
    Button,
    TextField, MenuItem
} from "@mui/material";
import {Helmet} from "react-helmet";
import {useNavigate}from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {changeTitle} from "../../redux/pageTitleSlice";
import {products} from "./products";
import AddressVerificationModal from "./AddressVerificationModal";
import axios from "axios";

//create a product type
interface Product {
    name: string;
    description: string;
    price: string;
    image?: string;
    productId: string;
}

function JunkRemoval() {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1); // Default quantity
    const [isAddressVerified, setIsAddressVerified] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal's visibility
    const [verificationResult, setVerificationResult] = useState(false);

    const userInfo = useAppSelector(state => state.userInfo);

    const dispatch = useAppDispatch()

    const handleOpenAddressModal = () => {
        setIsModalOpen(true); // Open the modal
    };

    useEffect(()=>{
        dispatch( changeTitle('Junk'))
    },[])
    const handleOpen = (product:Product) => {
        setSelectedProduct(product);

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(isAddressVerified)

    async function checkoutBuy() {

        const url = !verificationResult ?
            `https://api.northernneckgarbage.com/auth/stripe/create-checkout-session/${userInfo.id}?productID=${selectedProduct && selectedProduct.productId}`
            : `https://api.northernneckgarbage.com/auth/stripe/create-checkout-session?productID=${selectedProduct && selectedProduct.productId}`;

        await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${userInfo.token}`, // if user token is stored in userInfo object
                }
            }
        ).then((response) => {
            if (response.data && response.data.message) {
                window.location.href = response.data.message; // redirects the user to the URL from the response
            }
        })
            .catch((error) => {
                console.log(error)
                if (error.response.status === 500) window.location.href = '/expired';
            })
    }

    if(verificationResult){
        checkoutBuy().then(() => setVerificationResult(false));
    }

    const handleCloseAddressModal = async() => {

        setIsModalOpen(false); // Close the modal
    };
    const handleCheckout = async () => {
        if (!userInfo.id) {

            handleOpenAddressModal();
            return;
        }
        //   navigate('/login');

        console.log('checking out');

        // Constructing the URL with the productID query parameter
        await checkoutBuy();


    }


    return (
        <Container>
            <AddressVerificationModal
                open={isModalOpen}
                onClose={handleCloseAddressModal}
                onVerificationResult={setVerificationResult}
            />
            <Box sx={{ flexGrow: 1, backgroundColor: 'yellow' }}>
            <Typography variant="subtitle1" textAlign="center" pb={1}>
                Price does not include $100 arrival fee</Typography>
                <Grid container spacing={4}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', elevation: 30, border: '1px solid #000' }}>
                                <CardActionArea onClick={() => handleOpen(product)}>
                                    {product.image && (
                                        <CardMedia
                                            component="img"
                                            image={product.image}
                                            alt={product.name}
                                            sx={{ height: '50%', objectFit: 'cover' }}
                                        />
                                    )}
                                    <CardHeader
                                        title={product.name}
                                        titleTypographyProps={{ variant: 'h6' }}
                                        subheader={product.price}
                                        subheaderTypographyProps={{ variant: 'body1', color: 'text.primary' }}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleOpen(product)}>
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
            </Box>
            {selectedProduct && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        {selectedProduct.image && (
                            <CardMedia
                                component="img"
                                height="140"
                                image={selectedProduct.image}
                                alt={selectedProduct.name}
                            />
                        )}
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {selectedProduct.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {selectedProduct.description}
                        </Typography>
                        <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                            Price: {selectedProduct.price}
                        </Typography>
                        <CardActions>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                {/*@ts-ignore*/}
                                {/*<TextField*/}
                                {/*    select*/}
                                {/*    label="Quantity"*/}
                                {/*    value={quantity}*/}
                                {/*    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(event.target.value))}*/}
                                {/*    helperText="Please select the quantity"*/}
                                {/*    variant="outlined"*/}
                                {/*    sx={{ mt: 2, minWidth: 120 }}*/}
                                {/*>*/}
                                {/*    {[...Array(10).keys()].map((option) => (*/}
                                {/*        <MenuItem key={option + 1} value={option + 1}>*/}
                                {/*            {option + 1}*/}
                                {/*        </MenuItem>*/}
                                {/*    ))}*/}
                                {/*</TextField>*/}

                                <Button
                                    onClick={handleCheckout}
                                    sx={{
                                        mt: 2,
                                        bgcolor: "#2C3E50",
                                        color: "#fff",
                                        "&:hover": {
                                            backgroundColor: "#455A64",
                                        },
                                    }}
                                    variant="contained"
                                    // onClick={handleSubmit}
                                >
                                    Schedule Pickup
                                </Button>
                                <Button onClick={handleClose}>Close</Button>
                            </Box>
                        </CardActions>
                    </Box>
                </Modal>
            )}
        </Container>
    );
}

export default JunkRemoval;