import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Equipamiento() {
    return (
        <>
            <ul className="nav">
                <li className="nav-item"><NavLink to='equipamiento_lista' className='nav-link'>Equipamiento</NavLink></li>
            </ul>
            <Outlet />
        </>
    )
}