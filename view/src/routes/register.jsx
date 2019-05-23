import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../store/context';

const Register = () => {
  const { actions } = useContext(AppContext);

  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [passwordSecond, setPassSecond] = useState('');

  return (
    <>
      <div className="auth-main">
        <div className="auth-sub">
          <div className="auth-title">Register</div>
            <center>
              <form  className="auth-form" onSubmit={e => e.preventDefault()}>
                <label className="auth-label">
                  First Name:
                  <input
                    type="text"
                    required
                    onChange={e => setFirst(e.target.value)}
                  />
                </label>

                <label className="auth-label">
                    Last Name:
                  <input
                    type="text"
                    required
                      // value={lastName}
                    onChange={e => setLast(e.target.value)}
                  />
                </label>

                <label className="auth-label">
                    E-mail:
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

                <label className="auth-label">
                    Confirm Password:
                  <input
                    type="password"
                    required
                    onChange={e => setPassSecond(e.target.value)}
                  />
                </label>

                <div className="auth-bar">
                  <button
                    type="submit"
                    value="Register"
                    onClick={() => {
                      actions({
                        type: 'USER_REGISTER',
                        payload: { firstName, lastName, email, password, passwordSecond }
                      })
                    }} 
                    className="reg-btn"
                  >
                    Register
                  </button >
                  <NavLink to="/login" style={{margin:'auto 0'}}>
                    <input 
                      className="auth-redirect"
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
};

export default Register;
