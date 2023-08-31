import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EquipamientoForm() {
    const [datos, setDatos] = useState({});
    const params = useParams();
    const navegar = useNavigate();

    const equipamiento = {
        id: -1,
        tipo: "",
        descripcion_principal: "",
        descripcion_secundaria: "",
        potencia_valor: 0.0,
        potencia_unidad: "",
        valor: 0.0
    }

    useEffect(() => {
        if (params.id < 0) {
            console.log(equipamiento)
            setDatos(equipamiento);
        } else {
            getEquipamiento(params.id);
        }

    }, [params.id]);

    const getEquipamiento = async (id) => {
        try {
            let resultado = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/equipamiento/${id}`);
            setDatos(resultado.data);
        } catch (error) {
            console.log(error);
            setDatos(equipamiento);
        }
    };

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        try {
            if (datos.id == -1) {
                let resultado = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/equipamiento/`, datos);
                console.log(resultado);
                alert("Equipamiento cargado con éxito");
            } else {
                let resultado = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/equipamiento/${datos.id}`, datos);
                console.log(resultado);
                alert("Equipamiento modificado con éxito");
            }
            navegar(-1);
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h2 className="mt-3 text-center">Datos del equipamiento</h2>
            <div className="mb-3 col-2">
                <label htmlFor="edId" className="form-label">
                    ID
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edId"
                    name="id"
                    value={datos.id}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edTipoProduccion" className="form-label">
                    Tipo
                </label>
                <select
                    className="form-control"
                    id="edTipoProduccion"
                    name="tipo"
                    value={datos.tipo}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="MAQUINA">Máquina</option>
                    <option value="HERRAMIENTA">Herramienta</option>
                    <option value="INSUMO">Insumo</option>
                </select>
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edDescripcionPrincipal" className="form-label">
                    Descripción Principal
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edDescripcionPrincipal"
                    name="descripcion_principal"
                    value={datos.descripcion_principal}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edDescripcionSecundaria" className="form-label">
                    Descripción Secundaria
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edDescripcionSecundaria"
                    name="descripcion_secundaria"
                    value={datos.descripcion_secundaria}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edPotenciaValor" className="form-label">
                    Potencia Valor
                </label>
                <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="edPotenciaValor"
                    name="potencia_valor"
                    value={datos.potencia_valor}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edPotenciaUnidad" className="form-label">
                    Potencia Unidad
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edPotenciaUnidad"
                    name="potencia_unidad"
                    value={datos.potencia_unidad}
                    onChange={handleChange}
                />
            </div>


            <div className="mb-3 col-2">
                <label htmlFor="edValor" className="form-label">
                    Valor
                </label>
                <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="edValor"
                    name="valor"
                    value={datos.valor}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 text-end">
                <button className="btn btn-primary me-1" onClick={grabarCambios}>
                    Aceptar
                </button>
                {/* con el navigate va a la pagina anterior en la lista de paginas que recorrió  */}
                <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}


