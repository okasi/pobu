// Kosher approved by George Soros
import { useState } from 'react';

import history from '../store/history';

import axios from 'axios';
import decodeJWT from 'jwt-decode';

const baseURL = process.env.REACT_APP_API_URL;

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export function setToken(token) {
  if (token) {
    // store the token
    localStorage.setItem('userToken', token);
    // Setting the Authorisation header for all future GET requests
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
  } else {
    // delete api.defaults.headers.common.Authorization;
    delete api.defaults.headers.common.Authorization;
    // Clear token from local storage
    localStorage.removeItem('userToken');
    return false;
  }
}

// Validates token, and removes it if it's invalid
// setToken(getValidToken())

// For storing the logged in user's credentails across page refreshes
export function getValidToken() {
  const token = localStorage.getItem('userToken');
  try {
    const decodedToken = decodeJWT(token);
    // valid token
    const now = Date.now() / 1000;
    // check if token has expired
    if (now > decodedToken.exp) {
      return null;
    }
    return token;
  } catch (error) {
    // invalid token
    return null;
  }
}

export function getDecodedToken() {
  const validToken = getValidToken();
  if (validToken) {
    return decodeJWT(validToken);
  }
  return null;
}


export default function useGlobalStore() {
  const [state, setState] = useState('');

  const actions = (action) => {
    const { type, payload } = action;
    switch (type) {

      case 'setState':
        return setState(prevState => ({
          ...prevState,
          ...payload,
        }));


      // Sends a POST request to api/users/register on the backend, with
      // first name, last name, email, password & second password registering the user
      case 'USER_REGISTER':
        return api.post('/users/register', payload)
          .then((res) => {
              console.log("SUCCESSFULLY REGISTERED")
              console.log(res)
              history.push('/login');
              actions({
                type: 'USER_LOGIN',
                payload: { ...payload }
              })
          })
          .catch((res) => {
            console.error(res.response);
          });


      // Check if user is already logged in
      case 'USER_LOGIN_CHECK':
        if (setToken(getValidToken())) {
          actions({
            type: 'setState',
            payload: { isLoggedIn: true }
          })
        }


      // Sends a POST request to api/users/login on the backend,
      // with the email & password returning the JWT
      // belonging to the user with supplied credentials
      case 'USER_LOGIN':
        return api.post('/users/login', { ...payload })
        .then((res) => {
          actions({
            type: 'setState',
            payload: { isLoggedIn: true }
          })
          setToken(res.data.token);
          getDecodedToken();
          console.log("SUCCESSFULLY LOGGED IN")
          history.push('/overview');
          window.location.reload();
        })
        .catch((res) => {
          console.log(res.response);
        });

        
      // Removes token from localstorage & resets auth bearer & sets global state isLoggedIn to false
      case 'USER_LOGOUT':
        setToken(null)
        actions({
          type: 'setState',
          payload: { isLoggedIn: false }
        })
        console.log("SUCCESSFULLY LOGGED OUT")
        history.push('/login');
        window.location.reload();


      // Sends a GET request to api/users/ on the backend
      // should return data about logged in user
      case 'USER_DATA':
        return api.get('/users/')
          .then((res) => {
            actions({
              type: 'setState',
              payload: { user: res.data }
            })
          })
          .catch((res) => {
            console.error(res.response);
          });


      // Sends a GET request to api/users/:id on the backend
      // should return data about the user by the id
      case 'USER_ID_GET':
        return api.get(`/users/${payload}`)
          .then((res) => {
            return res.data;
          })
          .catch((res) => {
            console.error(res.response);
          });


      // Sends a POST request to api/booking/add on the backend
      // Returns id of created booking
      case 'BOOKING_CREATE':
        return api.post('/booking/add', payload)
          .then((res) => {
            return res.data._id;
          })
          .catch((res) => {
            console.error(res.response);
          });


      // Sends a POST request to api/booking/check on the backend
      case 'BOOKING_DATA':
        return api.post('/booking/check', payload)
          .then((res) => {
            return res;
          })
          .catch((res) => {
            console.error(res.response);
          });


      // Sends a GET request to api/booking/host on the backend
      case 'BOOKING_HOST':
        return api.get('/booking/host')
          .then((res) => {
            return res;
          })
          .catch((res) => {
            console.error(res.response);
          });
      

      // Sends a GET request to api/booking/client on the backend
      case 'BOOKING_CLIENT':
        return api.get('/booking/client')
          .then((res) => {
            return res;
          })
          .catch((res) => {
            console.error(res.response);
          });


      // Sends a POST request to api/booking/accept on the backend
      case 'BOOKING_ACCEPT':
        return api.post('/booking/accept', payload)
          .then((res) => {
            return res;
          })
          .catch((res) => {
            console.error(res.response);
          });


      // Sends a POST request to api/booking/delete on the backend    
      case 'BOOKING_DELETE':
        return api.post('/booking/delete', payload)
          .then((res) => {
            actions({
              type: 'USER_DATA',
            })
            return res;
          })
          .catch((res) => {
            console.error(res.response);
          });

      case 'BOOKING_SESSION_INITIALIZE':
        return;

      default:
        return state;

    }
  };
  return { state, actions };
}
