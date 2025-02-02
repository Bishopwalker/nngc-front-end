import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Typography} from "@mui/material";
import {useParams} from "react-router-dom"
import {useAppSelector} from "../../redux/hooks";


type Product = {
    message: string;

    name: string;
    price: string;
    description: string;
    imageUrl: string[];
}
// @ts-ignore
const TrashSubscription  = ( ) => {
    const [product, setProduct] = useState<Product>();
    const { productId } = useParams();

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
    const userInfo = useAppSelector(state => state.userInfo)
    //console.log(userInfo)

const purchase_Item = async () => {

            try {
                const response = await axios.post(
                    `https://api.northernneckgarbage.com/auth/stripe/create-checkout-session/{id}`
                );
            //    console.log(response.data);
            } catch (error) {
                console.log(error);

        }
}
//console.log(userInfo)
    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {userInfo.id &&  <Button onClick={purchase_Item}>Checkout</Button>}
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