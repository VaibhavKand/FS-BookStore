import './App.css';
import Navbar from './Components/Navbar';
import Bookshelf from './Components/Bookshelf';
import { Routes, Route, BrowserRouter,useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Checkout from './Checkout';
import Bookinfo from './Bookinfo';
import Profile from './Profile';
import Password_reset from './Password_reset';
import New_Password from './New_Password';
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
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/password_reset' element={<Password_reset/>}/>
      <Route path='/new_password/:token' element={<New_Password/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

