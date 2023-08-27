import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GrupoAsociativoForm from "./grupo_asociativo_form";

export default function GrupoAsociativo({
    persona,
    unidadProductiva,
    setUnidadProductiva,
    nombreGrupo,
    setNombreGrupo
}) {
    const [grupos, setGrupos] = useState([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState({});
    const [asignarHabilitado, setAsignarHabilitado] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);


    const navegar = useNavigate();

    useEffect(() => {
        getGrupos();
    }, []);

    useEffect(() => {
        setAsignarHabilitado(!!grupoSeleccionado.id);
    }, [grupoSeleccionado]);

    const crearGrupo = () => {
        setMostrarFormulario(true);
    };

    const asignarGrupo = async () => {
        try {
            if (persona.rol !== "no asignado") {
                alert("La persona ya tiene un rol asignado");
            } else {
                if (grupoSeleccionado.id === -1) {
                    alert("Debe seleccionar un grupo");
                }
                let nuevoIntegrante = {
                    "id_grupo": grupoSeleccionado.id,
                    "id_nuevo_integrante": persona.id,
                }
                axios.post(`http://localhost:8000/grupos/nuevo`, nuevoIntegrante);

                alert(`Mensaje: ${persona.apellido}, ${persona.nombre} a sido asignado/a como integrante del grupo: ${grupoSeleccionado.nombre_grupo}`);
                navegar(-1);
            }
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    const getGrupos = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/grupos/`);
            setGrupos(resultado.data);
        } catch (error) {
            setGrupos([]);
            console.error(error);
            alert(error.response.data.detail);
        }
    };

    const handleChange = (e) => {
        const selectedGroupId = parseInt(e.target.value);

        if (selectedGroupId === -1) {
            setGrupoSeleccionado({});
        } else {
            const selectedGroup = grupos.find((grupo) => grupo.id === selectedGroupId);
            setGrupoSeleccionado(selectedGroup);
        }
    };

    return (
        <div>
            <h4 className="mt-3 text-center">GRUPO ASOCIATIVO</h4>
            <div className="mb-3">
                <label className="form-label">Listado de Grupos:</label>
                <select className="form-control"
                    id="listadoDeGrupos"
                    name="listadoDeGrupos"
                    value={grupoSeleccionado.id || -1}
                    onChange={handleChange}
                >
                    <option value="-1">Seleccione un grupo</option>
                    {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                            {grupo.nombre_grupo}
                        </option>
                    ))}
                </select>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={crearGrupo}>CREAR GRUPO</button>
                <button className="btn btn-primary" onClick={asignarGrupo} disabled={!asignarHabilitado}>
                    ASIGNAR A GRUPO
                </button>
            </div>
            {mostrarFormulario && <GrupoAsociativoForm
                persona={persona}
                unidadProductiva={unidadProductiva}
                setUnidadProductiva={setUnidadProductiva}
                nombreGrupo={nombreGrupo}
                setNombreGrupo={setNombreGrupo}
            />}
        </div>
    );
}