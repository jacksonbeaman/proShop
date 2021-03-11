import { useState, useEffect } from 'react'; // bring in useState hook from react, so we can use state in functional components
// with class-based components state would be defined in the constructor
// useEffect hook allows us to call functions whenever a component loads - whenever a functional component loads
// useEffect hook allows us to make requests to our backend
// useEffect hook will also be called if dependencies change - i.e. any values in the array given as the second argument of useEffect
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  // init state:
  // const ["name (of our choice) of this piece of state", "name (of our choice) of function to change this state"] = useState("whatever default we want to set for our state");
  const [products, setProducts] = useState([]);

  // useEffect hook takes in an arrow function that is going to run whenever the component loads
  useEffect(() => {
    // axios.get returns a promise, so we have to either use .then syntax, async / await
    // useEffect arrow function argument cannot be made async, so we have to create a separate function and make it asynchonous
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products'); // the promise returned by axios.get is handled / resolved by await
      // destructure the res object that is normally returned: const res = await axios.get('/api/products') and accessed via res.data
      setProducts(data); // we can access the data variable directly having destructured the res object above
    };

    fetchProducts();
  }, []); // second argument to useEffect is an array of dependencies - if dependencies change, useEffect will be fired off again

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
