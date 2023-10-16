import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import {useAppSelector} from "../../redux/hooks";
import Alert, {AlertColor} from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

type Product = {
  message: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string[];
};

const DumpsterDK = () => {
  const [product, setProduct] = useState<Product>();
const { productId } = useParams();
  const userInfo = useAppSelector(state => state.userInfo);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  //console.log(userInfo);
  console.log(product)
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
          `http://localhost:8080/auth/stripe/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct().then(r => console.log(r));
  }, []);

  const handleCheckout = async () => {
    if( !userInfo.id) {
      setSnackbarSeverity('error');
      setSnackbarMessage('An error occurred. Most likely because you aren`t logged in!. Click Here to login in');
      setOpenSnackbar(true);

   //   navigate('/login');
      return;
    }
    console.log('checking out');
    try {
      // Constructing the URL with the productID query parameter
      const url = `http://localhost:8080/auth/stripe/create-checkout-session/${userInfo.id}?productID=${productId}`;
      const response = await axios.get(url, {
            headers: {
              'Authorization': `Bearer ${userInfo.token}`, // if user token is stored in userInfo object
            }
          }
      );

      // No need to clean the URL, just get the message property which should contain the URL
      if(response.data && response.data.message) {
        window.location.href = response.data.message; // redirects the user to the URL from the response
      }
    } catch (error) {
      console.log(error);
    }
  };




  return (

    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
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
      <Card sx={{ maxWidth: 500, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', pt: '2rem', mt: '-8rem' }}>
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
            Price: {product.price} USD
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                sx={{ bgcolor: '#2C3E50', '&:hover': { bgcolor: '#2C3E50' } }}>
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

