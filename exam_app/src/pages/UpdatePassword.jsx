import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import './UpdatePassword.css'

export default function UpdatePassword() {
    const location = useLocation()
    const {email} = location.state || {}
    const navigate = useNavigate()
    const { BACKEND_HOSTING_URL } = useAuth()
    const [visiblePass, setVisiblePass] = useState(false)
    const [visibleRePass, setVisibleRePass] = useState(false)
    const [pass, settPass] = useState({
        password: '',
        confirmPassword: ''
    })

    const handlePass = (evt) => {
        settPass({...pass, [evt.target.name]: evt.target.value})

        if (evt.target.value) {
            evt.target.classList.add('not-empty');
          } else {
            evt.target.classList.remove('not-empty');
        }
    }
    const submitPass = async (evt) => {
        evt.preventDefault()

        if(pass.password.trim()===pass.confirmPassword.trim()){
            try {

                let response = await fetch(`${BACKEND_HOSTING_URL}/api/auth/update_password`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: email.trim(),
                    password: pass.password.trim()
                }),
                })
          
                // console.log('login response:', response);
          
                const res_data = await response.json()
                // console.log('response from server :', res_data);
          
                if(response.ok){
          
                  settPass({
                    password: '',
                    confirmPassword: ''
                    })
                  toast.success('Password Updated Successfully !!')
                  navigate('/login')
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
        }else{
            toast.error('Password are not Matched')
        }
    }

  return (
    <>
        <div className="update_pass_outer">
            <div className="update_inner">
                <h2>Update Password</h2>
                <form onSubmit={submitPass}>
                    <label htmlFor="pass">
                    Create new Password <br />
                        <div className="pass_field">
                            <input
                            type={!visiblePass? "password": 'text'}
                            id="pass"
                            placeholder="create new password"
                            required
                            autoComplete='new-password'
                            name='password'
                            value={pass.password}
                            onChange={handlePass}
                            />
                            <span />
                            <i onClick={()=> setVisiblePass(!visiblePass)}><FontAwesomeIcon icon={!visiblePass? faEyeSlash : faEye} /></i>
                        </div>
                    </label>
                    <label htmlFor="rePass">
                    Confirm Password <br />
                        <div className="pass_field">
                            <input
                            type={!visibleRePass? "password": 'text'}
                            id="rePass"
                            placeholder="confirm new password"
                            required
                            autoComplete='Confirm_new-password'
                            name='confirmPassword'
                            value={pass.confirmPassword}
                            onChange={handlePass}
                            />
                            <span />
                            <i onClick={()=> setVisibleRePass(!visibleRePass)}><FontAwesomeIcon icon={!visibleRePass? faEyeSlash : faEye} /></i>
                        </div>
                    </label>
                    <div className="btn_div">
                        <button type="submit" className="update_pass_btn">Update Password</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
