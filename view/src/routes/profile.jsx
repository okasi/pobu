import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
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
        // console.log(data)
      } catch (e) {
        console.error(e);
      }
    }());
  }, [state.isLoggedIn])

  return (
    <>
      <div className="profile-con">
        <h1>Profile</h1>
        <input
          type="submit"
          value="Logout"
          onClick={onLogout}
        />
        {state.user ? (
          <>
            <label>
              Firstname:
              <h3>{state.user.firstName}</h3>
            </label>
            <label>
              Lastname:
              <h3>{state.user.lastName}</h3>
            </label>
            <label>
              Email:
              <h3>{state.user.email}</h3>
            </label>
            <label>
              {/* User id: */}
              <details>
                <summary>User ID:</summary>
                <h3 style={{color: 'gray'}}>{state.user._id}</h3>
              </details>
            </label>
          </>
        ) : (<h1>Please login</h1>)
        }
      </div>
    </>
  );
});

export default Profile;