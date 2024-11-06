import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function AdminReply() {

    const params = useParams()
    const {BACKEND_HOSTING_URL, authorizationToken} = useAuth()
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        subject: '',
        email: '',
        msg: '',
    })

    const handleUserDetails = (evt) => {
    setUserDetails({
        ...userDetails,
        [evt.target.name]: evt.target.value,
    })
    }
    const getSingleContactData = async () => {
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/contacts/${params.email}`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })
            const res_data = await response.json()
            // console.log(`users data : ${data}`);
            if(response.ok){
                setUserDetails({
                    email: res_data.email
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
        getSingleContactData()
    }, [])

    const handleSubmitUser = async (evt) => {
        evt.preventDefault()

        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/contacts/reply/${params.email}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify({
                    email: userDetails.email.trim(),
                    subject: userDetails.subject.trim(),
                    message: userDetails.msg.trim(),
                })
            })

            if(response.ok){
                toast.success('Message Send Successfully')
                navigate('/admin/contacts')
            }else{
                toast.success('Update User Unsuccessfully')
            }
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div className="reply_outer" style={{width: '90%', height: '90vh', marginLeft: '10%', display: 'flex', flexDirection: 'column',alignItems: 'center', gap: '2rem'}}>
        <div className="feedback" id='feedback'>
          <h3>Send Reply</h3>

          <form action="#" method='post' onSubmit={handleSubmitUser}>
            <div className="input_div">
                <label htmlFor="email_id">
                  To Email <br />
                  <div>
                    <input
                      type="email"
                      id="email_id"
                      placeholder="example@gmail.com"
                      required=""
                      autoComplete='email'
                      name='email'
                      value={userDetails.email}
                      onChange={handleUserDetails}
                    />
                    <span />
                    <i />
                  </div>
                </label>
                <label htmlFor="subject">
                Subject <br />
                  <div>
                    <input
                      type="text"
                      id="subject"
                      placeholder="Automatic Exam bot"
                      required=""
                      name='subject'
                      autoComplete='subject'
                      value={userDetails.username}
                      onChange={handleUserDetails}
                    />
                    <span />
                    <i />
                  </div>
                </label>
                <label htmlFor="msg">
                  Message <br />
                  <div className='textarea'>
                    <textarea
                      id="msg"
                      placeholder="Enter your message here..."
                      required=""
                      name='msg'
                      value={userDetails.msg}
                      onChange={handleUserDetails}
                    />
                    <span />
                    <i />
                  </div>
                </label>
              <div className="btn_div">
                <button type="submit" className="btn">
                  Send 
                </button>
              </div>
            </div>
          </form>
        </div>
    </div>
  )
}