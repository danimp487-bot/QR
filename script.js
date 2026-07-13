// ======================================
// MÚSICA
// ======================================
const music = document.getElementById("bgMusic");

// ======================================
// CARTA INICIAL
// ======================================
const texto = typeof textoInicial !== 'undefined' ? textoInicial : "Falta el texto inicial.";
const typewriter = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
const startButton = document.getElementById("startButton");
const heart = document.getElementById("heart");
const heartContainer = document.getElementById("heartContainer");
const letter = document.getElementById("letter");

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
// VARIABLES DE CONTROL
// ======================================
let indiceTexto = 0;
let recuerdoActual = 0;

// ======================================
// LOS 13 RECUERDOS (Personalízalos aquí)
// ======================================
const recuerdos = [
    {
        imagen: "img/foto1.jpg",
        titulo: "❤️ Capítulo 1 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO DEL PRIMER RECUERDO."
    },
    {
        imagen: "img/foto2.jpg",
        titulo: "❤️ Capítulo 2 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO DEL SEGUNDO RECUERDO."
    },
    {
        imagen: "img/foto3.jpg",
        titulo: "❤️ Capítulo 3 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO DEL TERCER RECUERDO."
    },
    {
        imagen: "img/foto4.jpg",
        titulo: "❤️ Capítulo 4 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto5.jpg",
        titulo: "❤️ Capítulo 5 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto6.jpg",
        titulo: "❤️ Capítulo 6 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto7.jpg",
        titulo: "❤️ Capítulo 7 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto8.jpg",
        titulo: "❤️ Capítulo 8 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto9.jpg",
        titulo: "❤️ Capítulo 9 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto10.jpg",
        titulo: "❤️ Capítulo 10 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto11.jpg",
        titulo: "❤️ Capítulo 11 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto12.jpg",
        titulo: "❤️ Capítulo 12 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO."
    },
    {
        imagen: "img/foto13.jpg",
        titulo: "❤️ Capítulo 13 ❤️",
        texto: "ESCRIBE AQUÍ EL TEXTO DEL ÚLTIMO RECUERDO."
    }
];

// ======================================
// TEXTO FINAL
// ======================================
const mensajeFinal = `Aquí escribirás el mensaje final para Nerea. ❤️`;

// ======================================
// EFECTO MÁQUINA DE ESCRIBIR (CARTA INICIAL)
// ======================================
function escribirTexto() {
    if (indiceTexto < texto.length) {
        typewriter.innerHTML += texto.charAt(indiceTexto);
        indiceTexto++;
        setTimeout(escribirTexto, 35); // Velocidad de escritura (ms por letra)
    } else {
        cursor.style.display = "none";
        startButton.classList.add("show"); // Muestra el botón de comenzar
    }
}

// ======================================
// EFECTO MÁQUINA DE ESCRIBIR (CARTA FINAL)
// ======================================
let indiceTextoFinal = 0;
function escribirTextoFinal() {
    if (indiceTextoFinal < mensajeFinal.length) {
        finalText.innerHTML += mensajeFinal.charAt(indiceTextoFinal);
        indiceTextoFinal++;
        setTimeout(escribirTextoFinal, 40);
    }
}

// ======================================
// CARGAR RECUERDO ACTUAL
// ======================================
function cargarRecuerdo() {
    const recuerdo = recuerdos[recuerdoActual];
    memoryImage.src = recuerdo.imagen;
    memoryTitle.textContent = recuerdo.titulo;
    memoryText.textContent = recuerdo.texto;
}

// ======================================
// EVENTOS DE BOTONES
// ======================================

// Comenzar viaje (Oculta carta inicial, muestra recuerdos)
startButton.addEventListener("click", () => {
    music.play().catch(() => {});
    intro.classList.add("ocultar");
    setTimeout(() => {
        intro.style.display = "none";
        memorySection.style.display = "flex";
        memorySection.classList.add("mostrar");
        cargarRecuerdo();
    }, 800);
});

// Siguiente recuerdo
nextMemory.addEventListener("click", () => {
    recuerdoActual++;
    if (recuerdoActual < recuerdos.length) {
        const card = document.querySelector(".memoryCard");
        card.style.opacity = "0";
        card.style.transform = "translateY(20px) scale(0.95)";
        
        setTimeout(() => {
            cargarRecuerdo();
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
        }, 400);
    } else {
        memorySection.classList.add("ocultar");
        setTimeout(() => {
            memorySection.style.display = "none";
            finalSection.style.display = "flex";
            finalSection.classList.add("mostrar");
            escribirTextoFinal();
        }, 800);
    }
});

// Botón de finalización (Efecto lluvia de corazones)
finishButton.addEventListener("click", () => {
    for (let i = 0; i < 40; i++) {
        setTimeout(crearCorazon, i * 80);
    }
    alert("¡Feliz cumpleaños, Nerea! ❤️");
});

// ======================================
// GENERADOR DE PÉTALOS Y CORAZONES
// ======================================
function crearPetalo() {
    const petalsContainer = document.getElementById("petals");
    if (!petalsContainer) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 4 + 5 + "s";
    petal.style.opacity = Math.random() * 0.4 + 0.6;
    
    const size = Math.random() * 8 + 12;
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 9000);
}

function crearCorazon() {
    const heartElement = document.createElement("div");
    heartElement.classList.add("heart");
    heartElement.innerHTML = "❤️";
    heartElement.style.left = Math.random() * 100 + "vw";
    heartElement.style.animationDuration = Math.random() * 3 + 4 + "s";
    
    const size = Math.random() * 12 + 14;
    heartElement.style.fontSize = size + "px";
    
    document.body.appendChild(heartElement);
    setTimeout(() => heartElement.remove(), 7000);
}

setInterval(crearPetalo, 400);
setInterval(crearCorazon, 800);

// ======================================
// SECUENCIA DE APERTURA (PORTADA)
// ======================================
window.onload = () => {
    music.play().catch(() => {});

    // 1. A los 2 segundos: El corazón detiene su latido y abre sus solapas
    setTimeout(() => {
        document.getElementById("heart").classList.add("stop-beat");
        document.querySelector(".left").classList.add("open");
        document.querySelector(".right").classList.add("open");
    }, 2000);

    // 2. A los 3.5 segundos: El corazón se desvanece al fondo y la carta emerge
    setTimeout(() => {
        heartContainer.classList.add("fade"); // Transición CSS suave del corazón
        letter.classList.add("active"); // Animación de surgimiento de la carta
        
        // 3. A los 5.3 segundos (cuando la carta se posiciona): Comienza la escritura
        setTimeout(() => {
            escribirTexto();
        }, 1800);

    }, 3500);
};
