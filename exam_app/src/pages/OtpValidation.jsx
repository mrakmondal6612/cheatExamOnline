import React, { useState } from 'react'
import './OtpValidation.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth'

export default function OtpValidation() {
    const location = useLocation()
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const {storeTokenInLS} = useAuth()
    const { BACKEND_HOSTING_URL } = useAuth()
    const {userDetails} = location.state || {}

    const handleOtpChange = (evt) => {
        setOtp(evt.target.value)

        if (evt.target.value) {
            evt.target.classList.add('not-empty');
          } else {
            evt.target.classList.remove('not-empty');
        }
    }
    const handleOtpSubmit = async (evt) => {
        evt.preventDefault()

        console.log(userDetails);

        try {
            let response1 = await fetch(`${BACKEND_HOSTING_URL}/api/otp/verify_otp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: userDetails.email.trim(),
                  otp: otp,
              }),
              })

              const res1_data = await response1.json()

              if(response1.ok){

                toast.success('OTP verification successful !!')

                try {
                    let response = await fetch(`${BACKEND_HOSTING_URL}/api/auth/signup`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          username: userDetails.username.trim(),
                          email: userDetails.email.trim(),
                          phone: userDetails.phone.trim(),
                          password: userDetails.password.trim()
                      }),
                      })
        
                      const res_data = await response.json()
        
                      if(response.ok){
                        // stored the token in local storage
                        storeTokenInLS(res_data.token)
                        toast.success('Signup Successful !!')
                      }else{
                        // console.log(res_data);
                        Object.values(res_data).map((err) => {
                            return toast.error(err)
                      })
                      toast.error('Signup Failed!!')
                      }
        
                      navigate('/')
                } catch (error) {
                    console.log('signup: ', error)
                }

              }else{
                    // console.log(res_data);
                    Object.values(res1_data).map((err) => {
                        return toast.error(err)
                  })
              }
        } catch (error) {
            console.log('OTP verification Error');
        }

        
    }
  return (
    <>
        <div className="otp_outer">
            <div className="otp_inner">
                <h2 className="otp_title">OTP Verification</h2>
                    <p>OTP sent to your email address</p>
                <div className="otp_input">
                    <form action="#" onSubmit={handleOtpSubmit}>
                        <label htmlFor="otp_input_box">Enter OTP:</label>
                        <div className="input_div">
                            <input type="number" id="otp_input_box" placeholder="enter otp" onChange={handleOtpChange} value={otp}/>
                            <span></span>
                        </div>

                        <div className="submit">
                            <button type="submit" className="otp_submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}
