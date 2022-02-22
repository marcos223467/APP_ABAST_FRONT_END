import React from 'react';
import '../assets/css/cursos.css';
import editar from "../assets/img/editar.png";
import eliminar from "../assets/img/eliminar.png";
import Global from '../Global';
import axios from "axios";
const Curso = ({id, cursoData}) =>
{
    const url = Global.url;
    var fecha_ini = new Date(cursoData.fecha_ini);
    var fecha_fin = new Date(cursoData.fecha_fin);
    const us = JSON.parse(document.cookie);

    function IrAlumnos(event)
    {
        event.preventDefault();
        window.location.href ='/alumnos?curso=' + cursoData.nombre;
    }

    function Eliminar()
    {
        axios.delete(url+"/delete_curso/" + cursoData._id).then(window.location.reload());
    }

    if(us.tipo === "admin")
    {
        return(
            <div>
                <div className="card" id="curso">
                    <button className="btn-menu" onClick={IrAlumnos}>
                        <div className="card-body">
                            <h3 className="card-title">{cursoData.nombre}</h3>
                            <p id="txt" className="card-text">Tipo: {cursoData.tipo}</p>
                            <p id="txt" className="card-text">Dónde: {cursoData.poblacion}</p>
                            <p id="txt" className="card-text">Por: {cursoData.entidad}</p>
                            <p id="txt" className="card-text">Inicio: {fecha_ini.getDate() + "-" + fecha_ini.getMonth() + "-" + fecha_ini.getFullYear()}</p>
                            <p id="txt" className="card-text">Fin: {fecha_fin.getDate() + "-" + fecha_fin.getMonth() + "-" + fecha_fin.getFullYear()}</p>
                        </div>
                    </button>
                    <div>
                        <button type="button" id="rmv" className="btn-remove" data-bs-toggle="modal" 
                            data-bs-target={"#myModal"+id}>
                            <img src={eliminar} width="20"></img>
                        </button>
                        <a id="edit" href={'/editar_curso?id=' + cursoData._id}>
                            <img src={editar} width="20"></img>
                        </a>
                    </div>
                </div>

                <div className="modal fade" id={"myModal" + id} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button id="cerrar" type="button" className="btn-close" data-bs-dismiss="modal"  aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 id="titulo" className="modal-title">Eliminar curso</h4>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de querer eliminar este curso?</p>
                            </div>
                            <div className="modal-footer">
                                <button id="eliminar" type="button" className="btn btn-default" 
                                        data-dismiss="modal" onClick={Eliminar}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if(us.tipo === "profesor")
    {
        return(
            <div>
                <div className="card" id="curso">
                    <button className="btn-menu" onClick={IrAlumnos}>
                        <div className="card-body">
                            <h3 className="card-title">{cursoData.nombre}</h3>
                            <p id="txt" className="card-text">Tipo: {cursoData.tipo}</p>
                            <p id="txt" className="card-text">Dónde: {cursoData.poblacion}</p>
                            <p id="txt" className="card-text">Por: {cursoData.entidad}</p>
                            <p id="txt" className="card-text">Inicio: {fecha_ini.getDate() + "-" + fecha_ini.getMonth() + "-" + fecha_ini.getFullYear()}</p>
                            <p id="txt" className="card-text">Fin: {fecha_fin.getDate() + "-" + fecha_fin.getMonth() + "-" + fecha_fin.getFullYear()}</p>
                        </div>
                    </button>
                </div>
            </div>
        )
    }

    
}
export default Curso;