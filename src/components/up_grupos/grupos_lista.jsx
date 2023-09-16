import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function GruposLista() {
    const [grupos, setGrupos] = useState([]);
    const navegar = useNavigate();

    useEffect(() => {
        getGrupos();
    }, []);

    const getGrupos = async () => {
        let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/up`);
        const gruposFiltrados = resultado.data.filter(grupo => grupo.tipo_up === "grupo");
        setGrupos(gruposFiltrados);
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
                <h4 className="mt-3 text-center">Grupos asociativos</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>denominacion_up</th>
                            <th>emprendimiento_formalizado</th>
                            <th>emprendimiento_activo</th>
                            <th>representante_id</th>
                            <th>Equipamiento</th>
                            <th>Proyecto</th>
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
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => asignarEquipamiento(grupo.id)}
                                    >
                                        Equipar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => asignarProyecto(grupo.id)}
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
