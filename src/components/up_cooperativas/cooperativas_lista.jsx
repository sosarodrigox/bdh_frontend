import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CooperativasLista() {
    const [cooperativas, setCooperativas] = useState([]);
    const navegar = useNavigate();

    useEffect(() => {
        getCooperativas();
    }, []);

    const getCooperativas = async () => {
        let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/up`);
        const cooperativasFiltradas = resultado.data.filter(cooperativa => cooperativa.tipo_up === "cooperativa");
        setCooperativas(cooperativasFiltradas);
    };

    const asignarEquipamiento = (id) => {
        navegar("equipamiento/" + id);
    };

    const asignarProyecto = (id) => {
        navegar("proyecto/" + id);
    };

    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 text-center">Cooperativas</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>denominacion_up</th>
                            <th>emprendimiento_formalizado</th>
                            <th>emprendimiento_activo</th>
                            <th>presidente_id</th>
                            <th>Equipamiento</th>
                            <th>Proyecto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cooperativas.map((cooperativa, idx) => (
                            <tr key={cooperativa.id}>
                                <td>
                                    <Link to={"" + cooperativa.id}>{cooperativa.id}</Link>
                                </td>
                                <td>{cooperativa.denominacion_up}</td>
                                <td>{cooperativa.emprendimiento_formalizado ? "Sí" : "No"}</td>
                                <td>{cooperativa.emprendimiento_activo ? "Sí" : "No"}</td>
                                <td>{cooperativa.persona_id}</td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => asignarEquipamiento(cooperativa.id)}
                                    >
                                        Equipar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => asignarProyecto(cooperativa.id)}
                                    >
                                        Asignar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
