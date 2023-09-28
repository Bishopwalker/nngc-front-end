import React, {useEffect, useState} from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import axios from "axios";

import {useAppSelector} from "../../redux/hooks";

type Product = {
  message: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string[];
};

const DumpsterDK = () => {
  const [product, setProduct] = useState<Product>();

  const userInfo = useAppSelector(state => state.userInfo);
  console.log(userInfo);
  console.log(product)
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
          `http://3.85.8.238:5000/auth/stripe/products/prod_NTzwClciqi6zCh`
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
    if(!product || !userInfo) {
      console.error("No product or user info found");
      return;
    }
console.log('checking out')
    try {
      const response = await axios.get(
          `http://3.85.8.238:5000/auth/stripe/create-checkout-session_wid/dumpster/${userInfo.id}`, {
            headers: {
              'Authorization': `Bearer ${userInfo.token}`, // if user token is stored in userInfo object
            }
          }
      );

        const cleanUrl = response.data.replace('redirect:','');
      if(response.data) {
        window.location.href = cleanUrl; // redirects the user to the URL from the response
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (

    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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

