// src/components/Reviews.jsx

import React, {useEffect, useState} from 'react';


import {Avatar, Box, Card, CardContent, CardHeader, Typography,CardMedia} from "@mui/material";
import axios from "axios";

import {useAppDispatch} from "../../redux/hooks"
import {Helmet} from "react-helmet";


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
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(false); // New state for tracking errors

    const fetchReviews = async () => {
        try {
            const response = await axios('https://api.northernneckgarbage.com/nngc/googleReviews/getReviews');
            const data = response.data.result.reviews;
            setReviews(data);
        } catch (err) {
            console.error(err);
            setError(true); // Set error state to true if an error occurs
        }
    };

    useEffect(() => {
      //  fetchReviews().then((c)=>console.log(c));
    }, []);

    const renderStars = (rating) => {
        return [...Array(rating)].map((_, index) => <span key={index}>⭐</span>);
    };

    if (error) {
        return(
        <Box minHeight={'100px'}>
            <GoogleReviewsTitle/>
            <br/>
        <h4>
            ....error showing Google Reviews at this time</h4>
        </Box>
        )
    }

    return (
        <Box minHeight={'200px'}>
            <Helmet>
                <title>Customer Reviews for Northern Neck Garbage Collection</title>
                <meta name="keywords" content="Northern Neck Garbage Collection reviews, customer feedback, waste management services, garbage collection, junk removal, recycling services, environmental cleanliness, customer satisfaction" />
                <meta name="description" content="Read the latest Google reviews from our satisfied customers. Learn why Northern Neck Garbage Collection is a trusted name in waste management services." />
                {/* You can add more meta tags as needed */}
            </Helmet>
            <GoogleReviewsTitle/>
            {reviews.map((review, index) => (
                <Card key={index} sx={{ marginBottom: 2 }}>
                    <h1>{renderStars(review.rating)}</h1>
                    <CardHeader
                        avatar={<Avatar src={review.profile_photo_url} alt={review.author_name} />}
                        title={review.author_name}
                        subheader={review.relative_time_description}
                    />
                    <CardContent>
                        <Typography variant="body1">{review.text}</Typography>
                        <div>{renderStars(review.rating)}</div>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default Reviews;



