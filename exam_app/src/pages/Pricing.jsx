import './Pricing.css'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Pricing() {
  const [userApiKeys, setUserApiKeys] = useState([])
  const { BACKEND_HOSTING_URL, user, authorizationToken, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const getAllUserAPIs = async () => {
    try {
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/api_key/get_all_api_by_email`, {
        method: 'POST',
        headers: {
            Authorization: authorizationToken,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({email: user.email})
      })
      const data = await response.json()
      if(response.ok){
        setUserApiKeys(data)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getAllUserAPIs()
  }, [getAllUserAPIs])

  const generateAPIKey = () => {
    if(isLoggedIn){
      navigate('/generate_key')
    }else{
      navigate('/login')
    }
  }
  const deleteAPIKey = async (email, api_key) =>{
    
      try {
        const response = await fetch(`${BACKEND_HOSTING_URL}/api/api_key/delete/apikey`, {
            method: 'DELETE',
            headers: {
                Authorization: authorizationToken,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({email, api_key})
        })
        const res_data = await response.json()
        // console.log(`users data : ${data}`);
        if(response.ok){
            toast.success('API key Deleted Successfuly')
            getAllUserAPIs()
        }else{
            Object.values(res_data).map((err) => {
                return toast.error(err)
            })
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
        <div className="pricing_outer">
          <div className="api_key_div">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>API KEY</th>
                    <th>Created</th>
                    <th>Starts From</th>
                    <th>Expires In</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userApiKeys.map((api, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{api._id.toString()}</td>
                        <td>{api.key}</td>
                        <td>{api.created.split('T')[0].split('-').reverse().join('-')}</td>
                        <td>{api.startDate.split('T')[0].split('-').reverse().join('-')}</td>
                        <td>{api.timeLeft}</td>
                        <td><button className="del_btn" onClick={() => deleteAPIKey(user.email, api.key)}>Delete</button></td>
                   </tr>
                    )
                  })
                  }
                </tbody>
              </table>
          </div>

          <div className="generate_api">
            <button className="gen_api_btn" onClick={generateAPIKey}>Generate Activation Key</button>
          </div>
        </div>
    </>
  )
}

