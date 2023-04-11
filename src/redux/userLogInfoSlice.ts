import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {useAppDispatch} from "./hooks";


export const userLogInfoSlice = createSlice({
        name:'userLogInfo',
    initialState: {
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
           authorities: [
               {authority: ''}
           ],
            isLoggedIn: false,
            loginAttemptCount: 0,
            token: '',
            accountPage:'/account',


        },


    reducers: {
        changeUserLogInfo: (state, action) => {
            const mergedState = {...state, ...action.payload}
            mergedState.isLoggedIn = true
            mergedState.loginAttemptCount = state.loginAttemptCount + 1
            return mergedState;

        },
        addToken: (state, action) => {
            const mergedState = {...state, ...action.payload}
            mergedState.isLoggedIn = true
            return mergedState;
        },
        updateToken: (state, action) => {
            const mergedState = {...state, ...action.payload}
            mergedState.isLoggedIn = true

            return mergedState;
        }



    }

})
export const updateToken = (token: any) => async () => {
    await axios.post( ` http://localhost:5000/auth/nngc/confirm?${token}`)
        .then((response) => {
            response.data.customer
          // store.dispatch({type: 'updateToken', payload: response.data.customer})
            const dispatch = useAppDispatch()
            dispatch(updateToken(response.data.customer))
            console.log(response.data.customer)

        })
        .catch((error) => {
            console.log(error)
        })
}


export const {changeUserLogInfo,addToken} = userLogInfoSlice.actions
