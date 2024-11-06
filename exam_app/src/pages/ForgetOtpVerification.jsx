import React, { useState } from 'react'
import { useAuth } from '../store/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function ForgetOtpVerification() {
    const location = useLocation()
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const { BACKEND_HOSTING_URL } = useAuth()
    const {email} = location.state || {}

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

        try {
            let response = await fetch(`${BACKEND_HOSTING_URL}/api/otp/verify_otp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email.trim(),
                  otp: otp,
              }),
              })
            
              const res1_data = await response.json()

              if(response.ok){

                toast.success('OTP verification successful !!')

                navigate('/update_password', {state: {email}})

              }else{
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
