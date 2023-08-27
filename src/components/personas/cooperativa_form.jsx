import React, { useState } from "react";
import Formulario_UP from "./formulario_up";

export default function CooperativaForm({
    persona,
    unidadProductiva,
    setUnidadProductiva,
    setNombreCooperativa }) {
    const [cooperativa, setCooperativa] = useState({});

    const handleChange = (e) => {
        setCooperativa({ ...cooperativa, [e.target.name]: e.target.value });
        if (e.target.name === "nombre_cooperativa") {
            setNombreCooperativa(e.target.value);
        }
    };

    return (
        <div className="text-start ">
            <h4 className="mt-3 text-center">Datos de la Cooperativa</h4>

            <div className="mb-3 col-2">
                <label htmlFor="edPresidenteID" className="form-label">
                    ID PRESIDENTE
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edPresidenteID"
                    name="presidenteID"
                    value={persona.id}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edPresidente" className="form-label">
                    Presidente de la cooperativa
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edPresidente"
                    name="presidente"
                    value={persona.apellido + ", " + persona.nombre}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edNombreCooperativa" className="form-label">
                    Nombre de la cooperativa
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edNombreCooperativa"
                    name="nombre_cooperativa"
                    value={cooperativa.nombre_cooperativa}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Denominación UP:</label>
                <input
                    type="text"
                    className="form-control"
                    name="denominacion_up"
                    value={`UP_${cooperativa.nombre_cooperativa}_${persona.cuil}`}
                    disabled
                />
            </div>
            <Formulario_UP
                unidadProductiva={unidadProductiva}
                setUnidadProductiva={setUnidadProductiva}
            />
        </div>
    );
}