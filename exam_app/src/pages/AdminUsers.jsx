import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'
import './AdminUsers.css'

export default function AdminUsers() {
    const { BACKEND_HOSTING_URL, authorizationToken } = useAuth()
    const [users, setUsers] = useState([
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
        // {username: 'Sk Ahidulla', email: 'skahidulla568@gmail.com', phone: '+91 86097 20621'},
    ])

    const getAllUsersData = async () => {
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/users`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })
            const res_data = await response.json()
            // console.log(`users data : ${data}`);
            if(response.ok){
                setUsers(res_data)
            }else{
                Object.values(res_data).map((err) => {
                    return toast.error(err)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/admin/users/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: authorizationToken
                }
            })
            const res_data = await response.json()
            // console.log(`users data : ${data}`);
            if(response.ok){
                toast.success('User Deleted Successfuly')
                getAllUsersData()
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
        getAllUsersData()
    }, [])
  return (
    <>
        <section className='admin_user_section'>
        <div className='admin_user_header'>
            <h1>Admin Users</h1>
        </div>
        <div className='admin_user_table'>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((curUser, index) => {
                        return (
                            <tr key={index}>
                                <td>{curUser.username}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.phone}</td>
                                <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                                <td><button onClick={() => deleteUser(curUser._id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        </section>
    </>
  )
}
