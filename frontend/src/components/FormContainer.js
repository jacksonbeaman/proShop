import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  // function component takes in destructered children - i.e. props.children
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {/* on xs screens we want it to take up all 12 columns*/}
          {children} {/* put in props as children */}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
