import './App.css';
import Navbar from './Components/Navbar';
import Bookshelf from './Components/Bookshelf';
import { Routes, Route, BrowserRouter,useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Checkout from './Checkout';
import Bookinfo from './Bookinfo';
import { useSelector } from 'react-redux';
function App() {
  const {auth} = useSelector((state)=> state.auth)
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/bookstore' element={<Bookshelf/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/bookinfo/:id' element={<Bookinfo/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

