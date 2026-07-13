// ======================================
// MÚSICA
// ======================================

const music = document.getElementById("bgMusic");

// ======================================
// CARTA INICIAL
// ======================================

const texto = textoInicial;

const typewriter = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
const startButton = document.getElementById("startButton");

// ======================================
// RECUERDOS
// ======================================

const memorySection = document.getElementById("memorySection");

const memoryImage = document.getElementById("memoryImage");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");

const nextMemory = document.getElementById("nextMemory");

// ======================================
// FINAL
// ======================================

const intro = document.getElementById("intro");

const finalSection = document.getElementById("finalSection");

const finalText = document.getElementById("finalText");

const finishButton = document.getElementById("finishButton");

// ======================================
// VARIABLES
// ======================================

let indiceTexto = 0;

let recuerdoActual = 0;

// ======================================
// LOS 13 RECUERDOS
// ======================================

const recuerdos = [

{
imagen:"img/foto1.jpg",
titulo:"❤️ Capítulo 1 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO DEL PRIMER RECUERDO."
},

{
imagen:"img/foto2.jpg",
titulo:"❤️ Capítulo 2 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO DEL SEGUNDO RECUERDO."
},

{
imagen:"img/foto3.jpg",
titulo:"❤️ Capítulo 3 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO DEL TERCER RECUERDO."
},

{
imagen:"img/foto4.jpg",
titulo:"❤️ Capítulo 4 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto5.jpg",
titulo:"❤️ Capítulo 5 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto6.jpg",
titulo:"❤️ Capítulo 6 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto7.jpg",
titulo:"❤️ Capítulo 7 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto8.jpg",
titulo:"❤️ Capítulo 8 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto9.jpg",
titulo:"❤️ Capítulo 9 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto10.jpg",
titulo:"❤️ Capítulo 10 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto11.jpg",
titulo:"❤️ Capítulo 11 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto12.jpg",
titulo:"❤️ Capítulo 12 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO."
},

{
imagen:"img/foto13.jpg",
titulo:"❤️ Capítulo 13 ❤️",
texto:"ESCRIBE AQUÍ EL TEXTO DEL ÚLTIMO RECUERDO."
}

];

// ======================================
// TEXTO FINAL
// ======================================

const mensajeFinal = `Aquí escribirás el mensaje final para Nerea. ❤️`;
