import axios from 'axios';
// Actions
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

// getState method comes from store.js / Redux
// getState allows us to get our entire state tree, including productList, productDetails, cart, etc ...
// id and qty arguments will come from the URL in the CartScreen component
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty, // qty is given as our function argument, coming from our URL in turn - originally pushed from the CartScreen
    },
  });

  // after we dispatch our Action, we want to save it in local storage, using our local storage api
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); // JSON.stringify() becuase we can only save strings in local storage
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
