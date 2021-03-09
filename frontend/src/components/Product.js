import { Card } from 'react-bootstrap';

// In order to make sure the component takes in props, could also do...
// const Product = (props) => {
// ...and then access each product using props.product, instead of destructuring
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </a>

      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>

        <Card.Text>
          <div className='my-3'>
            {product.rating} from {product.numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
