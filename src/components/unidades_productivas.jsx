import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function UnidadesProductivas() {
    return (
        <>
            <ul className="nav">
                <li className="nav-item"><NavLink to='emprendedores' className='nav-link'>Emprendedores</NavLink></li>
                <li className="nav-item"><NavLink to='grupos' className='nav-link'>Grupos Asociativos</NavLink></li>
                <li className="nav-item"><NavLink to='cooperativas' className='nav-link'>Cooperativas</NavLink></li>
            </ul>

            <Outlet />
        </>
    )
}