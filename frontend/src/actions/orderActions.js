import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_ORDERS_REQUEST,
  ORDER_LIST_MY_ORDERS_SUCCESS,
  ORDER_LIST_MY_ORDERS_FAIL,
  ORDER_LIST_ALL_ORDERS_REQUEST,
  ORDER_LIST_ALL_ORDERS_SUCCESS,
  ORDER_LIST_ALL_ORDERS_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
} from '../constants/orderConstants';
import { logout } from './userActions';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    // destructure two levels
    const {
      userLogin: { userInfo },
    } = getState();

    // when we are sending data, we want to send a Content-Type of application/json in the headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    // second argument is user object - the data we want to update with
    const { data } = await axios.post('/api/orders', order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });

    dispatch({ type: CART_CLEAR_ITEMS, payload: data });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({ type: ORDER_CREATE_FAIL, payload: message });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    // destructure two levels
    const {
      userLogin: { userInfo },
    } = getState();

    // when we are sending data, we want to send a Content-Type of application/json in the headers
    const config = {
      headers: {
        // we don't need 'Content-Type': 'application/json', for a GET request
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      // destructure two levels
      const {
        userLogin: { userInfo },
      } = getState();

      // when we are sending data, we want to send a Content-Type of application/json in the headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${userInfo.token}`,
        },
      };

      // second argument is paymentResult - data the backend needs to update
      // backend doesn't need to receive any data to change isPaid to false or paidAt to Date.now()
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }

      dispatch({
        type: ORDER_PAY_FAIL,
        payload: message,
      });
    }
  };

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    // destructure two levels
    const {
      userLogin: { userInfo },
    } = getState();

    // when we are sending data, we want to send a Content-Type of application/json in the headers
    const config = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    // second argument is empty object - {} - which is necessary for a PUT request
    // backend doesn't need to receive any data to change isDelivered to false or deliveredAt to Date.now()
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_ORDERS_REQUEST });

    // destructure two levels
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/orders/myorders', config);

    dispatch({ type: ORDER_LIST_MY_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_ORDERS_FAIL,
      payload: message,
    });
  }
};

export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_ALL_ORDERS_REQUEST });

    // destructure two levels
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/orders', config);

    dispatch({ type: ORDER_LIST_ALL_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_ALL_ORDERS_FAIL,
      payload: message,
    });
  }
};
