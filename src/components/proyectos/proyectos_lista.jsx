import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function ProyectosLista() {
    const [proyectos, setProyectos] = useState([])
    const navegar = useNavigate();

    useEffect(() => {
        getProyectos()
    }, [])

    const getProyectos = async () => {
        let resultado = await axios.get('http://localhost:8000/proyectos')
        setProyectos(resultado.data)
    }

    const agregarProyecto = () => {
        navegar("-1");
    };

    const modificarProyecto = (id) => {
        navegar("" + id);
    };

    // const asignarUnidadProductiva = (id) => {
    //     navegar("up/" + id);
    // };

    const eliminarProyecto = async (id) => {
        try {
            const confirmarEliminar = window.confirm(
                "¿Estás seguro de querer eliminar esta proyecto?"
            );
            if (confirmarEliminar) {
                await axios.delete(`http://localhost:8000/proyectos/${id}`);
                setProyectos(proyectos.filter((proyecto) => proyecto.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 text-center">Nómina de proyectos</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Eje</th>
                            <th>Tipo de Producción</th>
                            <th>Cantidad de Personas</th>
                            <th>Cantidad de UPs</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            proyectos.map((proyecto, idx) => (
                                <tr key={proyecto.id}>
                                    <td><Link to={"" + proyecto.id}>
                                        {proyecto.id}
                                    </Link>
                                    </td>
                                    <td>
                                        {proyecto.nombre}
                                    </td>
                                    <td>
                                        {proyecto.eje}
                                    </td>
                                    <td>
                                        {proyecto.tipo_produccion}
                                    </td>
                                    <td>
                                        {proyecto.cantidad_personas}
                                    </td>
                                    <td>
                                        {proyecto.cantidad_up}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => modificarProyecto(proyecto.id)}
                                        >
                                            Modificar
                                        </button>
                                    </td>

                                    {/* <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => asignarUnidadProductiva(proyecto.id)}
                                        >
                                            Asignar
                                        </button>
                                    </td> */}
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => eliminarProyecto(proyecto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={agregarProyecto}>Agregar proyecto</button>
            </div>
        </>)
}