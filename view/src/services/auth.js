import axios from 'axios';
import decodeJWT from 'jwt-decode';

const baseURL = process.env.REACT_APP_API_URL;

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

const key = 'userToken';
export function setToken(token) {
  if (token) {
    // store the token
    localStorage.setItem(key, token);
    // Setting the Authorisation header for all future GET requests
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    api.defaults.headers.common.Authorization = token;
  } else {
    // delete api.defaults.headers.common['Authorization']
    delete api.defaults.headers.common.Authorization;
    // Clear token from local storage
    localStorage.removeItem(key);
  }
}

// Validates token, and removes it if it's invalid
// setToken(getValidToken())


// For storing the logged in user's credentails across page refreshes
export function getValidToken() {
  const token = localStorage.getItem(key);
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

// Sends a POST request to api/users/login on the backend,
// with the email & password returning the JWT
// belonging to the user with supplied credentials
export function signIn({ email, password }) {
  return api.post('/users/login', { email, password })
    .then((res) => {
      console.log(res.data);
      const { token } = res.data;
      setToken(token);
      return getDecodedToken();
    })
    .catch((res) => {
      if (res.response.status === 400 || res.response.status === 401) {
        alert('There was an error with your email or password. Please try again.');
        console.log(res.response);
      }
    });
}

// Sends a POST request to api/users/register on the backend, with
// first name, last name, email, password & second password registering the user
export function signUp(userData) {
  console.log(userData);
  api.post('/users/register', userData)
    .then((res) => {
      signIn(userData);
    })
    .catch((res) => {
      console.error(res.response.data);
    });
}


export function signOut() {
  setToken(null);
}
