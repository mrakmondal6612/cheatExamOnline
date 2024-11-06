import React from 'react'
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="error_page">
      <div className="inner_error">
        <h2 className="error_heading">404<br/>ERROR</h2>
        <div className="buttons">
          <button onClick={() => navigate('/')}>Go to Home Page</button>
          <button onClick={() => navigate('/contact#feedback')}>Report to Server</button>
        </div>
      </div>
    </div>
  )
}
