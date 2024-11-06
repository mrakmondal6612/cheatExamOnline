import React, { useState, useEffect } from 'react'
import './Contact.css'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

export default function Contact() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    msg: '',
  })

  const [userData, setUserData] = useState(true)

  const {user} = useAuth()
  const { BACKEND_HOSTING_URL } = useAuth()

  if(userData && user){
    setUserDetails({
      username: user.username,
      email: user.email,
      msg: ''
    })
    setUserData(false)
  }

  const handleUserDetails = (evt) => {
    setUserDetails({
      ...userDetails,
      [evt.target.name]: evt.target.value,
    })
  }
  const handleSubmitUser = async (evt) => {
    evt.preventDefault()

    // console.log(userDetails);

    try {
      let response = await fetch(`${BACKEND_HOSTING_URL}/api/form/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userDetails.username,
          email: userDetails.email,
          message: userDetails.msg
      }),
      })

      // console.log('login response:', response);
      const res_data = await response.json()

      if(response.ok){
        const message = 'msg'
        setUserDetails({...userDetails, [message]: '',})
        toast.success("Message Send Successfully !!")
      }else{
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
    <>
      <div className="contact_us">
        <h2>Contact Us</h2>

        <div className="contact_whth">
          <h3>We're Here to Help</h3>
          <p>At AutomaticExamBot, we're committed to providing exceptional support and assistance. Whether you have questions, need help, or want to provide feedback, we're here to assist you.</p>
        </div>

        <div className="contact_git">
          <h3>Get in Touch</h3>
          <p>Feel free to reach out to us through any of the following methods:</p>
        </div>
        <div className="supports">
          <h3>Email Support</h3>
          <p>For any inquiries, support, or feedback, email us: <br/><br/>
              <span>Email:</span> automaticexambot@gmail.com<br/><br/>
              We strive to respond to all emails within 24 hours.
          </p>
        
          {/* <h3>Phone Support</h3>
          <p>Speak directly with our customer support team: <br/><br/>
             <span>Phone:</span> +1 (123) 456-7890<br/><br/>
              Our phone support is available Monday to Friday, from 9 AM to 5 PM (EST).
          </p> */}

          <h3>Social Media</h3>
          {/* <p>
          </p> */}
          <ul>
          Stay connected with us through social media for the latest updates, tips, and news: <br/><br/>
                <li>Telegram : <a href="https://t.me/onlineexamautomation" target='_'>Telegram Channel</a></li>
          </ul>

        </div>

        <div className="feedback" id='feedback'>
          <h3>Feedback</h3>
          <p>Your feedback is invaluable to us. If you have any suggestions, comments, or ideas on how we can improve our services, please let us know.</p>

          <form action="#" method='post' onSubmit={handleSubmitUser}>
            <div className="input_div">
                <label htmlFor="username">
                Username <br />
                  <div>
                    <input
                      type="text"
                      id="username"
                      placeholder="john doe"
                      required=""
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
    </>
  )
}

