import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Loading } from './components';
import Routers from './routers';
import store, { persistor } from './store';
import moment from 'moment';
import 'moment/locale/vi';
import axios from 'axios';
import { API_URL } from './config/var';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components';
import { history } from './store';
import { ConnectedRouter } from 'connected-react-router';

moment.locale('vi');
axios.defaults.baseURL = API_URL;
axios.defaults.headers['Content-Type'] = 'application/json';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Router>
          <ConnectedRouter history={history}>
            <Layout>
              <Routers />
            </Layout>
          </ConnectedRouter>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
