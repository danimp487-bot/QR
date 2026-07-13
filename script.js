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
// LOS 13 RECUERDOS
// ======================================
const recuerdos = [
    {
        imagen: "img/foto1.jpg",
        titulo: "❤️ Capítulo 1 ❤️",
        texto: "Aquí va el texto de tu primer recuerdo especial con Nerea."
    },
    {
        imagen: "img/foto2.jpg",
        titulo: "❤️ Capítulo 2 ❤️",
        texto: "Aquí va el texto de tu segundo recuerdo."
    },
    {
        imagen: "img/foto3.jpg",
        titulo: "❤️ Capítulo 3 ❤️",
        texto: "Aquí va el texto de tu tercer recuerdo."
    },
    {
        imagen: "img/foto4.jpg",
        titulo: "❤️ Capítulo 4 ❤️",
        texto: "Aquí va el texto de tu cuarto recuerdo."
    },
    {
        imagen: "img/foto5.jpg",
        titulo: "❤️ Capítulo 5 ❤️",
        texto: "Aquí va el texto de tu quinto recuerdo."
    },
    {
        imagen: "img/foto6.jpg",
        titulo: "❤️ Capítulo 6 ❤️",
        texto: "Aquí va el texto de tu sexto recuerdo."
    },
    {
        imagen: "img/foto7.jpg",
        titulo: "❤️ Capítulo 7 ❤️",
        texto: "Aquí va el texto de tu séptimo recuerdo."
    },
    {
        imagen: "img/foto8.jpg",
        titulo: "❤️ Capítulo 8 ❤️",
        texto: "Aquí va el texto de tu octavo recuerdo."
    },
    {
        imagen: "img/foto9.jpg",
        titulo: "❤️ Capítulo 9 ❤️",
        texto: "Aquí va el texto de tu noveno recuerdo."
    },
    {
        imagen: "img/foto10.jpg",
        titulo: "❤️ Capítulo 10 ❤️",
        texto: "Aquí va el texto de tu décimo recuerdo."
    },
    {
        imagen: "img/foto11.jpg",
        titulo: "❤️ Capítulo 11 ❤️",
        texto: "Aquí va el texto de tu undécimo recuerdo."
    },
    {
        imagen: "img/foto12.jpg",
        titulo: "❤️ Capítulo 12 ❤️",
        texto: "Aquí va el texto de tu duodécimo recuerdo."
    },
    {
        imagen: "img/foto13.jpg",
        titulo: "❤️ Capítulo 13 ❤️",
        texto: "Aquí va el texto del último recuerdo antes de la gran carta final."
    }
];

// ======================================
// TEXTO FINAL
// ======================================
const mensajeFinal = `Nerea, escribir aquí tu mensaje final de cumpleaños de la forma más romántica y bonita posible para cerrar el viaje por vuestros recuerdos. ❤️`;

// ======================================
// EFECTO MÁQUINA DE ESCRIBIR (TEXTO INICIAL)
// ======================================
function escribirTexto() {
    if (indiceTexto < texto.length) {
        typewriter.innerHTML += texto.charAt(indiceTexto);
        indiceTexto++;
        setTimeout(escribirTexto, 35); // Velocidad de escritura en milisegundos
    } else {
        cursor.style.display = "none";
        startButton.classList.add("show");
    }
}

// ======================================
// EFECTO MÁQUINA DE ESCRIBIR (TEXTO FINAL)
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
// EVENTOS DE LOS BOTONES
// ======================================

// Botón de comenzar viaje
startButton.addEventListener("click", () => {
    // Intentar reproducir música de nuevo en caso de que el navegador la bloqueara al inicio
    music.play().catch(() => {});
    
    intro.classList.add("ocultar");
    setTimeout(() => {
        intro.style.display = "none";
        memorySection.style.display = "flex";
        memorySection.classList.add("mostrar");
        cargarRecuerdo();
    }, 800);
});

// Botón de siguiente recuerdo
nextMemory.addEventListener("click", () => {
    recuerdoActual++;
    if (recuerdoActual < recuerdos.length) {
        // Animación suave de transición al cambiar de tarjeta de recuerdo
        const card = document.querySelector(".memoryCard");
        card.style.opacity = "0";
        card.style.transform = "translateY(20px) scale(0.95)";
        
        setTimeout(() => {
            cargarRecuerdo();
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
        }, 400);
    } else {
        // Transición a la sección final
        memorySection.classList.add("ocultar");
        setTimeout(() => {
            memorySection.style.display = "none";
            finalSection.style.display = "flex";
            finalSection.classList.add("mostrar");
            escribirTextoFinal();
        }, 800);
    }
});

// Botón de finalizar
finishButton.addEventListener("click", () => {
    // Lluvia masiva de corazones sorpresa al hacer clic al final
    for (let i = 0; i < 40; i++) {
        setTimeout(crearCorazon, i * 80);
    }
    alert("¡Feliz cumpleaños, Nerea! Gracias por compartir tu camino conmigo. ❤️");
});

// ======================================
// GENERACIÓN DINÁMICA DE ELEMENTOS (PÉTALOS Y CORAZONES)
// ======================================
function crearPetalo() {
    const petalsContainer = document.getElementById("petals");
    if (!petalsContainer) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");
    
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 4 + 5 + "s"; // entre 5 y 9 segundos de caída
    petal.style.opacity = Math.random() * 0.4 + 0.6;
    
    const size = Math.random() * 8 + 12; // tamaños variados de pétalos
    petal.style.width = size + "px";
    petal.style.height = size + "px";
    
    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 9000);
}

function crearCorazon() {
    const heartElement = document.createElement("div");
    heartElement.classList.add("heart");
    heartElement.innerHTML = "❤️";
    
    heartElement.style.left = Math.random() * 100 + "vw";
    heartElement.style.animationDuration = Math.random() * 3 + 4 + "s"; // entre 4 y 7 segundos de vuelo
    
    const size = Math.random() * 12 + 14; // tamaños variados de corazones
    heartElement.style.fontSize = size + "px";
    
    document.body.appendChild(heartElement);

    setTimeout(() => {
        heartElement.remove();
    }, 7000);
}

// Intervalos continuos para mantener viva la pantalla
setInterval(crearPetalo, 400);
setInterval(crearCorazon, 800);

// ======================================
// AL CARGAR LA PÁGINA
// ======================================
window.onload = () => {
    // Intentar reproducir música de fondo
    music.play().catch(() => {
        console.log("La reproducción automática de música está esperando una interacción del usuario.");
    });

    // Animación inicial del corazón abriéndose a los lados
    setTimeout(() => {
        const leftPart = document.querySelector(".left");
        const rightPart = document.querySelector(".right");
        if (leftPart && rightPart) {
            leftPart.style.transform = "rotate(-130deg)";
            rightPart.style.transform = "rotate(130deg)";
        }
    }, 2000);

    // Ocultar el corazón y revelar la carta con el typewriter
    setTimeout(() => {
        heartContainer.style.display = "none";
        letter.style.display = "block";
        setTimeout(() => {
            letter.style.opacity = "1";
            escribirTexto();
        }, 100);
    }, 3200);
};
