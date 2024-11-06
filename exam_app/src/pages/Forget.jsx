import React, { useState } from 'react'
import './Forget.css'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'
import { useNavigate } from 'react-router-dom'

export default function Forget() {
  const [email, setEmail] = useState('')
  const {BACKEND_HOSTING_URL} = useAuth()
  const navigator = useNavigate()

  const handelSubmitEmail = async (evt) => {
    evt.preventDefault()
    // console.log(email);

    try {
        
      let response = await fetch(`${BACKEND_HOSTING_URL}/api/otp/send_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
      }),
      })
      const res_data = await response.json()
      // console.log('response from server :', res_data);

      if(response.ok){
        toast.success("OTP Send to your Email !!")
        navigator('/forget_otp_verifcation', {state: {email}})
        setEmail('')
      }else{
          // console.log(res_data);
          Object.values(res_data).map((err) => {
            return toast.error(err)
          })
      }
      // console.log(response);
    } catch (error) {
      console.log('otp sending error: ', error)
      toast.error('Otp Not Send !!')
    }
  }
  return (
    <>
      <div className="forget_outer">
        <div className="forget_innner">
          <h2>Forget Passwrd</h2>
          <form onSubmit={handelSubmitEmail}>
          <label htmlFor="forget_input">Enter your email :</label>
            <div className="email_input">
              <input type="email" id="forget_input" required placeholder='enter your email' value={email} onChange={(evt) => {setEmail(evt.target.value)
                if (evt.target.value) {
                  evt.target.classList.add('not-empty');
                } else {
                  evt.target.classList.remove('not-empty');
                }
              }}/>
              <span></span>
            </div>
            <div className="submit">
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
