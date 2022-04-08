import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createTheme,ThemeProvider } from '@mui/material/styles'
// import { BrowserRouter  as Router } from "react-router-dom";

import { HashRouter as Router } from 'react-router-dom';


const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#f44336',
    },
  },
});


ReactDOM.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
  <Router>

    <App />
  </Router>
  </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
