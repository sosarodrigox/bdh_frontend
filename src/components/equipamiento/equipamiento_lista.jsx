import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function EquipamientoLista() {
    const [equipamientos, setEquipamientos] = useState([])
    const navegar = useNavigate();

    useEffect(() => {
        getEquipamientos()
    }, [])

    const getEquipamientos = async () => {
        let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/equipamiento`)
        setEquipamientos(resultado.data)
    }

    const agregarEquipamiento = () => {
        navegar("-1");
    };

    const modificarEquipamiento = (id) => {
        navegar("" + id);
    };

    const eliminarEquipamiento = async (id) => {
        try {
            const confirmarEliminar = window.confirm(
                "¿Estás seguro de eliminar este equipamiento?"
            );
            if (confirmarEliminar) {
                await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/equipamiento/${id}`);
                setEquipamientos(equipamientos.filter((equipamiento) => equipamiento.id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 text-center">Listado de equipamiento</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo</th>
                            <th>Descripcion Principal</th>
                            <th>Descripcion Secundaria</th>
                            <th>Potencia (valor)</th>
                            <th>Potencia (unidad)</th>
                            <th>Valor ($)</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            equipamientos.map((equipamiento, idx) => (
                                <tr key={equipamiento.id}>
                                    <td><Link to={"" + equipamiento.id}>
                                        {equipamiento.id}
                                    </Link>
                                    </td>
                                    <td>
                                        {equipamiento.descripcion_principal}
                                    </td>
                                    <td>
                                        {equipamiento.descripcion_secundaria}
                                    </td>
                                    <td>
                                        {equipamiento.potencia_valor}
                                    </td>
                                    <td>
                                        {equipamiento.potencia_unidad}
                                    </td>
                                    <td>
                                        {equipamiento.valor}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => modificarEquipamiento(equipamiento.id)}
                                        >
                                            Modificar
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => eliminarEquipamiento(equipamiento.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={agregarEquipamiento}>Agregar equipamiento</button>
            </div>
        </>)
}