// src/components/Reviews.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchYelpReviews } from '../../redux/reviewsSlice';

export const Reviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews?.reviews);
    const reviewStatus = useSelector((state) => state.reviews?.status);
    const error = useSelector((state) => state.reviews?.error);

    useEffect(() => {
        console.log(reviewStatus)
        if (reviewStatus === 'idle') {
            dispatch(fetchYelpReviews());
        }
    }, [reviewStatus, dispatch]);

    let content;
dispatch(fetchYelpReviews());
    if (reviewStatus === 'loading') {
        content = <div>Loading...</div>
    } else if (reviewStatus === 'succeeded') {
        content = reviews.map((review) => (
            <article key={review.url}>
                <h3>{review.user.name}</h3>
                <p>{review.text}</p>
                <p>Rating: {review.rating}</p>
                {/* Optionally include other details like response or user image */}
            </article>
        ));
    } else if (reviewStatus === 'failed') {
        content = <div>{error}</div>;
    }

    return (
        <section>
            <h2>Yelp Reviews</h2>
            {content}
        </section>
    );
};
