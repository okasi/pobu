import { useState } from 'react';


//useGlobalism
//GLOBAL ROUTE MANAGEMENT 
//WHOLE API SERVICE HERE MAYBE???

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

      default:
        return state;

    }
  };
  return { state, actions };
}
