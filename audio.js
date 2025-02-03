// Create an audio element
const audio = new Audio("audio/Moan earrape.mp3"); // Replace with the path to your sound file

// Set the volume to max
audio.volume = 1.0;

// Play the sound when the button is pressed
document.getElementById("loud-button").addEventListener('click', () => {
    audio.play().catch(err => console.error('Failed to play sound:', err));
});