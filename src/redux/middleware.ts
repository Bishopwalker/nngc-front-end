//create an interface for the middleware using redux's Middleware type
import { Middleware } from 'redux';

export const consoleLogStateMiddleware: Middleware = store => next => action => {
    console.log('Current State:', store.getState());
    console.log('Action:', action);
    const result = next(action);
    console.log('Next State:', store.getState());
    return result;
};
