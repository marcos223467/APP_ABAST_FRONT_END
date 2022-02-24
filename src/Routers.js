import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Menu from './components/Menu';
import Restrict from './components/Restrict';
import UserForm from './components/UserForm';
import AlumnoForm from './components/AlumnoForm';
import Cursos from './components/Cursos';
import CursoForm from './components/CursoForm';
import Alumnos from './components/Alumnos';
import Usuarios from './components/Usuarios';
import UserEdit from './components/UserEdit';
import CursoEdit from './components/CursoEdit';
import AlumnoEdit from './components/AlumnoEdit';
import Administrar from './components/Administrar';
import AdminAlumnos from './components/AdminAlumnos';
const Router = () => {
    return (

        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<SignIn/>} />
                <Route exact path="/menu" element={<Menu />} />
                <Route exact path="/restrict" element={<Restrict />} />
                <Route exact path="/userform" element={<UserForm />}/>
                <Route exact path="/alumform" element={<AlumnoForm />} />
                <Route exact path="/cursos" element={<Cursos />} />
                <Route exact path="/cursoform" element={<CursoForm/>} />
                <Route exact path="/alumnos" element={<Alumnos/>}/>
                <Route exact path="/usuarios" element={<Usuarios/>}/>
                <Route exact path="/editar_usuario" element={<UserEdit/>}/>
                <Route exact path="/editar_curso" element={<CursoEdit />} />
                <Route exact path="/editar_alumno" element={<AlumnoEdit />} />
                <Route exact path="/admin" element={<Administrar />} />
                <Route exact path="/admin_alums" element={<AdminAlumnos />} />
            </Routes>
            <Footer/>
        </BrowserRouter>


    );
}
//
export default Router;