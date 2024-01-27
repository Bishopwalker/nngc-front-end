import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import {useAppSelector} from "../../redux/hooks";
import Alert, {AlertColor} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ARROW_BACK from "/src/assets/arrow_back.svg"
import { useTheme} from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import {Helmet} from "react-helmet";
import AddressVerificationModal from "./AddressVerificationModal";

type Product = {
  message: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string[];
};

const DumpsterDK = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const [product, setProduct] = useState<Product>();
const { productId } = useParams();
  const userInfo = useAppSelector(state => state.userInfo);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [isAddressVerified, setIsAddressVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal's visibility
  const [verificationResult, setVerificationResult] = useState(false);


  const handleOpenAddressModal = () => {
    setIsModalOpen(true); // Open the modal
  };


console.log(isAddressVerified)
  //console.log(userInfo);
  console.log(product)

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
          `https://api.northernneckgarbage.com/auth/stripe/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct().then(r => console.log(r));
  }, []);

  async function checkoutBuy() {

    const url = !verificationResult? `https://api.northernneckgarbage.com/auth/stripe/create-checkout-session/${userInfo.id}?productID=${productId}`:`https://api.northernneckgarbage.com/auth/stripe/create-checkout-session?productID=${productId}`;
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
     checkoutBuy().then(r => setVerificationResult(false));
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



console.log(verificationResult)
  return (

    <Box sx={{ padding:'20px', paddingTop:isSmallScreen?'75px':0,display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <Helmet>
        <title>Dumpster Rental Services - Northern Neck Garbage Collection</title>
        <meta name="description" content="Explore our range of Waste Management Services. Find the perfect solution for your waste management needs with Northern Neck Garbage Collection." />
        <meta name="keywords" content="dumpster rental, waste management, garbage collection, Northern Neck, recycling, environmental solutions, Northumberland County" />
      </Helmet>
      <AddressVerificationModal
          open={isModalOpen}
          onClose={handleCloseAddressModal}
          onVerificationResult={setVerificationResult}
      />

      {!isSmallScreen && <img src={ARROW_BACK}  alt="back" height={'140px'} width={'100px'} onClick={() => navigate('/services')}/>}

      <Snackbar
          open={openSnackbar}
          autoHideDuration={20000}
          onClose={() => setOpenSnackbar(false)}
      >
        <Alert
            sx={{ fontSize: '2.5rem',width: '100%' }}
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity as AlertColor}>
         <Link to='/login'> {snackbarMessage}</Link>
        </Alert>
      </Snackbar>
      {product && (
          <>
      <Card sx={{ marginTop:'20px',backgroundColor:'#c880f1', maxWidth: 500, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', pt: '2rem', mt: '-8rem' }}>
        <CardMedia
          component="img"
          src={product.imageUrl[0]}
          alt={product.name}
          sx={{ height: 200, objectFit: 'contain', margin: '0 auto' }}
        />
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom align="center">
            {product.name}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom align="center">
            {product.description}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ textAlign: 'center' }}>

            Price: ${product.price/100}.00 USD
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                sx={{ bgcolor: '#258c45', '&:hover': { bgcolor: '#be6dec' } }}>
              Get Service
            </Button>
          </Box>
        </CardContent>
      </Card>
        </>

        )}


    </Box>
  );
};

export default DumpsterDK;

