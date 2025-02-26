import "react";
//import { NavbarMenu } from './mockData/data';
// import { BiSearchAlt2 } from "react-icons/bi";
// import { FaShoppingCart } from "react-icons/fa";
import Navbar from "./components/Navbar";
//import ResponsiveMenu from './components/ResponsiveMenu';




import "bootstrap/dist/css/bootstrap.min.css";
import { useState ,useEffect} from "react";

import { ToastContainer } from "react-toastify";


function App() {
  const [login,setLogin]=useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogin(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  
  return (
    <>
    <Navbar/>
      
    
      {/* <Router>
        <Routes>
          
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/navbar"
            element={isAuthenticated ? <Navbar /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router> */}


      <ToastContainer />
    </>
  );
}


export default App;
