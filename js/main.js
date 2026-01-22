const envelope = document.getElementById("envelope");
const paper = document.getElementById("paper");
const text = document.getElementById("text");
const music = document.getElementById("music");

const message = `Another year older (haha, more mature) and you’re as beautiful as ever. 
I can only wish that you have an amazing day on this very special day, the day you were born, beautiful Selina. 
Maybe this gift isn’t much, but I assure you it’s from the heart, and I made it thinking of you the whole time. I’m not very good with words, but happy birthday—I wish you all the best, beautiful princess :3`;

let i = 0;
let isOpen = false;

// Initialize music with volume set to 0.4 (40%)
if (music) {
    music.volume = 0.4;
}

envelope.addEventListener("click", () => {
    if (isOpen) return; // Prevent multiple clicks
    isOpen = true;
    
    // Add open class to envelope
    envelope.classList.add("open");
    
    // Play music if available
    if (music) {
        music.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });
    }
    
    // Show paper with a slight delay
    setTimeout(() => {
        paper.classList.add("show");
        typeWriter();
    }, 500);
});

function typeWriter() {
    if (i < message.length) {
        // Add character by character
        text.innerHTML += message.charAt(i);
        i++;
        
        // Auto-scroll to bottom of the paper
        const paper = document.getElementById('paper');
        paper.scrollTop = paper.scrollHeight;
        
        // Add slight random delay for more natural typing effect
        const speed = Math.random() * 30 + 20; // Between 20-50ms
        setTimeout(typeWriter, speed);
    } else {
        // Add continue button after the message is fully typed
        const continueButton = document.createElement('button');
        continueButton.className = 'continue-btn';
        continueButton.innerHTML = 'Continue to the Next Chapter';
        continueButton.onclick = () => window.location.href = 'capitulo2.html';
        
        // Add some space and center the button
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '30px';
        buttonContainer.style.textAlign = 'center';
        buttonContainer.appendChild(continueButton);
        
        text.parentNode.insertBefore(buttonContainer, text.nextSibling);
        
        // Final scroll to ensure button is visible
        setTimeout(() => {
            paper.scrollTop = paper.scrollHeight;
        }, 100);
    }
}

/* Floating Hearts */
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    heart.style.fontSize = (18 + Math.random() * 12) + "px";
    document.body.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Create hearts every 300ms
setInterval(createHeart, 300);

// Add initial hearts on load
for (let i = 0; i < 5; i++) {
    setTimeout(createHeart, i * 200);
}
