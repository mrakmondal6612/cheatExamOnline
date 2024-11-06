import React from 'react'
import './Download.css'
import './Products.css'
import { NavLink } from 'react-router-dom'

export default function Products() {
  return (
    <div className="product_outer download_outer">
      <div className="head contain">
          <h2>AutomaticExambot: The Ultimate MCQ Exam Automation Tool</h2>
          <p>Streamline your online exams with AutomaticExambot.</p>
        </div>

        <div className="head_line contain">
          <h4>Product Overview</h4>
          <p>AutomaticExambot is designed to simplify and automate the process of conducting multiple-choice question (MCQ) exams online. Whether you're an educator, institution, or organisation, AutomaticExambot ensures a seamless, secure, and efficient examination process.</p>
        </div>
        
        <div className="features contain">
          <h4>Key Features of AutomaticExambot</h4>
          <ul>
            <li><b>Automatic Question Generation:</b> Easily generate and customise MCQs from a vast database.</li>
            <li><b>Fully Automatic:</b> Minimizes manual intervention, allowing seamless exam administration.</li>
            <li><b>Robust Performance:</b> Operates smoothly even with low network connectivity.</li>
            <li><b>User-Friendly Interface:</b> Intuitive design that's easy for both administrators and students to use.</li>
            <li><b>Real-time Analytics:</b> Get instant insights into exam performance and student progress.</li>
            <li><b>Secure:</b> Advanced security features to ensure the integrity of your exams.</li>
            <li><b>Scalable:</b> Easily handles large volumes of students and exam sessions.</li>
            <li><b>Customizable:</b> Tailor the platform to meet your specific needs.</li>
          </ul>
        </div>

        <div className="demos contain">
          <h3>See AutomaticExambot in Action <NavLink to='/demos'><b>[Watch Demos]</b></NavLink></h3>
        </div>

        <div className="pricing contain">
          <h3>Pricing <NavLink to='/pricing'><b>[Pricing]</b></NavLink></h3>
        </div>

        <div className="faq contain">
          <h4>Frequently Asked Questions</h4>
          <p><b>Q:</b> What are the system requirements for AutomaticExambot?<br />
          <b>A:</b> AutomaticExambot requires Windows 10 or higher, 4GB RAM, and 100MB free disk space..</p>
          <p><b>Q:</b> How do I get customer support?<br />
          <b>A:</b> You can reach out to our support team 24/7 via email at support@automaticexambot.com.</p>
        </div>

    </div>
  )
}


// Pricing
// One-Time Purchase: £99

// Lifetime access to all features
// Free updates for one year
// 24/7 customer support
// [Buy Now]
// (Include a prominently placed button here)

// Frequently Asked Questions




// Get in Touch
// If you have any questions or need further assistance, feel free to contact us at support@automaticexambot.com.

