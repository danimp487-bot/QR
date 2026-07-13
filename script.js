/**
 * PROYECTO: Regalo Romántico Digital
 * ARQUITECTURA: SPA (Single Page Application) modular y responsiva
 */

// Mensaje romántico para la primera pantalla
const mensajeTypewriter = "Hay momentos que cambian nuestra vida para siempre... y conocerte a ti fue el más hermoso de todos.";

// Configuración general del proyecto
const CONFIG = {
    velocidadEscritura: 65,  // Milisegundos entre cada letra
    esperaBoton: 1000,        // Retraso tras terminar el texto antes de mostrar el botón (ms)
};

document.addEventListener("DOMContentLoaded", () => {
    inicializarParticulas();
    iniciarTypewriter();
    configurarEventos();
});

/* ==========================================================================
   SISTEMA DE PARTÍCULAS (CORAZONES Y DESTELLOS)
   ========================================================================== */
function inicializarParticulas() {
    const canvas = document.getElementById("canvas-particulas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let particulasArray = [];

    // Redimensionar canvas de forma responsiva
    function ajustarPantalla() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", ajustarPantalla);
    ajustarPantalla();

    // Clase para definir cada partícula individual
    class Particula {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 8 + 4;
            this.speedY = Math.random() * 0.8 + 0.3; // Velocidad de subida lenta y sutil
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.3;
            this.type = Math.random() > 0.5 ? 'corazon' : 'destello';
            this.alpha = Math.random() * 0.5 + 0.3;
            this.color = this.type === 'corazon' ? 'rgba(255, 77, 109, ' : 'rgba(212, 175, 55, ';
        }

        actualizar() {
            this.y -= this.speedY;
            this.x += this.speedX;
            // Desvanecer sutilmente al subir
            if (this.y < canvas.height * 0.2) {
                this.alpha -= 0.005;
            }
        }

        dibujar() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color + this.alpha + ')';

            if (this.type === 'corazon') {
                // Dibujo vectorial de un corazón perfecto
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, this.y + this.size / 3, this.x, this.y + this.size);
                ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 3, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
                ctx.fill();
            } else {
                // Dibujo de un destello sutil de 4 puntas
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

    // Gestionar el bucle de las partículas
    function animarParticulas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Generar nuevas partículas periódicamente de forma dosificada
        if (particulasArray.length < 50 && Math.random() < 0.03) {
            particulasArray.push(new Particula());
        }

        for (let i = 0; i < particulasArray.length; i++) {
            particulasArray[i].actualizar();
            particulasArray[i].dibujar();

            // Eliminar partículas que salen de la pantalla o se desvanecen por completo
            if (particulasArray[i].y < -20 || particulasArray[i].alpha <= 0) {
                particulasArray.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animarParticulas);
    }
    
    animarParticulas();
}

/* ==========================================================================
   MÁQUINA DE ESCRIBIR (TYPEWRITER)
   ========================================================================== */
function iniciarTypewriter() {
    const contenedorTexto = document.getElementById("texto-maquina");
    const botonEntrar = document.getElementById("btn-entrar");
    if (!contenedorTexto) return;

    let index = 0;

    function escribirLetra() {
        if (index < mensajeTypewriter.length) {
            contenedorTexto.textContent += mensajeTypewriter.charAt(index);
            index++;
            setTimeout(escribirLetra, CONFIG.velocidadEscritura);
        } else {
            // El texto ha terminado de escribirse. Esperamos el tiempo configurado para revelar el botón.
            setTimeout(() => {
                botonEntrar.classList.remove("oculto");
                botonEntrar.classList.add("visible");
            }, CONFIG.esperaBoton);
        }
    }

    escribirLetra();
}

/* ==========================================================================
   CONFIGURACIÓN DE EVENTOS Y AUDIO CONTINUO
   ========================================================================== */
function configurarEventos() {
    const botonEntrar = document.getElementById("btn-entrar");
    const musica = document.getElementById("musica-fondo");

    if (botonEntrar) {
        botonEntrar.addEventListener("click", () => {
            // Intentar reproducir la música al hacer clic (requisito de interacción del navegador)
            if (musica) {
                musica.play().catch(error => {
                    console.log("La reproducción automática de audio requiere interacción física del usuario:", error);
                });
            }
            
            // Iniciar la transición suave hacia la segunda pantalla
            cambiarPantalla("pantalla-1", "pantalla-2");
        });
    }
}

/**
 * Cambia suavemente de una pantalla a otra ocultando una y mostrando otra mediante CSS.
 * @param {string} idPantallaActual 
 * @param {string} idPantallaSiguiente 
 */
function cambiarPantalla(idPantallaActual, idPantallaSiguiente) {
    const actual = document.getElementById(idPantallaActual);
    const siguiente = document.getElementById(idPantallaSiguiente);

    if (actual && siguiente) {
        // Desvanecer la pantalla actual
        actual.classList.remove("activa");
        
        // Esperamos un momento para permitir que se complete la transición de salida antes de activar la siguiente
        setTimeout(() => {
            siguiente.classList.add("activa");
            
            // Si la siguiente pantalla es la número 2, disparamos su respectiva función callback de control
            if (idPantallaSiguiente === "pantalla-2") {
                mostrarSegundaPantalla();
            }
        }, 800); // Sincronizado con la duración de la transición CSS
    }
}

/* ==========================================================================
   ESTRUCTURA DE EXPANSIÓN (PANTALLA 2 Y SIGUIENTES)
   ========================================================================== */
/**
 * Función preparada para añadir o controlar la lógica de la segunda pantalla en el futuro.
 * Al estar centralizada aquí, puedes poblar elementos dinámicos, iniciar animaciones
 * específicas de esta pantalla o gestionar nuevos botones para siguientes transiciones.
 */
function mostrarSegundaPantalla() {
    console.log("Transición exitosa: Pantalla 2 activa. La música de fondo se reproduce de manera ininterrumpida.");
    
    // Ejemplo de cómo estructurar la adición de futuras pantallas:
    // Puedes preparar un botón en el HTML de la pantalla 2 con ID 'btn-siguiente-pantalla'
    // y programar un comportamiento similar aquí para redirigir a 'pantalla-3', 'pantalla-4', etc.
}
