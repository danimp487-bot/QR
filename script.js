/**
 * PROYECTO: Regalo de Cumpleaños Interactivo
 * ROL: Desarrollador Senior HTML, CSS, JavaScript (Estilo Vainilla Puro)
 */

// Carta de amor con el formato y saltos de línea solicitados
const cartaTexto = `Feliz 21 cumpleaños, mi amor. ❤️

Este año quería regalarte algo un poco diferente. No quería que este día se quedara solo en un regalo material, porque siento que lo más valioso que tenemos es todo lo que hemos vivido juntos.

Por eso he querido preparar este pequeño viaje por nuestra historia. Un recorrido por las etapas, los momentos, las risas, las aventuras y todos esos recuerdos que llevo guardados con tanto cariño. Quiero que, mientras avances, puedas volver a sentir todo lo bonito que hemos construido juntos.

Espero de corazón que te guste y que lo disfrutes tanto como yo he disfrutado preparándolo para ti.

Gracias por hacer mi vida mucho más feliz y por ser la persona con la que quiero seguir creando miles de recuerdos más.

Te amo con todo mi corazón. Feliz cumpleaños, mi vida. ❤️`;

// Configuración de la máquina de escribir
const CONFIG_ESCRITURA = {
    velocidadBase: 40,      // Velocidad estándar de escritura (ms)
    pausaPunto: 600,        // Pausa extra al encontrar un punto (.) (ms)
    pausaComa: 350,         // Pausa extra al encontrar una coma (,) (ms)
    pausaFinTexto: 2000,    // Espera cuando el texto se completa antes de desvanecer el cursor y revelar el botón (ms)
};

document.addEventListener("DOMContentLoaded", () => {
    inicializarFondoParticulas();
    inicializarNavegacion();
});

/* ==========================================================================
   CANVAS DE PARTÍCULAS ROMÁNTICAS (CORAZONES Y DESTELLOS)
   ========================================================================== */
function inicializarFondoParticulas() {
    const canvas = document.getElementById("canvas-particulas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particulas = [];

    function ajustarMedidas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", ajustarMedidas);
    ajustarMedidas();

    class Particula {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 80;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 0.7 + 0.25; // Ascenso lento y emotivo
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.25;
            this.type = Math.random() > 0.4 ? 'corazon' : 'destello';
            this.alpha = Math.random() * 0.4 + 0.3;
            this.decay = Math.random() * 0.002 + 0.001;
            this.color = this.type === 'corazon' ? 'rgba(255, 117, 143, ' : 'rgba(223, 183, 44, ';
        }

        actualizar() {
            this.y -= this.speedY;
            this.x += this.speedX;
            // Se desvanece de forma gradual
            this.alpha -= this.decay;
        }

        dibujar() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color + this.alpha + ')';

            if (this.type === 'corazon') {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
                ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y - this.size);
                ctx.quadraticCurveTo(this.x, this.y, this.x + this.size, this.y);
                ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + this.size);
                ctx.quadraticCurveTo(this.x, this.y, this.x - this.size, this.y);
                ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - this.size);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function renderLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (particulas.length < 40 && Math.random() < 0.02) {
            particulas.push(new Particula());
        }

        for (let i = 0; i < particulas.length; i++) {
            particulas[i].actualizar();
            particulas[i].dibujar();

            if (particulas[i].y < -20 || particulas[i].alpha <= 0) {
                particulas.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(renderLoop);
    }
    renderLoop();
}

/* ==========================================================================
   LÓGICA DE NAVEGACIÓN Y EXPERIENCIA DE AUDIO
   ========================================================================== */
function inicializarNavegacion() {
    const btnAbrirRegalo = document.getElementById("btn-abrir-regalo");
    const btnComenzar = document.getElementById("btn-comenzar");
    const musica = document.getElementById("musica-fondo");

    // Paso 1: Interactuar con la portada de regalo
    if (btnAbrirRegalo) {
        btnAbrirRegalo.addEventListener("click", () => {
            // Intentar reproducir la música de forma segura
            if (musica) {
                musica.play().then(() => {
                    console.log("Audio iniciado correctamente.");
                }).catch(err => {
                    console.warn("Restricciones de reproducción aplicadas:", err);
                });
            }

            // Cambiar de pantalla para iniciar el typewriter
            cambiarPantalla("pantalla-portada", "pantalla-1", () => {
                iniciarEfectoEscritura();
            });
        });
    }

    // Paso 2: Interactuar con el botón "Comenzar nuestro viaje"
    if (btnComenzar) {
        btnComenzar.addEventListener("click", () => {
            // Animación sutil de pulsación en el botón para feedback
            btnComenzar.style.transform = "scale(0.95)";
            
            setTimeout(() => {
                cambiarPantalla("pantalla-1", "pantalla-2");
            }, 150);
        });
    }
}

/**
 * Controla el fundido suave entre pantallas.
 */
function cambiarPantalla(idActual, idSiguiente, callback = null) {
    const actual = document.getElementById(idActual);
    const siguiente = document.getElementById(idSiguiente);

    if (actual && siguiente) {
        actual.classList.remove("activa");
        
        setTimeout(() => {
            siguiente.classList.add("activa");
            if (callback) callback();

            // Ejecuta el callback oficial para la segunda pantalla
            if (idSiguiente === "pantalla-2") {
                mostrarSegundaPantalla();
            }
        }, 1500); // Duración sincronizada con la transición CSS (1.5s)
    }
}

/* ==========================================================================
   EFECTO DE MÁQUINA DE ESCRIBIR NATURAL
   ========================================================================== */
function iniciarEfectoEscritura() {
    const contenedorTexto = document.getElementById("texto-maquina");
    const btnComenzar = document.getElementById("btn-comenzar");
    if (!contenedorTexto) return;

    // Activamos la clase del cursor parpadeante
    contenedorTexto.classList.add("cursor-activo");

    let index = 0;

    function escribirLetra() {
        if (index < cartaTexto.length) {
            const letraActual = cartaTexto.charAt(index);
            contenedorTexto.textContent += letraActual;
            index++;

            // Autoscroll para mantener la lectura visible en dispositivos pequeños
            const areaScroll = contenedorTexto.closest(".scroll-carta");
            if (areaScroll) {
                areaScroll.scrollTop = areaScroll.scrollHeight;
            }

            // Lógica de pausas expresivas naturales para humanizar la escritura
            let delay = CONFIG_ESCRITURA.velocidadBase;
            if (letraActual === '.' || letraActual === '❤️') {
                delay += CONFIG_ESCRITURA.pausaPunto;
            } else if (letraActual === ',') {
                delay += CONFIG_ESCRITURA.pausaComa;
            }

            setTimeout(escribirLetra, delay);
        } else {
            // Al finalizar el texto, esperamos un segundo antes de desvanecer el cursor
            setTimeout(() => {
                contenedorTexto.classList.remove("cursor-activo");
                contenedorTexto.classList.add("cursor-desvanecer");

                // Esperamos los 2 segundos adicionales solicitados para revelar el botón "Comenzar"
                setTimeout(() => {
                    if (btnComenzar) {
                        btnComenzar.classList.remove("oculto");
                        btnComenzar.classList.add("visible");
                    }
                }, CONFIG_ESCRITURA.pausaFinTexto);

            }, 1000);
        }
    }

    escribirLetra();
}

/* ==========================================================================
   FUNCIÓN COMPILADORA DE PANTALLA 2
   ========================================================================== */
/**
 * Función que se ejecuta automáticamente cuando se activa la pantalla 2.
 * Toda la estructura está preparada para añadir lógicas posteriores de forma limpia.
 */
function mostrarSegundaPantalla() {
    console.log("Iniciando Pantalla 2 de forma satisfactoria...");
    // El audio sigue reproduciéndose continuamente sin interrupciones.
}
