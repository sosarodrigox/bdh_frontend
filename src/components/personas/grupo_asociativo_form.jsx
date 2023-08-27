import React, { useState } from "react";
import Formulario_UP from "./formulario_up";

export default function GrupoAsociativoForm({
    persona,
    unidadProductiva,
    setUnidadProductiva,
    setNombreGrupo }) {
    const [grupo, setGrupo] = useState({});

    const handleChange = (e) => {
        setGrupo({ ...grupo, [e.target.name]: e.target.value });
        if (e.target.name === "nombre_grupo") {
            setNombreGrupo(e.target.value);
        }
    };

    return (
        <div className="text-start ">
            <h4 className="mt-3 text-center">Datos del Grupo</h4>

            <div className="mb-3 col-2">
                <label htmlFor="edRepresentanteID" className="form-label">
                    ID REPRESENTANTE
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edRepresentanteID"
                    name="representanteID"
                    value={persona.id}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edRepresentante" className="form-label">
                    Representante del grupo
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edRepresentante"
                    name="representante"
                    value={persona.apellido + ", " + persona.nombre}
                    onChange={handleChange}
                    disabled
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edNombreGrupo" className="form-label">
                    Nombre de grupo
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edNombreGrupo"
                    name="nombre_grupo"
                    value={grupo.nombre_grupo}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Denominación UP:</label>
                <input
                    type="text"
                    className="form-control"
                    name="denominacion_up"
                    value={`UP_${grupo.nombre_grupo}_${persona.cuil}`}
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