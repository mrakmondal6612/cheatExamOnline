import './About.css'
import { useAuth } from '../store/auth'

export default function About() {
  const {user} = useAuth()
  
  return (
    <>
      <div className="about">
        <h2>About Us</h2>

        <div className="hiloggeduser">
        <h3 style={{textAlign: 'left', fontSize: '1.5rem'}}>Welcome, {user ? user.username + ' to Our Website': 'to Our Website'}</h3>
        </div>
        
        <div className="about_wwa">
          <h3>Who We Are</h3>
          <p>Welcome to AutomaticExamBot, your ultimate partner in conquering online MCQ exams effortlessly. We are a team of passionate innovators, developers, and education enthusiasts dedicated to making the exam process as smooth and stress-free as possible. Our mission is to transform the way online exams are taken with our fully automated solution.</p>
        </div>

        <div className="about_om">
          <h3>Our Mission</h3>
          <p>At AutomaticExamBot, our mission is to empower students and professionals by providing a seamless, accurate, and time-saving tool for online MCQ exams. We believe that technology can simplify and enhance the exam experience, allowing users to focus on what truly matters.</p>
        </div>

        <div className="about_oj">
          <h3>Our Journey</h3>
          <p>The journey of AutomaticExamBot began with a simple yet powerful idea: to automate the tedious process of taking online MCQ exams. Our founder, Mad Hacker, experienced firsthand the frustration of spending countless hours on exams. This led to the development of AutomaticExamBot, an app designed to automatically complete online MCQ exams quickly and accurately. Since our inception, we have grown into a trusted solution for users worldwide.</p>
        </div>

        <div className="about_mtt">
          <h3>Meet the Team</h3>
          <p>Our team is a diverse group of professionals committed to excellence and innovation.</p>
          <ul>
            <li><b>Mad Haacker:</b> Founder</li>
            <li><b>Riku:</b> CEO</li>
          </ul>
          <p>Together, we work tirelessly to ensure that AutomaticExamBot meets the highest standards of performance and reliability.</p>
        </div>

        <div className="about_wwo">
          <h3>What We Offer</h3>
          <p>AutomaticExamBot offers a revolutionary approach to online MCQ exams with its fully automated system. Key features include:</p>
          <ul>
            <li><b>Full Automation:</b> Complete any online MCQ exam in just 5-6 minutes without manual input.</li>
            <li><b>Accuracy:</b> Our advanced algorithms ensure precise answers, maximizing your scores.</li>
            <li><b>Ease of Use:</b> Designed for simplicity, making it accessible to users of all skill levels.</li>
          </ul>
        </div>

        <div className="about_wous">
          <h3>What Our Users Say</h3>
          <p><i>"AutomaticExamBot has saved me so much time and stress. The automation is incredibly accurate and efficient." - Sarah Lee, University Student</i></p>
          <p><i>"I was skeptical at first, but AutomaticExamBot exceeded my expectations. It's a must-have tool for anyone taking online exams." - Michael Davis, Professional Learner</i></p>
        </div>

        <div className="about_git">
          <h3>Get in Touch</h3>
          <p>We're here to assist you with any questions or support you may need. Feel free to reach out to us.</p>
          
          <ul>
            <li>Email: automaticexambot@gmail.com</li>
            {/* <li>Phone: +1 (123) 456-7890</li> */}
          </ul>
        </div>

      </div>
    </>
  )
}