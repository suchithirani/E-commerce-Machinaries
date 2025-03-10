import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Shop from './components/Shop';
import Contact from './components/Contact';
import About from './components/About';
import ProductGallary from './components/Progal';
import Cart from './components/Cart';
import OperatorListingPage from './components/OperatorListingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/progal" element={<ProductGallary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/operatorlistingpage" element={<OperatorListingPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
