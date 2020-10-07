// Función getUsers que identifica el cambio de estado de una sesión y obtiene el useId y el name,los cuales se exportan a createpublications
export let userId;
export let name;

export const getUsers = () => {    
    firebase.auth().onAuthStateChanged( user=> {
        if (user) {
            // User is signed in.
            userId = user.uid;
            name = user.displayName;                     
        } else { 
            // No user is signed in.
        }
    });
}

//función para crear colleccion de posts con sus respectivos documentos
export const savePost = (commitForm, userId, name, usersLikes, counterLikes) =>
fs.collection('posts').doc().set({
            commitForm,
            userId,
            name,
            usersLikes,
            counterLikes         
});  

//función para crear colleccion de users con sus respectivos documentos
export const saveUser = (userName) =>
fs.collection('users').doc().set({
    userName    
});  


// Función para llamar u obtener a todos los posts y poder usarlos en printpost, con onSnapshot aseguramos 
//que cuando haya un cambio este se refleje de una vez en la interfaz, sin necesidad de volver a recargar la página.      
export const onGetPosts  = (callback) => fs.collection('posts').onSnapshot(callback);

//Función para borrar post pasándole el id del documento del post seleccionado por el usuario
export const deletePost = id => fs.collection('posts').doc(id).delete();

//función que recibe el id y obtiene el post correspondiente a ese id
export const getPosts = id => fs.collection('posts').doc(id).get();

//Función para editar post pasándole el id del documento del post seleccionado por el usuario
export const upDatePosts =  (id, upDatePosts) => fs.collection("posts").doc(id).update(upDatePosts);


    







