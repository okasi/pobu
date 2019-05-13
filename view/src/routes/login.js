import React, { useState } from 'react';

const Login = () => {
  return (
    <>
      <div className="auth-main">
        <div className="auth-sub">
          <div className="title" >Login</div>
          <form>
            <label for="email">E-mail</label>
            <input type="text" name="email" placeholder="E-mail..."/>
            <label for="Password">Password</label>
            <input type="text" name="password" placeholder="Password..."/>
          </form>
        </div>
      </div>
    </>
  )

}

export default Login