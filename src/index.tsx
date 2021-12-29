import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';

i18next.addResourceBundle('en', 'translation', {
  'CHARACTER.RACE.HUMAN': 'Human',
  'BUILDING.BUILDING_TYPE.HOUSE': 'House',
  'BUILDING.BUILDING_TYPE.HOUSE.DESCRIPTION': 'Just a house.'
});
i18next.addResourceBundle('pl', 'translation', {
  'CHARACTER.RACE.HUMAN': 'Człowiek',
  'BUILDING.BUILDING_TYPE.HOUSE': 'Dom',
  'BUILDING.BUILDING_TYPE.HOUSE.DESCRIPTION': 'Po prostu dom.'
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
