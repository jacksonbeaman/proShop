import axios from 'axios';

// Actions
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
} from '../constants/productConstants';

// listProducts Action Creator is going to do pretty much what useEffect hook did in our HomeScreen Component
// thunk allows us to have a function within a function
// passing in dispatch allows us to dipatch Actions to our Reducer
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/products');

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.message is a generic
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.message is a generic
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    // destructure two levels
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.message is a generic
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    // destructure two levels
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer: ${userInfo.token}`,
      },
    };

    // second argument is an empty object - {} - because we are making a POST request, but we're not actually sending any data
    const { data } = await axios.post('/api/products/', {}, config);

    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message, // error.message is a generic
    });
  }
};

// useEffect gave us access to products in our return portion of the HomeScreen component
// import { useState, useEffect } from 'react'; // bring in useState hook from react, so we can use state in functional components
// // with class-based components state would be defined in the constructor
// // useEffect hook allows us to call functions whenever a component loads - whenever a functional component loads
// // useEffect hook allows us to make requests to our backend
// // useEffect hook will also be called if dependencies change - i.e. any values in the array given as the second argument of useEffect
// import { Row, Col } from 'react-bootstrap';
// import Product from '../components/Product';
// import axios from 'axios';

// const HomeScreen = () => {
//   // init state:
//   // const ["name (of our choice) of this piece of state", "name (of our choice) of function to change this state"] = useState("whatever default we want to set for our state");
//   const [products, setProducts] = useState([]);

//   // useEffect hook takes in an arrow function that is going to run whenever the component loads
//   useEffect(() => {
//     // axios.get returns a promise, so we have to either use .then syntax, async / await
//     // useEffect arrow function argument cannot be made async, so we have to create a separate function and make it asynchonous
//     const fetchProducts = async () => {
//       const { data } = await axios.get('/api/products'); // the promise returned by axios.get is handled / resolved by await
//       // destructure the res object that is normally returned: const res = await axios.get('/api/products') and accessed via res.data
//       setProducts(data); // we can access the data variable directly having destructured the res object above
//     };

//     fetchProducts();
//   }, []); // second argument to useEffect is an array of dependencies - if dependencies change, useEffect will be fired off again

//   return (
//     <>
//       <h1>Latest Products</h1>
//       <Row>
//         {products.map((product) => (
//           <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//             <Product product={product} />
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default HomeScreen;
