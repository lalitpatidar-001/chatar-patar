import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store';
import { Provider as ReduxProvider } from 'react-redux';
const rootIdWalaElement = document.querySelector("#root")
const root = ReactDOM.createRoot(rootIdWalaElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <ReduxProvider store={store}> 
      <App />
    </ReduxProvider>
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
