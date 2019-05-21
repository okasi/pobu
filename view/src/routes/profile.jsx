import React, { useState, useContext, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { AppContext } from '../store/context';
import { signOut, getUser } from '../services/api';

const Profile = withRouter(({ history }) => {

  const { state, actions } = useContext(AppContext);

  async function onLogout() {
    try {
      await signOut();
      history.replace('/');
      actions({
        type: 'setState',
        payload: { isLoggedIn: false }
      })
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    (async function () {
      try {
        let data = await getUser()
        actions({
          type: 'setState',
          payload: { user: data }
        })
      } catch (e) {
        console.error(e);
      }
    }());
  }, [state.isLoggedIn])

  return (
    <>
      <h1>Profile</h1>
      <input
        type="submit"
        value="Logout"
        onClick={onLogout}
      />
      {state.user ? (
        <>
          <h3>User id: {state.user._id}</h3>
          <h3>Email: {state.user.email}</h3>
          <h3>First name: {state.user.firstName}</h3>
          <h3>Last name: {state.user.lastName}</h3>
        </>
      ) : (<h1>LMAO</h1>)
      }
    </>
  );
});

export default Profile;