let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let pressStartAudio = document.getElementById("pressstart");
let startPlayer = document.querySelector(".startplayer");
let startPlayerClicked = false;

function playSound(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";
  request.onload = function () {
    audioContext.decodeAudioData(request.response, function (buffer) {
      var source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContext.destination);
      source.start(0);
    });
  };
  request.send();
}

const welcome = document.querySelector(".welcome");
startPlayer.addEventListener("click", function () {
  if (!startPlayerClicked) {
    startPlayerClicked = true;
    playSound("/soundtracks/coin.wav");
    welcome.volume = 0;
    setTimeout(function () {
      window.location.href = "/game.html";
    }, 500);
  }
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());
document.addEventListener("dragstart", (event) => event.preventDefault());
