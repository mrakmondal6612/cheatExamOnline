import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/ErrorPage';
// import Navbar from './bars/Navbar';
import ResponsiveAppBar from './bars/ResponsiveAppBar';
import Download from './pages/Download';
import Footer from './bars/Footer';
import Forget from './pages/Forget';
import Demos from './pages/Demos';
import Logout from './pages/Logout';
import OtpValidation from './pages/OtpValidation';
import ForgetOtpVerification from './pages/ForgetOtpVerification';
import UpdatePassword from './pages/UpdatePassword';
import Profile from './pages/Profile';
import { useAuth } from './store/auth';
import ChangePassword from './pages/ChangePassword';
import BuyCoins from './pages/BuyCoins';
import Pricing from './pages/Pricing';
import AdminLayout from './components/layouts/AdminLayout';
import AdminUsers from './pages/AdminUsers';
import AdminContacts from './pages/AdminContacts';
import AdminUpdate from './pages/AdminUpdate';
import AdminReply from './pages/AdminReply';
import GenerateAPIForm from './bars/GenerateAPIForm';
import Products from './pages/Products';
import { useEffect } from 'react';

function App() {
  const { isLoggedIn, user } = useAuth()

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
}, []);

  return (
    
    <>
      <BrowserRouter>
      {/* <Navbar/> */}
      <ResponsiveAppBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/download' element={<Download/>}/>
          <Route path='/forgetpassword' element={<Forget/>}/>
          <Route path='/demos' element={<Demos/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/otp_verifcation' element={<OtpValidation/>}/>
          <Route path='/forget_otp_verifcation' element={<ForgetOtpVerification/>}/>
          <Route path='/update_password' element={<UpdatePassword/>}/>
          <Route path='/generate_key' element={<GenerateAPIForm/>}/>
          {isLoggedIn?
          <>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/change_password' element={<ChangePassword/>}/>
            <Route path='/buy_coins' element={<BuyCoins/>}/>
          </>
          :<>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
          </>}
          <Route path='/*' element={<ErrorPage/>}/>

          {/* Admin Route  */}
          {user.isAdmin ? <Route path='/admin' element={<AdminLayout/>}>
            <Route path='users' element={<AdminUsers/>}/>
            <Route path='contacts' element={<AdminContacts/>}/>
            <Route path='users/:id/edit' element={<AdminUpdate/>}/>
            <Route path='contacts/:email/reply' element={<AdminReply/>}/>
          </Route> : ''}
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
