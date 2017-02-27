import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes';

/* material-ui */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customizedMuiTheme from './customizedMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



/* scss load */
import './scss/main.scss';

render (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={customizedMuiTheme}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
)


