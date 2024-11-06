import React, { useState } from 'react'
import './Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'

export default function Login() {

  const { BACKEND_HOSTING_URL } = useAuth()
  const navigator = useNavigate()
  const {storeTokenInLS} = useAuth()
  const [visiblePass, setVisiblePass] = useState(false)
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
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
    try {
      let response = await fetch(`${BACKEND_HOSTING_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userDetails.email.trim(),
          password: userDetails.password.trim()
      }),
      })

      // console.log('login response:', response);

      const res_data = await response.json()
      // console.log('response from server :', res_data);

      if(response.ok){
        
        // stored the token in local storage
        storeTokenInLS(res_data.token)

        setUserDetails({
          email: '',
          password: '',
        })
        toast.success("Login Successfully !!")
        navigator('/')
      }else{
        // console.log(res_data);
        // toast(res_data.message)
        Object.values(res_data).map((err) => {
          return toast.error(err)
        })
      }
      // console.log(response);
    } catch (error) {
      console.log('login: ', error)
    }
  }

  return (
    <div className="login_outer">
  <div className="login_inner">
    <h2>Login</h2>
    <form  onSubmit={handleSubmitUser}>
      <div className="input_div">
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
        <label htmlFor="pass">
          Password <br />
          <div className="pass_field">
            <input
              type={!visiblePass? "password": 'text'}
              id="pass"
              placeholder="password"
              required
              autoComplete='new-password'
              name='password'
              value={userDetails.password}
              onChange={handleUserDetails}
            />
            <span />
            <i onClick={()=> setVisiblePass(!visiblePass)}><FontAwesomeIcon icon={!visiblePass? faEyeSlash : faEye} /></i>
          </div>
        </label>
      </div>
      <div className="forget">
        <NavLink to="/forgetpassword">Forget Password?</NavLink>
      </div>
      <div className="btn_div">
        <button type="submit" className="btn">
          login
        </button>
      </div>
      <div className="sign_up">
        <p>you don't have an account?</p>
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    </form>
  </div>
</div>

  )
}
