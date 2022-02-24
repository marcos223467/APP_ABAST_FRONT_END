import React, {useState, useEffect} from "react";
import '../assets/css/alumno.css';
import Global from '../Global';
import axios from "axios";
import editar from "../assets/img/editar.png";
import eliminar from "../assets/img/eliminar.png";
const Alumno = ({id,alumnoData, actualizar}) =>
{
    const url = Global.url;
    const [estado, setEstado] = useState(0);
    const [asistencia, getAsistencia] = useState([]);
    const [curso, getCurso] = useState("");
    var fecha_act = new Date();
    var _fecha = fecha_act.getDate() + "-" + (fecha_act.getMonth() + 1) + "-" + fecha_act.getFullYear();
    const us = JSON.parse(document.cookie);

    useEffect(() =>{
        const urlParams = window.location.search;
        const params = new URLSearchParams(urlParams);
        getCurso(params.get("curso"));
        if(curso != ""){
            axios.get(url+"get_asistencia/"+ curso + "/" + alumnoData._id).then(res =>{
                getAsistencia(res.data.asistencia);
                if(asistencia.length > 0)
                {
                    var asist = asistencia[0].estado;
                    switch(asist)
                    {
                        case "Pendiente":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor = '#5c636a';
                                setEstado(0);
                        break;
                        case "Presente":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor ='#72E125' ;
                                setEstado(1);
                        break;
                        case "Retraso":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor = '#F3B911';
                                setEstado(2);
                        break;
                        case "No Presente":
                                document.getElementById(id).innerHTML = asist;
                                document.getElementById(id).style.backgroundColor = '#E42525';
                                setEstado(3);
                        break;
                    }
                    
                }
            })
           
        }
        
    },[curso, asistencia.length,estado]);

    const controlAsistencia = () =>
    {
        var asist
        switch(estado)
        {
            case 0: setEstado(1); 
                    asist = "Presente";
            break;
            case 1: setEstado(2);
                    asist = "Retraso";
            break;
            case 2: setEstado(3);
                    asist = "No Presente";
            break;
            case 3: setEstado(0);
                    asist = "Pendiente";
            break;
        }

        var asistData =
        {
            id_alumno : alumnoData._id,
            nombre_alumno : alumnoData.apellidos + " " + alumnoData.nombre,
            nombre_curso : curso,
            fecha : _fecha,
            estado: asist
        }

        if(asistencia.length === 0)
        {
            axios.post(url + 'save_asistencia', asistData)
        }
        else
        {
            axios.put(url + 'asistencia/' + asistencia[0]._id, asistData)
        }
    }

    function CambiaEstado(event)
    {
        event.preventDefault();
        controlAsistencia();
        actualizar(true);
    }
    function Eliminar(event)
    {
        event.preventDefault();
        axios.delete(url+"/delete_alumno/" + alumnoData._id).then(window.location.reload());
    }
    var fecha = new Date(alumnoData.fecha_nacimiento);
    if(us.tipo === "admin")
    {
        return(
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <div className="card" id="alumno">
                        <div className="card-body">
                            <div className="row">
                                <h3 className="card-title">{alumnoData.apellidos} {alumnoData.nombre}</h3>
                            </div>
                            <div className="row">
                                <p id="txt" className="card-text">Edad: {alumnoData.edad}</p>
                            </div>
                            <div className="row">
                                <p id = "txt" className="card-text">Fecha de nacimiento: {fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear()}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="container-fluid" id="container-alumno">
                                <div className="row row-cols-3 row-cols-sm-3 row-cols-md-3 row-cols-lg-3">
                                    <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                                        <button id={id} className="btn btn-secondary btn-asis" onClick={CambiaEstado}>Pendiente</button>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                        <a className="edit" href={'/editar_alumno?id=' + alumnoData._id}>
                                            <img src={editar} width="20"></img>
                                        </a>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                                        <button type="button" id="rmv" className="btn-remove" data-bs-toggle="modal" 
                                            data-bs-target={"#myModal"+id}>
                                            <img src={eliminar} width="20"></img>
                                        </button>
                                    </div>
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
                                <h4 id="titulo" className="modal-title">Eliminar alumno</h4>
                            </div>
                            <div className="modal-body">
                                <p>¿Estás seguro de querer eliminar este alumno?</p>
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
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    <div className="card" id="alumno">
                        <div className="card-body">
                            <h3 className="card-title">{alumnoData.apellidos} {alumnoData.nombre}</h3>
                            <p id="txt" className="card-text">Edad: {alumnoData.edad}</p>
                            <p id = "txt" className="card-text">Fecha de nacimiento: {fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear()}</p>
                            <div id="asis">
                                <label>Asistencia</label>
                                <button id={id} className="btn btn-secondary" onClick={CambiaEstado}>Pendiente</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
    
}

export default Alumno;