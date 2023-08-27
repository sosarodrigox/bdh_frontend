import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EmprendedoresLista() {
    const [emprendedores, setEmprendedores] = useState([]);

    useEffect(() => {
        getEmprendedores();
    }, []);

    const getEmprendedores = async () => {
        let resultado = await axios.get("http://localhost:8000/up/emprendedores");
        setEmprendedores(resultado.data);
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
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <button className="btn btn-primary">Agregar emprendedor</button> */}
            </div>
        </>
    );
}
