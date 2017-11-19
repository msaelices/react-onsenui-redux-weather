import React from 'react';
import {render} from 'react-dom';

import {Provider} from 'react-redux';
import {compose, createStore, applyMiddleware} from 'redux';
import persistState from 'redux-localstorage';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {AppContainer} from 'react-hot-loader';

import weatherApp from './reducers';
import App from './components/App';

import ons from 'onsenui';

import 'onsenui/css/onsenui-core.min.css'; // Onsen UI basic CSS
import './onsen-css-components.css'; // Onsen UI CSS components source
import './icons/css/weather-icons.css';

const logger = createLogger();

const store = createStore(weatherApp,
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  compose(
    process.env.NODE_ENV === 'production'
      ? applyMiddleware(thunk)
      : applyMiddleware(thunk, logger),
    persistState()
  )
);

import {addLocationAndFetchWeather} from './actions';

if (Object.keys(store.getState().locations).length == 0) {
  [
    'Tokyo',
    'New York',
    'London',
    'Beijing',
    'Sydney',
    'Rio de Janeiro',
    'Istanbul'
  ].forEach((city) => store.dispatch(addLocationAndFetchWeather(city)));
}

const rootElement = document.getElementById('root');

ons.ready(() => render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  rootElement
));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
