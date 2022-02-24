import React, {useState, useEffect} from "react";
import '../assets/css/userform.css';
import Global from '../Global';
import axios from "axios";

const AlumnoForm = () =>
{
    const url = Global.url;
    const [alumData, setAlumData] = useState({});
    const [cursos, getCursos] = useState([]);
    
    const nombre = React.createRef();
    const apellidos = React.createRef();
    const fecha_nacimiento = React.createRef();
    const curso = React.createRef();

    useEffect(() =>{
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
            //console.log(cursos);
        })
        
    }, [cursos.length]);

    function calculaEdad()
    {
        var hoy = new Date();
        var cumpleanos = new Date(alumData.fecha_nacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

    const changeState = () =>{
        setAlumData({          
                nombre: nombre.current.value,
                apellidos: apellidos.current.value,
                fecha_nacimiento: fecha_nacimiento.current.value,
                edad: calculaEdad(),
                cursos: curso.current.value,
                activo: true
        });
        console.log(alumData);
    }

    const createAlumn = async(event) =>
    {
        event.preventDefault();
        changeState();
        axios.post(url+"save_alumno", alumData).then((res) =>
            {
                console.log(res);
            },(error) =>
            {
                console.log(error);
            });
        console.log("Alumno dado de alta!!!")
        Volver();
    }

    function Volver(event)
    {
        event.preventDefault();
        window.location.href ='/menu';
    }
    return(
        <div className="bd-example">
            <form onSubmit={createAlumn}>
                <fieldset disabled="">
                    <legend className="mb-4">Alta Alumno</legend>
                    <div className="mb-3">
                        <small className="">Nombre</small>
                        <input type="text" id="disabledTextInput" className="form-control" ref={nombre} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Apellidos</small>
                        <input type="text" id="disabledTextInput" className="form-control" ref={apellidos} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <small className="">Fecha de nacimiento</small>
                        <input type="date" id="disabledTextInput" className="form-control" ref={fecha_nacimiento} onChange={changeState}/>
                    </div>
                    <div className="mb-3">
                        <select id="disabledSelect" className="form-select" ref={curso} onChange={changeState}>
                            <option disable selected>Selecciona un Curso</option>
                            {cursos.map((curs,i) =>{
                                return(
                                    <option>{curs.nombre}</option>
                                );
                            })}
                        </select>
                    </div>
                   
                    <button type="submit" className="btn btn-primary" id="btn">Registrar</button>
                </fieldset>
            </form>
            <br/>
            <div>
                <button id="volver" type="button" class="btn btn-dark" onClick={Volver}>Volver</button>
            </div>
        </div>
    )
}

export default AlumnoForm;