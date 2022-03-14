import React, {useState, useEffect} from "react";
import '../assets/css/cursos.css';
import Global from '../Global';
import axios from "axios";
import {CSVLink} from 'react-csv';
const Curso = ({id, cursoData}) =>
{
    const url = Global.url;
    const [asistencia, getAsistencia] = useState([]);
    var fecha_ini = new Date(cursoData.fecha_ini);
    var fecha_fin = new Date(cursoData.fecha_fin);
    const us = JSON.parse(document.cookie);
    var hoy = new Date();

    useEffect(() =>{
        axios.get(url+"asistencias_curso/" + cursoData.nombre).then(res =>
            {
                getAsistencia(res.data.asistencia);
            });
    },[asistencia.length]);

    function IrAlumnos(event)
    {
        event.preventDefault();
        window.location.href ='/alumnos?curso=' + cursoData.nombre;
    }

    function Eliminar()
    {
        axios.delete(url+"/delete_curso/" + cursoData._id).then(window.location.reload());
    }

    function ComprobarCurso()
    {
        if(hoy >= fecha_fin)
        {
            return(
                <CSVLink data={asistencia} filename={'Listado de asistencia ' + cursoData.nombre}>
                    <button className="btn btn-secondary">Cerrar Curso</button>
                </CSVLink>
            )
        }
        else
        {
            return(
                <button id="cerrarCurso" type="button" className="btn disabled">Cerrar Curso</button>
            )
        }
    }

    if(us.tipo === "admin")
    {
        return(
            <div>
                <div className="card" id="curso">
                    <div className="container">
                        <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1">
                            <button className="btn-menu" onClick={IrAlumnos}>
                                <div className="card-body">
                                    <div className="col"><h3 className="card-title">{cursoData.nombre}</h3></div>
                                    <div className="col"><p id="txt" className="card-text">Tipo: {cursoData.tipo}</p></div>
                                    <div className="col"><p id="txt" className="card-text">Dónde: {cursoData.poblacion}</p></div>
                                    <div className="col"><p id="txt" className="card-text">Por: {cursoData.entidad}</p></div>
                                    <div className="col"><p id="txt" className="card-text">Inicio: {fecha_ini.getDate() + "-" + fecha_ini.getMonth() + "-" + fecha_ini.getFullYear()}</p></div>
                                    <div className="col"><p id="txt" className="card-text">Fin: {fecha_fin.getDate() + "-" + fecha_fin.getMonth() + "-" + fecha_fin.getFullYear()}</p></div>
                                </div>
                            </button>
                            <div className="row row-cols-3 row-cols-md-3 row-cols-lg-3">
                                <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                                    {ComprobarCurso()}
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <a href={'/editar_curso?id=' + cursoData._id}>
                                        <i id="adm-i" className="fa-solid fa-pen-to-square"></i>
                                    </a>
                                </div>
                                <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                    <button type="button"  className="btn-remove" data-bs-toggle="modal" 
                                        data-bs-target={"#myModal"+id}>
                                        <i id="adm-i" className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
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