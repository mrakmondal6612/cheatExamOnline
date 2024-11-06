import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    // const BACKEND_HOSTING_URL = 'https://dbbe-2409-40e1-1d-e085-5d44-bc22-a559-944c.ngrok-free.app'
    const BACKEND_HOSTING_URL = 'https://867f-2409-40e1-106f-f397-885b-f12d-3427-fe6a.ngrok-free.app'

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState('')
    const authorizationToken = `Bearer ${token}`

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem('token', serverToken)
    }

    let isLoggedIn = !!token

    // tackling the logout functionality 
    const LogoutUser = () => {
        setToken('')
        return localStorage.removeItem('token')
    }

    // JWT Authentication - to get currently logged in data

    const userAuthentication = async () => {
        try {
            const response = await fetch(`${BACKEND_HOSTING_URL}/api/auth/user`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken
                }
            })
            console.log(response);

            if (response.ok) {
                const data = await response.json()
                setUser(data.userData)
                // console.log('user data: ', data.userData);
            }
        } catch (error) {
            console.log('Error fetching user data:', `${error}`);
        }
    }

    useEffect(() => {
        userAuthentication()
    }, [token, ])


    return <AuthContext.Provider value={{storeTokenInLS, LogoutUser, isLoggedIn, BACKEND_HOSTING_URL, user, authorizationToken}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if(!authContextValue){
        throw new Error('useAuth used outside of the Provider')
    }
    return authContextValue
}
