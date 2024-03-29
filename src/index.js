import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './pages/Context/AuthContext'
import '../node_modules/bootstrap/dist/js/bootstrap';
import './config/global';
import DoxContextProvider from './pages/Context/DoxContext';
import CourseContextProvider from './pages/Context/CourseContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <DoxContextProvider>
        <CourseContextProvider>
          <App />
        </CourseContextProvider>
        </DoxContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
