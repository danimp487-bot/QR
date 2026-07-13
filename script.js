// ==========================================
// CONFIGURACIÓN DE TEXTOS DE LAS ETAPAS
// ==========================================

const textoIntro = `Feliz 21 cumpleaños, mi amor. ❤️

Este año quería regalarte algo un poco diferente. No quería que este día se quedara solo en un regalo material, porque siento que lo más valioso que tenemos es todo lo que hemos vivido juntos.

Por eso he querido preparar este pequeño viaje por nuestra historia. Un recorrido por las etapas, los momentos, las risas, las aventuras y todos esos recuerdos que llevo guardados con tanto cariño. Quiero que, mientras avances, puedas volver a sentir todo lo bonito que hemos construido juntos.

Espero de corazón que te guste y que lo disfrutes tanto como yo he disfrutado preparándolo para ti.

Gracias por hacer mi vida mucho más feliz y por ser la persona con la que quiero seguir creando miles de recuerdos más.

Te amo con todo mi corazón.

Feliz cumpleaños, mi vida. ❤️`;

const textoFinal = `Y este es el final de nuestro pequeño viaje digital... pero solo el inicio de todo lo maravilloso que nos espera juntos. ❤️

Gracias por ser la mejor compañera de vida que podría desear. Por entenderme con una mirada, reírte de mis chistes y sostenerme cuando lo necesito. Valoro cada segundo a tu lado más de lo que las palabras pueden expresar.

Espero que ver estas 13 fotos te haya recordado lo bonito que es nuestro camino juntos. Eres mi presente y mi futuro.

Feliz 21 cumpleaños, mi amor. Hoy celebramos tu vida, tu sonrisa y el maravilloso ser humano que eres.

Para siempre nosotros, te amo con locura. 💖`;

// Array con los 13 recuerdos (Simplificado sin títulos de capítulo)
const recuerdos = [
    { img: "img/foto1.jpg", text: "Una de nuestras primeras fotos, donde empezo toda esta fantástica historia, recuerdo como me sentia cada vez que te veia con la chapa que te regale de collar, me ecantaba verte con ella." },
    { img: "img/foto2.jpg", text: "Esta es una de las fotos que más me gustan de nuestra relación, la tenemos en nuestro pijama y siempre la voy a recordar." },
    { img: "img/foto3.jpg", text: "Esas clases de TIC juntos o cualquier otra donde solo pensaba en querer estar pegado a ti porque eras mi unico motivo para querer ir al instituto." },
    { img: "img/foto4.jpg", text: "Cuando estabamos en mi cochera todo el dia juntos hablando de lo que fuera aun pasando mucha calor me encantaba estar alli contigo." },
    { img: "img/foto5.jpg", text: "Nuestro 2º aniversario, que guapa estabas con ese vestido y como me gusta irme de hotel contigo, ojalá nos vayamos siempre juntos a uno en nuestro aniversario." },
    { img: "img/foto6.jpg", text: "Esa cena improvisada en la cocina donde terminamos bailando." },
    { img: "img/foto7.jpg", text: "En nuestra graduación, es alucinante como se pueden pasar tantos momentos importantes con una persona que te hace tan feliz, al ver estas fotos me acuerdo de lo afortunado que soy." },
    { img: "img/foto8.jpg", text: "Cada momento, cada cita, aunque sea de compras con tu madre sera un buen recuerdo para mi, porque estas tú en el ." },
    { img: "img/foto9.jpg", text: "Caminatas eternas cogidos de la mano sin importar el destino." },
    { img: "img/foto10.jpg", text: "Eres la niña mas guapa del mundo y haces que cada segundo a tu lado valga la pena." },
    { img: "img/foto11.jpg", text: "ojalá poder hacer planes contigo para el resto de mi vida, no tienen precio esos momentos a tu lado." },
    { img: "img/foto12.jpg", text: "Esa carita, esa sonrisa con esas risas tan graciosas te lo juro que es lo más bonito que veran mis ojos, nunca me voy a cansar de eso." },
    { img: "img/foto13.jpg", text: "A ti te molestan estas fotos pero para mi son las mejores, verte dormida en mi hombro me recuerda que yo ya he conseguido lo q mucha gente busca para siempre.." }
];

// ==========================================
// ELEMENTOS DEL DOM
// ==========================================
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// Parte 1
const part1 = document.getElementById("part1");
const typewriter1 = document.getElementById("typewriter1");
const toPart2Btn = document.getElementById("toPart2Btn");

// Parte 2
const part2 = document.getElementById("part2");
const memoryCounter = document.getElementById("memory-counter");
const memoryImg = document.getElementById("memory-img");
const memoryText = document.getElementById("memory-text");
const progressBar = document.getElementById("progress-bar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const toPart3Btn = document.getElementById("toPart3Btn");

// Parte 3
const part3 = document.getElementById("part3");
const typewriter2 = document.getElementById("typewriter2");
const finalSurpriseBtn = document.getElementById("finalSurpriseBtn");

// ==========================================
// SISTEMA DE CONTROL DE MÚSICA
// ==========================================
let isMusicPlaying = false;

function playMusic() {
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicToggle.classList.add("music-playing");
    }).catch(err => {
        console.log("Espera de interacción del usuario para reproducir música.");
    });
}

function toggleMusic() {
    if (isMusicPlaying) {
        bgMusic.pause();
        isMusicPlaying = false;
        musicToggle.classList.remove("music-playing");
    } else {
        bgMusic.play();
        isMusicPlaying = true;
        musicToggle.classList.add("music-playing");
    }
}

musicToggle.addEventListener("click", toggleMusic);

document.addEventListener("click", () => {
    if (!isMusicPlaying) playMusic();
}, { once: true });

// ==========================================
// MÁQUINA DE ESCRIBIR CON AUTO-SCROLL SUAVE
// ==========================================
function typeEffect(element, text, speed, callback) {
    let index = 0;
    element.innerHTML = "";
    const container = element.parentElement;
    
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            // Auto-scroll durante la escritura para que siga el cursor
            container.scrollTop = container.scrollHeight;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// ==========================================
// TRANSICIÓN ENTRE SECCIONES
// ==========================================
function switchSection(fromSection, toSection, callback) {
    fromSection.style.opacity = "0";
    setTimeout(() => {
        fromSection.style.display = "none";
        toSection.style.display = "flex";
        toSection.style.opacity = "0";
        setTimeout(() => {
            toSection.style.opacity = "1";
            if (callback) callback();
        }, 50);
    }, 600);
}

// ==========================================
// PARTE 1: INICIO DE WEB
// ==========================================
window.onload = () => {
    createPetals();
    // Empezar a escribir tras una pequeña pausa inicial de 1 segundo
    setTimeout(() => {
        // Velocidad cambiada a 55ms (más lento y tierno)
        typeEffect(typewriter1, textoIntro, 20, () => {
            typewriter1.nextElementSibling.style.display = "none"; // Ocultar cursor
            toPart2Btn.classList.add("visible-element");
        });
    }, 1000);
};

// ==========================================
// PARTE 2: GESTOR DE LOS 13 RECUERDOS (SLIDESHOW)
// ==========================================
let currentMemoryIndex = 0;
let slideshowTimer = null;
let progressTimer = null;
const SLIDE_DURATION = 10000; // 10 segundos

function startSlideshow() {
    loadMemory(0);
}

function loadMemory(index) {
    currentMemoryIndex = index;
    const memory = recuerdos[index];

    // Cambiar la interfaz de la Polaroid
    memoryCounter.textContent = `${index + 1} / ${recuerdos.length}`;
    
    // Suave desvanecimiento de la imagen al cambiar
    memoryImg.style.opacity = "0.2";
    setTimeout(() => {
        memoryImg.src = memory.img;
        memoryImg.style.opacity = "1";
    }, 200);

    // Solo cargamos el texto descriptivo
    memoryText.textContent = memory.text;

    // Configurar visibilidad de botones manuales
    prevBtn.style.opacity = index === 0 ? "0.3" : "1";
    prevBtn.style.pointerEvents = index === 0 ? "none" : "auto";
    
    // Si llegamos al recuerdo 13, cambiamos controles por el botón de pase a la parte 3
    if (index === recuerdos.length - 1) {
        nextBtn.style.display = "none";
        toPart3Btn.classList.add("visible-element");
    } else {
        nextBtn.style.display = "block";
        toPart3Btn.classList.remove("visible-element");
    }

    // Reiniciar y arrancar la animación de la barra de progreso
    resetProgressBar();
    animateProgressBar();

    // Configurar temporizador automático
    clearTimeout(slideshowTimer);
    if (index < recuerdos.length - 1) {
        slideshowTimer = setTimeout(() => {
            loadMemory(index + 1);
        }, SLIDE_DURATION);
    }
}

function animateProgressBar() {
    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        let percentage = Math.min((progress / SLIDE_DURATION) * 100, 100);
        progressBar.style.width = percentage + "%";
        if (progress < SLIDE_DURATION) {
            progressTimer = requestAnimationFrame(step);
        }
    }
    progressTimer = requestAnimationFrame(step);
}

function resetProgressBar() {
    cancelAnimationFrame(progressTimer);
    progressBar.style.width = "0%";
}

// Botón Siguiente Manual
nextBtn.addEventListener("click", () => {
    if (currentMemoryIndex < recuerdos.length - 1) {
        loadMemory(currentMemoryIndex + 1);
    }
});

// Botón Anterior Manual
prevBtn.addEventListener("click", () => {
    if (currentMemoryIndex > 0) {
        loadMemory(currentMemoryIndex - 1);
    }
});

// Ir de la Parte 1 a la Parte 2
toPart2Btn.addEventListener("click", () => {
    playMusic();
    switchSection(part1, part2, () => {
        startSlideshow();
    });
});

// Ir de la Parte 2 a la Parte 3
toPart3Btn.addEventListener("click", () => {
    clearTimeout(slideshowTimer);
    cancelAnimationFrame(progressTimer);

    switchSection(part2, part3, () => {
        // Velocidad cambiada a 55ms (más lento y tierno)
        typeEffect(typewriter2, textoFinal, 20, () => {
            typewriter2.nextElementSibling.style.display = "none"; // Ocultar cursor
            finalSurpriseBtn.classList.add("visible-element");
        });
    });
});

// Sorpresa Final: Lluvia masiva de corazones al clickear el último botón
finalSurpriseBtn.addEventListener("click", () => {
    for (let i = 0; i < 50; i++) {
        setTimeout(createExplodingHeart, i * 100);
    }
    alert("¡Muchísimas felicidades Nerea! Te amo eternamente ❤️");
});


// ==========================================
// EFECTOS VISUALES: PÉTALOS Y CORAZONES
// ==========================================
function createPetals() {
    const container = document.getElementById("petals-container");
    const elements = ["🌸", "✨", "💕", "🌹", "💮"];
    
    setInterval(() => {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        petal.textContent = elements[Math.floor(Math.random() * elements.length)];
        
        petal.style.left = Math.random() * 100 + "vw";
        petal.style.fontSize = Math.random() * 15 + 15 + "px";
        petal.style.animationDuration = Math.random() * 5 + 6 + "s";
        petal.style.opacity = Math.random() * 0.5 + 0.5;
        
        container.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 11000);
    }, 400);
}

function createExplodingHeart() {
    const heart = document.createElement("div");
    heart.classList.add("falling-heart");
    
    const heartTypes = ["❤️", "💖", "💝", "💕", "😍", "💗"];
    heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 2.5 + "s";
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 4500);
}
