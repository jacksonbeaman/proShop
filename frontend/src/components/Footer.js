import { Container, Row, Col } from 'react-bootstrap'; // Row and Col allows you to use the Bootstrap grid

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

// py is padding on the y-axis - e.g. className='text-center py-3'
