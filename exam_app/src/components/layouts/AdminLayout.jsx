import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './AdminLayout.css'

export default function AdminLayout() {
  return (
    <>
        <header>
            <div className="admin_nav">
                <nav>
                    <ul>
                        <li><NavLink to='/admin/users'>Users</NavLink></li>
                        <li><NavLink to='/admin/contacts'>Contacts</NavLink></li>
                        <li><NavLink to='/products'>Products</NavLink></li>
                        <li><NavLink to='/'>Home</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet/>
    </>
  )
}