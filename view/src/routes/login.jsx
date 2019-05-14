import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { signIn } from '../services/auth';

const Login = withRouter(({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  async function onLogin() {
    try {
      await signIn({ email, password });
      history.replace('/overview');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="auth-main">
        <div className="auth-sub">
          <div className="title">Login</div>

          <center>
            <form onSubmit={e => e.preventDefault()}>

              <label>
                Email:
                <input
                  type="email"
                  required
                  // value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>

              <label>
                Password:
                <input
                  type="password"
                  required
                  // value={password}
                  onChange={e => setPass(e.target.value)}
                />
              </label>

              <div className="auth-bar">
                <button
                  type="submit"
                  value="Login"
                  onClick={onLogin} 
                  className="reg-btn"
                  style={{margin:'0'}}
                >
                  Login
                </button >

                <NavLink to="/register" style={{margin:'auto 0'}}>
                  <input style={{background: 'none', color: 'gray', fontSize:'12px'}}
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
});

export default Login;
