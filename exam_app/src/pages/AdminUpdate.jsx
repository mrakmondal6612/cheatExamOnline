import React, { useState } from 'react'
import './SignUp.css'
import { useEffect } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdminUpdate() {
    const {BACKEND_HOSTING_URL, authorizationToken} = useAuth()
    const params = useParams()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        phone: '',
        apiKey: '',
        creaditPoints: '',
      })

    const getSingleUserData = async () => {
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/users/${params.id}`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })
            const res_data = await response.json()
            // console.log(`users data : ${data}`);
            if(response.ok){
                setUserDetails({
                    username: res_data.username,
                    email: res_data.email,
                    phone: res_data.phone,
                    apiKey: res_data.apiKey,
                    creaditPoints: res_data.creaditPoints,
                })
            }else{
                Object.values(res_data).map((err) => {
                    return toast.error(err)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        getSingleUserData()
    }, [])

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
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/users/update/${params.id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify({
                    username: userDetails.username.trim(),
                    email: userDetails.email.trim(),
                    phone: userDetails.phone,
                    apiKey: userDetails.apiKey.trim(),
                    creaditPoints: userDetails.creaditPoints,
                })
            })

            if(response.ok){
                toast.success('Update User Successfully')
                navigate('/admin/users')
            }else{
                toast.success('Update User Unsuccessfully')
            }
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className="signup_outer">
  <div className="signup_inner">
    <h2>Update User</h2>
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
        <label htmlFor="apiKey">
        Gemini API Key <br />
          <div>
            <input
              type="text"
              id="apiKey"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              required
              name='apiKey'
              autoComplete='apiKey'
              value={userDetails.apiKey}
              onChange={handleUserDetails}
            />
            <span />
            <i />
          </div>
        </label>
        <label htmlFor="creadit_points">
        Creadit Points <br />
          <div>
            <input
              type="number"
              id="creadit_points"
              placeholder="0000"
              required
              name='creaditPoints'
              autoComplete='creadit_points'
              value={userDetails.creaditPoints}
              onChange={handleUserDetails}
            />
            <span />
            <i />
          </div>
        </label>
      </div>
      
      <div className="btn_div">
        <button type="submit" className="btn">
        Update
        </button>
      </div>
    </form>
  </div>
</div>
  )
}