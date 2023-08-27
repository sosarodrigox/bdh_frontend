import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function GruposLista() {
    const [grupos, setGrupos] = useState([]);

    useEffect(() => {
        getGrupos();
    }, []);

    const getGrupos = async () => {
        let resultado = await axios.get("http://localhost:8000/up/grupos");
        setGrupos(resultado.data);
    };

    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 text-center">Grupos asociativos</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>denominacion_up</th>
                            <th>emprendimiento_formalizado</th>
                            <th>emprendimiento_activo</th>
                            <th>representante_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grupos.map((grupo, idx) => (
                            <tr key={grupo.id}>
                                <td>
                                    <Link to={"" + grupo.id}>{grupo.id}</Link>
                                </td>
                                <td>{grupo.denominacion_up}</td>
                                <td>{grupo.emprendimiento_formalizado ? "Sí" : "No"}</td>
                                <td>{grupo.emprendimiento_activo ? "Sí" : "No"}</td>
                                <td>{grupo.persona_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
