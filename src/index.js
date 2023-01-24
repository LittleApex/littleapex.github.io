import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
);

