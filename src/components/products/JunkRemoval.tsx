import React from 'react';
import {Box, Typography, Card,Grid, Container,CardActions, CardHeader, CardContent, CardMedia, CardActionArea} from "@mui/material";
import {Helmet} from "react-helmet";
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
    {name: 'Yard Waste Removal', description: `We will Come Pickup Your Single Item Yard Waste`, price: '$50.00', image: YARDDEBRIS},
    {name: 'Construction Debris Removal', description: `We will Come Pickup Your Single Item Construction Debris`, price: '$50.00', image: CONSTRUCTION},
    {name: 'Hot Tub Removal', description: `We will Come Pickup Your Single Item Hot Tub`, price: '$50.00'},
    {name: 'Single Item Furniture Removal', description: `We will Come Pickup Your Single Item > greater than 50 lbs`, price: '$100.00', image: TRED},
    {name: 'Single Item Furniture Removal', description: `We will Come Pickup Your Single Item < less than 50 lbs`, price: '$50.00', image: TABLE},
    {name: 'Washer and Dryer Removal', description: `We will Come Pickup Your Washer and Dryer`, price: '100.00', image: WASHNDRY},
];
function JunkRemoval() {
    const dispatch = useAppDispatch()
    React.useEffect(()=>{
        dispatch( changeTitle('Junk'))
    },[])
    return (
        <Container>
            <Box sx={{ flexGrow: 1, backgroundColor:'yellow' }}>
                <Grid container spacing={4}>
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', elevation: 12, border: '1px solid #000' }}>
                                <CardActionArea>
                                    {product.image && (
                                        <CardMedia
                                            component="img"
                                            image={product.image}
                                            alt={product.name}
                                            sx={{ height: '50%', objectFit: 'cover' }}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="h6" component="p" sx={{ pt: 2, color: 'primary.main', fontWeight: 'bold' }}>
                                            {product.price}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default JunkRemoval;