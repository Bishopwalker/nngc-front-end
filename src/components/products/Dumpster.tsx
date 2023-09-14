import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Typography} from "@mui/material";
import {useAppSelector} from "../../redux/hooks";
import {useParams} from "react-router-dom";


type Product = {
    message: string;

    name: string;
    price: string;
    description: string;
    imageUrl: string[];
}
const Dumpster  = ( ) => {
    const [product, setProduct] = useState<Product>();
    const userInfo = useAppSelector(state => state.userInfo)
    const { productId } = useParams();
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
console.log(userInfo)


    const purchase_Item = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/auth/stripe/create-checkout-session_wid/res_trash_sub/${userInfo.id}`
            );

            // Step 1: Check if response.data starts with "redirect:"
            if (response.data.startsWith("redirect:")) {

                // Step 2: Remove "redirect:" from the string
                const redirectUrl = response.data.replace("redirect:", "");

                // Step 3: Use the remaining string as the URL to redirect the user
                console.log("Redirect URL:", redirectUrl);
                window.location.href = redirectUrl;
            } else {
                console.log("Redirect URL not found in response data");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };


    console.log(userInfo)
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


export default Dumpster;