document.addEventListener("DOMContentLoaded", () => {
    
    // --- ELEMENTOS DEL DOM ---
    const audio = document.getElementById("bg-music");
    const musicBtn = document.getElementById("music-toggle");
    const ambientContainer = document.getElementById("ambient-hearts");
    
    const secHero = document.getElementById("hero");
    const secStory = document.getElementById("story");
    const secLetter = document.getElementById("letter-section");
    const secEnding = document.getElementById("ending-section");
    
    const btnStart = document.getElementById("btn-start");
    const btnFinal = document.getElementById("btn-final");
    
    const slides = document.querySelectorAll(".slide");
    const lightBox = document.getElementById("lightbox");
    const lightBoxImg = document.getElementById("lightbox-img");
    const lightBoxClose = document.querySelector(".lightbox-close");
    
    let currentSlide = 0;

    // --- 1. MÚSICA DE FONDO ---
    // Activa o pausa la reproducción del archivo de audio
    musicBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().catch(err => console.log("Interacción requerida primero:", err));
            musicBtn.classList.remove("muted");
        } else {
            audio.pause();
            musicBtn.classList.add("muted");
        }
    });

    // --- 2. CORAZONES AMBIENTALES DE FONDO ---
    // Genera pequeños corazones con opacidad muy baja de forma progresiva
    function createAmbientHeart() {
        if (document.hidden) return; // Detener si el usuario cambia de pestaña
        const heart = document.createElement("div");
        heart.classList.add("ambient-heart");
        heart.innerHTML = "❤️";
        
        // Atributos aleatorios discretos
        heart.style.left = Math.random() * 100 + "vw";
        const scale = Math.random() * 0.6 + 0.4;
        heart.style.transform = `scale(${scale})`;
        
        // Tiempos lentos para simular flotación relajada
        const duration = Math.random() * 10 + 10; 
        heart.style.animationDuration = duration + "s";
        
        ambientContainer.appendChild(heart);
        
        // Eliminación de nodo al concluir animación
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // Iniciar lluvia discreta de fondo
    setInterval(createAmbientHeart, 1500);

    // --- 3. TRANSICIÓN DE INICIO ---
    // Al pulsar comenzar, se inicia la música de fondo y se pasa a la historia
    btnStart.addEventListener("click", () => {
        // Intenta reproducir la música (requerimiento de navegadores modernos bajo acción del usuario)
        audio.play().catch(e => console.log("Autoplay bloqueado por políticas del navegador.", e));
        
        secHero.classList.add("hidden");
        setTimeout(() => {
            secHero.style.display = "none";
            secStory.classList.remove("hidden");
        }, 1000);
    });

    // --- 4. GESTIÓN DEL SLIDESHOW INTERACTIVO ---
    // Asignación de evento para los botones "Siguiente" de las fotos
    slides.forEach((slide, idx) => {
        const nextBtn = slide.querySelector(".btn-next");
        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                goToNextSlide();
            });
        }
    });

    function goToNextSlide() {
        slides[currentSlide].classList.remove("active");
        
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            setTimeout(() => {
                slides[currentSlide].classList.add("active");
            }, 300);
        } else {
            // Fin de la historia -> Transición a la carta final
            setTimeout(() => {
                secStory.classList.add("hidden");
                setTimeout(() => {
                    secStory.style.display = "none";
                    secLetter.classList.remove("hidden");
                    startTypewriter(); // Arrancar efecto máquina de escribir
                }, 1000);
            }, 300);
        }
    }

    // --- SOPORTE GESTUAL (SWIPE) PARA MÓVILES ---
    let touchStartX = 0;
    let touchEndX = 0;

    secStory.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    secStory.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50; // Mínima distancia para considerar deslizamiento
        if (touchStartX - touchEndX > threshold) {
            // Deslizó hacia la izquierda -> Siguiente foto
            goToNextSlide();
        }
    }

    // --- 5. DETALLE DE GALERÍA (LIGHTBOX DE IMÁGENES) ---
    // Amplía la imagen de cada diapositiva al pulsarla
    const images = document.querySelectorAll(".story-image");
    images.forEach(img => {
        img.addEventListener("click", () => {
            lightBoxImg.src = img.src;
            lightBox.classList.remove("hidden");
        });
    });

    lightBoxClose.addEventListener("click", () => {
        lightBox.classList.add("hidden");
    });

    lightBox.addEventListener("click", (e) => {
        if (e.target !== lightBoxImg) {
            lightBox.classList.add("hidden");
        }
    });

    // --- 6. CARTA CON EFECTO MÁQUINA DE ESCRIBIR ---
    const textTarget = document.getElementById("typewriter-text");
    
    // Carta larga, detallada y de alto impacto emocional
    const letterParagraphs = [
        "Feliz cumpleaños, mi amor.\n",
        "Hoy cumples 21 años y no encuentro suficientes palabras en mí para expresarte lo inmensamente afortunado que me siento de caminar a tu lado. La vida está repleta de coincidencias, pero conocerte ha sido, sin duda, la más hermosa de todas las mías.\n",
        "A lo largo de este camino, cada momento compartido se ha transformado en un recuerdo invaluable. Tus risas espontáneas, tu mirada dulce y la paz que me otorgas cuando pones tu cabeza en mi hombro son las razones que iluminan cada uno de mis días.\n",
        "Gracias por tu paciencia infinita, por ser mi cómplice número uno y por enseñarme la versión más sincera del amor. Adoro ver cómo creces, cómo persigues tus sueños y el corazón tan inmenso que tienes para los que te rodean.\n",
        "Quiero estar ahí para celebrar cada uno de tus éxitos, apoyarte en las incertidumbres y recordarte siempre lo increíblemente valiosa que eres. Que este nuevo año de vida te traiga toda la alegría que tú le regalas al mundo a diario.\n\n",
        "Te quiero muchísimo. Feliz 21 cumpleaños, mi vida ❤️"
    ];

    let currentParagraphIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 35; // Milisegundos entre letras. Velocidad óptima para no fatigar la lectura.

    function startTypewriter() {
        // Inicializar contenedor de texto limpio
        textTarget.innerHTML = "";
        typeNextChar();
    }

    function typeNextChar() {
        if (currentParagraphIndex < letterParagraphs.length) {
            const currentStr = letterParagraphs[currentParagraphIndex];
            
            if (currentCharIndex < currentStr.length) {
                const char = currentStr.charAt(currentCharIndex);
                
                if (char === "\n") {
                    textTarget.innerHTML += "<br>";
                } else {
                    textTarget.innerHTML += char;
                }
                
                currentCharIndex++;
                
                // Efecto de autoscroll en la carta para lecturas fluidas en móvil
                textTarget.scrollTop = textTarget.scrollHeight;
                
                setTimeout(typeNextChar, typingSpeed);
            } else {
                // Siguiente párrafo
                currentParagraphIndex++;
                currentCharIndex = 0;
                setTimeout(typeNextChar, typingSpeed * 3); // Breve pausa entre párrafos
            }
        } else {
            // Escritura de la carta finalizada. Revelar botón final.
            btnFinal.classList.remove("hidden");
            btnFinal.classList.add("fade-in");
        }
    }

    // --- 7. ANIMACIÓN DE CIERRE: LLUVIA DE CORAZONES EN CANVAS ---
    btnFinal.addEventListener("click", () => {
        secLetter.classList.add("hidden");
        setTimeout(() => {
            secLetter.style.display = "none";
            secEnding.classList.remove("hidden");
            startGrandFinaleHearts();
        }, 1000);
    });

    const canvas = document.getElementById("hearts-canvas");
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let heartsArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);

    class HeartParticle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height - 20; // Nacen arriba fuera de pantalla
            this.size = Math.random() * 15 + 8; // Variedad de tamaño
            this.speedY = Math.random() * 1.5 + 1; // Caída lenta y fluida
            this.speedX = Math.sin(Math.random() * 2) * 0.5; // Ligero balanceo lateral
            // Degradado rosa pastel/champán
            const hue = Math.floor(Math.random() * 15) + 345; // Rango rosa/rojo pastel (345 a 360)
            const lightness = Math.floor(Math.random() * 15) + 80; // Altos niveles de claridad
            this.color = `hsla(${hue}, 100%, ${lightness}%, ${Math.random() * 0.4 + 0.5})`;
            this.rotation = Math.random() * Math.PI;
            this.rotationSpeed = Math.random() * 0.01 - 0.005;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;

            // Reiniciar arriba si sobrepasa el límite inferior de la pantalla
            if (this.y > canvas.height + 20) {
                this.y = -40;
                this.x = Math.random() * canvas.width;
                this.speedY = Math.random() * 1.5 + 1;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            
            // Dibujado matemático de la forma clásica de corazón
            const scale = this.size / 10;
            ctx.moveTo(0, -3 * scale);
            ctx.bezierCurveTo(2 * scale, -7 * scale, 8 * scale, -7 * scale, 8 * scale, -1 * scale);
            ctx.bezierCurveTo(8 * scale, 4 * scale, 2 * scale, 7 * scale, 0, 11 * scale);
            ctx.bezierCurveTo(-2 * scale, 7 * scale, -8 * scale, 4 * scale, -8 * scale, -1 * scale);
            ctx.bezierCurveTo(-8 * scale, -7 * scale, -2 * scale, -7 * scale, 0, -3 * scale);
            
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
    }

    function startGrandFinaleHearts() {
        resizeCanvas();
        heartsArray = [];
        
        // Creamos una densidad idónea de 200 corazones flotando a la vez
        const maxHearts = 200;
        for (let i = 0; i < maxHearts; i++) {
            heartsArray.push(new HeartParticle());
        }
        
        animateHearts();
    }

    function animateHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < heartsArray.length; i++) {
            heartsArray[i].update();
            heartsArray[i].draw();
        }
        
        animationFrameId = requestAnimationFrame(animateHearts);
    }
});