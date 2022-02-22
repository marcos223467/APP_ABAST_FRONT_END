import React, {useState, useEffect} from "react";
import logo from "../assets/img/abast.png";
import '../assets/css/signIn.css';
import Global from '../Global';
import axios from "axios";

const SignIn = () =>{

    const url = Global.url;
    const [users, getUsers] = useState([]);
    const [userData, setUserData] = useState({});
  

    const email = React.createRef();
    const password = React.createRef();

    useEffect(() =>{
        axios.get(url+"users").then(res =>{
            getUsers(res.data);
        })
        
    }, [users.length]);

    const changeState = () =>{
        setUserData({          
                email: email.current.value,
                password: password.current.value
        });
        console.log(userData);
    }

    const receiveData = async(event) =>{
        //Evitamos recargar la página al recibir los datos del formulario
        event.preventDefault();
        changeState();

        for(let i = 0; i < users.users.length; i++)
        {
            if(userData.email === users.users[i].email && userData.password === users.users[i].password)
            {
                console.log("Usuario correcto");
                document.cookie = JSON.stringify(users.users[i]);
                console.log(document.cookie);
                window.location.href='./menu';
                
            }
                
        }
        
        
    }

    return(
            
        <main className="form-signin" id="formulario">
            <form onSubmit={receiveData}>
                <div className="container d-flex mb-2">
                    <img className="mb-1 logo" src={logo} alt="" width="200"/>
                </div>

                <h4 className="mb-4" id="acceso">ACCESO</h4>
                
                    <small className="" id="correo">Correo electrónico</small>
                    <input type="email" className="form-control mt-2" id="floatingInput" placeholder="Email" ref={email} onChange={changeState} />
                    
                
                    <small id="psw">Contraseña</small>
                    <input type="password" className="form-control mt-2" id="floatingPassword" placeholder="Contraseña" ref={password} onChange={changeState}/>
                    
            

                <button className="w-50 btn btn-lg btn-primary" type="submit" id="btn">Acceder</button>
            </form>
        </main>
    )
}

export default SignIn;