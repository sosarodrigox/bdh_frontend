import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Home() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid align-items-center p-4">
                    <NavLink to='/' className='navbar-brand'>Banco de Herramientas V1.0</NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink to='personas' className='nav-link'>Personas</NavLink></li>
                            <li className="nav-item"><NavLink to='up' className='nav-link'>Unidades Productivas</NavLink></li>
                            <li className="nav-item"><NavLink to='proyectos' className='nav-link'>Proyectos</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav >

            <Outlet />
        </>
    );
}