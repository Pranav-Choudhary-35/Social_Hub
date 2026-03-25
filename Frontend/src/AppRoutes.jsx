import {BrowserRouter,Routes,Route} from 'react-router';

import Login from './Features/auth/pages/Login';
import Register from './Features/auth/pages/Register';
import Home from './Features/auth/pages/Home'
import './style.scss'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;