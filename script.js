const musicBox = document.getElementById('musicBox');
const status = document.getElementById('status');

let audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Remplace par un vrai son Music Box FNAF
let isPlaying = false;

musicBox.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    status.textContent = "Le silence revient... elle approche.";
  } else {
    audio.play();
    status.textContent = "La Music Box tourne... elle reste calme.";
  }
  isPlaying = !isPlaying;
});

// Effet de flottement supplémentaire sur la marionnette
document.querySelector('.puppet-float').addEventListener('mouseover', function() {
  this.style.transform = 'scale(1.1)';
});

document.querySelector('.puppet-float').addEventListener('mouseout', function() {
  this.style.transform = '';
});