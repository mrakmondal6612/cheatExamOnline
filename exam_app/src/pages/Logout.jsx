import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import { toast } from 'react-toastify'

export default function Logout() {
    const { LogoutUser, isLoggedIn } = useAuth()

    if (isLoggedIn){
        toast.info('Logout Successful')
    }
    
    useEffect(() => {
        LogoutUser()
    }, [LogoutUser])
    
    return <Navigate to='/login'/>
}
