import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import './AdminContacts.css'
import { Link } from 'react-router-dom'

export default function AdminContacts() {
  const { BACKEND_HOSTING_URL, authorizationToken } = useAuth()
  const [allContacts, setAllContacts] = useState([
    // {username: "ahidulla", email: 'somting@gmail.com', message:'jd jdhsccjd jdjnc jdscjd djchjcd djhcdjdc jhfcjc skndds jns asdjcsjc jsdd jdcc sdnn jdcnn jj'},
    
  ])

  const getContactsData = async () => {
    try {
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/contacts`, {
          method: 'GET',
          headers: {
              Authorization: authorizationToken
          }
      })
      const res_data = await response.json()
      // console.log(`users data : ${data}`);
      if(response.ok){
        setAllContacts(res_data)
        // console.log(res_data);
      }else{
          Object.values(res_data).map((err) => {
              return toast.error(err)
          })
      }
  } catch (error) {
      console.log(error)
  }
  }

  const deleteContactById = async (id) => {
    try {
      const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/contacts/delete/${id}`, {
          method: 'DELETE',
          headers: {
              Authorization: authorizationToken
          }
      })
      const res_data = await response.json()
      // console.log(`users data : ${data}`);
      if(response.ok){
          toast.success('Contact Deleted Successfuly')
          getContactsData()
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
    getContactsData()
  }, [])

  return (
    <>
      <div className="contact_outer">
        <div className="header">
          <h1>Admin Contacts</h1>
        </div>
        <div className="msg_box_outer">
          {
            allContacts.map((contact, index) => {
              return(
                <div className="msg_box" key={index}>
                  <div className="user_details">
                    <h4>{contact.username}</h4>
                    <h5>{contact.email}</h5>
                  </div>
                  <div className="message">
                    <p>{contact.message}</p>
                  </div>
                  <div className="reply_del">
                    <Link to={`/admin/contacts/${contact.email}/reply`} className="reply">Reply</Link>
                    <button className='delete' onClick={() => deleteContactById(contact._id)}>Delete</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}
