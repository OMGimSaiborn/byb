import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import BookingRoom from './pages/BookingRoom';
import Register from './pages/Register';
import Login from './pages/Login';
import UserBookings from './pages/UserBookings';
import 'antd/dist/reset.css';
import AddRoom from './pages/AddRoom';
import Stats from './pages/Stats';
import AdminHome from './pages/AdminHome';
import EditRoom from './pages/EditRoom';
import TermsyConds from './pages/TermsyCond';
import Perfil from './pages/Perfi';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute element={Home} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/terminosycondiciones' element={<TermsyConds />} />
          <Route path='/perfil' element={<ProtectedRoute element={Perfil} />} />
          <Route path='/booking/:roomid' element={<ProtectedRoute element={BookingRoom} />} />
          <Route path='/userBookings' element={<ProtectedRoute element={UserBookings} />} />
          <Route path='/showStats' element={<ProtectedRoute element={Stats} />} />
          <Route path='/addRoom' element={<ProtectedRoute element={AddRoom} />} />
          <Route path='/editRoom/:roomid' element={<ProtectedRoute element={EditRoom} />} />
          <Route path='/admin' element={<ProtectedRoute element={AdminHome} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

function ProtectedRoute({ element: Element, ...rest }) {
  if (localStorage.getItem('user')) {
    return <Element {...rest} />;
  } else {
    return <Navigate to='/login' />;
  }
}
