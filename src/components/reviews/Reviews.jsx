// src/components/Reviews.jsx

import React, {useEffect, useState} from 'react';


import {Avatar, Box, Card, CardContent, CardHeader, Typography,CardMedia} from "@mui/material";
import axios from "axios";

import {useAppDispatch} from "../../redux/hooks"


const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58']; // Google's brand colors

const GoogleReviewsTitle = () => {
    const title = "Latest Google Reviews";
    const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];

    return (
        <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>
            {title.split("").map((char, index) => (
                <span key={index} style={{ color: googleColors[index % googleColors.length] }}>
                    {char}
                </span>
            ))}
        </div>
    );
};
 const Reviews = () => {


     const [review, setReview] = useState([]);
     const fetchReviews = async () => {
         const response = await axios('https://api.northernneckgarbage.com/nngc/googleReviews/getReviews')
         const data = response.data.result.reviews;
         console.log(data);

         setReview(data);
     }


     useEffect(() => {

         fetchReviews().then(r => console.log('worked'));


         console.log(review)
     }, []);


         const renderStars = (rating) => {
             return [...Array(rating)].map((_, index) => (
                 <span key={index}>⭐</span>
             ));
         };
const first = review.map((reviews, index) => (
    <Card key={index} sx={{marginBottom: 2}}>

        <h1>{renderStars(reviews.rating)}</h1>

        <CardHeader
            avatar={<Avatar src={reviews.profile_photo_url} alt={reviews.author_name}/>}
            title={reviews.author_name}
            subheader={reviews.relative_time_description}

        />
        <CardContent>
            <Typography variant="body1">{reviews.text}</Typography>
            <div>{renderStars(reviews.rating)}</div>
        </CardContent>
    </Card>
        ))

     return (
         <Box minHeight={'200px'}>
                <GoogleReviewsTitle/>
             {first}

         </Box>
     )
 }

export default Reviews;



