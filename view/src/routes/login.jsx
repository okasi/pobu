import React, { useState, useContext, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { AppContext } from '../store/context';
import { signIn } from '../services/auth';
import { setToken, getValidToken, getUser } from '../services/auth';


const Login = withRouter(({ history }) => {
  const { state, actions } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');


  function checkLogin() {
    if (setToken(getValidToken())) {
      actions({
        type: 'setState',
        payload: { isLoggedIn: true }
      })
      return true
    }
  }

  useEffect(() => {
    checkLogin()
  }, []);

  async function onLogin() {
    try {
      await signIn({ email, password });
      if (checkLogin()){
        history.replace('/overview');
      }
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
                value="Login"
                onClick={onLogin}
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
