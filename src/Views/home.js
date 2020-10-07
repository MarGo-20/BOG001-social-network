import{footer} from './footer.js';
import {saveUser, getUsers} from '../functionsFirebase.js'

export const createWellcomePage = () =>{
    const wellcome = `
        <header class="headerHome">
            <div class="containerLogo"><img src="./imagenes/kallpaLogo.svg" class="logo">
            </div>
            <nav class= "navHome"></nav>
        </header>
        <section class = "homePage">
            <div id="containerImage">
                <div id="textKallpa">
                    <p>Kallpa te da la bienvenida, en ésta red social podrás encontrar 
                        opciones de actividades extremas y al aire libre y podrás 
                        compartir tus experiencias en nuestra comunidad.
                    </p>
                </div>
            </div>
            <div  class="containerLogIn">
                <span class= "spanForm">Iniciar sesión</span>
                <div class = "containerForm">
                    <form id="formLogin" class= "formHome">
                        <label class = "label">Correo electrónico <input type="email" id="email-login" required>
                        </label>
                        <label class = "label">Contraseña<input type="password" id="password-login" minlength="6" required>
                        </label>
                        <p id = "dont-registry"></p>
                        <div class = buttonAndLink>
                            <label class = "containerButton">
                                <button type="submit" id="btnLogin" class = "button">Enviar</button>
                            </label>
                            <div class = "link"><p><a href="" id= "linkRegistry">Registrarse</a></p></div>
                            </div>
                        </div>                        
                    </form>
                </div>
                
            <div class ="containerLogIn" id = "containerLogUp" >
                <span id = "spanLogUp" class= "spanForm">Registrarse</span>
                <div class = "containerFormLogUp">
                    <form id="formRegistry" class= "formHome">  
                        <label class = "label">Nombre completo<input type="text" id="name-registry" required>       
                        </label>
                        <label class = "label">Correo electrónico<input type="email" id="email-registry" required>
                        </label>
                        <label class = "label">Contraseña<input type="password" id="password-registry" minlength="6" required>
                        </label>
                        <p id="alreadyRegistry"></p>
                        <div class = buttonAndLink>
                            <label class = "containerButton">
                                <button type="submit" id=btnRegistry class = "button">Enviar</button>
                            </label>
                            <div class = "link"><p><a href="" id= "linkLogin">Iniciar sesión</a></p></div>
                        </div>
                    </form>
                   
                </div>
            </div>
        </section>
        ${footer}`;

    const newDiv = document.createElement('div');
    newDiv.innerHTML = wellcome;

    // Loguear usuario
    const formLogin = newDiv.querySelector("#formLogin");

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const emailLogin = newDiv.querySelector("#email-login").value;
        const passwordLogin = newDiv.querySelector("#password-login").value;
        const dontRegistry = newDiv.querySelector("#dont-registry");

        //función para loguerar usuario con correo y contraseña
        auth.signInWithEmailAndPassword(emailLogin, passwordLogin)
        .then(userCredential =>  { 
        //se invoca getUsers para identificar sesión de usuario abierta, esta función getUsers
        // está en functionFirebase y ayuda a capturar los valores de las variables name y userId.
            getUsers();    
            window.location.href="#/publicaciones" 
        })
        //Capturar errores que se puedan presentar en el LogIn
        .catch (err => {
            if (err.code === "auth/user-not-found"){
                dontRegistry.innerHTML = "Usuario no registrado, por favor regístrese";
            }
            if(err.code === "auth/wrong-password"){
                dontRegistry.innerHTML = "Contraseña incorrecta";
            }
        })
    });

    //Registrar usuario    
    const formRegistry = newDiv.querySelector("#formRegistry");

    formRegistry.addEventListener("submit", (e) => {
        e.preventDefault(); 
        const emailRegistry = newDiv.querySelector("#email-registry").value;
        const passwordRegistry = newDiv.querySelector("#password-registry").value;
        const alreadyRegistry = newDiv.querySelector("#alreadyRegistry");
        const userName = formRegistry['name-registry'];


        //función para crear usuario con correo y contraseña
       auth.createUserWithEmailAndPassword(emailRegistry, passwordRegistry)
        .then((userCredential) => { 
            userCredential.user.updateProfile({
                displayName: userName.value,            
            })              
            .then(() => {               
                window.location.href ='#/publicaciones';
                getUsers();
            })                 
        })
        .catch (err => {
            alreadyRegistry.innerHTML = "Correo ya registrado";
        })

        //Crear colección de usuarios y documentos correspondiente a esta collección(cada usuario)    
        saveUser(userName.value);     
    });
           
    const linkRegistry = newDiv.querySelector("#linkRegistry");
    linkRegistry.addEventListener("click", (e) => {e.preventDefault();
        const containerLogUp = newDiv.querySelector("#containerLogUp");
        const containerLogIn = newDiv.querySelector(".containerLogIn");
        containerLogUp.style.display= "flex";
        containerLogIn.style.display= "none";
    });

    const linkLogin = newDiv.querySelector("#linkLogin");
    linkLogin.addEventListener("click", (e) => {e.preventDefault();
        const containerLogUp = newDiv.querySelector("#containerLogUp");
        const containerLogIn = newDiv.querySelector(".containerLogIn");
        containerLogUp.style.display= "none";
        containerLogIn.style.display= "flex";
    });

    return newDiv;

};  




    
    




