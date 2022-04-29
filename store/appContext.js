import { createContext, useReducer, useContext } from "react";
import storeReducer from "./reducer";

import { ACTION_TYPES } from "./actions";

const StoreContext = createContext();

const initialState = {
  latLong: "",
  coffeeStores: [],
};

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  const setLatLong = (latitude, longitude) => {
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
  };

  const set_Coffee_Stores = () => {
    dispatch({
      type: ACTION_TYPES.SET_COFFEE_STORES,
      payload: {
        coffeeStores,
      },
    });
  };

  const get_Coffee_Stores = (coffeeStores) => {
    dispatch({
      type: ACTION_TYPES.SET_COFFEE_STORES,
      payload: {
        coffeeStores,
      },
    });
  };

  return (
    <StoreContext.Provider
      value={{ state, setLatLong, get_Coffee_Stores, set_Coffee_Stores }}
    >
      {children}
    </StoreContext.Provider>
  );
};

// custom hook - useStoreContext
export const useStoreContext = () => {
  return useContext(StoreContext);
};

export default StoreProvider;
