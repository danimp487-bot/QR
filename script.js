// =======================
// ELEMENTOS
// =======================

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");

const textoElemento = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
const boton = document.getElementById("nextButton");

const musica = document.getElementById("bgMusic");

// =======================
// VARIABLES
// =======================

let indice = 0;
const velocidad = 32;

// =======================
// ABRIR SOBRE
// =======================

window.addEventListener("load", () => {

    iniciarMusica();

    // Espera un poco antes de abrir el sobre
    setTimeout(() => {

        envelope.classList.add("open");

        // Espera a que salga la carta
        setTimeout(() => {

            escribirTexto();

        },1800);

    },1200);

});

// =======================
// EFECTO ESCRITURA
// =======================

function escribirTexto(){

    if(indice < texto.length){

        const letra = texto.charAt(indice);

        if(letra === "\n"){

            textoElemento.innerHTML += "<br><br>";

        }else{

            textoElemento.innerHTML += letra;

        }

        indice++;

        setTimeout(escribirTexto,velocidad);

    }else{

        finalizarCarta();

    }

}

// =======================
// TERMINAR CARTA
// =======================

function finalizarCarta(){

    cursor.style.display="none";

    setTimeout(()=>{

        boton.classList.add("show");

    },1200);

}

// =======================
// BOTÓN
// =======================

boton.addEventListener("click",()=>{

    boton.disabled=true;

    document.body.classList.add("fade");

    setTimeout(()=>{

        mostrarSegundaPantalla();

    },1200);

});

// =======================
// SEGUNDA PANTALLA
// =======================

function mostrarSegundaPantalla(){

    alert("Aquí empezará nuestro viaje ❤️");

}

// =======================
// MÚSICA
// =======================

function iniciarMusica(){

    musica.volume=0;

    musica.play().catch(()=>{

        document.addEventListener("click",()=>{

            musica.play();

        },{once:true});

    });

    let volumen=0;

    const fade=setInterval(()=>{

        volumen+=0.02;

        if(volumen>=0.35){

            volumen=0.35;

            clearInterval(fade);

        }

        musica.volume=volumen;

    },120);

}
