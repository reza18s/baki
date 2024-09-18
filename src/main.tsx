import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "./assets/main.css"
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,

);