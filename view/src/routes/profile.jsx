import React, { useContext, useEffect } from 'react';
import { AppContext } from '../store/context';


const Profile = () => {

  const { state, actions } = useContext(AppContext);

  useEffect(() => {
    actions({
      type: 'USER_DATA',
    })
  // eslint-disable-next-line
  }, [state.user && state.user.isLoggedIn])

  return (
    <>
      <div className="profile-con">
        <h1>Profile</h1>
        <input
          type="submit"
          value="Logout"
          onClick={() => {
            actions({
              type: 'USER_LOGOUT',
            })
          }}
          className="reg-btn"
        />
        {state.user ? (
          <>
            <label>
              Firstname:
              <h3>
                {state.user.firstName}
              </h3>
            </label>
            <label>
              Lastname:
              <h3>
                {state.user.lastName}
              </h3>
            </label>
            <label>
              Email:
              <h3>
                {state.user.email}
              </h3>
            </label>
            <label>
              <details>
                <summary>User ID:</summary>
                <h3>
                  {state.user._id}
                </h3>
              </details>
            </label>
          </>
        ) : ( <h1>Please login</h1> )
        }
      </div>
    </>
  );
};

export default Profile;