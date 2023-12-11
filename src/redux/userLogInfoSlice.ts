import {createSlice} from "@reduxjs/toolkit";


const initialState = {

        id: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zipCode: 0,
            latitude: 0,
            longitude: 0,
        },
        geoLocation: '',
        enabled: false,
        stripeCustomerId: '',
        transactionHistory: [],
        role: [],
        isLoggedIn: false,

    loginAttemptCount: 0,
    token: '',
    accountPage:'/account', receiptURL: null, invoiceURL: null

};

export const userLogInfoSlice = createSlice({
    name:'userLogInfo',
    initialState,
    reducers: {
        changeUserLogInfo: (state, action) => {
            let mergedState;
            if (action.payload.customerDTO) {
                const { customerDTO } = action.payload;
                mergedState = { ...state, ...customerDTO };
            } else {
                mergedState = { ...state, ...action.payload };
            }
            mergedState.isLoggedIn = true;
            mergedState.loginAttemptCount = state.loginAttemptCount + 1;
            return mergedState;
        },

        addToken: (state, action) => {
         //   console.log(action.payload.token);
            const mergedState = {...state, ...action.payload};
            mergedState.isLoggedIn = true;
            return mergedState;
        },
        updateToken: (state, action) => {
            const mergedState = {...state, ...action.payload};
            mergedState.isLoggedIn = true;
            return mergedState;
        },
        clearUserInfo: (state) => {
            return initialState;
        }
    }
});

// export const updateToken = (token: any) => async (dispatch: any) => {
//     console.log(token)
//     await axios.get(`http://3.85.8.238:5000/auth/nngc/token_status?token=${token}`)
//         .then((response) => {
//             dispatch(updateToken(response.data.customer));
//          //   console.log(response.data.customer);
//         })
//         .catch((error) => {
//             console.log(error);
//             if(error.response.status === 501) window.location.href ='/expired';
//
//          //window.location.href ='/expired';
//         });
// };


export const {changeUserLogInfo, addToken, clearUserInfo,updateToken} = userLogInfoSlice.actions;

export default userLogInfoSlice.reducer;