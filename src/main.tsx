import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/store';
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
      <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>

      <App />
        </PersistGate>
      </BrowserRouter>
  </Provider>,
)
