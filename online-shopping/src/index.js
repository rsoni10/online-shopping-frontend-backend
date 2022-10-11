import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './features/configStore';
import { Provider } from 'react-redux';
import { loadUser } from './features/AuthSlice';
import { fetchAsyncProducts } from './features/ProductSlice';
const root = ReactDOM.createRoot(document.getElementById('root'));
store.dispatch(fetchAsyncProducts())
store.dispatch(loadUser(null));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

