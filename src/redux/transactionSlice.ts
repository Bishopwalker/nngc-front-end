import {createSlice} from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: {
        id: '',
        transactionId: '',
        description: '',
        amount: 0,
        currency: '',

    },
    reducers: {

    }
})