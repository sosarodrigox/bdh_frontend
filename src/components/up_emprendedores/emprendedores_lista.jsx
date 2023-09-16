import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmprendedoresLista() {
    const [emprendedores, setEmprendedores] = useState([]);
    const navegar = useNavigate();

    useEffect(() => {
        getEmprendedores();
    }, []);

    const getEmprendedores = async () => {
        let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/up`);
        const emprendedoresFiltrados = resultado.data.filter(emprendedor => emprendedor.tipo_up === "emprendedor");
        setEmprendedores(emprendedoresFiltrados);
    };

    const asignarEquipamiento = (id) => {
        navegar("equipamiento/" + id);
    };

    const asignarProyecto = (id) => {
        navegar("up/" + id);
    };

    return (
        <>
            <div className="Container-fluid">
                <h4 className="mt-3 text-center">Emprendedores individuales</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>denominacion_up</th>
                            <th>emprendimiento_formalizado</th>
                            <th>emprendimiento_activo</th>
                            <th>emprendedor_id</th>
                            <th>Equipamiento</th>
                            <th>Proyecto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emprendedores.map((emprendedor, idx) => (
                            <tr key={emprendedor.id}>
                                <td>
                                    <Link to={"" + emprendedor.id}>{emprendedor.id}</Link>
                                </td>
                                <td>{emprendedor.denominacion_up}</td>
                                <td>{emprendedor.emprendimiento_formalizado ? "Sí" : "No"}</td>
                                <td>{emprendedor.emprendimiento_activo ? "Sí" : "No"}</td>
                                <td>{emprendedor.persona_id}</td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => asignarEquipamiento(emprendedor.id)}
                                    >
                                        Equipar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => asignarProyecto(emprendedor.persona_id)}
                                    >
                                        Asignar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <button className="btn btn-primary">Agregar emprendedor</button> */}
            </div>
        </>
    );
}
