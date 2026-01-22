const images = document.querySelectorAll("#slideshow img");
const music = document.getElementById("music");
let index = 0;
const interval = 800; // velocidad entre imágenes

// función para mostrar las imágenes
function showNextImage() {
    // Ocultar imagen anterior
    if (index > 0 && index < images.length) {
        images[index - 1].classList.remove("show");
    }

    // Si llegamos al final del slideshow
    if (index >= images.length) {
        const backButtonContainer = document.getElementById('back-button-container');
        if (backButtonContainer) {
            backButtonContainer.style.display = 'block'; // mostrar botón
            backButtonContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        return; // detener slideshow
    }

    // Mostrar imagen actual
    images[index].classList.add("show");
    index++;

    // Continuar slideshow
    if (index <= images.length) {
        setTimeout(showNextImage, interval);
    }
}

// Configurar volumen al 40% y preparar la reproducción
music.volume = 0.4; // 40% de volumen

// Función para crear corazones flotantes
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    
    // Eliminar el corazón después de la animación
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Crear corazones cada 300ms
setInterval(createHeart, 300);

// Obtener el elemento del mensaje
const tapMessage = document.getElementById('tap-message');

// Función para manejar la interacción
function handleFirstInteraction() {
    // Hide the message
    tapMessage.classList.add('hidden');
    
    // Start music if paused
    if (music.paused) {
        music.play()
            .then(() => console.log('Música iniciada'))
            .catch(error => console.error('Error al reproducir:', error));
    }
    
    // Start the slideshow
    showNextImage();
    
    // Remove this handler after the first interaction
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
}
function showNextImage() {
    // Only remove the previous image if it's not the last one
    if (index > 0 && index < images.length) {
        images[index - 1].classList.remove("show");
    }
    
    // Check if we've reached the end of the slideshow
    if (index >= images.length) {
        // Show the back button when the slideshow ends
        const backButtonContainer = document.getElementById('back-button-container');
        if (backButtonContainer) {
            backButtonContainer.style.display = 'block';
            // Add margin to separate from the last image
            backButtonContainer.style.marginTop = '40px';
            // Smooth scroll to the button after a short delay
            setTimeout(() => {
                backButtonContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 500);
        }
        return;
    }
    
    // Show current image
    images[index].classList.add("show");
    index++;
    
    // Continue to next image
    if (index <= images.length) {
        setTimeout(showNextImage, interval);
    }
}
// In the handleFirstInteraction function, update the music play code:
function handleFirstInteraction() {
    // Hide the message
    tapMessage.classList.add('hidden');
    
    // Start music if available
    const playPromise = music.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Error al reproducir:', error);
            // If autoplay fails, we'll show a play button
            showMusicPlayButton();
        });
    }
    
    // Start the slideshow
    showNextImage();
    
    // Remove this handler after the first interaction
    window.removeEventListener('click', handleFirstInteraction);
    window.removeEventListener('touchstart', handleFirstInteraction);
}
// Add this new function to show a play button if autoplay fails
function showMusicPlayButton() {
    const playButton = document.createElement('button');
    playButton.textContent = 'Play Music';
    playButton.style.position = 'fixed';
    playButton.style.bottom = '20px';
    playButton.style.right = '20px';
    playButton.style.zIndex = '1000';
    playButton.style.padding = '10px 20px';
    playButton.style.borderRadius = '20px';
    playButton.style.border = 'none';
    playButton.style.background = '#ff4081';
    playButton.style.color = 'white';
    playButton.style.cursor = 'pointer';
    playButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    
    playButton.onclick = () => {
        music.play()
            .then(() => playButton.remove())
            .catch(e => console.log('Still cannot play:', e));
    };
    
    document.body.appendChild(playButton);
}
// Agregar manejadores de eventos para clic y toque
window.addEventListener('click', handleFirstInteraction, { once: true });
window.addEventListener('touchstart', handleFirstInteraction, { once: true });
