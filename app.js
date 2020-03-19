// Variables
const listaTweets = document.getElementById('lista-tweets');

// Event Listeners
eventListeners();

function eventListeners(){
    // Cuando se envía el formulario
    document.getElementById('formulario').addEventListener('submit', agregarTweet);

    // Borrar un tweet de la lista
    listaTweets.addEventListener('click', eliminarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// Funciones

// Añadir un tweet del formulario
function agregarTweet(e){
    e.preventDefault();
    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    
    let divTweet = crearTweetHtml(tweet);
    // Añade el tweet a la lista
    console.log(divTweet);
    listaTweets.appendChild(divTweet);

    // Añadir al local storage
    agregarTweetLocalStorage(tweet);
}

// Eliminar tweet de la lista
function eliminarTweet(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-tweet'))
    {
        e.target.parentElement.remove();
        
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

function crearTweetHtml(tweet) {
    // Crear div contenedor
    const contenedor = document.createElement('div');
    contenedor.classList="bt py-2 contenedor-tweet";

    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList += 'borrar-tweet';
    botonBorrar.classList += ' boton';
    botonBorrar.innerText = 'X';

    // Crear imagen pequeña
    const imagen = document.createElement('img');
    imagen.src="https://picsum.photos/80/80";
    imagen.classList = 'img-tweet';

    // Crear elemento y añadir contenido a la lista
    const li = document.createElement('span');
    li.classList = "texto-tweet";
    li.innerText = tweet;
    // Añade el boton de borrar al tweet

    // Añade los elementos al contenedor
    contenedor.appendChild(imagen);
    contenedor.appendChild(li);
    contenedor.appendChild(botonBorrar);
    
    return contenedor;
}

// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet){
        let divTweet = crearTweetHtml(tweet);

        // Añade el contenedor del tweet a la lista
        listaTweets.appendChild(divTweet);
    });
}


// Agregar tweet al local storage
function agregarTweetLocalStorage(tweet) {
    // Recupera los tweets del localstorage
    let tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);

    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Funcion que recupera los tweets del local storage
function obtenerTweetsLocalStorage() {
    let tweets;

    // Revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }
    else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet) {

    let tweets, tweetBorrar;
    // Recupera los tweets
    tweets = obtenerTweetsLocalStorage();
    // Elimina la x del tweet
    tweetBorrar = tweet.substring(0, tweet.length-1);
    

    tweets.forEach(function(tweet, index){
        if(tweet === tweetBorrar)
        {
            tweets.splice(index, 1);
            return;
        }
    });
    
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
