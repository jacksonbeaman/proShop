import { Container } from 'react-bootstrap'; // using { } because there are a lot of different things you can import
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to ProShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

// replaced default function App() with arrow function
