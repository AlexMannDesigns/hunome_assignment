import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
//import reportWebVitals from './reportWebVitals';

//vanilla JS for toggle switch in navbar
const toggles = document.querySelectorAll(".toggle");
const good = document.getElementById("good");
const cheap = document.getElementById("cheap");
const fast = document.getElementById("fast");

toggles.forEach(toggle => toggle.addEventListener("change", (e) => doTheTrick(e.target)));

function doTheTrick(clickedOne) {
  if(good.checked && cheap.checked && fast.checked) {
    if (good == clickedOne) {
      fast.checked = false;
    }
    if (cheap == clickedOne) {
      good.checked = false;
    }
    if (fast == clickedOne) {
      cheap.checked = false;
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//reportWebVitals();
