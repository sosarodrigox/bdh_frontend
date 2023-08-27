import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CooperativasLista() {
    const [cooperativas, setCooperativas] = useState([]);

    useEffect(() => {
        getCooperativas();
    }, []);

    const getCooperativas = async () => {
        let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/up/cooperativas`);
        setCooperativas(resultado.data);
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
