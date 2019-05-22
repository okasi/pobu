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
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return true;
  } else {
    // delete api.defaults.headers.common.Authorization;
    delete api.defaults.headers.common.Authorization;
    // Clear token from local storage
    localStorage.removeItem(key);
    return false;
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

// Sends a GET request to api/users/ on the backend
// should return data about logged in user
export async function getUser() {
  return api.get('/users/')
    .then((res) => {
      return res.data;
    })
    .catch((res) => {
      console.error(res.response);
    });
}

// Sends a GET request to api/users/:id on the backend
// should return data about the user by the id
export async function getUserById(id) {
  return api.get(`/users/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((res) => {
      console.error(res.response);
    });
}

// Sign out
export function signOut() {
  setToken(null);
}

// Sends a POST request to api/booking/add on the backend
export async function bookingCreate(bookableData) {
  // console.log(bookableData)
  return api.post('/booking/add', bookableData)
    .then((res) => {
      return res.data._id;
    })
    .catch((res) => {
      console.error(res.response.data.errmsg);
    });
}

// Sends a POST request to api/booking/check on the backend
export async function bookingCheck(bookableId) {
  return api.post('/booking/check', {
    bookableId,
  })
    .then((res) => {
      return res;
    })
    .catch((res) => {
      console.error(res.response.data.errmsg);
    });
}

// Sends a POST request to api/booking/check on the backend
export async function bookingAccept(bookableId) {
  return api.post('/booking/accept', {bookableId})
    .then((res) => {
      return res;
    })
    .catch((res) => {
      console.error(res.response.data.errmsg);
    });
}

// Sends a GET request to api/booking/host on the backend
export async function getHostBookings() {
  return api.get('/booking/host')
    .then((res) => {
      return res;
    })
    .catch((res) => {
      console.error(res.response.data.errmsg);
    });
}

// Sends a GET request to api/booking/client on the backend
export async function getClientBookings() {
  return api.get('/booking/client')
    .then((res) => {
      return res;
    })
    .catch((res) => {
      console.error(res.response.data.errmsg);
    });
}