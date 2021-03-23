import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

// productListReducer will handle the State for the product list, which we will see on the HomeScreen
// Reducer takes in 2 things: (1) initial State - e.g. object containing empty array - and (2) an action
// Action object will have type and may have a data payload
// Action Reducer will dispatch action to the productListReducer
export const productListReducer = (state = { products: [] }, action) => {
  // evaluate type that is in the action object
  // hree different types that we look for: (1) fetch req (2) successful res (3) failure - send error through the State
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      // return { loading: true } - we want the component to know that it's currently fetching
      // return { products: [] } - return products as empty array because the request hasn't been fulfilled yet
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload }; // we are going to fill products in the State with the data from action payload
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }; // we will set error in the State and will send the error from the payload
    default:
      return state;
  }
};
// in order to use Reducer, we have to add it to our store in store.js
