import { Container } from 'react-bootstrap'; // using { } because there are a lot of different things you can import
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;

// replaced default function App() with arrow function
