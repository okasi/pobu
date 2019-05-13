import React, { useState } from 'react';

const Register = () => {
    return (
      <>
        <div className="auth-main">
          <div className="auth-sub"> 
            <div className="title" >Register</div>
            <form>
              <label for="name">Name</label>
              <input type="text" name="name" placeholder="Name..."/>
         
              <label for="email">E-mail</label>
              <input type="text" name="email" placeholder="E-mail..."/>
      
              <label for="cemail">Confirm e-mail</label>
              <input type="text" name="cemail" placeholder="Confirm..."/>
  
              <label for="Password">Password</label>
              <input type="text" name="password" placeholder="Password..."/>
      
              <label for="cpass">Confirm password</label>
              <input type="text" name="cpass" placeholder="Confirm..."/>
            </form>
          </div>
        </div>
      </>
    )

}

export default Register