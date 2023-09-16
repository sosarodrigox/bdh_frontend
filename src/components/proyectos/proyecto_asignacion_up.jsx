
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProyectoAsignacionUP() {
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState({});
    const [up, setUP] = useState({});

    const params = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        getUP(params.id);
        getProyectos();
    }, []);

    const getUP = async (id) => {
        try {
            let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/up/${id}`);
            setUP(resultado.data);
        } catch (error) {
            console.log(error);
            setUP({});
        }
    };

    const getProyectos = async () => {
        try {
            let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/proyectos`);
            setProyectos(resultado.data);
        } catch (error) {
            setProyectos([]);
            console.error(error);
            alert(error.response.data.detail);
        }
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        const proyectoSeleccionadoId = parseInt(e.target.value);

        if (proyectoSeleccionadoId === -1) {
            console.log('proyectoSeleccionadoId === -1');
            setProyectoSeleccionado({});
        } else {
            console.log('proyectoSeleccionadoId !== -1');
            console.log(proyectoSeleccionadoId);
            const proyectoSeleccionado = proyectos.find((proyecto) => proyecto.id === proyectoSeleccionadoId);
            setProyectoSeleccionado(proyectoSeleccionado);
        }
    };

    const asignarProyecto = async () => {
        try {
            if (!Object.keys(proyectoSeleccionado).length) {
                alert("Debe seleccionar el proyecto");
            } else {
                await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/up/${up.id}/${proyectoSeleccionado.id}`);

                alert(`La Unidad Productiva ${up.denominacion_up} ha sido asignada al proyecto: ${proyectoSeleccionado.nombre}`);
                navegar(-1);
            }
        } catch (error) {
            console.log("catch");
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h1 className="mt-3 text-center">Asignar UP a Proyecto:</h1>
            <h3 className="mt-3 text-center">
                Tipo UP: {up.tipo_up} - Denominación: {up.denominacion_up}
            </h3>
            <div className="mb-3">
                <label className="form-label">Listado de Proyectos:</label>
                <select className="form-control"
                    id="listadoProyectos"
                    name="listadoProyectos"
                    value={proyectoSeleccionado.id || -1}
                    onChange={handleChange}
                >
                    <option value="-1">Seleccione proyecto</option>
                    {proyectos.map((proyecto) => (
                        <option key={proyecto.id} value={proyecto.id}>
                            {proyecto.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3 text-end">
                <button className="btn btn-primary me-1" onClick={asignarProyecto}>
                    Aceptar
                </button>
                <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}