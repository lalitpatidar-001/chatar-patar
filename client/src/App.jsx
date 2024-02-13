import { Route, Routes} from 'react-router-dom'
import DashBoard from './layout/DashBoard';
import Home from './pages/Home';
import Settings from './pages/Settings';
import SideBar from './components/sidebar/SideBar';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/auth/Login';
import Registeration from './pages/auth/Registeration';
import Auth from './layout/Auth';
import ResetPassword from './pages/auth/ResetPassword';
import NewPassword from './pages/auth/NewPassword';
import Group from './pages/Group';
import Call from './pages/Call';
import Profile from './pages/Profile';
import Verify from './pages/auth/Verify';
function App() {
  return (
   <>
      <Routes>
      <Route path='/' element={<DashBoard/>}>
        <Route index element={<Home/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/group' element={<Group/>}/>
        <Route path='/call' element={<Call/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
        
      </Route>
      <Route path='/auth' element={<Auth/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Registeration/>}/>
          <Route path='reset-password' element={<ResetPassword/>}/>
          <Route path='new-password' element={<NewPassword/>}/>
          <Route path='verify-otp' element={<Verify/>}/>
          <Route path='*' element={<PageNotFound/>}/>
      </Route>

      </Routes>
   </>
 
  );
}

export default App;
