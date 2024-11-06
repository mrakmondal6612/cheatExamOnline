import './ChangePassword.css'
import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import './UpdatePassword.css'

export default function ChangePassword() {
    const { BACKEND_HOSTING_URL, user, storeTokenInLS } = useAuth()
    const [visiblePass, setVisiblePass] = useState(false)
    const [visibleRePass, setVisibleRePass] = useState(false)
    const [prevVisiblePass, setPrevVisiblePass] = useState(false)
    const navigator = useNavigate()
    const [pass, settPass] = useState({
        oldPass: '',
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
        
        if(pass.password.trim() === pass.confirmPassword.trim()){

            try {
                let response = await fetch(`${BACKEND_HOSTING_URL}/api/auth/change_password`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: user.email.trim(),
                    oldpass: pass.oldPass.trim(),
                    newpass: pass.password.trim(),
                }),
                })
          
                // console.log('login response:', response);
          
                const res_data = await response.json()
                // console.log('response from server :', res_data);
          
                if(response.ok){
                  
                  // stored the token in local storage
                  storeTokenInLS(res_data.token)
          
                  settPass({
                    oldPass: '',
                    password: '',
                    confirmPassword: ''
                    })
                  toast.success("Password Update Successfully !!")
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
        
    }
  return (
    <>
        <div className="update_pass_outer">
            <div className="update_inner">
                <h2>Change Password</h2>
                <form onSubmit={submitPass}>
                <label htmlFor="prevPass">
                    Enter old Password <br />
                        <div className="pass_field">
                            <input
                            type={!prevVisiblePass? "password": 'text'}
                            id="prevPass"
                            placeholder="enter your old password"
                            required
                            autoComplete='old-password'
                            name='oldPass'
                            value={pass.oldPass}
                            onChange={handlePass}
                            />
                            <span />
                            <i onClick={()=> setPrevVisiblePass(!prevVisiblePass)}><FontAwesomeIcon icon={!prevVisiblePass? faEyeSlash : faEye} /></i>
                        </div>
                    </label>
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
                            autoComplete='confirm_new-password'
                            name='confirmPassword'
                            value={pass.confirmPassword}
                            onChange={handlePass}
                            />
                            <span />
                            <i onClick={()=> setVisibleRePass(!visibleRePass)}><FontAwesomeIcon icon={!visibleRePass? faEyeSlash : faEye} /></i>
                        </div>
                    </label>
                    <div className="forget">
                        <NavLink to="/forgetpassword">Forget Password?</NavLink>
                    </div>
                    <div className="btn_div">
                        <button type="submit" className="update_pass_btn">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}
