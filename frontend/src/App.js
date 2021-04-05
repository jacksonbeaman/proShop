import { BrowserRouter as Router, Route } from 'react-router-dom'; // creater Router alias for BrowserRouter, and bring in Route
import { Container } from 'react-bootstrap'; // using { } because there are a lot of different things you can import
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          {/* Route from 'react-router-dom' automatically passes match and history props to components */}
          <Route path='/cart/:id?' component={CartScreen} />
          {/* Adding ? after id in '/cart/:id?' makes id optional */}
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

// replaced default function App() with arrow function
