import { BrowserRouter as Router, Route } from 'react-router-dom'; // creater Router alias for BrowserRouter, and bring in Route
import { Container } from 'react-bootstrap'; // using { } because there are a lot of different things you can import
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

// replaced default function App() with arrow function
