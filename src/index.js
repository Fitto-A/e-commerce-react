import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/createStore';

import { AppProvider } from './components/context/context';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      < AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

 