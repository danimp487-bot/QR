// =============================
// ELEMENTOS
// =============================

const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const textoElemento = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
const boton = document.getElementById("nextButton");
const musica = document.getElementById("bgMusic");

// =============================
// CONFIGURACIÓN
// =============================

let indice = 0;
const velocidad = 35;

// =============================
// INICIO
// =============================

window.onload = () => {

    iniciarMusica();

    // Abrir el sobre después de 1 segundo
    setTimeout(() => {

        envelope.classList.add("open");

    },1000);

    // Empezar a escribir cuando salga la carta
    setTimeout(() => {

        escribirTexto();

    },2600);

};

// =============================
// EFECTO MÁQUINA DE ESCRIBIR
// =============================

function escribirTexto(){

    if(indice < texto.length){

        let caracter = texto.charAt(indice);

        if(caracter === "\n"){

            textoElemento.innerHTML += "<br><br>";

        }else{

            textoElemento.innerHTML += caracter;

        }

        indice++;

        setTimeout(escribirTexto,velocidad);

    }else{

        terminarCarta();

    }

}

// =============================
// TERMINAR CARTA
// =============================

function terminarCarta(){

    cursor.style.display = "none";

    setTimeout(()=>{

        boton.style.display = "block";

        setTimeout(()=>{

            boton.classList.add("show");

        },50);

    },1500);

}

// =============================
// BOTÓN
// =============================

boton.addEventListener("click",()=>{

    document.body.classList.add("fade");

    setTimeout(()=>{

        window.location.href="historia1.html";

    },1000);

});

// =============================
// MÚSICA
// =============================

function iniciarMusica(){

    musica.volume = 0.35;

    const playPromise = musica.play();

    if(playPromise !== undefined){

        playPromise.catch(()=>{

            document.addEventListener("click",()=>{

                musica.play();

            },{once:true});

        });

    }

}
