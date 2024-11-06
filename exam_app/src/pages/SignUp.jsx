import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './SignUp.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

export default function SignUp() {
  const { BACKEND_HOSTING_URL } = useAuth()
  const navigator = useNavigate()
  // const {storeTokenInLS} = useAuth()
  const [visiblePass, setVisiblePass] = useState(false)
  const [visibleRePass, setVisibleRePass] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    rePass: '',
  })

  const handleUserDetails = (evt) => {
    setUserDetails({
      ...userDetails,
      [evt.target.name]: evt.target.value,
    })

    if (evt.target.value) {
        evt.target.classList.add('not-empty');
      } else {
        evt.target.classList.remove('not-empty');
    }
  }
  const handleSubmitUser = async (evt) => {
    evt.preventDefault()
    
    // console.log(userDetails);
    if(userDetails.username.length <3){
      toast.error('Name must be at least 3 characters')
      return;
    }else if (userDetails.username.length >255) {
      toast.error('Name must not be more than 255 characters')
      return;
    }
    if(userDetails.email.length <3){
      toast.error('Email must be at least 3 characters')
      return;
    }else if (userDetails.email.length >255) {
      toast.error('Email must not be more than 255 characters')
      return;
    }
    if(userDetails.phone.length <3){
      toast.error('Phone must be at least 3 characters')
      return;
    }else if (userDetails.phone.length >255) {
      toast.error('Phone must not be more than 255 characters')
      return;
    }
    if(userDetails.password.length <3){
      toast.error('Password must be at least 8 characters')
      return;
    }else if (userDetails.password.length >255) {
      toast.error('Password must not be more than 255 characters')
      return;
    }

    if(userDetails.password === userDetails.rePass){
      
      try {
        
        let response = await fetch(`${BACKEND_HOSTING_URL}/api/otp/send_otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userDetails.email.trim(),
        }),
        })
        const res_data = await response.json()
        // console.log('response from server :', res_data);

        if(response.ok){
          toast.success("OTP Send to your Email !!")
          navigator('/otp_verifcation', {state: {userDetails}})
          setUserDetails({
            username: '',
            email: '',
            phone: '',
            password: '',
            rePass: '',
          })
        }else{
            // console.log(res_data);
            Object.values(res_data).map((err) => {
              return toast.error(err)
            })
        }
        // console.log(response);
      } catch (error) {
        console.log('signup: ', error)
      }
    }
    else{
      toast.error('Passwords are Not Matched')
    }
  }

  return (
    <div className="signup_outer">
  <div className="signup_inner">
    <h2>Signup</h2>
    <form  onSubmit={handleSubmitUser}>
      <div className="input_div">
        <label htmlFor="username">
        Username <br />
          <div>
            <input
              type="text"
              id="username"
              placeholder="john doe"
              required
              name='username'
              autoComplete='username'
              value={userDetails.username}
              onChange={handleUserDetails}
            />
            <span />
            <i />
          </div>
        </label>
        <label htmlFor="email_id">
          Email <br />
          <div>
            <input
              type="email"
              id="email_id"
              placeholder="example@gmail.com"
              required
              name='email'
              autoComplete='email'
              value={userDetails.email}
              onChange={handleUserDetails}
            />
            <span />
            <i />
          </div>
        </label>
        <label htmlFor="phone">
        Phone <br />
          <div>
            <input
              type="number"
              id="phone"
              placeholder="8609xxxxxx"
              required
              name='phone'
              autoComplete='phone'
              value={userDetails.phone}
              onChange={handleUserDetails}
            />
            <span />
            <i />
          </div>
        </label>
        <label htmlFor="pass">
          Create Password <br />
          <div className="pass_field">
            <input
              type={!visiblePass? "password": 'text'}
              id="pass"
              placeholder="create your password"
              required
              name='password'
              autoComplete='new-password'
              value={userDetails.password}
              onChange={handleUserDetails}
            />
            <span />
            <i onClick={()=> setVisiblePass(!visiblePass)}><FontAwesomeIcon icon={!visiblePass? faEyeSlash : faEye} /></i>
          </div>
        </label>
        <label htmlFor="rePass">
          Reenter Password <br />
          <div className="pass_field">
            <input
              type={!visibleRePass? "password": 'text'}
              id="rePass"
              placeholder="reenter your password"
              required
              name='rePass'
              autoComplete='new-password'
              value={userDetails.rePass}
              onChange={handleUserDetails}
            />
            <span />
            <i onClick={()=> setVisibleRePass(!visibleRePass)}><FontAwesomeIcon icon={!visibleRePass? faEyeSlash : faEye} /></i>
          </div>
        </label>
      </div>
      
      <div className="btn_div">
        <button type="submit" className="btn">
          Signup
        </button>
      </div>
      <div className="sign_up">
        <p>already have an account?</p>
        <NavLink to="/login">Login</NavLink>
      </div>
    </form>
  </div>
</div>
  )
}
