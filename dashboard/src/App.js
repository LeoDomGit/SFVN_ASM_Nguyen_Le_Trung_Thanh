import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Users from './pages/Users';
import Bills from './pages/Bills';
import Login from './pages/Login';
import Cookies from 'js-cookie';
function App() {
  const hasToken = !!Cookies.get('token');
  return (
    <div className="App">
      <Routes>
        {!Cookies.get('token') ?
          <Route path='/' element={<Login />} />
          :
          <>
            <Route path='/categories' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/users' element={<Users />} />
            <Route path='/add-product' element={<AddProduct />} />
            <Route path='/bills' element={<Bills />} />
            <Route path='/edit/:id' element={<AddProduct />} />
          </>

        }
        <Route path='*' element={<Login />} />


      </Routes>
    </div>
  );
}

export default App;
