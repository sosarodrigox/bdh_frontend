import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function PersonasLista() {
    const [personas, setPersonas] = useState([])
    const navegar = useNavigate();

    useEffect(() => {
        getPersonas()
    }, [])

    const getPersonas = async () => {
        let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/personas`)
        setPersonas(resultado.data)
    }

    const agregarPersona = () => {
        navegar("-1");
    };

    const modificarPersona = (id) => {
        navegar("" + id);
    };

    const asignarUnidadProductiva = (id) => {
        navegar("up/" + id);
    };

    const eliminarPersona = async (id) => {
        try {
            const confirmarEliminar = window.confirm(
                "¿Estás seguro de querer eliminar esta persona?"
            );
            if (confirmarEliminar) {
                await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/personas/${id}`);
                setPersonas(personas.filter((persona) => persona.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 text-center">Nómina de personas</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Apellido</th>
                            <th>Nombre</th>
                            <th>CUIL</th>
                            <th>Género</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Nivel Educativo</th>
                            <th>Título Profesional</th>
                            <th>Situacion Laboral</th>
                            <th>Saberes/Experiencia</th>
                            <th>CFP</th>
                            <th>Estado</th>
                            <th>Modificar</th>
                            <th>Asignar UP</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            personas.map((persona, idx) => (
                                <tr key={persona.id}>
                                    <td><Link to={"" + persona.id}>
                                        {persona.id}
                                    </Link>
                                    </td>
                                    <td>
                                        {persona.apellido}
                                    </td>
                                    <td>
                                        {persona.nombre}
                                    </td>
                                    <td>
                                        {persona.cuil}
                                    </td>
                                    <td>
                                        {persona.genero}
                                    </td>
                                    <td>
                                        {persona.fecha_nacimiento}
                                    </td>
                                    <td>
                                        {persona.nivel_educativo}
                                    </td>
                                    <td>
                                        {persona.titulo_prof}
                                    </td>
                                    <td>
                                        {persona.situacion_laboral}
                                    </td>
                                    <td>
                                        {persona.saberes_experiencia}
                                    </td>
                                    <td>
                                        {persona.curso_formacion_prof}
                                    </td>
                                    <td>
                                        {persona.rol}
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => modificarPersona(persona.id)}
                                        >
                                            Modificar
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => asignarUnidadProductiva(persona.id)}
                                        >
                                            Asignar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => eliminarPersona(persona.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={agregarPersona}>Agregar persona</button>
            </div>
        </>)
}