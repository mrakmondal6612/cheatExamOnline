import React, { useEffect, useState } from 'react'
import './Demos.css'
import { useAuth } from '../store/auth'


export default function Demos() {

  const [videos, setVideos] = useState([])
  const {BACKEND_HOSTING_URL} = useAuth()

  const getDemoVideos = async () => {
    try {
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/versions/get_demos`, {
          method: 'GET'
      })
      if(response.ok){
        const demos_data = await response.json()
        setVideos(demos_data)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDemoVideos()
  }, [])

  return (
      videos.map((vid, index) => {
          return (
            <div className="demo_outer" key={index}>
              <div className="demo_inner">
              <h2>{vid.title}</h2>
                <video src={vid.link} loop controls></video>
                <p>{vid.description}hi</p>
              </div>
            </div>
          )
      })
  )
}