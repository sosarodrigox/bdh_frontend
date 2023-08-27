import React from "react";

export default function Formulario_UP({
    unidadProductiva,
    setUnidadProductiva,
}) {

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setUnidadProductiva((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAniosInputChange = (event) => {
        const { value } = event.target;
        if (value === "") {
            setUnidadProductiva((prevState) => ({
                ...prevState,
                antiguedad_emprendimiento_anios: 0,
            }));
        } else {
            setUnidadProductiva((prevState) => ({
                ...prevState,
                antiguedad_emprendimiento_anios: parseInt(value),
            }));
        }
    };

    const handleAniosInputBlur = () => {
        if (unidadProductiva.antiguedad_emprendimiento_anios === "") {
            setUnidadProductiva((prevState) => ({
                ...prevState,
                antiguedad_emprendimiento_anios: 0,
            }));
        }
    };

    const handleRangoAniosChange = (event) => {
        const { value } = event.target;
        setUnidadProductiva((prevState) => ({
            ...prevState,
            antiguedad_emprendimiento_anios: value,
        }));
    };

    const handleMesesInputChange = (event) => {
        const { value } = event.target;
        if (value === "") {
            setUnidadProductiva((prevState) => ({
                ...prevState,
                antiguedad_emprendimiento_meses: 0,
            }));
        } else {
            setUnidadProductiva((prevState) => ({
                ...prevState,
                antiguedad_emprendimiento_meses: parseInt(value),
            }));
        }
    };

    const handleMesesInputBlur = () => {
        if (unidadProductiva.antiguedad_emprendimiento_meses === "") {
            setUnidadProductiva((prevState) => ({
                ...prevState,
                antiguedad_emprendimiento_meses: 0,
            }));
        }
    };

    const handleRangoMesesChange = (event) => {
        const { value } = event.target;
        setUnidadProductiva((prevState) => ({
            ...prevState,
            antiguedad_emprendimiento_meses: value,
        }));
    };

    return (
        <div >
            <h4 className="mt-3 text-center">Datos de la Unidad Productiva</h4>
            <div className="mb-3">
                <label className="form-label">
                    Antigüedad del emprendimiento (años):
                    <input
                        type="text"
                        className="form-control"
                        value={unidadProductiva.antiguedad_emprendimiento_anios}
                        onChange={handleAniosInputChange}
                        onBlur={handleAniosInputBlur}
                    />
                </label>
                <input
                    type="range"
                    className="form-range"
                    name="antiguedad_emprendimiento_anios"
                    min="0"
                    max="80"
                    value={unidadProductiva.antiguedad_emprendimiento_anios}
                    onChange={handleRangoAniosChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">
                    Antigüedad del emprendimiento (meses):
                    <input
                        type="text"
                        className="form-control"
                        value={unidadProductiva.antiguedad_emprendimiento_meses}
                        onChange={handleMesesInputChange}
                        onBlur={handleMesesInputBlur}
                    />
                </label>
                <input
                    type="range"
                    className="form-range"
                    name="antiguedad_emprendimiento_meses"
                    min="0"
                    max="11"
                    value={unidadProductiva.antiguedad_emprendimiento_meses}
                    onChange={handleRangoMesesChange}
                />
            </div>
            <div className="mb-3">
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        name="emprendimiento_formalizado"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        checked={unidadProductiva.emprendimiento_formalizado}
                        onChange={() =>
                            setUnidadProductiva((prevState) => ({
                                ...prevState,
                                emprendimiento_formalizado: !prevState.emprendimiento_formalizado,
                            }))
                        }
                    />
                    <label class="form-check-label" for="flexSwitchCheckChecked">
                        Emprendimiento formalizado
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <div class="form-check form-switch">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        name="emprendimiento_activo"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        checked={unidadProductiva.emprendimiento_activo}
                        onChange={() =>
                            setUnidadProductiva((prevState) => ({
                                ...prevState,
                                emprendimiento_activo: !prevState.emprendimiento_activo,
                            }))
                        }
                    />
                    <label class="form-check-label" for="flexSwitchCheckChecked">
                        Emprendimiento activo
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Descripción de comercialización:</label>
                <textarea
                    className="form-control"
                    name="comercializacion_descripcion"
                    rows={5}
                    maxLength={1024}
                    value={unidadProductiva.comercializacion_descripcion}
                    onChange={handleFormChange}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Servicios/Productos:</label>
                <textarea
                    className="form-control"
                    name="servicios_productos"
                    rows={5}
                    maxLength={1024}
                    value={unidadProductiva.servicios_productos}
                    onChange={handleFormChange}
                />
            </div>
        </div>
    );
}
