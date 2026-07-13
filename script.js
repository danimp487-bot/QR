// ================================
// ELEMENTOS
// ================================

const textoElemento = document.getElementById("typewriter");
const cursor = document.getElementById("cursor");
const boton = document.getElementById("nextButton");
const musica = document.getElementById("bgMusic");

// Texto definido en el HTML
let indice = 0;
const velocidad = 35; // milisegundos por letra

// ================================
// EFECTO MÁQUINA DE ESCRIBIR
// ================================

function escribirTexto() {

    if (indice < texto.length) {

        const letra = texto.charAt(indice);

        // Mantener saltos de línea
        if (letra === "\n") {
            textoElemento.innerHTML += "<br><br>";
        } else {
            textoElemento.innerHTML += letra;
        }

        indice++;

        setTimeout(escribirTexto, velocidad);

    } else {

        // Esperar un poco al terminar
        setTimeout(() => {

            cursor.style.opacity = "0";

            boton.classList.add("mostrar");

        }, 2000);

    }

}

// ================================
// MÚSICA
// ================================

function iniciarMusica() {

    musica.volume = 0.35;

    musica.play().catch(() => {

        // Si el navegador bloquea el autoplay,
        // comenzará cuando el usuario haga clic.

        document.addEventListener("click", () => {
            musica.play();
        }, { once: true });

    });

}

// ================================
// CAMBIO DE PANTALLA
// ================================

function mostrarSegundaPantalla() {

    document.body.classList.add("fadeOut");

    setTimeout(() => {

        // Aquí construiremos la segunda pantalla.
        // De momento solo aparece un mensaje.

        document.body.innerHTML = `
            <div class="segundaPantalla">
                <h1>Próximamente... ❤️</h1>
            </div>
        `;

    }, 1000);

}

// ================================
// BOTÓN
// ================================

boton.addEventListener("click", () => {

    boton.style.transform = "scale(0.95)";

setTimeout(() => {

    cursor.style.display = "none";

    boton.style.display = "block";

    setTimeout(() => {
        boton.classList.add("mostrar");
    },100);

},2000);

});

// ================================
// INICIO
// ================================

window.addEventListener("load", () => {

    iniciarMusica();

    setTimeout(() => {

        escribirTexto();

    }, 700);

});
