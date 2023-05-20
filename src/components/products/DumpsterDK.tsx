import React, {useEffect, useState} from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import axios from "axios";

type Product = {
  message: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string[];
};

const DumpsterDK = () => {
  const [product, setProduct] = useState<Product>();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
          `http://localhost:5000/auth/stripe/products/prod_NTzwClciqi6zCh`
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct().then(r => console.log(r));
  }, []);

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
            <Button variant="contained" color="primary" sx={{ bgcolor: '#2C3E50', '&:hover': { bgcolor: '#2C3E50' } }}>
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

