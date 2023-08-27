import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import EmprendimientoIndividual from "./emprendimiento_individual_up";
import GrupoAsociativo from "./grupo_asociativo_up";
import Cooperativa from "./cooperativa_up";
import Formulario_UP from "./formulario_up";

export default function PersonaAsignacionUP() {
    const [persona, setPersona] = useState({});
    const [tipoUnidadProductiva, setTipoUnidadProductiva] = useState("");
    const [nombreGrupo, setNombreGrupo] = useState("");
    const [nombreCooperativa, setNombreCooperativa] = useState("");


    const [unidadProductiva, setUnidadProductiva] = useState({
        persona_id: 0,
        denominacion_up: "",
        tipo_up: "",
        antiguedad_emprendimiento_meses: 0,
        antiguedad_emprendimiento_anios: 0,
        emprendimiento_formalizado: false,
        emprendimiento_activo: true,
        comercializacion_descripcion: "",
        servicios_productos: "",
        cantidad_integrantes: 0,
    });

    const params = useParams();
    const navegar = useNavigate();

    useEffect(() => {
        getPersona(params.id);
    }, [params.id]);

    const getPersona = async (id) => {
        try {
            let resultado = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/personas/${id}`);
            setPersona(resultado.data);
        } catch (error) {
            console.log(error);
            setPersona({});
        }
    };

    const handleChange = (event) => {
        setTipoUnidadProductiva(event.target.value);
    };

    const grabarCambios = async () => {
        if (!tipoUnidadProductiva) {
            alert("Debe seleccionar un tipo de unidad productiva");
            return;
        }

        if (persona.rol !== "no asignado") {
            alert("La persona ya tiene asignada una unidad productiva");
            return;
        } else {

            try {
                if (tipoUnidadProductiva === "EMPRENDIMIENTO INDIVIDUAL") {
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/emprendedores`, {
                        persona_id: persona.id,
                    });

                    unidadProductiva.denominacion_up = `UP_${persona.apellido}_${persona.cuil}`;
                    unidadProductiva.persona_id = persona.id;
                    unidadProductiva.tipo_up = 'emprendedor';
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/up`, unidadProductiva);

                    persona.rol = "emprendedor"
                    let resultado = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/personas/${persona.id}`, persona);
                    console.log(resultado);
                }
                // else {
                //     // // Realiza la solicitud para crear o actualizar la unidad productiva
                //     // await axios.post("http://localhost:8000/up", unidadProductiva);
                // }

                if (tipoUnidadProductiva === "GRUPO ASOCIATIVO") {
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/grupos`, {
                        representante_grupo_id: persona.id,
                        nombre_grupo: nombreGrupo,
                    });

                    unidadProductiva.denominacion_up = `UP_${nombreGrupo}_${persona.cuil}`;
                    unidadProductiva.persona_id = persona.id;
                    unidadProductiva.tipo_up = 'grupo';
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/up`, unidadProductiva);

                    persona.rol = "representante"
                    let resultado = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/personas/${persona.id}`,
                        persona);
                    console.log(resultado);
                }

                if (tipoUnidadProductiva === "COOPERATIVA") {
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cooperativas`, {
                        presidente_id: persona.id,
                        nombre_cooperativa: nombreCooperativa,
                    });

                    unidadProductiva.denominacion_up = `UP_${nombreCooperativa}_${persona.cuil}`;
                    unidadProductiva.persona_id = persona.id;
                    unidadProductiva.tipo_up = 'cooperativa';
                    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/up`, unidadProductiva);

                    persona.rol = "presidente"
                    let resultado = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/personas/${persona.id}`,
                        persona);
                    console.log(resultado);
                }
                //TODO: Corregir error al asignar una unidad productiva a una persona no aparece el nombre de la unidad productiva en el alert si no "undefined"
                alert(`La Persona: ${persona.apellido}, ${persona.nombre} a sido asignada exitosamente a la Unidad Productiva tipo: ${persona.rol} con el nombre de UP: ${unidadProductiva.denominacion_up}.`);
                navegar(-1);
            } catch (error) {
                console(error.response.data.detail);
            }
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h1 className="mt-3 text-center">Asignar Unidad Productiva:</h1>
            <h3 className="mt-3 text-center">
                {persona.apellido}, {persona.nombre} - {persona.cuil}
            </h3>
            <div className="mb-3 col-2-center">
                <select
                    className="form-control"
                    id="edTipoUP"
                    name="edTipoUP"
                    value={tipoUnidadProductiva}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un tipo de unidad productiva</option>
                    <option value="EMPRENDIMIENTO INDIVIDUAL">EMPRENDIMIENTO INDIVIDUAL</option>
                    <option value="GRUPO ASOCIATIVO">GRUPO ASOCIATIVO</option>
                    <option value="COOPERATIVA">COOPERATIVA</option>
                </select>
            </div>

            {tipoUnidadProductiva === "EMPRENDIMIENTO INDIVIDUAL" && (
                <>
                    <EmprendimientoIndividual persona={persona} />
                    <Formulario_UP
                        unidadProductiva={unidadProductiva}
                        setUnidadProductiva={setUnidadProductiva}
                    />
                </>
            )}

            {tipoUnidadProductiva === "GRUPO ASOCIATIVO" && (
                <GrupoAsociativo
                    persona={persona}
                    unidadProductiva={unidadProductiva}
                    setUnidadProductiva={setUnidadProductiva}
                    nombreGrupo={nombreGrupo}
                    setNombreGrupo={setNombreGrupo}
                />

            )}

            {tipoUnidadProductiva === "COOPERATIVA" && (<Cooperativa
                persona={persona}
                unidadProductiva={unidadProductiva}
                setUnidadProductiva={setUnidadProductiva}
                nombreCooperativa={nombreCooperativa}
                setNombreCooperativa={setNombreCooperativa}
            />
            )}

            <div className="mb-3 text-end">
                <button className="btn btn-primary me-1" onClick={grabarCambios}>
                    Aceptar
                </button>
                <button className="btn btn-secondary ms-1" onClick={() => navegar(-1)}>
                    Cancelar
                </button>
            </div>
        </div>
    );
}
