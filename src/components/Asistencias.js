import React, {useState, useEffect} from "react";
import Global from '../Global';
import axios from "axios";
import '../assets/css/usuarios.css';

const Asistencias = () =>
{

    function Volver(event)
    {
        event.preventDefault();
        window.history.back();
    }

    return(
        <div class="bd-example">
            <div>
                <button id="volver" type="button" className="btn btn-secondary" onClick={Volver}>Volver</button>
            </div>
            <div>
                <h1>Nombre Alumno</h1>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Fecha</th>
                        <th scope="col">Curso</th>
                        <th scope="col">Asistencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">10-01-2020</th>
                        <td>MAT Valencia</td>
                        <td>Presente</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Asistencias;