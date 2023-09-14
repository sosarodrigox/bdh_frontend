import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EquipamientoAsignacionUP() {
    const [equipamientos, setEquipamientos] = useState([]);
    const [equipamientoSeleccionado, setEquipamientoSeleccionado] = useState({});
    const [up, setUP] = useState({});

    const params = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        getUP(params.id);
        getEquipamientos();
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

    const getEquipamientos = async () => {
        try {
            let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/equipamiento/`);
            setEquipamientos(resultado.data);
        } catch (error) {
            setEquipamientos([]);
            console.error(error);
            alert(error.response.data.detail);
        }
    };

    const handleChange = (e) => {
        console.log(e.target.value);
        const equipamientoSeleccionadoId = parseInt(e.target.value);

        if (equipamientoSeleccionadoId === -1) {
            console.log('equipamientoSeleccionadoId === -1');
            setEquipamientoSeleccionado({});
        } else {
            console.log('equipamientoSeleccionadoId !== -1');
            console.log(equipamientoSeleccionadoId);
            const equipamientoSeleccionado = equipamientos.find((eq) => eq.id === equipamientoSeleccionadoId);
            setEquipamientoSeleccionado(equipamientoSeleccionado);
        }
    };

    const asignarEquipamiento = async () => {
        console.log("asignarEquipamiento");
        try {
            console.log("try");
            if (!Object.keys(equipamientoSeleccionado).length) {
                console.log("if");
                alert("Debe seleccionar el equipamiento");
            } else {
                console.log("else");
                let nuevoEquipamiento = {
                    "id_equipamiento": equipamientoSeleccionado.id,
                    "id_up": up.id,
                    "cantidad": 1.0,
                    "valor_total": 10.00
                }
                console.log(nuevoEquipamiento);
                await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/asignaciones`, nuevoEquipamiento);

                alert(`La Unidad Productiva ${up.denominacion_up}, a sido equipada con: ${equipamientoSeleccionado.descripcion_principal}`);
                navegar(-1);
            }
        } catch (error) {
            console.log("catch");
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h1 className="mt-3 text-center">Asignar Equipamiento a UP:</h1>
            <h3 className="mt-3 text-center">
                {up.tipo_up} - {up.denominacion_up}
            </h3>
            <div className="mb-3">
                <label className="form-label">Listado de Equipamiento:</label>
                <select className="form-control"
                    id="listadoEquipamiento"
                    name="listadoEquipamiento"
                    value={equipamientoSeleccionado.id || -1}
                    onChange={handleChange}
                >
                    <option value="-1">Seleccione equipamiento</option>
                    {equipamientos.map((equipamiento) => (
                        <option key={equipamiento.id} value={equipamiento.id}>
                            {equipamiento.descripcion_principal}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3 text-end">
                <button className="btn btn-primary me-1" onClick={asignarEquipamiento}>
                    Aceptar
                </button>
                <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
