import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {DataContextProvider} from './Context/dataStore'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/js/all.min.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	
	<DataContextProvider>
		<BrowserRouter>
	    <React.StrictMode>
	      <App />
	    </React.StrictMode>
	  </BrowserRouter>	
	</DataContextProvider>
  
);


reportWebVitals();
