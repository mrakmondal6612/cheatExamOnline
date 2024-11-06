import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'


export default function Home() {
  const navigator = useNavigate()
  
  return (
    <>
      <div className="container">
        {/* <video src="live_testing_of_onlinemcq.mkv" controls loop></video> */}
        <div className="inner_container">
          <div className='homeouter'>
            <h2>Welcome to Our Website AutomaticExamBot</h2>
          </div>
          <div className="description">
            <p>Say good by to the hassle of taking online MCQ exams. With AutomaticExamBot, you can complete any type of online MCQ exam in just a few minutes, fully automatically. Simply run our app and let it handle the rest. </p>
          </div>
          <div className="btns">
            <div className="btndiv btndiv1">
            <button onClick={() => navigator('/download')}>Get Started Now</button>
            </div>
            <div className="btndiv btndiv2">
            <button onClick={() => navigator('/demos')}>Watch Demo</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
