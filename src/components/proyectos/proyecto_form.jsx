import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProyectoForm() {
    const [datos, setDatos] = useState({});
    const params = useParams();
    const navegar = useNavigate();

    const proyecto = {
        id: -1,
        nombre: "",
        eje: "",
        tipo_produccion: "",
        objetivo: "",
        descripcion: "",
        problematica: "",
        solucion: "",
        consumidores: "",
        cantidad_personas: "",
        cantidad_up: "",
    }

    useEffect(() => {
        if (params.id < 0) {
            console.log(proyecto)
            setDatos(proyecto);
        } else {
            getProyecto(params.id);
        }

    }, [params.id]);

    const getProyecto = async (id) => {
        try {
            let resultado = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/proyectos/${id}`);
            /* console.log(resultado); */
            setDatos(resultado.data);
        } catch (error) {
            console.log(error);
            setDatos(proyecto);
        }
    };

    const handleChange = (e) => {
        setDatos({ ...datos, [e.target.name]: e.target.value });
    };

    const grabarCambios = async () => {
        try {
            if (datos.id == -1) {
                datos.cantidad_personas = 0;
                datos.cantidad_up = 0;
                let resultado = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/proyectos/`, datos);
                console.log(resultado);
                alert("Proyecto cargado con éxito");
            } else {
                let resultado = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/proyectos/${datos.id}`, datos);
                console.log(resultado);
                alert("Proyecto modificado con éxito");
            }
            navegar(-1);
        } catch (error) {
            alert(error.response.data.detail);
        }
    };

    return (
        <div className="text-start col-6 offset-3 border p-3">
            <h2 className="mt-3 text-center">Datos del proyecto</h2>
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
                <label htmlFor="edEje" className="form-label">
                    Eje
                </label>
                <select
                    className="form-control"
                    id="edEje"
                    name="eje"
                    value={datos.eje}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un eje</option>
                    <option value="P_limp.mant.reciclado">P_limp.mant.reciclado</option>
                    <option value="P_construccion.m.habit">P_construccion.m.habit</option>
                    <option value="P_textil.prod.manufa">P_textil.prod.manufa</option>
                    <option value="P_agric.producc.alimento">P_agric.producc.alimento</option>
                    <option value="P_comercializacion.comu">P_comercializacion.comu</option>
                    <option value="P_otras.actividades">P_otras.actividades</option>
                </select>
            </div>


            <div className="mb-3 col-2">
                <label htmlFor="edTipoProduccion" className="form-label">
                    Tipo de Producción
                </label>
                <select
                    className="form-control"
                    id="edTipoProduccion"
                    name="tipo_produccion"
                    value={datos.tipo_produccion}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un tipo de producción</option>
                    <option value="productos">Productos</option>
                    <option value="servicios">Servicios</option>
                </select>
            </div>

            <div className="mb-3 col-2">
                <label htmlFor="edConsumidores" className="form-label">
                    Consumidores
                </label>
                <select
                    className="form-control"
                    id="edConsumidores"
                    name="consumidores"
                    value={datos.consumidores}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un tipo de consumidor</option>
                    <option value="consumidor_final">Consumidor Final</option>
                    <option value="organismo_municipal">Organismo Municipal</option>
                    <option value="organismo_provincial">Organismo Provincial</option>
                    <option value="empresa_privada">Empresa Privada</option>
                </select>
            </div>

            <div className="mb-3">
                <label className="form-label">Objetivo:</label>
                <textarea
                    className="form-control"
                    name="objetivo"
                    rows={5}
                    maxLength={1024}
                    value={datos.objetivo}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <textarea
                    className="form-control"
                    name="descripcion"
                    rows={5}
                    maxLength={1024}
                    value={datos.descripcion}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Problemática:</label>
                <textarea
                    className="form-control"
                    name="problematica"
                    rows={5}
                    maxLength={1024}
                    value={datos.problematica}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Solución:</label>
                <textarea
                    className="form-control"
                    name="solucion"
                    rows={5}
                    maxLength={1024}
                    value={datos.solucion}
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


