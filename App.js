import React, {Component} from 'react';
import {Provider} from 'react-redux';

import RouteApp from './src/navigation/routes';
import store from './src/redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouteApp />
      </Provider>
    );
  }
}
export default App;
