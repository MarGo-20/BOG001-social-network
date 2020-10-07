// importamos las funciones que vamos a testear
//import mockFirebase from '../_mocks_/firebase-mock.js';
//global.firebase = mockFirebase();
//global.fs = firebase.firestore();
//global.auth = firebase.auth();
//global.user = "L5fvLCTpCPa1lorntAVmFzHl1Dl1";

/*describe('publicationsPage', () => {
  it('debería ser una función', () => {
    expect(typeof publicationsPage).toBe('function');
  });
});*/

jest.mock('../src/functionsFirebase.js', () => ({
  upDatePosts: jest.fn(),
  deletePost: jest.fn(),

}));

global.doc = {
  id:'1234abcd'
};

global.dataPostid = doc.id;
global.dataPost = {
  userLikes:[],
  counterLikes: 0,
  userId: 'hjk2530lm',
};

import { publicationsPage, userOptions, printPosts, deleteMyPost } from '../src/Views/publications.js';
//import {onGetPosts, upDatePosts, deletePost, saveUser, getUsers, savePost} from '../src/functionsFirebase.js'

describe('publicationsPage', () => {
  it('debería ser una función', () => {
    expect(typeof publicationsPage).toBe('function');
  });
  
  it('debería retornar un HTMLElement', () => {
    expect(publicationsPage() instanceof HTMLElement).toBe(true);
  });

  it('debería poder borrar un post al dar un click', () => {
    const el = publicationsPage();
    const container = el.querySelector('#post-container');
    expect(container.tagName).toBe('DIV');
    const mountainMenu = el.querySelector("#mountainMenu");
    const closeSesion = el.querySelector(".close-sesion");
    closeSesion.dispatchEvent(new Event('click'));
    mountainMenu.dispatchEvent(new Event('click'));
    container.dispatchEvent(new Event('click'));
    //expect(container instanceof HTMLDivElement).toBe(true);
    //const btnDelete = el.querySelector('.button btnDelete');
    //console.log(btnDelete);
    //expect(container instanceof HTMLDivElement).toBe(true);
    //expect(btnDelete.tagName).toBe('BUTTON');
    //btnDelete.dispatchEvent(new Event('click'));
  });
});

describe('userOptions', () => {
  it('debería ser una función', () => {
    expect(typeof userOptions).toBe('function');
  });

  it('debería retornar un string vacio para userId mky8751pq ', () => {
    expect(userOptions(dataPost)).toEqual("");
  });

  it('debería retornar un string con los HTMLButtonElement para userId hjk2530lm ', () => {
    expect(userOptions('hjk2530lm')).toBe(`<button type="submit" class = "button btnDelete" data-id = ${dataPost.id}>Borrar</button>
    <button type="submit" class = "button btnEdit" data-id = ${dataPost.id}>Editar</button>`);
  });
});



/*describe ('deleteMyPost', () => {
  it('Debería ser una función', () => {
    expect(typeof deleteMyPost).toBe('function');
  });
})*/

/*describe('savePost', () =>{
  it('debería poder crear collección de post', () => {
    return savePost('Posts').then((data) => {
      expect(data).toBe('Pude crear una collección');
    });
  });
});*/

/*describe('saveUser', () =>{
  it('debería poder crear collección de usuarios', () => {
    return saveUser('users').then((data) => {
      expect(data).toBe('Pude crear una collección');
    });
  });
});*/    



 