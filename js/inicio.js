let loopAtivo = true;

function mostrarContainer() {
  const container = document.querySelector("#container .startplayer");
  if (container) {
    if (!container.classList.contains("show")) {
      container.classList.remove("show");
      setTimeout(function () {
        container.classList.add("show");
        if (loopAtivo) {
          setTimeout(function () {
            mostrarContainer();
          }, 25000);
        }
      }, 6000);
    } else {
      container.classList.remove("show");
      setTimeout(function () {
        mostrarContainer();
      }, 1000);
    }
  }
}

mostrarContainer();

const startPlayer = document.querySelector(".startplayer");
startPlayer.addEventListener("click", function () {
  loopAtivo = false;
  startPlayer.classList.remove("show");
});

var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var startPlayerDiv = document.querySelector(".startplayer");
var playerOne = document.querySelector(".playerone");
var playerTwo = document.querySelector(".playertwo");
var soundEffectUrl = "/soundtracks/coin.wav";

startPlayerDiv.addEventListener("click", function (event) {
  event.preventDefault();

  playSound(soundEffectUrl);

  var video = document.querySelector(".playtheme");
  video.pause();

  hideStartPlayer();
  showPlayers();

  startPlayerDiv.classList.remove("show");
});

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

function hideStartPlayer() {
  startPlayerDiv.classList.add("hidden");
}

function showPlayers() {
  playerOne.classList.remove("hidden");
  playerTwo.classList.remove("hidden");
}

function redirectToPage(pageUrl) {
  playSound(soundEffectUrl);
  setTimeout(function () {
    window.location.href = pageUrl;
  }, 500);
}

playerOne.addEventListener("click", function () {
  redirectToPage("/bemvindo.html");
});

playerTwo.addEventListener("click", function () {
  redirectToPage("/bemvindo-luigi.html");
});

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());
document.addEventListener("dragstart", (event) => event.preventDefault());
