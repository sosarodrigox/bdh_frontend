import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Personas() {
    return (
        <>
            <ul className="nav">
                <li className="nav-item"><NavLink to='personas_lista' className='nav-link'>Personas</NavLink></li>
            </ul>
            <Outlet />
        </>
    )
}