import React, { useEffect, useState } from 'react'
import './Download.css'
import { useAuth } from '../store/auth'

export default function Download() {
  const [application, setApplication] = useState({features: []})
  const {BACKEND_HOSTING_URL} = useAuth()

  const getAppVersion = async () => {
    try {
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/versions/get_app`, {
          method: 'GET'
      })
      if(response.ok){
        const ver_data = await response.json()
        setApplication(ver_data)
        console.log(ver_data);
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAppVersion()
  }, [])

  return (
    <>
      <div className="download_outer">
        <div className="head contain">
          <h2>AutomaticExambot {application.version}</h2>
          <p><b>Release Date:</b> {application.release_date}</p>
        </div>

        <div className="cta contain">
          <h4>Download AutomaticExambot {application.version} Now</h4>
          <p>Get started with the most powerful online MCQ automation tool today. Click the button below to download the latest version and transform your exam administration process.</p>
          <div className="download_button">
            <button className="download_btn">Download Now</button>
          </div>
        </div>

        <div className="head_line contain">
          <h4>Welcome to AutomaticExambot {application.version}</h4>
          <p>AutomaticExambot {application.version} is the latest and most advanced release of our Online MCQ automation tool. This version introduces a host of new features and performance improvements designed to make exam administration easier and more efficient than ever.</p>
        </div>

        <div className="features contain">
          <h4>Key Features of AutomaticExambot</h4>
          <ul>
            <li><b>Affordable:</b> Cost-effective solution for institutions of all sizes.</li>
            <li><b>Fully Automatic:</b> Minimizes manual intervention, allowing seamless exam administration.</li>
            <li><b>Robust Performance:</b> Operates smoothly even with low network connectivity.</li>
            <li><b>User-Friendly Interface:</b> Intuitive design that's easy for both administrators and students to use.</li>
            <li><b>Real-time Analytics:</b> Get instant insights into exam performance and student progress.</li>
            <li><b>Secure:</b> Advanced security features to ensure the integrity of your exams.</li>
            <li><b>Scalable:</b> Easily handles large volumes of students and exam sessions.</li>
            <li><b>Customizable:</b> Tailor the platform to meet your specific needs.</li>
          </ul>
        </div>

        <div className="improvements contain">
          <h4>What's New in Version {application.version}</h4>
          <ul>
            {
              application.features.map((feature, idx) => {
                return <li key={idx}>{feature}</li>
              })
            }
          </ul>
        </div>

        <div className="cta contain">
          <h4>Download AutomaticExambot {application.version} Now</h4>
          <p>Get started with the most powerful online MCQ automation tool today. Click the button below to download the latest version and transform your exam administration process.</p>
          <div className="download_button">
            <button className="download_btn">Download Now</button>
          </div>
        </div>
      </div>
    </>
  )
}
