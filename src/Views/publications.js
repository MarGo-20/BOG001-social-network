import {footer} from './footer.js';
import {header} from './headerViews.js';
import {deletePost,onGetPosts,getPosts,upDatePosts,userId} from '../functionsFirebase.js'; 


//Operador Ternario: antes del signo pregunta se coloca la condición, luego del signo pregunta lo que va a retornar si se cumple la condición
//después de los dos puntos lo que retorna si no se cumple la condición.
export function userOptions(dataPost) {
    return userId !== dataPost.userId ? '':
    `<button type="submit" class = "button btnDelete" data-id = ${dataPost.id}>Borrar</button>
    <button type="submit" class = "button btnEdit" data-id = ${dataPost.id}>Editar</button>`;
}
    // function addOrRemoveLike  
    export const addOrRemoveLike =  (e) =>{      
        if(e.target.className === 'fas fa-thumbs-up likeDown'){
            let id = e.target.dataset.id;  
            let dataPost = JSON.parse(localStorage.getItem(id));
            let usersLikes = dataPost.usersLikes;
            let counterLikes = dataPost.counterLikes;
            usersLikes.push(userId);
            e.target.classList.remove('likeDown');
            e.target.classList.add('likeUp'); 
            counterLikes++;     
            upDatePosts(id,{usersLikes, counterLikes})
        }
        else if(e.target.className === 'fas fa-thumbs-up likeUp'){
            let id = e.target.dataset.id;  
            let dataPost = JSON.parse(localStorage.getItem(id));
            let usersLikes = dataPost.usersLikes;
            let counterLikes = dataPost.counterLikes;
            e.target.classList.remove('likeUp');
            e.target.classList.add('likeDown'); 
            let findPosition = usersLikes.indexOf(userId);  
            if(findPosition !== -1){
                usersLikes.splice(findPosition,1); 
            } 
            counterLikes = counterLikes-1;
            upDatePosts(id,{usersLikes, counterLikes});
        }else{
            return;
        }
    }

    const deleteMyPost = async(e) => {      
        if(e.target.className !== 'button btnDelete'){
            return;        
        }
        await deletePost(e.target.dataset.id);    
    }

export const publicationsPage = () =>{
    const viewPublications = 
    `${header}       
    <main class="mainBackgroundContainer">       
        <h2>Publicaciones</h2>
        <div id= "post-container">
        </div>  
    </main>        
    ${footer}`;

    const newDivThree = document.createElement('div');
    newDivThree.innerHTML = viewPublications;    
    const containerEvent = newDivThree.querySelector("#post-container");

    const printPosts = async() => {
        onGetPosts((querySnapshot => {
            containerEvent.innerHTML =""
            querySnapshot.forEach( doc => { 
                const dataPost = doc.data();
                dataPost.id = doc.id;
                localStorage.setItem(dataPost.id,JSON.stringify(dataPost));   
                const usersLikes= dataPost.usersLikes;
                let iconLikesWhite='';
                let IconLikesGreen='';
                if(usersLikes.includes(userId)){
                    IconLikesGreen = `<span id="like" ><i class="fas fa-thumbs-up likeUp" 
                    data-id = ${dataPost.id}>${dataPost.counterLikes}</i> </span>`
                }else{
                    iconLikesWhite =`<span id="like" ><i class="fas fa-thumbs-up likeDown" 
                    data-id = ${dataPost.id}>${dataPost.counterLikes}</i> </span>`
                } 
                containerEvent.innerHTML += `
                    <div class = "containerPostFinal" data-id = ${dataPost.id}> 
                        <div class = "userContainer">
                            <img src="./imagenes/usuario.png" alt="incono de usuario" class= "userIcon">
                        </div>
                        <div>
                            <h3 id="userPost">${dataPost.name}</h3>
                        </div> 
                        <div class = "containerCommentary">
                            <p id = "commentaryP">${dataPost.commitForm}</p>
                        </div>
                        <div>
                        ${iconLikesWhite}${IconLikesGreen}
                            <p class = "counter" data-id = ${dataPost.id} >
                            </p>                       
                        </div>                
                        <div class="myBtnPost">
                        ${userOptions(dataPost)}                        
                        </div>
                        <div class="containerEdit" id = "containerEdit" data-id = ${dataPost.id} >
                        </div>
                    </div>
                    `  
            })            
        }))        
    }

    printPosts();

    //Funcion editMyPost
    const editMyPost = async(e) => {      
        if(e.target.className !== 'button btnEdit'){
            return;        
        }else if(e.target.className === 'button btnEdit'){
            const doc = await getPosts(e.target.dataset.id);
            let id = e.target.dataset.id;
            const containerEdit = newDivThree.querySelectorAll(".containerEdit");
            
            containerEdit.forEach (item => { 
                const edit= item;
                const editId = edit.dataset.id;
                if(editId === doc.id){
                    edit.innerHTML =
                        `<form id="postFormEdit">         
                            <div>
                                <textarea id="commitForm" cols="40" wrap= hard rows="5" maxlength="240" required 
                                placeholder = "Máximo 240 carácteres incluidos espacios"></textarea>
                            </div>
                            <label class = "containerButton2">
                                <button type="submit" id="btnEdit" class = "button">Aceptar</button>
                            </label>
                        </form>`
                    const postFormEdit = newDivThree.querySelector("#postFormEdit");
                    postFormEdit['commitForm'].value = doc.data().commitForm 
        
                    postFormEdit.addEventListener('submit', async (e) => {e.preventDefault();
                        await upDatePosts( id, {commitForm: commitForm.value });
                        containerEdit.innerHTML ='';    
                    })
                }
            }); 
        }
    }
    
    //Function for show hambuguermenu
    const navPages = newDivThree.querySelector(".navPages");
    const mountainMenu = newDivThree.querySelector("#mountainMenu");
    mountainMenu.addEventListener("click", showMenu);
    function showMenu(){
        navPages.classList.toggle("appear");
    }

    //Cerrar sesión de usuario
    const closeSesion = newDivThree.querySelector(".close-sesion");
    closeSesion.addEventListener("click", (e) => {
        e.preventDefault();
        auth.signOut()
        .then( () => { 
            window.location.href="#/home"
        })
    });   

    containerEvent.addEventListener("click", addOrRemoveLike); 
    containerEvent.addEventListener("click", deleteMyPost); 
    containerEvent.addEventListener("click", editMyPost); 
     
    return newDivThree;
}


