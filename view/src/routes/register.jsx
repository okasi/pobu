import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { signUp } from '../services/api';

const Register = withRouter(({ history }) => {
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [passwordSecond, setPassSecond] = useState('');


  async function onRegister() {
    try {
      await signUp({
        firstName, lastName, email, password, passwordSecond,
      });
      history.replace('/overview');
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <div className="auth-main">
        <div className="auth-sub">
          <div className="title">Register</div>

          <center>
            <form onSubmit={e => e.preventDefault()}>

              <label>
                  First Name:
                <input
                  type="text"
                  required
                    // value={firstName}
                  onChange={e => setFirst(e.target.value)}
                />
              </label>

              <label>
                  Last Name:
                <input
                  type="text"
                  required
                    // value={lastName}
                  onChange={e => setLast(e.target.value)}
                />
              </label>

              <label>
                  E-mail:
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

              <label>
                  Confirm Password:
                <input
                  type="password"
                  required
                    // value={passwordSecond}
                  onChange={e => setPassSecond(e.target.value)}
                />
              </label>

              <div className="auth-bar">
                <button
                  type="submit"
                  value="Register"
                  onClick={onRegister} 
                  className="reg-btn"
                  style={{margin:'0'}}
                >
                  Register
                </button >

                <NavLink to="/login" style={{margin:'auto 0'}}>
                  <input style={{background: 'none', color: 'gray', fontSize:'12px'}}
                    type="submit"
                    value="Go to login"
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

export default Register;
