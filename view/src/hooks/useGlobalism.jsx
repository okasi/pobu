/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import axios from 'axios';
import decodeJWT from 'jwt-decode';
import io from 'socket.io-client';
import history from '../store/history';

// Backend URL from .env file
const baseURL = process.env.REACT_APP_API_URL;
// Create an axios instance
const api = axios.create({
  baseURL: `${baseURL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// export function getDecodedToken() {
//   const validToken = getValidToken();
//   if (validToken) {
//     return decodeJWT(validToken);
//   }
//   return null;
// }

// This hook acts like a global accessible reducer.
// It has cases which are the type of the action.
// We don't send actions with a dispatch,
// we refer actions directly via "actions()" in order to simplify complexity.
// Actions only describe what happened & sometimes with a payload,
// but don't describe how the application's state changes.
export default function useGlobalism() {
  const [state, setState] = useState('');

  const actions = async (action) => {
    // Asynchronicity, increases the performance and responsiveness.
    const { type, payload } = action;
    switch (type) {
      case 'setState':
        return setState(prevState => ({
          ...prevState,
          ...payload,
        }));

      // For storing the logged in user's credentails across page refreshes
      case 'USER_GET_VALID_TOKEN':
        // eslint-disable-next-line no-case-declarations
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

      // Saves the token to localstorage & sets the authorization header
      // Removes the token from localstorage & resets the authorization header
      case 'USER_SET_TOKEN':
        if (payload) {
          // Store the token to localStorage
          localStorage.setItem('userToken', payload);
          // Setting the Authorisation header for all future GET requests
          api.defaults.headers.common.Authorization = `Bearer ${payload}`;
          return true;
        }
        // Clear the Authorisation header
        delete api.defaults.headers.common.Authorization;
        // Clear token from local storage
        localStorage.removeItem('userToken');
        return false;


      // Check if user is already logged in
      case 'USER_LOGIN_CHECK':
        if (
          await actions({
            type: 'USER_SET_TOKEN',
            payload: await actions({ type: 'USER_GET_VALID_TOKEN' }),
          })
        ) {
          actions({
            type: 'setState',
            payload: { isLoggedIn: true },
          });
          return true;
        }
        break;

      // Sends a POST request to api/users/login on the backend,
      // with the email & password returning the JWT
      // belonging to the user with supplied credentials
      case 'USER_LOGIN':
        if (payload === undefined) {
          return false;
        }
        return api
          .post('/users/login', payload)
          .then((res) => {
            actions({
              type: 'setState',
              payload: { isLoggedIn: true },
            });
            actions({
              type: 'USER_SET_TOKEN',
              payload: res.data.token,
            });
            console.log('SUCCESSFULLY LOGGED IN');
            history.push('/overview');
            window.location.reload();
          })
          .catch((res) => {
            console.log(res.response.data);
            alert(JSON.stringify(res.response.data, null, 4));
          });

      // Sends a POST request to api/users/register on the backend, with
      // first name, last name, email, password & second password registering the user
      case 'USER_REGISTER':
        return api
          .post('/users/register', payload)
          .then((res) => {
            console.log('SUCCESSFULLY REGISTERED');
            console.log(res);
            actions({
              type: 'USER_LOGIN',
              payload,
            });
            history.push('/login');
          })
          .catch((error) => {
            console.error(error.response.data);
            alert(JSON.stringify(error.response.data, null, 4));
          });

      // Removes token from localstorage & resets auth bearer
      // & sets global state isLoggedIn to false
      case 'USER_LOGOUT':
        actions({
          type: 'USER_SET_TOKEN',
          payload: null,
        });
        actions({
          type: 'setState',
          payload: { isLoggedIn: false },
        });
        console.log('SUCCESSFULLY LOGGED OUT');
        history.push('/login');
        window.location.reload();
        break;

      // Sends a GET request to api/users/ on the backend
      // should return data about logged in user
      case 'USER_DATA':
        return api
          .get('/users/')
          .then((res) => {
            actions({
              type: 'setState',
              payload: { user: res.data },
            });
          })
          .catch((error) => {
            console.error(error.response);
          });

      // Sends a GET request to api/users/:id on the backend
      // should return data about the user by the id
      case 'USER_ID_GET':
        try {
          const res = await api.get(`/users/${payload}`);
          return res.status === 200 ? res.data : null;
        } catch (error) {
          console.log(error.response);
        }
        break;

      // Sends a POST request to api/booking/add on the backend
      // Returns id of created booking
      case 'BOOKING_CREATE':
        return api
          .post('/booking/add', payload)
          .then(res => res.data._id)
          .catch((error) => {
            console.error(error.response);
          });

      // Sends a POST request to api/booking/check on the backend
      case 'BOOKING_DATA':
        return api
          .post('/booking/check', payload)
          .then(res => res)
          .catch((error) => {
            console.error(error.response);
          });

      // Sends a GET request to api/booking/host on the backend
      case 'BOOKING_HOST':
        try {
          const res = await api.get('/booking/host');
          return res.status === 200 ? res.data : null;
        } catch (error) {
          console.error(error.response);
        }
        break;

      // Sends a GET request to api/booking/client on the backend
      case 'BOOKING_CLIENT':
        try {
          const res = await api.get('/booking/client');
          return res.status === 200 ? res.data : null;
        } catch (error) {
          console.error(error.response);
        }
        break;

      // Sends a POST request to api/booking/accept on the backend
      case 'BOOKING_ACCEPT':
        return api
          .post('/booking/accept', payload)
          .then(res => res)
          .catch((error) => {
            console.error(error.response);
          });

      // Sends a POST request to api/booking/accept on the backend
      case 'BOOKING_UNBOOK':
        return api
          .post('/booking/unbook', payload)
          .then((res) => {
            actions({
              type: 'USER_DATA',
            });
            return res;
          })
          .catch((error) => {
            console.error(error.response);
          });

      // Sends a POST request to api/booking/delete on the backend
      case 'BOOKING_DELETE':
        return api
          .post('/booking/delete', payload)
          .then((res) => {
            actions({
              type: 'USER_DATA',
            });
            return res;
          })
          .catch((error) => {
            console.error(error.response);
          });

      case 'SOCKET_INITIALIZE':
        // eslint-disable-next-line no-case-declarations
        const socket = io(process.env.REACT_APP_API_URL);
        actions({
          type: 'setState',
          payload: { socket },
        });
        socket.on('RECEIVE_UPDATE', (data) => {
          console.log(data);
          if (
            window.location.pathname.includes('booking')
            && data._id === window.location.pathname.substring(9)
          ) {
            window.location.reload();
          } else {
            actions({ type: 'USER_DATA' });
          }
        });
        break;

      default:
        return state;
    }
  };
  return { state, actions };
}
