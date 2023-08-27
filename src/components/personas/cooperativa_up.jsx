import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CooperativaForm from "./cooperativa_form";

export default function Cooperativa({
    persona,
    unidadProductiva,
    setUnidadProductiva,
    nombreCooperativa,
    setNombreCooperativa
}) {
    const [cooperativas, setCooperativas] = useState([]);
    const [cooperativaSeleccionada, setCooperativaSeleccionada] = useState({});
    const [asignarHabilitado, setAsignarHabilitado] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);


    const navegar = useNavigate();

    useEffect(() => {
        getCooperativas();
    }, []);

    useEffect(() => {
        setAsignarHabilitado(!!cooperativaSeleccionada.id);
    }, [cooperativaSeleccionada]);

    const crearCooperativa = () => {
        setMostrarFormulario(true);
    };

    const asignarCooperativa = async () => {
        try {
            if (persona.rol !== "no asignado") {
                alert("La persona ya tiene un rol asignado");
            } else {
                if (cooperativaSeleccionada.id === -1) {
                    alert("Debe seleccionar un grupo");
                }
                let nuevoAsociado = {
                    "id_cooperativa": cooperativaSeleccionada.id,
                    "id_nuevo_asociado": persona.id,
                }
                axios.post(`http://localhost:8000/cooperativas/nuevo`, nuevoAsociado);

                alert(`Mensaje: ${persona.apellido}, ${persona.nombre} a sido asignado/a como asociado de la cooperativa: ${cooperativaSeleccionada.nombre_cooperativa}`);
                navegar(-1);
            }
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    const getCooperativas = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/cooperativas`);
            setCooperativas(resultado.data);
        } catch (error) {
            setCooperativas([]);
            console.error(error);
            alert(error.response.data.detail);
        }
    };

    const handleChange = (e) => {
        const selectedCoopId = parseInt(e.target.value);

        if (selectedCoopId === -1) {
            setCooperativaSeleccionada({});
        } else {
            const selectedCoop = cooperativas.find((cooperativa) => cooperativa.id === selectedCoopId);
            setCooperativaSeleccionada(selectedCoop);
        }
    };

    return (
        <div>
            <h4 className="mt-3 text-center">COOPERATIVA</h4>
            <div className="mb-3">
                <label className="form-label">Listado de Cooperativas:</label>
                <select className="form-control"
                    id="listadoDeCooperativas"
                    name="listadoDeCooperativas"
                    value={cooperativaSeleccionada.id || -1}
                    onChange={handleChange}
                >
                    <option value="-1">Seleccione una cooperativa</option>
                    {cooperativas.map((cooperativa) => (
                        <option key={cooperativa.id} value={cooperativa.id}>
                            {cooperativa.nombre_cooperativa}
                        </option>
                    ))}
                </select>
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={crearCooperativa}>CREAR COOPERATIVA</button>
                <button className="btn btn-primary" onClick={asignarCooperativa} disabled={!asignarHabilitado}>
                    ASIGNAR A COOPERATIVA
                </button>
            </div>
            {mostrarFormulario && <CooperativaForm
                persona={persona}
                unidadProductiva={unidadProductiva}
                setUnidadProductiva={setUnidadProductiva}
                nombreCooperativa={nombreCooperativa}
                setNombreCooperativa={setNombreCooperativa}
            />}
        </div>
    );
}