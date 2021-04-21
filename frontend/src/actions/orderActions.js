import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} from '../constants/orderConstants';

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
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.message is a generic
    });
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
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.message is a generic
    });
  }
};
