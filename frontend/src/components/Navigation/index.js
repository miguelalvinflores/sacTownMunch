import React from 'react';
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector( state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {

    sessionLinks = (
      <>
        <NavLink to='/login'>Log In</NavLink>
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }
  return (
    <nav>
      <h1 className='nav-title'>ST MUNCH</h1>
      <div className='nav-bar-items'>
        <NavLink exact to='/'>Home</NavLink>
        <NavLink to='/about'>About</NavLink>
        {isLoaded && sessionLinks}
      </div>

    </nav>
  );
}

export default Navigation;
