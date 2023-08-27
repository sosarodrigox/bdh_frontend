import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EmprendimientoIndividual({ persona }) {
    return (
        <div>
            <h4 className="mt-3 text-center">EMPRENDIMIENTO INDIVIDUAL</h4>
            <div className="mb-3">
                <label className="form-label">Denominación UP:</label>
                <input
                    type="text"
                    className="form-control"
                    name="denominacion_up"
                    value={`UP_${persona.apellido}_${persona.cuil}`}
                    disabled
                />
            </div>
        </div>
    );
}