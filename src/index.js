import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./views/App";
import axios from "axios";
import { HashRouter } from "react-router-dom";
// axios.defaults.baseURL = "http://localhost:8521/";
axios.defaults.baseURL = "https://kltn2025serverfashionshop-production.up.railway.app/";

// Thêm CSS để sửa khoảng trống mênh mông
const style = document.createElement('style');
style.innerHTML = `
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  
  .navbar-wrapper {
    width: 100%;
    position: sticky !important;
    top: 0 !important;
    z-index: 1000 !important;
    background-color: #03A9F4 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  
  .home-container {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
  
  .banner-menu-container {
    margin-top: 0 !important;
  }
  
  .App-header {
    margin: 0 !important;
    padding: 0 !important;
    padding-bottom: 60px !important;
  }
`;
document.head.appendChild(style);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
