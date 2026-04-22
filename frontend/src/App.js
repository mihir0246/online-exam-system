import React from 'react';
import {BrowserRouter,Route} from "react-router-dom";
import './App.css';
import { Provider } from 'react-redux';
import store  from './store';

import Homepage from './components/basic/homepage/homepage';
import Dashboard from './components/dashboard/backbone';
import TraineeRegister from './components/trainee/register/traineeregister';
import MainPortal from './components/trainee/examPortal/portal';

import axios from 'axios';
import apis from './services/Apis';

function App() {
  const [csrfReady, setCsrfReady] = React.useState(false);

  React.useEffect(() => {
    const fetchCsrfToken = async (retries = 3) => {
      try {
        const res = await axios.get(`${apis.BASE}/api/v1/csrf-token`);
        axios.defaults.headers.common['x-csrf-token'] = res.data.token;
        setCsrfReady(true);
      } catch (err) {
        console.error(`Failed to fetch CSRF token. Retries left: ${retries}`, err);
        if (retries > 0) {
          // Retry after 2 seconds
          setTimeout(() => fetchCsrfToken(retries - 1), 2000);
        } else {
          // If all retries fail, still allow the app to load to show the UI, 
          // but warn the user or handle failure gracefully.
          setCsrfReady(true);
        }
      }
    };

    fetchCsrfToken();
  }, []);

  if (!csrfReady) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <div className="loading-spinner"></div>
        <p>Initializing Secure Session...</p>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <nav>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/user" component={Dashboard}/>
          <Route path="/user/:options" component={Dashboard}/>
          <Route exact path="/trainee/register" component={TraineeRegister}/>
          <Route exact path="/trainee/taketest" component={MainPortal}/>
        </nav>
      </BrowserRouter>
    </Provider> 
  );
}

export default App;
