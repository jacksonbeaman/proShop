import { useEffect } from 'react'; // bring in useState hook from react, so we can use state in functional components
// with class-based components state would be defined in the constructor
// useEffect hook allows us to call functions whenever a component loads - whenever a functional component loads
// useEffect hook allows us to make requests to our backend
// useEffect hook will also be called if dependencies change - i.e. any values in the array given as the second argument of useEffect
import { useDispatch, useSelector } from 'react-redux';
// useDispatch will dispatch or call an action
// useSelector will select parts of the State - e.g. the product list part of the State - kind of like setState in Component level State
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  // we don't need to use setProducts - i.e setState - or useState for our local State / Component level State when we are using Redux for global State
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // const productList should be named whatever it was named in store.js
  const productList = useSelector((state) => state.productList); // (2) useSelector grabs the list of Products from the State
  const { loading, error, products, page, pages } = productList; // (3) pull out what we want from the State - we then display it in our output

  // useEffect hook takes in an arrow function that is going to run whenever the component loads
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber)); // (1) useDipatch fires off the Action to get the list of products, sending it through the Reducer, down into the State
  }, [dispatch, keyword, pageNumber]); // second argument to useEffect is an array of dependencies - if dependencies change, useEffect will be fired off again

  return (
    <>
      <Meta></Meta>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            match={match}
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
