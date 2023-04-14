import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Typography} from "@mui/material";


type Product = {
    message: string;

    name: string;
    price: string;
    description: string;
    imageUrl: string[];
}
const TrashSubscription  = ( ) => {
    const [product, setProduct] = useState<Product>();

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/auth/stripe/products/prod_NTexfN4Dfxy2h4`
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
        <Box display="flex" flexDirection="column" alignItems="center">
            {product && (
                <>
                    <Box mb={2}>
                        <img src={product.imageUrl[0]} alt="product" />
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h4">{product.name}</Typography>
                        <Typography>{product.description}</Typography>
                        <Typography>Price: ${parseInt(product.price) / 100}</Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default TrashSubscription;