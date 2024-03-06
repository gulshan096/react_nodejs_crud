import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import store from './store';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
  domain="dev-sov3bja2kbjv1cjt.us.auth0.com"
  clientId="NomI5Ek0P5paesYnNX7Opk2BHbh7N2Y4"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>   
<Provider store={store}>
    <App />
</Provider>
</Auth0Provider> );
reportWebVitals();
