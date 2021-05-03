import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import SplashPage from './components/SplashPage';
import RestaurantDetailsPage from './components/RestaurantDetailsPage';
import * as sessionActions from './store/session';
import Navigation from "./components/Navigation";
import AboutPage from './components/AboutPage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch])
  return isLoaded && (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path='/' exact >
          <SplashPage />
        </Route>
        <Route path='/restaurants/:restaurantId'>
          <RestaurantDetailsPage />
        </Route>
        <Route path='/about'>
          <AboutPage />
        </Route>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
