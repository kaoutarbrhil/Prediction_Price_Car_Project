import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext'; // Assurez-vous que le ThemeProvider est importé

ReactDOM.render(
  <ThemeProvider>  {/* Assurez-vous que le ThemeProvider englobe toute l'application */}
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
