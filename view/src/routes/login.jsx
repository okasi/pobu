import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { signIn } from '../services/auth';

const Login = withRouter(({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  async function onRegister() {
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

              <br />

              <label>
                Password:
                <input
                  type="password"
                  required
                  // value={password}
                  onChange={e => setPass(e.target.value)}
                />
              </label>

              <br />

              <input
                type="submit"
                value="Register"
                onClick={onRegister}
              />

              <br />

              <NavLink to="/register">
                <input
                  type="submit"
                  value="Go to register"
                />
              </NavLink>


            </form>
          </center>
        </div>
      </div>
    </>
  );
});

export default Login;
