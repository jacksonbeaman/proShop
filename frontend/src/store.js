// store.js - where we connect any Reducers or middleware
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // allows us to make asynchronous requests in our action creators, when we talk to our server
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer } from './reducers/userReducers';

// we will pass in reducers here
// productList is what will show as our piece of State
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // spread operator passes in our array of middleware to the applyMiddleware function
);

export default store; // the store will be implemented through a Provider that comes from 'react-redux' in index.js
