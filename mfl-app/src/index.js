import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { init } from 'd2/lib/d2';
/**
 * @description
 * Base component for communicating with all other compoenents
 *
 * @param {initConfig} initConfig for initialization of D2
 *
 * @requires module:d2/lib/d2
*/

const initConfig = {
  baseUrl: 'https://mfl.dhis2.org/dhis/api',
};

init(initConfig)
    .then(d2 => {
        ReactDOM.render(<App d2={d2}/>, document.getElementById('root'));
                registerServiceWorker();
    })
    .catch(err => console.error(err));
