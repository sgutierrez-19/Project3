import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Layout
import Navbar from './components/layout/navbar/Navbar';
import Alerts from './components/layout/alerts/Alerts';
// Pages
import Home from './components/pages/home/Home';
import Signup from './components/pages/signup/CreateSignup';
import LandingPage from './components/pages/landingPage/LandingPage';
import BandProfile from './components/pages/bandProfile/BandProfile';
import Page404 from './components/pages/404/404';
import CreateLFG from './components/pages/createLFG/CreateLFG';
import CreateLFM from './components/pages/createLFM/CreateLFM';
import UserProfile from './components/pages/userProfile/UserProfile';
import PrivateRoute from './components/routing/privateRoute/PrivateRoute';
// State
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import UserMemberState from './context/userMember/UserMemberState';
import BandMemberState from './context/bandMember/BandMemberState';
import ListingsState from './context/listings/ListingsState';

import './App.css';

const App = () => {
  return (
    <UserMemberState>
      <BandMemberState>
        <ListingsState>
          <AuthState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />
                  <div className=''>
                    <Alerts />
                    <Switch>
                      {/* private routes - change once ready to make private */}
                      <PrivateRoute exact path='/' component={Home} />
                      <PrivateRoute
                        exact
                        path='/band/profile'
                        component={BandProfile}
                      />
                      <PrivateRoute
                        exact
                        path='/createlfg'
                        component={CreateLFG}
                      />
                      <PrivateRoute
                        exact
                        path='/createlfm'
                        component={CreateLFM}
                      />
                      <PrivateRoute
                        exact
                        path='/userprofile'
                        component={UserProfile}
                      />
                      {/* public routes */}
                      <Route exact path='/signup' component={Signup} />
                      <Route exact path='/login' component={LandingPage} />
                      <Route component={Page404} />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </AlertState>
          </AuthState>
        </ListingsState>
      </BandMemberState>
    </UserMemberState>
  );
};

export default App;
