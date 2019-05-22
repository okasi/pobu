import { useState } from 'react';


// useGlobalism todo
// GLOBAL ROUTE MANAGEMENT 
// API SERVICES HERE
// ALL API RELATED ACTIONS HERE

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

      case 'USER_REGISTER':
        return;

      case 'USER_LOGIN':
        return;

      case 'USER_LOGOUT':
        return;

      case 'USER_DATA':
        return;

      case 'USER_ID_CHECK':
        return;

      case 'BOOKING_CREATE':
        return;

      case 'BOOKING_DATA':
        return;

      case 'BOOKING_ACCEPT':
        return;

      case 'BOOKING_SESSION_INITIALIZE':
        return;

      default:
        return state;

    }
  };
  return { state, actions };
}
