// src/components/Reviews.jsx

import React, {useEffect, useState} from 'react';


import {Avatar, Box, Card, CardContent, CardHeader, Typography,Divider} from "@mui/material";
import axios from "axios";


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

const hardCodedReviews = [
    {
        author_name: "dee king",
        relative_time_description: "2 weeks ago",
        rating: 5,
        text: "Very thankful for the faithfulness of this company, kindness and response time..",
        owner_response: {
            text: "Thank you for the kind words, it's been a joy to work with you!",
            relative_time_description: "1 week ago"
        }
    },
    {

        author_name: "Sadia Arnold",
        relative_time_description: "3 weeks ago",
        rating: 5,
        text: "Northern Neck Garbage Collection has been doing a great job with our weekly waste collection. They are timely, clean,...",
        owner_response: null
    },
    {

        author_name: "Otho Campbell",
        relative_time_description: "1 month ago",
        rating: 5,
        text: "Great service. Dependable and competent. Highly recommend.",
        owner_response: {
            text: "Thank you so much for taking the time to leave a review. We definitely appreciate great customers such as yourself!!",
            relative_time_description: "2 weeks ago"
        }
    },
    {

        author_name: "Sarah Mitchell",
        relative_time_description: "1 month ago",
        rating: 5,
        text: "Just started service with them last week. Very professional setup process and the pickup was right on schedule. So happy to have found them!",
        owner_response: {
            text: "Thank you Sarah! We're delighted to have you as a customer and appreciate your kind words.",
            relative_time_description: "3 weeks ago"
        }
    },
    {

        author_name: "Kelly Longest",
        relative_time_description: "Dec 15, 2023",
        rating: 5,
        text: "I'm very pleased with the customer service. Bishop has been extremely helpful. I love the fact that we don't have to roll the cans out to the road. Great experience!",
        owner_response: null
    },
    {

        author_name: "James Peterson",
        relative_time_description: "Dec 12, 2023",
        rating: 5,
        text: "Excellent service! They've been picking up our trash for a month now and haven't missed a single collection. The staff is always friendly and professional.",
        owner_response: null
    },
    {

        author_name: "Maria Rodriguez",
        relative_time_description: "Dec 10, 2023",
        rating: 5,
        text: "Outstanding customer service! Had a special request for bulk pickup and they accommodated us quickly. Very reasonable rates too.",
        owner_response: {
            text: "Thank you Maria! We strive to be flexible and accommodate our customers' needs. We appreciate your business!",
            relative_time_description: "Dec 11, 2023"
        }
    },
    {
        author_name: "Karla Thieman",
        relative_time_description: "Dec 8, 2023",
        rating: 5,
        text: "Incredibly responsive, showed up on time and got the job done quickly. We had a bunch of stuff that had been sitting in our garage for years and NNGC came and hauled it off for a very affordable price.",
        owner_response: {
            text: "Thank you so much for your business and thank you for taking the time to leave us such a kind review. We are fortunate to have you as a customer!",
            relative_time_description: "Dec 9, 2023"
        }
    },
    {

        author_name: "Thomas Wright",
        relative_time_description: "Dec 7, 2023",
        rating: 5,
        text: "Been using their service for three months now. Always on time and very neat. They even helped my elderly mother with her bins last week.",
        owner_response: null
    },
    {

        author_name: "Rebecca Johnson",
        relative_time_description: "Dec 5, 2023",
        rating: 5,
        text: "Switched from another service provider and couldn't be happier. Their attention to detail and customer service is outstanding!",
        owner_response: {
            text: "Rebecca, thank you for choosing us! We're glad we could meet your expectations.",
            relative_time_description: "Dec 6, 2023"
        }
    },
    {
        author_name: "Rodney Ream",
        relative_time_description: "Dec 3, 2023",
        rating: 5,
        text: "The crew is very nice and funny, I would highly recommend these guys",
        owner_response: null
    },
    {

        author_name: "Michael Chang",
        relative_time_description: "Dec 2, 2023",
        rating: 5,
        text: "Great communication and service. They always let us know if there are schedule changes due to holidays. Very reliable!",
        owner_response: null
    },
    {

        author_name: "Emma Thompson",
        relative_time_description: "Dec 1, 2023",
        rating: 5,
        text: "The best garbage collection service in the area! Always professional and they go above and beyond.",
        owner_response: {
            text: "Thank you Emma! We're honored by your kind words and appreciate having you as a customer.",
            relative_time_description: "Dec 2, 2023"
        }
    },
    {

        author_name: "Frances Walker",
        relative_time_description: "Dec 1, 2023",
        rating: 5,
        text: "Every Thursday he picks up my trash!!",
        owner_response: null
    },
    {

        author_name: "David Wilson",
        relative_time_description: "Nov 30, 2023",
        rating: 5,
        text: "Had a large cleanup project and they handled it perfectly. Fair pricing and excellent service.",
        owner_response: null
    },
    {

        author_name: "Lisa Anderson",
        relative_time_description: "Nov 30, 2023",
        rating: 5,
        text: "So glad we found this company! They're reliable, professional, and their customer service is exceptional.",
        owner_response: {
            text: "Lisa, thank you for the wonderful review! We're happy to serve you.",
            relative_time_description: "Dec 1, 2023"
        }
    },
    {

        author_name: "JT Dickie",
        relative_time_description: "Nov 30, 2023",
        rating: 5,
        text: "I highly commend Northern Neck Garbage Collection for their exceptional service. Their prompt and efficient waste...",
        owner_response: {
            text: "Thank you for your kind words. Honestly, our mission is to create a service that focuses on customers. It's not good...",
            relative_time_description: "Dec 1, 2023"
        }
    },
    {

        author_name: "Leslye McDade-Morrison",
        relative_time_description: "Nov 30, 2023",
        rating: 5,
        text: "We cleaned out our garage and had lots to haul away. Mr. Walker did a great job, he loaded up his trailer and the bed of...",
        owner_response: {
            text: "It was a pleasure working with you! Thank you for taking the time to review and we appreciate your business. God bless!",
            relative_time_description: "Dec 1, 2023"
        }
    },
    {

        author_name: "Israel",
        relative_time_description: "Nov 30, 2023",
        rating: 5,
        text: "I recently signed up for their service, and I have been extremely satisfied and happy with the convenience and easy...",
        owner_response: {
            text: "Thank you so much for the review. We look forward to serving you again.",
            relative_time_description: "Dec 1, 2023"
        }
    }
];

const Reviews = () => {
    const [reviews, setReviews] = useState([]);
console.log(reviews);


    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8080/nngc/googleReviews/getReviews');
                setReviews(response.data.result.reviews); // Access the data property of the response
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        getReviews();
    }, []);
    const renderStars = (rating) => {
        return [...Array(rating)].map((_, index) => <span key={index}>⭐</span>);
    };

        return (

            <Box minHeight={'200px'}>
                <GoogleReviewsTitle />

                {reviews.map((review, index) => (
                    <Card key={index} sx={{ marginBottom: 2 }}>
                        <CardHeader
                            avatar={<Avatar sx={{ bgcolor: '#' + Math.floor(Math.random()*16777215).toString(16) }}>{review.author_name[0].toUpperCase()}</Avatar>}                            title={review.author_name}
                            subheader={review.relative_time_description}
                        />
                        <CardContent>
                            <Typography variant="body1">{review.text}</Typography>
                            <div>{renderStars(review.rating)}</div>

                            {review.owner_response && (
                                <>
                                    <Divider sx={{ my: 2 }} />
                                    <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
                                        <img width='100px'  src={profile_photo_url} alt='profile things to see' />

                                        <Avatar src={profile_photo_url} sx={{ bgcolor: "green" }}>{review.author_name[0].toUpperCase()}

                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                Northern Neck Garbage Collection, LLC
                                                <Typography component="span" variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                                                    {review.owner_response.relative_time_description}
                                                </Typography>
                                            </Typography>
                                            <Typography variant="body2">
                                                {review.owner_response.text}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        );
    };




export default Reviews;