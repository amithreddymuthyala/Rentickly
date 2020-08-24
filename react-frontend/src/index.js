import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import firebase from "firebase/app"; 
import "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyANXri9H0HkZmXlLjWoWrH7MEvcwQKNr4I",
  authDomain: "rentickly.firebaseapp.com",
  databaseURL: "https://rentickly.firebaseio.com",
  projectId: "rentickly",
  storageBucket: "rentickly.appspot.com",
  messagingSenderId: "512000623567",
  appId: "1:512000623567:web:3e872dda05f51d7d2048ba"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage(); 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


export { storage, firebase as default }; 