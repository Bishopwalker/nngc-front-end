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
    Button
} from "@mui/material";
import {Helmet} from "react-helmet";
import {useNavigate}from "react-router-dom";
import MATTRESS from "../../assets/mattress.webp";
import LCD from "../../assets/brokenLCD.webp";
import TABLE from "../../assets/kitchenTable.webp";
import MICROWAVE from "../../assets/microwave.webp";
import COUCH from "../../assets/smallCouch.webp";
import STOVE from "../../assets/stove.webp";
import TRED from "../../assets/tredMill.webp";
import YARDDEBRIS from "../../assets/yardDebris.webp";
import CONSTRUCTION from "../../assets/construction.webp";
//import HOTUB from "../../assets/hotTub.webp";
import WASHNDRY from "../../assets/washerNdryer.webp";
import {useAppDispatch} from "../../redux/hooks";
import {changeTitle} from "../../redux/pageTitleSlice";


const products = [{name: 'Mattress Removal', description: `We will Come Pickup Your Single Item Mattress`, price: '$50.00', image: MATTRESS},
    {name: 'Appliance Removal', description: `We will Come Pickup Your Single Item Appliance < less than 50 lbs`, price: '$50.00', image: MICROWAVE},
    {name: 'Appliance Removal', description: `We will Come Pickup Your Single Item Appliance > greater than 50 lbs`, price: '$100.00', image: STOVE},
    {name: 'Couch Removal', description: `We will Come Pickup Your Single Item Furniture < less than 50 lbs`, price: '$75.00', image: COUCH},
    {name: 'Electronics Removal', description: `We will Come Pickup Your Single Item Electronics`, price: '$50.00', image: LCD},
    {name: 'Yard Waste Removal', description: `We will Come Pickup Your Yard Waste Arrival is $125, dumping the trailer is $150 each time, labor is $125 every half an hour. Min Cost is $225`, price: '$225.00 plus labor', image: YARDDEBRIS},
    {name: 'Construction Debris Removal', description: `We will Come Get Your Construction Debris. Arrival is $125, dumping trailer is $150, labor is $125 every half an hour. Min Cost is $225`, price: '$225 plus labor', image: CONSTRUCTION},
    {name: 'Hot Tub Removal', description: `We will Come Pickup Your Single Item Hot Tub`, price: '$50.00'},
    {name: 'Single Item Furniture Removal', description: `We will Come Pickup Your Single Item > greater than 50 lbs`, price: '$100.00', image: TRED},
    {name: 'Single Item Furniture Removal', description: `We will Come Pickup Your Single Item < less than 50 lbs`, price: '$50.00', image: TABLE},
    {name: 'Washer and Dryer Removal', description: `We will Come Pickup Your Washer and Dryer`, price: '100.00', image: WASHNDRY},
];

//create a product type
interface Product {
    name: string;
    description: string;
    price: string;
    image?: string;
}

function JunkRemoval() {
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const dispatch = useAppDispatch()


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

    return (
        <Container>
            <Box sx={{ flexGrow: 1, backgroundColor: 'yellow' }}>
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
                                <Button
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