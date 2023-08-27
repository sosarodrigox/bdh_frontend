import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Proyectos() {
    return (
        <>
            <ul className="nav">
                <li className="nav-item"><NavLink to='proyectos_lista' className='nav-link'>Proyectos</NavLink></li>
            </ul>
            <Outlet />
        </>
    )
}