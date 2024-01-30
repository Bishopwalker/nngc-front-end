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

const hardcodedReviews = [
    {
        author_name: "T Dickie",
        relative_time_description: "2 weeks ago",
        rating: 5,
        text: "I highly commend Northern Neck Garbage Collection for their exceptional service. Their prompt and efficient waste management solutions have consistently exceeded my expectations...",
    },
    {
        author_name: "Israel The Voice",
        relative_time_description: "2 months ago",
        rating: 5,
        text: "I recently signed up for their service, and I have been extremely satisfied and happy with the convenience and easy process of them, removing my trash from my home...",

    },
    {
        author_name: "Leslye McDade-Morrison",
        relative_time_description: "a month ago",
        rating: 5,
        text: "We cleaned out our garage and had lots to haul away. Mr. Walker did a great job, he loaded up his trailer and the bed of his truck...",

    },
    {
        author_name: "Rodney Ream",
        relative_time_description: "a week ago",
        rating: 5,
        text: "The crew is very nice and funny, I would highly recommend these guys.",

    },
    {
        author_name: "Victoria Johnson-Walker",
        relative_time_description: "a week ago",
        rating: 5,
        text: "Every Thursday he picks up my trash!!"

    }
];



const Reviews = () => {
    const renderStars = (rating) => {
        return [...Array(rating)].map((_, index) => <span key={index}>⭐</span>);
    };

    return (
        <Box minHeight={'200px'}>
            <GoogleReviewsTitle />
            {hardcodedReviews.map((review, index) => (
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