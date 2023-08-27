import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PersonaForm() {
    const [datos, setDatos] = useState({});
    const params = useParams();
    const navegar = useNavigate();

    const persona = {
        id: -1,
        apellido: "",
        nombre: "",
        cuil: "",
        genero: "",
        fecha_nacimiento: "",
        nivel_educativo: "",
        titulo_prof: "",
        situacion_laboral: "",
        saberes_experiencia: "",
        curso_formacion_prof: "",
        rol: ""
    }

    useEffect(() => {
        if (params.id < 0) {
            console.log(persona)
            setDatos(persona);
        } else {
            getPersona(params.id);
        }

    }, [params.id]);

    const getPersona = async (id) => {
        try {
            let resultado = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/personas/${id}`);
            /* console.log(resultado); */
            setDatos(resultado.data);
        } catch (error) {
            console.log(error);
            setDatos(persona);
        }
    };

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        try {
            if (datos.id == -1) {
                datos.rol = "no asignado";
                let resultado = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/personas/`, datos);
                console.log(resultado);
                alert("Persona cargada con éxito");
            } else {
                let resultado = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/personas/${datos.id}`, datos);
                console.log(resultado);
                alert("Persona modificada con éxito");
            }
            navegar(-1);
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h2 className="mt-3 text-center">Datos de la persona</h2>
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
                <label htmlFor="edApellido" className="form-label">
                    Apellido
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edApellido"
                    name="apellido"
                    value={datos.apellido}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edNombre" className="form-label">
                    Nombre
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edNombre"
                    name="nombre"
                    value={datos.nombre}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edCuil" className="form-label">
                    CUIL
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edCuil"
                    name="cuil"
                    value={datos.cuil}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edGenero" className="form-label">
                    Género
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edGenero"
                    name="genero"
                    value={datos.genero}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edFecNac" className="form-label">
                    Fecha de nacimiento
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edFecNac"
                    name="fecha_nacimiento"
                    value={datos.fecha_nacimiento}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edNivEd" className="form-label">
                    Nivel educativo
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edNivEd"
                    name="nivel_educativo"
                    value={datos.nivel_educativo}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edTitProf" className="form-label">
                    Titulo profesional
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edTitProf"
                    name="titulo_prof"
                    value={datos.titulo_prof}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edSitLab" className="form-label">
                    Situación laboral
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edSitLab"
                    name="situacion_laboral"
                    value={datos.situacion_laboral}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edSabExp" className="form-label">
                    Saberes y experiencias
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edSabExp"
                    name="saberes_experiencia"
                    value={datos.saberes_experiencia}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edCFP" className="form-label">
                    Cursos de formación profesional
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="edCFP"
                    name="curso_formacion_prof"
                    value={datos.curso_formacion_prof}
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


