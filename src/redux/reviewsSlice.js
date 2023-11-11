// src/features/reviews/reviewsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    reviews: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

export const fetchYelpReviews = createAsyncThunk(
    'reviews/fetchYelpReviews',
    async (_, { getState }) => {
        const { reviews } = getState();
        console.log(reviews);
        if (reviews.status === 'succeeded') {
            // Assume reviews are up-to-date
            return;
        }

        const apiKey = import.meta.env.VITE_YELP_API_KEY;
        const response = await axios.get('https://api.yelp.com/v3/private/businesses/PerbRA5npIlclM0CmLLrbw/reviews?locale=en_US', {

            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(apiKey);
        console.log(response);
        return response.data.reviews;
    }
);

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchYelpReviews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchYelpReviews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Add any fetched reviews to the array
                state.reviews = action.payload.review;
            })
            .addCase(fetchYelpReviews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default reviewsSlice.reducer;
