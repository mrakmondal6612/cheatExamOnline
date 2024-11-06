import React, { useState, useEffect } from 'react'
import './Profile.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function Profile() {
    const [chnageProfile, setChangeProfile] = useState("../hacker_logo.png")
    const { user } = useAuth()

    useEffect(() => {
        // Load the image from local storage on component mount
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setChangeProfile(storedImage);
        }
    }, []);

    const uploadImage = (evt) => {
        const file = evt.target.files[0]

        if(file){
            const reader = new FileReader()
            reader.onload = (e) => {
                const base64Image = e.target.result;
                localStorage.setItem('profileImage', base64Image);
                setChangeProfile(base64Image);
            };
            reader.readAsDataURL(file);
        }
    }
  return (
    <>
        <div className="profile_outer">
            <div className="profile_image profile_conatiner">
                <div className="image">
                    <img src={chnageProfile} alt="" />
                    <input type="file" onChange={uploadImage} accept='image/*'/>
                    <i>Edit Profile</i>
                </div>

                <div className="name_email">
                    <h3>{user.username}</h3>
                    <p>{user.email}</p>
                </div>

                <div className="no_coins">
                    <div className="coins">{user.creaditPoints}</div>
                    <p>coins 🪙</p>
                </div>
            </div>

            <hr className='profile_conatiner'/>

            <div className="buy_coins profile_conatiner">
                {/* <h3>Buy Coins</h3> */}
                
                <NavLink to='/change_password'>Change Password</NavLink>
                <hr />
                <NavLink to='/buy_coins'>Buy Coins 🪙</NavLink>
                <hr />
                <NavLink to='/contact#feedback'>Feedback 📝</NavLink>
                <hr />
                <NavLink to='/demos'>Help</NavLink>
                <hr />
                <NavLink to='/about'>About</NavLink>
            </div>

            <div className="logout profile_conatiner">
                <NavLink to='/logout'>Sign Out</NavLink>
            </div>
        </div>
    </>
  )
}