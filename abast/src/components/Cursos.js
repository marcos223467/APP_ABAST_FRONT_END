import React, {useState, useEffect} from "react";
import '../assets/css/cursos.css';
import Global from '../Global';
import axios from "axios";
import Curso from './Curso';
const Cursos = () =>
{
    const url = Global.url;
    const [cursos, getCursos] = useState([]);

    useEffect(() =>{
        axios.get(url+"cursos").then(res =>{
            getCursos(res.data.cursos);
        })
        
    }, [cursos.length]);

    const cursoForm = (event) => 
    {
        event.preventDefault();
        window.location.href = "/cursoform";
    }
    function Volver(event)
    {
        event.preventDefault();
        window.location.href ='/menu';
    }
    return(
        <div className="bd-example">
            <button className="btn-menu" onClick={cursoForm}>
                <div className="card" id="add">
                    <div className="card-body">
                        <i id="add-i" class="fa-solid fa-plus"></i>
                        <h5 className="card-title">Añadir curso</h5>
                    </div>
                </div>
            </button>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    { cursos.map((curso,i) =>{
                        return(
                            <div className="col" key={i}>
                                <Curso id={i}
                                    cursoData={curso}/>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <button id="volver" type="button" className="btn btn-secondary" onClick={Volver}>Volver</button>
            </div>
        </div>
    )
}
export default Cursos;