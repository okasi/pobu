import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../store/context';

const Login = () => {

  const { actions } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');


  useEffect(() => {

    actions({
      type: 'USER_LOGIN_CHECK',
    })
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="auth-main">
        <div className="auth-sub">
          <div className="auth-title">Login</div>
            <center>
              <form className="auth-form" onSubmit={e => e.preventDefault()}>
                <label className="auth-label">
                  Email:
                  <input
                    type="email"
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </label>
                <label className="auth-label">
                  Password:
                  <input
                    type="password"
                    required
                    onChange={e => setPass(e.target.value)}
                  />
                </label>
                <div className="auth-bar">
                  <button
                    type="submit"
                    value="Login"
                    onClick={() => {
                      actions({
                        type: 'USER_LOGIN',
                        payload: { email, password }
                      })
                    }} 
                    className="reg-btn"
                  >
                    Login
                  </button >
                  <NavLink to="/register" style={{margin:'auto 0'}}>
                    <input 
                      className="auth-redirect"
                      type="submit"
                      value="Go to register"
                    />
                  </NavLink>  
                </div>
            </form>
          </center>
        </div>
      </div>
    </>
  );
};

export default Login;
