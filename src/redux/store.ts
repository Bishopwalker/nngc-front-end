import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { consoleLogStateMiddleware } from './middleware'; // Import your custom middleware
import { pageTitleSlice } from './pageTitleSlice';
import { userLogInfoSlice } from './userLogInfoSlice';

const rootReducer = combineReducers({
    userInfo: userLogInfoSlice.reducer,
    title: pageTitleSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userInfo'], // only userInfo will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a middleware array and add your custom middleware
const middleware = [thunk, consoleLogStateMiddleware];

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: middleware, // Use the middleware array here
});

const persistor = persistStore(store);

export { store, persistor };
