let mario;
let jumping = false;
let checarColisao;
let gameInterval;
let countdown;
let renderMario;
let isMarioBig = false;
let keysPressed = {};
let isMarioInvincible = false;
let marioPosition = 50;
let isMovingRight = true;
let isMovingLeft = true;
let marioSpeed = 7;
let jumpDirection = null;
let lastKeyPressed = null;
let jumpSound = document.querySelector(".jump-sound");
let marioKeyRightPressed = "/images/mario-small-right.gif";
let marioKeyLeftPressed = "/images/mario-small-left.gif";
let marioStoppedRight = "/images/mario-small-right.gif";
let marioStoppedLeft = "/images/mario-small-left.gif";

function jump() {
  jumping = true;
  mario.classList.add("jumping");
  jumpSound.currentTime = 0;
  jumpSound.play();
  jumpDirection = isMovingRight ? "right" : "left";
  setTimeout(() => {
    mario.classList.remove("jumping");
    jumping = false;
    jumpDirection = null;
  }, 500);
}

function handleKeyDown(event) {
  keysPressed[event.code] = true;
  if (event.code === "Space" && !jumping) {
    jump();
  }
}

function handleKeyUp(event) {
  delete keysPressed[event.code];
  if (event.code === "ArrowLeft") {
    mario.src = isMovingRight ? marioStoppedRight : marioStoppedLeft;
  } else if (event.code === "ArrowRight") {
    mario.src = isMovingLeft ? marioStoppedLeft : marioStoppedRight;
  }
}

function removeEventListeners() {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);
}

function iniciarJogo() {
  mario = document.querySelector(".mario");
  let playaudio = document.querySelector(".overworld");
  playaudio.volume = 1;
  playaudio.play();

  function updatePosition() {
    let screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    let marioWidth = mario.offsetWidth;
    let cenarioContainerWidth =
      document.getElementById("container-game").offsetWidth;
    let keys = Object.keys(keysPressed);
    let isMovingLeft = !isMovingRight;
    let shouldMoveCenario = false;

    if (!keys.length) {
      mario.src = isMovingLeft ? marioStoppedLeft : marioStoppedRight;
      return;
    } else {
      shouldMoveCenario = true;
    }

    keys.forEach((key) => {
      if (key === "ArrowLeft") {
        marioPosition -= marioSpeed;
        marioPosition = Math.max(marioPosition, cenarioContainerWidth * 0.0);
        if (isMovingRight) {
          isMovingRight = false;
        }
        lastKeyPressed = "ArrowLeft";
      } else if (key === "ArrowRight") {
        let maxMarioPosition = cenarioContainerWidth * 0.9 - marioWidth;
        marioPosition += marioSpeed;
        marioPosition = Math.min(marioPosition, maxMarioPosition);
        if (
          isMovingLeft &&
          (!lastKeyPressed || lastKeyPressed !== "ArrowLeft")
        ) {
          isMovingRight = true;
        }
        lastKeyPressed = "ArrowRight";
      }
    });

    if (jumping && jumpDirection === "right") {
      marioPosition += marioSpeed;
    } else if (jumping && jumpDirection === "left") {
      marioPosition -= marioSpeed;
    }

    // let distanceFromLeft = marioPosition / cenarioContainerWidth;
    // let distanceFromRight =
    //   (cenarioContainerWidth * 0.0 - (marioPosition + marioWidth)) /
    //   cenarioContainerWidth;
    // let threshold = 0.5;

    // let cenario = document.querySelector(".cenario");
    // let cenarioWidth = cenario.offsetWidth;
    // let maxCenarioPosition = cenarioWidth - cenarioContainerWidth;
    // let cenarioSpeed = 10;

    // let cenarioPosition =
    //   parseFloat(getComputedStyle(cenario).left) || 0;

    // if (
    //   shouldMoveCenario ||
    //   (isMovingRight && distanceFromLeft <= threshold) ||
    //   (isMovingLeft && distanceFromRight <= threshold)
    // ) {
    //   cenarioPosition -= cenarioSpeed * (isMovingRight ? 1 : -1);
    // }
    // let finishPointerImage = document.querySelector(
    //   "#container-game .finishpointer"
    // );
    // let cenarioFinishPosition = -7850;

    // if (
    //   cenarioPosition <= cenarioFinishPosition &&
    //   cenarioFinishPosition <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   finishPointerImage.style.display = "block";
    //   let finishPointerLeft = cenarioFinishPosition - cenarioPosition;
    //   finishPointerImage.style.right = `${finishPointerLeft}px`;
    //   finishPointerImage.classList.add("animate-clearmission");
    // } else {
    //   finishPointerImage.style.display = "none";
    //   finishPointerImage.classList.remove("animate-clearmission");
    // }

    // let stake1Image = document.querySelector("#container-game .stake1");
    // let cenarioStake1Position = -7800;

    // if (
    //   cenarioPosition <= cenarioStake1Position &&
    //   cenarioStake1Position <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   stake1Image.style.display = "block";
    //   let stake1ImageLeft = cenarioStake1Position - cenarioPosition;
    //   stake1Image.style.right = `${stake1ImageLeft}px`;
    // } else {
    //   stake1Image.style.display = "none";
    // }

    // let stake2Image = document.querySelector("#container-game .stake2");
    // let cenarioStake2Position = -7880;

    // if (
    //   cenarioPosition <= cenarioStake2Position &&
    //   cenarioStake2Position <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   stake2Image.style.display = "block";
    //   let stake2ImageLeft = cenarioStake2Position - cenarioPosition;
    //   stake2Image.style.right = `${stake2ImageLeft}px`;
    // } else {
    //   stake2Image.style.display = "none";
    // }

    // let cascoredImage = document.querySelector("#container-game .cascored");
    // let cenariocascoredPosition = 770;

    // if (
    //   cenarioPosition <= cenariocascoredPosition &&
    //   cenariocascoredPosition <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   if (cascoredImage !== null) {
    //     cascoredImage.style.display = "block";
    //     let cascoredImageLeft = cenariocascoredPosition - cenarioPosition;
    //     cascoredImage.style.right = `${cascoredImageLeft}px`;
    //   }
    // } else {
    //   if (cascoredImage !== null) {
    //     cascoredImage.style.display = "none";
    //   }
    // }

    // let yoshiCoinImage = document.querySelector("#container-game .yoshicoin");
    // let cenarioYoshiCoinPosition = -1500;

    // if (
    //   cenarioPosition <= cenarioYoshiCoinPosition &&
    //   cenarioYoshiCoinPosition <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   if (yoshiCoinImage !== null) {
    //     yoshiCoinImage.style.display = "block";
    //     let yoshiCoinImageLeft = cenarioYoshiCoinPosition - cenarioPosition;
    //     yoshiCoinImage.style.right = `${yoshiCoinImageLeft}px`;
    //   }
    // } else {
    //   if (yoshiCoinImage !== null) {
    //     yoshiCoinImage.style.display = "none";
    //   }
    // }

    // let yoshiCoin2Image = document.querySelector("#container-game .yoshicoin2");
    // let cenarioYoshiCoin2Position = -2500;

    // if (
    //   cenarioPosition <= cenarioYoshiCoin2Position &&
    //   cenarioYoshiCoin2Position <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   if (yoshiCoin2Image !== null) {
    //     yoshiCoin2Image.style.display = "block";
    //     let yoshiCoin2ImageLeft = cenarioYoshiCoin2Position - cenarioPosition;
    //     yoshiCoin2Image.style.right = `${yoshiCoin2ImageLeft}px`;
    //   }
    // } else {
    //   if (yoshiCoin2Image !== null) {
    //     yoshiCoin2Image.style.display = "none";
    //   }
    // }

    // let yoshiCoin3Image = document.querySelector("#container-game .yoshicoin3");
    // let cenarioYoshiCoin3Position = -3500;

    // if (
    //   cenarioPosition <= cenarioYoshiCoin3Position &&
    //   cenarioYoshiCoin3Position <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   if (yoshiCoin3Image !== null) {
    //     yoshiCoin3Image.style.display = "block";
    //     let yoshiCoin3ImageLeft = cenarioYoshiCoin3Position - cenarioPosition;
    //     yoshiCoin3Image.style.right = `${yoshiCoin3ImageLeft}px`;
    //   }
    // } else {
    //   if (yoshiCoin3Image !== null) {
    //     yoshiCoin3Image.style.display = "none";
    //   }
    // }

    // let yoshiCoin4Image = document.querySelector("#container-game .yoshicoin4");
    // let cenarioYoshiCoin4Position = -4500;

    // if (
    //   cenarioPosition <= cenarioYoshiCoin4Position &&
    //   cenarioYoshiCoin4Position <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   if (yoshiCoin4Image !== null) {
    //     yoshiCoin4Image.style.display = "block";
    //     let yoshiCoin4ImageLeft = cenarioYoshiCoin4Position - cenarioPosition;
    //     yoshiCoin4Image.style.right = `${yoshiCoin4ImageLeft}px`;
    //   }
    // } else {
    //   if (yoshiCoin4Image !== null) {
    //     yoshiCoin4Image.style.display = "none";
    //   }
    // }

    // let yoshiCoin5Image = document.querySelector("#container-game .yoshicoin5");
    // let cenarioYoshiCoin5Position = -5500;

    // if (
    //   cenarioPosition <= cenarioYoshiCoin5Position &&
    //   cenarioYoshiCoin5Position <= cenarioPosition + cenarioContainerWidth
    // ) {
    //   if (yoshiCoin5Image !== null) {
    //     yoshiCoin5Image.style.display = "block";
    //     let yoshiCoin5ImageLeft = cenarioYoshiCoin5Position - cenarioPosition;
    //     yoshiCoin5Image.style.right = `${yoshiCoin5ImageLeft}px`;
    //   }
    // } else {
    //   if (yoshiCoin5Image !== null) {
    //     yoshiCoin5Image.style.display = "none";
    //   }
    // }

    // cenarioPosition = Math.max(cenarioPosition, -maxCenarioPosition);
    // cenarioPosition = Math.min(cenarioPosition, 0);
    // cenario.style.left = `${cenarioPosition}px`;
    mario.style.marginLeft = `${marioPosition}px`;
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  gameInterval = setInterval(() => {
    updatePosition();
  }, 50);
}

botao.addEventListener("click", () => {
  iniciarJogo();
  botao.style.display = "none";

  let waiting = document.querySelector(".waiting");
  let rouletteblock = document.querySelector(".rouletteblock");
  rouletteblock.style.display = "block";
  let powerup = document.querySelector(".power-up");
  powerup.style.display = "block";
  let extraup = document.querySelector(".extra-up");
  extraup.style.display = "block";
  let estrela = document.querySelector(".star");
  estrela.style.display = "block";
  let feathershow = document.querySelector(".feather");
  feathershow.style.display = "block";
  let flowershow = document.querySelector(".flower");
  flowershow.style.display = "block";
  for (let i = 1; i <= 200; i++) {
    let coin = document.querySelector(".coin" + i);
    if (coin) {
      coin.style.display = "block";
    }
  }

  waiting.volume = 0;
  waiting.pause();

  document.querySelector(".overworld").classList.add("overworld-start");
  document.querySelector(".mario-voando").classList.add("mario-voando-start");
  document.querySelector(".koopared").classList.add("koopared-start");
  document.querySelector(".koopared2").classList.add("koopared2-start");
  document.querySelector(".koopared3").classList.add("koopared3-start");
  document.querySelector(".koopagreen").classList.add("koopagreen-start");
  document.querySelector(".koopagreen2").classList.add("koopagreen2-start");
  document.querySelector(".koopagreen3").classList.add("koopagreen3-start");
  document.querySelector(".rexl").classList.add("rexl-start");
  document.querySelector(".superkoopa").classList.add("superkoopa-start");
  document.querySelector(".cascodoido").classList.add("cascodoido-start");
  document.querySelector(".chuck-footbal").classList.add("chuck-footbal-start");
  document
    .querySelector(".chuck-footbal2")
    .classList.add("chuck-footbal2-start");
  document.querySelector(".extra-up").classList.add("extra-up-start");
  document.querySelector(".power-up").classList.add("power-up-start");
  document.querySelector(".star").classList.add("star-start");
  document.querySelector(".feather").classList.add("feather-start");
  document.querySelector(".flower").classList.add("flower-start");
  document.querySelector(".coin103").classList.add("coin103-start");

  var timeLeft = 9999;
  countdown = setInterval(function () {
    timeLeft--;
    document.querySelector(".timer").innerHTML = timeLeft;

    if (timeLeft === 100) {
      let audio = document.querySelector(".hurry-up");
      let audioold = document.querySelector(".overworld");
      let audionew = document.querySelector(".overworldhurry");
      audio.currentTime = 0;
      audio.play();
      setTimeout(() => {
        audioold.volume = 0;
        audionew.volume = 1;
        audionew.play();
      }, 1000);
    }

    if (timeLeft <= 0) {
      clearInterval(countdown);
      clearInterval(gameInterval);
      clearInterval(checarColisao);
      removeEventListeners();

      let audio = document.querySelector(".playerdown");
      let audioold = document.querySelector(".overworld");
      let audionew = document.querySelector(".overworldhurry");
      let allEnemies = document.querySelectorAll(
        ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
          ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
          ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
          ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
      );

      audioold.pause();
      audionew.pause();
      audioold.volume = 0;
      audionew.volume = 0;
      audio.volume = 1;
      audio.play();
      allEnemies.forEach(function (element) {
        element.remove();
      });

      mario.src = "/images/mario-death.gif";
      mario.style.width = "40px";

      mario.classList.add("colision-animation");

      setTimeout(() => {
        let divAnimation = document.querySelector(".animation");
        let rightImage = document.querySelector(".timeup-right-image");
        let leftImage = document.querySelector(".timeup-left-image");

        divAnimation.style.display = "block";
        leftImage.style.display = "block";
        rightImage.style.display = "block";
        let newAudio = new Audio("/soundtracks/gameover.mp3");
        audioold.volume = 0;
        audionew.volume = 0;
        audioold.pause();
        audionew.pause();
        newAudio.volume = 1;
        newAudio.play();
        setTimeout(() => {
          location.reload();
        }, 7000);
      }, 3000);
    }
  }, 1000);

  let mario = document.querySelector(".mario");
  let vidaextra = document.querySelector(".extra-up");
  let cogumelo = document.querySelector(".power-up");
  let flor = document.querySelector(".flower");
  let star = document.querySelector(".star");
  let yoshiCoin = document.querySelector(".yoshicoin");
  let yoshiCoin2 = document.querySelector(".yoshicoin2");
  let yoshiCoin3 = document.querySelector(".yoshicoin3");
  let yoshiCoin4 = document.querySelector(".yoshicoin4");
  let yoshiCoin5 = document.querySelector(".yoshicoin5");
  let koopared = document.querySelector(".koopared");
  let koopared2 = document.querySelector(".koopared2");
  let koopared3 = document.querySelector(".koopared3");
  let koopagreen = document.querySelector(".koopagreen");
  let koopagreen2 = document.querySelector(".koopagreen2");
  let koopagreen3 = document.querySelector(".koopagreen3");
  let rexl = document.querySelector(".rexl");
  let cascod = document.querySelector(".cascodoido");
  let cascored = document.querySelector(".cascored");
  let superk = document.querySelector(".superkoopa");
  // let piranha = document.querySelector('.piranha');
  // let piranha2 = document.querySelector('.piranha2');
  let chuckfootbal = document.querySelector(".chuck-footbal");
  let chuckfootbal2 = document.querySelector(".chuck-footbal2");
  let featherget = document.querySelector(".feather");
  let coin1 = document.querySelector(".coin1");
  let coin2 = document.querySelector(".coin2");
  let coin3 = document.querySelector(".coin3");
  let coin4 = document.querySelector(".coin4");
  let coin5 = document.querySelector(".coin5");
  let coin6 = document.querySelector(".coin6");
  let coin7 = document.querySelector(".coin7");
  let coin8 = document.querySelector(".coin8");
  let coin9 = document.querySelector(".coin9");
  let coin10 = document.querySelector(".coin10");
  let coin11 = document.querySelector(".coin11");
  let coin12 = document.querySelector(".coin12");
  let coin13 = document.querySelector(".coin13");
  let coin14 = document.querySelector(".coin14");
  let coin15 = document.querySelector(".coin15");
  let coin16 = document.querySelector(".coin16");
  let coin17 = document.querySelector(".coin17");
  let coin18 = document.querySelector(".coin18");
  let coin19 = document.querySelector(".coin19");
  let coin20 = document.querySelector(".coin20");
  let coin21 = document.querySelector(".coin21");
  let coin22 = document.querySelector(".coin22");
  let coin23 = document.querySelector(".coin23");
  let coin24 = document.querySelector(".coin24");
  let coin25 = document.querySelector(".coin25");
  let coin26 = document.querySelector(".coin26");
  let coin27 = document.querySelector(".coin27");
  let coin28 = document.querySelector(".coin28");
  let coin29 = document.querySelector(".coin29");
  let coin30 = document.querySelector(".coin30");
  let coin31 = document.querySelector(".coin31");
  let coin32 = document.querySelector(".coin32");
  let coin33 = document.querySelector(".coin33");
  let coin34 = document.querySelector(".coin34");
  let coin35 = document.querySelector(".coin35");
  let coin36 = document.querySelector(".coin36");
  let coin37 = document.querySelector(".coin37");
  let coin38 = document.querySelector(".coin38");
  let coin39 = document.querySelector(".coin39");
  let coin40 = document.querySelector(".coin40");
  let coin41 = document.querySelector(".coin41");
  let coin42 = document.querySelector(".coin42");
  let coin43 = document.querySelector(".coin43");
  let coin44 = document.querySelector(".coin44");
  let coin45 = document.querySelector(".coin45");
  let coin46 = document.querySelector(".coin46");
  let coin47 = document.querySelector(".coin47");
  let coin48 = document.querySelector(".coin48");
  let coin49 = document.querySelector(".coin49");
  let coin50 = document.querySelector(".coin50");
  let coin51 = document.querySelector(".coin51");
  let coin52 = document.querySelector(".coin52");
  let coin53 = document.querySelector(".coin53");
  let coin54 = document.querySelector(".coin54");
  let coin55 = document.querySelector(".coin55");
  let coin56 = document.querySelector(".coin56");
  let coin57 = document.querySelector(".coin57");
  let coin58 = document.querySelector(".coin58");
  let coin59 = document.querySelector(".coin59");
  let coin60 = document.querySelector(".coin60");
  let coin61 = document.querySelector(".coin61");
  let coin62 = document.querySelector(".coin62");
  let coin63 = document.querySelector(".coin63");
  let coin64 = document.querySelector(".coin64");
  let coin65 = document.querySelector(".coin65");
  let coin66 = document.querySelector(".coin66");
  let coin67 = document.querySelector(".coin67");
  let coin68 = document.querySelector(".coin68");
  let coin69 = document.querySelector(".coin69");
  let coin70 = document.querySelector(".coin70");
  let coin71 = document.querySelector(".coin71");
  let coin72 = document.querySelector(".coin72");
  let coin73 = document.querySelector(".coin73");
  let coin74 = document.querySelector(".coin74");
  let coin75 = document.querySelector(".coin75");
  let coin76 = document.querySelector(".coin76");
  let coin77 = document.querySelector(".coin77");
  let coin78 = document.querySelector(".coin78");
  let coin79 = document.querySelector(".coin79");
  let coin80 = document.querySelector(".coin80");
  let coin81 = document.querySelector(".coin81");
  let coin82 = document.querySelector(".coin82");
  let coin83 = document.querySelector(".coin83");
  let coin84 = document.querySelector(".coin84");
  let coin85 = document.querySelector(".coin85");
  let coin86 = document.querySelector(".coin86");
  let coin87 = document.querySelector(".coin87");
  let coin88 = document.querySelector(".coin88");
  let coin89 = document.querySelector(".coin89");
  let coin90 = document.querySelector(".coin90");
  let coin91 = document.querySelector(".coin91");
  let coin92 = document.querySelector(".coin92");
  let coin93 = document.querySelector(".coin93");
  let coin94 = document.querySelector(".coin94");
  let coin95 = document.querySelector(".coin95");
  let coin96 = document.querySelector(".coin96");
  let coin97 = document.querySelector(".coin97");
  let coin98 = document.querySelector(".coin98");
  let coin99 = document.querySelector(".coin99");
  let coin100 = document.querySelector(".coin100");
  let coin101 = document.querySelector(".coin101");
  let coin102 = document.querySelector(".coin102");
  let coin103 = document.querySelector(".coin103");

  let pointsElement = document.querySelector(".points");
  let lifeElement = document.querySelector(".life");
  let coinsCollectedElement = document.querySelector(".moedasup");
  let yoshiCoinCollectElement = document.querySelector(".yoshiup");
  let points = 999999999;
  let life = 9999;
  let coinsCollected = 999;
  let yoshiCoinCollected = 999;
  let maxClones = 9999;
  let maxClonesextraup = 9999;
  let maxClonesflower = 9999;
  let maxClonesstar = 9999;
  let maxClonesfeather = 9999;
  let maxClonescoin103 = 9999;
  let canLoseLife = true;
  let currentClones = 0;
  let currentClonesextraup = 0;
  let currentClonesflower = 0;
  let currentClonesstar = 0;
  let currentClonesfeather = 0;
  let currentClonescoin103 = 0;
  let invincibleCollisionAudioPlayed = false;

  function checkCollision() {
    let marioRect = mario.getBoundingClientRect();

    let lifeUpRect = null;
    let extraUpRect = null;
    let flowerUpRect = null;
    let starUpRect = null;
    let yoshiCoinUpRect = null;
    let yoshiCoin2UpRect = null;
    let yoshiCoin3UpRect = null;
    let yoshiCoin4UpRect = null;
    let yoshiCoin5UpRect = null;
    let koopaUpRect = null;
    let koopa2UpRect = null;
    let koopa3UpRect = null;
    let koopa4UpRect = null;
    let koopa5UpRect = null;
    let koopa6UpRect = null;
    let rexlUpRect = null;
    let superkUpRect = null;
    let cascodUpRect = null;
    let cascoredUpRect = null;
    // let piranhaUpRect = null;
    // let piranha2UpRect = null;
    let chuckfootbalUpRect = null;
    let chuckfootbal2UpRect = null;
    let feathergetUpRect = null;
    let CoinsUpRect = null;
    let Coins2UpRect = null;
    let Coins3UpRect = null;
    let Coins4UpRect = null;
    let Coins5UpRect = null;
    let Coins6UpRect = null;
    let Coins7UpRect = null;
    let Coins8UpRect = null;
    let Coins9UpRect = null;
    let Coins10UpRect = null;
    let Coins11UpRect = null;
    let Coins12UpRect = null;
    let Coins13UpRect = null;
    let Coins14UpRect = null;
    let Coins15UpRect = null;
    let Coins16UpRect = null;
    let Coins17UpRect = null;
    let Coins18UpRect = null;
    let Coins19UpRect = null;
    let Coins20UpRect = null;
    let Coins21UpRect = null;
    let Coins22UpRect = null;
    let Coins23UpRect = null;
    let Coins24UpRect = null;
    let Coins25UpRect = null;
    let Coins26UpRect = null;
    let Coins27UpRect = null;
    let Coins28UpRect = null;
    let Coins29UpRect = null;
    let Coins30UpRect = null;
    let Coins31UpRect = null;
    let Coins32UpRect = null;
    let Coins33UpRect = null;
    let Coins34UpRect = null;
    let Coins35UpRect = null;
    let Coins36UpRect = null;
    let Coins37UpRect = null;
    let Coins38UpRect = null;
    let Coins39UpRect = null;
    let Coins40UpRect = null;
    let Coins41UpRect = null;
    let Coins42UpRect = null;
    let Coins43UpRect = null;
    let Coins44UpRect = null;
    let Coins45UpRect = null;
    let Coins46UpRect = null;
    let Coins47UpRect = null;
    let Coins48UpRect = null;
    let Coins49UpRect = null;
    let Coins50UpRect = null;
    let Coins51UpRect = null;
    let Coins52UpRect = null;
    let Coins53UpRect = null;
    let Coins54UpRect = null;
    let Coins55UpRect = null;
    let Coins56UpRect = null;
    let Coins57UpRect = null;
    let Coins58UpRect = null;
    let Coins59UpRect = null;
    let Coins60UpRect = null;
    let Coins61UpRect = null;
    let Coins62UpRect = null;
    let Coins63UpRect = null;
    let Coins64UpRect = null;
    let Coins65UpRect = null;
    let Coins66UpRect = null;
    let Coins67UpRect = null;
    let Coins68UpRect = null;
    let Coins69UpRect = null;
    let Coins70UpRect = null;
    let Coins71UpRect = null;
    let Coins72UpRect = null;
    let Coins73UpRect = null;
    let Coins74UpRect = null;
    let Coins75UpRect = null;
    let Coins76UpRect = null;
    let Coins77UpRect = null;
    let Coins78UpRect = null;
    let Coins79UpRect = null;
    let Coins80UpRect = null;
    let Coins81UpRect = null;
    let Coins82UpRect = null;
    let Coins83UpRect = null;
    let Coins84UpRect = null;
    let Coins85UpRect = null;
    let Coins86UpRect = null;
    let Coins87UpRect = null;
    let Coins88UpRect = null;
    let Coins89UpRect = null;
    let Coins90UpRect = null;
    let Coins91UpRect = null;
    let Coins92UpRect = null;
    let Coins93UpRect = null;
    let Coins94UpRect = null;
    let Coins95UpRect = null;
    let Coins96UpRect = null;
    let Coins97UpRect = null;
    let Coins98UpRect = null;
    let Coins99UpRect = null;
    let Coins100UpRect = null;
    let Coins101UpRect = null;
    let Coins102UpRect = null;
    let Coins103UpRect = null;

    if (vidaextra !== null) {
      lifeUpRect = vidaextra.getBoundingClientRect();
    }

    if (cogumelo !== null) {
      extraUpRect = cogumelo.getBoundingClientRect();
    }

    if (flor !== null) {
      flowerUpRect = flor.getBoundingClientRect();
    }

    if (star !== null) {
      starUpRect = star.getBoundingClientRect();
    }

    if (yoshiCoin !== null) {
      yoshiCoinUpRect = yoshiCoin.getBoundingClientRect();
    }

    if (yoshiCoin2 !== null) {
      yoshiCoin2UpRect = yoshiCoin2.getBoundingClientRect();
    }

    if (yoshiCoin3 !== null) {
      yoshiCoin3UpRect = yoshiCoin3.getBoundingClientRect();
    }

    if (yoshiCoin4 !== null) {
      yoshiCoin4UpRect = yoshiCoin4.getBoundingClientRect();
    }

    if (yoshiCoin5 !== null) {
      yoshiCoin5UpRect = yoshiCoin5.getBoundingClientRect();
    }

    if (koopared !== null) {
      koopaUpRect = koopared.getBoundingClientRect();
    }

    if (koopared2 !== null) {
      koopa2UpRect = koopared2.getBoundingClientRect();
    }

    if (koopared3 !== null) {
      koopa3UpRect = koopared3.getBoundingClientRect();
    }

    if (koopagreen !== null) {
      koopa4UpRect = koopagreen.getBoundingClientRect();
    }

    if (koopagreen2 !== null) {
      koopa5UpRect = koopagreen2.getBoundingClientRect();
    }

    if (koopagreen3 !== null) {
      koopa6UpRect = koopagreen3.getBoundingClientRect();
    }

    if (rexl !== null) {
      rexlUpRect = rexl.getBoundingClientRect();
    }

    if (superk !== null) {
      superkUpRect = superk.getBoundingClientRect();
    }

    if (cascod !== null) {
      cascodUpRect = cascod.getBoundingClientRect();
    }

    if (cascored !== null) {
      cascoredUpRect = cascored.getBoundingClientRect();
    }

    // if (piranha !== null) {
    //   piranhaUpRect = piranha.getBoundingClientRect();
    // }

    // if (piranha2 !== null) {
    //   piranha2UpRect = piranha2.getBoundingClientRect();
    // }

    if (chuckfootbal !== null) {
      chuckfootbalUpRect = chuckfootbal.getBoundingClientRect();
    }

    if (chuckfootbal2 !== null) {
      chuckfootbal2UpRect = chuckfootbal2.getBoundingClientRect();
    }

    if (featherget !== null) {
      feathergetUpRect = featherget.getBoundingClientRect();
    }
    if (coin1 !== null) {
      CoinsUpRect = coin1.getBoundingClientRect();
    }
    if (coin2 !== null) {
      Coins2UpRect = coin2.getBoundingClientRect();
    }
    if (coin3 !== null) {
      Coins3UpRect = coin3.getBoundingClientRect();
    }
    if (coin4 !== null) {
      Coins4UpRect = coin4.getBoundingClientRect();
    }
    if (coin5 !== null) {
      Coins5UpRect = coin5.getBoundingClientRect();
    }
    if (coin6 !== null) {
      Coins6UpRect = coin6.getBoundingClientRect();
    }
    if (coin7 !== null) {
      Coins7UpRect = coin7.getBoundingClientRect();
    }
    if (coin8 !== null) {
      Coins8UpRect = coin8.getBoundingClientRect();
    }
    if (coin9 !== null) {
      Coins9UpRect = coin9.getBoundingClientRect();
    }
    if (coin10 !== null) {
      Coins10UpRect = coin10.getBoundingClientRect();
    }
    if (coin11 !== null) {
      Coins11UpRect = coin11.getBoundingClientRect();
    }
    if (coin12 !== null) {
      Coins12UpRect = coin12.getBoundingClientRect();
    }
    if (coin13 !== null) {
      Coins13UpRect = coin13.getBoundingClientRect();
    }
    if (coin14 !== null) {
      Coins14UpRect = coin14.getBoundingClientRect();
    }
    if (coin15 !== null) {
      Coins15UpRect = coin15.getBoundingClientRect();
    }
    if (coin16 !== null) {
      Coins16UpRect = coin16.getBoundingClientRect();
    }
    if (coin17 !== null) {
      Coins17UpRect = coin17.getBoundingClientRect();
    }
    if (coin18 !== null) {
      Coins18UpRect = coin18.getBoundingClientRect();
    }
    if (coin19 !== null) {
      Coins19UpRect = coin19.getBoundingClientRect();
    }
    if (coin20 !== null) {
      Coins20UpRect = coin20.getBoundingClientRect();
    }
    if (coin21 !== null) {
      Coins21UpRect = coin21.getBoundingClientRect();
    }
    if (coin22 !== null) {
      Coins22UpRect = coin22.getBoundingClientRect();
    }
    if (coin23 !== null) {
      Coins23UpRect = coin23.getBoundingClientRect();
    }
    if (coin24 !== null) {
      Coins24UpRect = coin24.getBoundingClientRect();
    }
    if (coin25 !== null) {
      Coins25UpRect = coin25.getBoundingClientRect();
    }
    if (coin26 !== null) {
      Coins26UpRect = coin26.getBoundingClientRect();
    }
    if (coin27 !== null) {
      Coins27UpRect = coin27.getBoundingClientRect();
    }
    if (coin28 !== null) {
      Coins28UpRect = coin28.getBoundingClientRect();
    }
    if (coin29 !== null) {
      Coins29UpRect = coin29.getBoundingClientRect();
    }
    if (coin30 !== null) {
      Coins30UpRect = coin30.getBoundingClientRect();
    }
    if (coin31 !== null) {
      Coins31UpRect = coin31.getBoundingClientRect();
    }
    if (coin32 !== null) {
      Coins32UpRect = coin32.getBoundingClientRect();
    }
    if (coin33 !== null) {
      Coins33UpRect = coin33.getBoundingClientRect();
    }
    if (coin34 !== null) {
      Coins34UpRect = coin34.getBoundingClientRect();
    }
    if (coin35 !== null) {
      Coins35UpRect = coin35.getBoundingClientRect();
    }
    if (coin36 !== null) {
      Coins36UpRect = coin36.getBoundingClientRect();
    }
    if (coin37 !== null) {
      Coins37UpRect = coin37.getBoundingClientRect();
    }
    if (coin38 !== null) {
      Coins38UpRect = coin38.getBoundingClientRect();
    }
    if (coin39 !== null) {
      Coins39UpRect = coin39.getBoundingClientRect();
    }
    if (coin40 !== null) {
      Coins40UpRect = coin40.getBoundingClientRect();
    }
    if (coin41 !== null) {
      Coins41UpRect = coin41.getBoundingClientRect();
    }
    if (coin42 !== null) {
      Coins42UpRect = coin42.getBoundingClientRect();
    }
    if (coin43 !== null) {
      Coins43UpRect = coin43.getBoundingClientRect();
    }
    if (coin44 !== null) {
      Coins44UpRect = coin44.getBoundingClientRect();
    }
    if (coin45 !== null) {
      Coins45UpRect = coin45.getBoundingClientRect();
    }
    if (coin46 !== null) {
      Coins46UpRect = coin46.getBoundingClientRect();
    }
    if (coin47 !== null) {
      Coins47UpRect = coin47.getBoundingClientRect();
    }
    if (coin48 !== null) {
      Coins48UpRect = coin48.getBoundingClientRect();
    }
    if (coin49 !== null) {
      Coins49UpRect = coin49.getBoundingClientRect();
    }
    if (coin50 !== null) {
      Coins50UpRect = coin50.getBoundingClientRect();
    }
    if (coin51 !== null) {
      Coins51UpRect = coin51.getBoundingClientRect();
    }
    if (coin52 !== null) {
      Coins52UpRect = coin52.getBoundingClientRect();
    }
    if (coin53 !== null) {
      Coins53UpRect = coin53.getBoundingClientRect();
    }
    if (coin54 !== null) {
      Coins54UpRect = coin54.getBoundingClientRect();
    }
    if (coin55 !== null) {
      Coins55UpRect = coin55.getBoundingClientRect();
    }
    if (coin56 !== null) {
      Coins56UpRect = coin56.getBoundingClientRect();
    }
    if (coin57 !== null) {
      Coins57UpRect = coin57.getBoundingClientRect();
    }
    if (coin58 !== null) {
      Coins58UpRect = coin58.getBoundingClientRect();
    }
    if (coin59 !== null) {
      Coins59UpRect = coin59.getBoundingClientRect();
    }
    if (coin60 !== null) {
      Coins60UpRect = coin60.getBoundingClientRect();
    }
    if (coin61 !== null) {
      Coins61UpRect = coin61.getBoundingClientRect();
    }
    if (coin62 !== null) {
      Coins62UpRect = coin62.getBoundingClientRect();
    }
    if (coin63 !== null) {
      Coins63UpRect = coin63.getBoundingClientRect();
    }
    if (coin64 !== null) {
      Coins64UpRect = coin64.getBoundingClientRect();
    }
    if (coin65 !== null) {
      Coins65UpRect = coin65.getBoundingClientRect();
    }
    if (coin66 !== null) {
      Coins66UpRect = coin66.getBoundingClientRect();
    }
    if (coin67 !== null) {
      Coins67UpRect = coin67.getBoundingClientRect();
    }
    if (coin68 !== null) {
      Coins68UpRect = coin68.getBoundingClientRect();
    }
    if (coin69 !== null) {
      Coins69UpRect = coin69.getBoundingClientRect();
    }
    if (coin70 !== null) {
      Coins70UpRect = coin70.getBoundingClientRect();
    }
    if (coin71 !== null) {
      Coins71UpRect = coin71.getBoundingClientRect();
    }
    if (coin72 !== null) {
      Coins72UpRect = coin72.getBoundingClientRect();
    }
    if (coin73 !== null) {
      Coins73UpRect = coin73.getBoundingClientRect();
    }
    if (coin74 !== null) {
      Coins74UpRect = coin74.getBoundingClientRect();
    }
    if (coin75 !== null) {
      Coins75UpRect = coin75.getBoundingClientRect();
    }
    if (coin76 !== null) {
      Coins76UpRect = coin76.getBoundingClientRect();
    }
    if (coin77 !== null) {
      Coins77UpRect = coin77.getBoundingClientRect();
    }
    if (coin78 !== null) {
      Coins78UpRect = coin78.getBoundingClientRect();
    }
    if (coin79 !== null) {
      Coins79UpRect = coin79.getBoundingClientRect();
    }
    if (coin80 !== null) {
      Coins80UpRect = coin80.getBoundingClientRect();
    }
    if (coin81 !== null) {
      Coins81UpRect = coin81.getBoundingClientRect();
    }
    if (coin82 !== null) {
      Coins82UpRect = coin82.getBoundingClientRect();
    }
    if (coin83 !== null) {
      Coins83UpRect = coin83.getBoundingClientRect();
    }
    if (coin84 !== null) {
      Coins84UpRect = coin84.getBoundingClientRect();
    }
    if (coin85 !== null) {
      Coins85UpRect = coin85.getBoundingClientRect();
    }
    if (coin86 !== null) {
      Coins86UpRect = coin86.getBoundingClientRect();
    }
    if (coin87 !== null) {
      Coins87UpRect = coin87.getBoundingClientRect();
    }
    if (coin88 !== null) {
      Coins88UpRect = coin88.getBoundingClientRect();
    }
    if (coin89 !== null) {
      Coins89UpRect = coin89.getBoundingClientRect();
    }
    if (coin90 !== null) {
      Coins90UpRect = coin90.getBoundingClientRect();
    }
    if (coin91 !== null) {
      Coins91UpRect = coin91.getBoundingClientRect();
    }
    if (coin92 !== null) {
      Coins92UpRect = coin92.getBoundingClientRect();
    }
    if (coin93 !== null) {
      Coins93UpRect = coin93.getBoundingClientRect();
    }
    if (coin94 !== null) {
      Coins94UpRect = coin94.getBoundingClientRect();
    }
    if (coin95 !== null) {
      Coins95UpRect = coin95.getBoundingClientRect();
    }
    if (coin96 !== null) {
      Coins96UpRect = coin96.getBoundingClientRect();
    }
    if (coin97 !== null) {
      Coins97UpRect = coin97.getBoundingClientRect();
    }
    if (coin98 !== null) {
      Coins98UpRect = coin98.getBoundingClientRect();
    }
    if (coin99 !== null) {
      Coins99UpRect = coin99.getBoundingClientRect();
    }
    if (coin100 !== null) {
      Coins100UpRect = coin100.getBoundingClientRect();
    }
    if (coin101 !== null) {
      Coins101UpRect = coin101.getBoundingClientRect();
    }
    if (coin102 !== null) {
      Coins102UpRect = coin102.getBoundingClientRect();
    }
    if (coin103 !== null) {
      Coins103UpRect = coin103.getBoundingClientRect();
    }

    if (
      CoinsUpRect !== null &&
      marioRect.left < CoinsUpRect.left + CoinsUpRect.width &&
      marioRect.left + marioRect.width > CoinsUpRect.left &&
      marioRect.top < CoinsUpRect.top + CoinsUpRect.height &&
      marioRect.top + marioRect.height > CoinsUpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin1.remove();
      coin1 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins2UpRect !== null &&
      marioRect.left < Coins2UpRect.left + Coins2UpRect.width &&
      marioRect.left + marioRect.width > Coins2UpRect.left &&
      marioRect.top < Coins2UpRect.top + Coins2UpRect.height &&
      marioRect.top + marioRect.height > Coins2UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin2.remove();
      coin2 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins3UpRect !== null &&
      marioRect.left < Coins3UpRect.left + Coins3UpRect.width &&
      marioRect.left + marioRect.width > Coins3UpRect.left &&
      marioRect.top < Coins3UpRect.top + Coins3UpRect.height &&
      marioRect.top + marioRect.height > Coins3UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin3.remove();
      coin3 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins4UpRect !== null &&
      marioRect.left < Coins4UpRect.left + Coins4UpRect.width &&
      marioRect.left + marioRect.width > Coins4UpRect.left &&
      marioRect.top < Coins4UpRect.top + Coins4UpRect.height &&
      marioRect.top + marioRect.height > Coins4UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin4.remove();
      coin4 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins5UpRect !== null &&
      marioRect.left < Coins5UpRect.left + Coins5UpRect.width &&
      marioRect.left + marioRect.width > Coins5UpRect.left &&
      marioRect.top < Coins5UpRect.top + Coins5UpRect.height &&
      marioRect.top + marioRect.height > Coins5UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin5.remove();
      coin5 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins6UpRect !== null &&
      marioRect.left < Coins6UpRect.left + Coins6UpRect.width &&
      marioRect.left + marioRect.width > Coins6UpRect.left &&
      marioRect.top < Coins6UpRect.top + Coins6UpRect.height &&
      marioRect.top + marioRect.height > Coins6UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin6.remove();
      coin6 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins7UpRect !== null &&
      marioRect.left < Coins7UpRect.left + Coins7UpRect.width &&
      marioRect.left + marioRect.width > Coins7UpRect.left &&
      marioRect.top < Coins7UpRect.top + Coins7UpRect.height &&
      marioRect.top + marioRect.height > Coins7UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin7.remove();
      coin7 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins8UpRect !== null &&
      marioRect.left < Coins8UpRect.left + Coins8UpRect.width &&
      marioRect.left + marioRect.width > Coins8UpRect.left &&
      marioRect.top < Coins8UpRect.top + Coins8UpRect.height &&
      marioRect.top + marioRect.height > Coins8UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin8.remove();
      coin8 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins9UpRect !== null &&
      marioRect.left < Coins9UpRect.left + Coins9UpRect.width &&
      marioRect.left + marioRect.width > Coins9UpRect.left &&
      marioRect.top < Coins9UpRect.top + Coins9UpRect.height &&
      marioRect.top + marioRect.height > Coins9UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin9.remove();
      coin9 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins10UpRect !== null &&
      marioRect.left < Coins10UpRect.left + Coins10UpRect.width &&
      marioRect.left + marioRect.width > Coins10UpRect.left &&
      marioRect.top < Coins10UpRect.top + Coins10UpRect.height &&
      marioRect.top + marioRect.height > Coins10UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin10.remove();
      coin10 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins11UpRect !== null &&
      marioRect.left < Coins11UpRect.left + Coins11UpRect.width &&
      marioRect.left + marioRect.width > Coins11UpRect.left &&
      marioRect.top < Coins11UpRect.top + Coins11UpRect.height &&
      marioRect.top + marioRect.height > Coins11UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin11.remove();
      coin11 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins12UpRect !== null &&
      marioRect.left < Coins12UpRect.left + Coins12UpRect.width &&
      marioRect.left + marioRect.width > Coins12UpRect.left &&
      marioRect.top < Coins12UpRect.top + Coins12UpRect.height &&
      marioRect.top + marioRect.height > Coins12UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin12.remove();
      coin12 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins13UpRect !== null &&
      marioRect.left < Coins13UpRect.left + Coins13UpRect.width &&
      marioRect.left + marioRect.width > Coins13UpRect.left &&
      marioRect.top < Coins13UpRect.top + Coins13UpRect.height &&
      marioRect.top + marioRect.height > Coins13UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin13.remove();
      coin13 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins14UpRect !== null &&
      marioRect.left < Coins14UpRect.left + Coins14UpRect.width &&
      marioRect.left + marioRect.width > Coins14UpRect.left &&
      marioRect.top < Coins14UpRect.top + Coins14UpRect.height &&
      marioRect.top + marioRect.height > Coins14UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin14.remove();
      coin14 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins15UpRect !== null &&
      marioRect.left < Coins15UpRect.left + Coins15UpRect.width &&
      marioRect.left + marioRect.width > Coins15UpRect.left &&
      marioRect.top < Coins15UpRect.top + Coins15UpRect.height &&
      marioRect.top + marioRect.height > Coins15UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin15.remove();
      coin15 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins16UpRect !== null &&
      marioRect.left < Coins16UpRect.left + Coins16UpRect.width &&
      marioRect.left + marioRect.width > Coins16UpRect.left &&
      marioRect.top < Coins16UpRect.top + Coins16UpRect.height &&
      marioRect.top + marioRect.height > Coins16UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin16.remove();
      coin16 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins17UpRect !== null &&
      marioRect.left < Coins17UpRect.left + Coins17UpRect.width &&
      marioRect.left + marioRect.width > Coins17UpRect.left &&
      marioRect.top < Coins17UpRect.top + Coins17UpRect.height &&
      marioRect.top + marioRect.height > Coins17UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin17.remove();
      coin17 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins18UpRect !== null &&
      marioRect.left < Coins18UpRect.left + Coins18UpRect.width &&
      marioRect.left + marioRect.width > Coins18UpRect.left &&
      marioRect.top < Coins18UpRect.top + Coins18UpRect.height &&
      marioRect.top + marioRect.height > Coins18UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin18.remove();
      coin18 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins19UpRect !== null &&
      marioRect.left < Coins19UpRect.left + Coins19UpRect.width &&
      marioRect.left + marioRect.width > Coins19UpRect.left &&
      marioRect.top < Coins19UpRect.top + Coins19UpRect.height &&
      marioRect.top + marioRect.height > Coins19UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin19.remove();
      coin19 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins20UpRect !== null &&
      marioRect.left < Coins20UpRect.left + Coins20UpRect.width &&
      marioRect.left + marioRect.width > Coins20UpRect.left &&
      marioRect.top < Coins20UpRect.top + Coins20UpRect.height &&
      marioRect.top + marioRect.height > Coins20UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin20.remove();
      coin20 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins21UpRect !== null &&
      marioRect.left < Coins21UpRect.left + Coins21UpRect.width &&
      marioRect.left + marioRect.width > Coins21UpRect.left &&
      marioRect.top < Coins21UpRect.top + Coins21UpRect.height &&
      marioRect.top + marioRect.height > Coins21UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin21.remove();
      coin21 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins22UpRect !== null &&
      marioRect.left < Coins22UpRect.left + Coins22UpRect.width &&
      marioRect.left + marioRect.width > Coins22UpRect.left &&
      marioRect.top < Coins22UpRect.top + Coins22UpRect.height &&
      marioRect.top + marioRect.height > Coins22UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin22.remove();
      coin22 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins23UpRect !== null &&
      marioRect.left < Coins23UpRect.left + Coins23UpRect.width &&
      marioRect.left + marioRect.width > Coins23UpRect.left &&
      marioRect.top < Coins23UpRect.top + Coins23UpRect.height &&
      marioRect.top + marioRect.height > Coins23UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin23.remove();
      coin23 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins24UpRect !== null &&
      marioRect.left < Coins24UpRect.left + Coins24UpRect.width &&
      marioRect.left + marioRect.width > Coins24UpRect.left &&
      marioRect.top < Coins24UpRect.top + Coins24UpRect.height &&
      marioRect.top + marioRect.height > Coins24UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin24.remove();
      coin24 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins25UpRect !== null &&
      marioRect.left < Coins25UpRect.left + Coins25UpRect.width &&
      marioRect.left + marioRect.width > Coins25UpRect.left &&
      marioRect.top < Coins25UpRect.top + Coins25UpRect.height &&
      marioRect.top + marioRect.height > Coins25UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin25.remove();
      coin25 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins26UpRect !== null &&
      marioRect.left < Coins26UpRect.left + Coins26UpRect.width &&
      marioRect.left + marioRect.width > Coins26UpRect.left &&
      marioRect.top < Coins26UpRect.top + Coins26UpRect.height &&
      marioRect.top + marioRect.height > Coins26UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin26.remove();
      coin26 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins27UpRect !== null &&
      marioRect.left < Coins27UpRect.left + Coins27UpRect.width &&
      marioRect.left + marioRect.width > Coins27UpRect.left &&
      marioRect.top < Coins27UpRect.top + Coins27UpRect.height &&
      marioRect.top + marioRect.height > Coins27UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin27.remove();
      coin27 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins28UpRect !== null &&
      marioRect.left < Coins28UpRect.left + Coins28UpRect.width &&
      marioRect.left + marioRect.width > Coins28UpRect.left &&
      marioRect.top < Coins28UpRect.top + Coins28UpRect.height &&
      marioRect.top + marioRect.height > Coins28UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin28.remove();
      coin28 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins29UpRect !== null &&
      marioRect.left < Coins29UpRect.left + Coins29UpRect.width &&
      marioRect.left + marioRect.width > Coins29UpRect.left &&
      marioRect.top < Coins29UpRect.top + Coins29UpRect.height &&
      marioRect.top + marioRect.height > Coins29UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin29.remove();
      coin29 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins30UpRect !== null &&
      marioRect.left < Coins30UpRect.left + Coins30UpRect.width &&
      marioRect.left + marioRect.width > Coins30UpRect.left &&
      marioRect.top < Coins30UpRect.top + Coins30UpRect.height &&
      marioRect.top + marioRect.height > Coins30UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin30.remove();
      coin30 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins31UpRect !== null &&
      marioRect.left < Coins31UpRect.left + Coins31UpRect.width &&
      marioRect.left + marioRect.width > Coins31UpRect.left &&
      marioRect.top < Coins31UpRect.top + Coins31UpRect.height &&
      marioRect.top + marioRect.height > Coins31UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin31.remove();
      coin31 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins32UpRect !== null &&
      marioRect.left < Coins32UpRect.left + Coins32UpRect.width &&
      marioRect.left + marioRect.width > Coins32UpRect.left &&
      marioRect.top < Coins32UpRect.top + Coins32UpRect.height &&
      marioRect.top + marioRect.height > Coins32UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin32.remove();
      coin32 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins33UpRect !== null &&
      marioRect.left < Coins33UpRect.left + Coins33UpRect.width &&
      marioRect.left + marioRect.width > Coins33UpRect.left &&
      marioRect.top < Coins33UpRect.top + Coins33UpRect.height &&
      marioRect.top + marioRect.height > Coins33UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin33.remove();
      coin33 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins34UpRect !== null &&
      marioRect.left < Coins34UpRect.left + Coins34UpRect.width &&
      marioRect.left + marioRect.width > Coins34UpRect.left &&
      marioRect.top < Coins34UpRect.top + Coins34UpRect.height &&
      marioRect.top + marioRect.height > Coins34UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin34.remove();
      coin34 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins35UpRect !== null &&
      marioRect.left < Coins35UpRect.left + Coins35UpRect.width &&
      marioRect.left + marioRect.width > Coins35UpRect.left &&
      marioRect.top < Coins35UpRect.top + Coins35UpRect.height &&
      marioRect.top + marioRect.height > Coins35UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin35.remove();
      coin35 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins36UpRect !== null &&
      marioRect.left < Coins36UpRect.left + Coins36UpRect.width &&
      marioRect.left + marioRect.width > Coins36UpRect.left &&
      marioRect.top < Coins36UpRect.top + Coins36UpRect.height &&
      marioRect.top + marioRect.height > Coins36UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin36.remove();
      coin36 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins37UpRect !== null &&
      marioRect.left < Coins37UpRect.left + Coins37UpRect.width &&
      marioRect.left + marioRect.width > Coins37UpRect.left &&
      marioRect.top < Coins37UpRect.top + Coins37UpRect.height &&
      marioRect.top + marioRect.height > Coins37UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin37.remove();
      coin37 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins38UpRect !== null &&
      marioRect.left < Coins38UpRect.left + Coins38UpRect.width &&
      marioRect.left + marioRect.width > Coins38UpRect.left &&
      marioRect.top < Coins38UpRect.top + Coins38UpRect.height &&
      marioRect.top + marioRect.height > Coins38UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin38.remove();
      coin38 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins39UpRect !== null &&
      marioRect.left < Coins39UpRect.left + Coins39UpRect.width &&
      marioRect.left + marioRect.width > Coins39UpRect.left &&
      marioRect.top < Coins39UpRect.top + Coins39UpRect.height &&
      marioRect.top + marioRect.height > Coins39UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin39.remove();
      coin39 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins40UpRect !== null &&
      marioRect.left < Coins40UpRect.left + Coins40UpRect.width &&
      marioRect.left + marioRect.width > Coins40UpRect.left &&
      marioRect.top < Coins40UpRect.top + Coins40UpRect.height &&
      marioRect.top + marioRect.height > Coins40UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin40.remove();
      coin40 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins41UpRect !== null &&
      marioRect.left < Coins41UpRect.left + Coins41UpRect.width &&
      marioRect.left + marioRect.width > Coins41UpRect.left &&
      marioRect.top < Coins41UpRect.top + Coins41UpRect.height &&
      marioRect.top + marioRect.height > Coins41UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin41.remove();
      coin41 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins42UpRect !== null &&
      marioRect.left < Coins42UpRect.left + Coins42UpRect.width &&
      marioRect.left + marioRect.width > Coins42UpRect.left &&
      marioRect.top < Coins42UpRect.top + Coins42UpRect.height &&
      marioRect.top + marioRect.height > Coins42UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin42.remove();
      coin42 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins43UpRect !== null &&
      marioRect.left < Coins43UpRect.left + Coins43UpRect.width &&
      marioRect.left + marioRect.width > Coins43UpRect.left &&
      marioRect.top < Coins43UpRect.top + Coins43UpRect.height &&
      marioRect.top + marioRect.height > Coins43UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin43.remove();
      coin43 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins44UpRect !== null &&
      marioRect.left < Coins44UpRect.left + Coins44UpRect.width &&
      marioRect.left + marioRect.width > Coins44UpRect.left &&
      marioRect.top < Coins44UpRect.top + Coins44UpRect.height &&
      marioRect.top + marioRect.height > Coins44UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin44.remove();
      coin44 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins45UpRect !== null &&
      marioRect.left < Coins45UpRect.left + Coins45UpRect.width &&
      marioRect.left + marioRect.width > Coins45UpRect.left &&
      marioRect.top < Coins45UpRect.top + Coins45UpRect.height &&
      marioRect.top + marioRect.height > Coins45UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin45.remove();
      coin45 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins46UpRect !== null &&
      marioRect.left < Coins46UpRect.left + Coins46UpRect.width &&
      marioRect.left + marioRect.width > Coins46UpRect.left &&
      marioRect.top < Coins46UpRect.top + Coins46UpRect.height &&
      marioRect.top + marioRect.height > Coins46UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin46.remove();
      coin46 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins47UpRect !== null &&
      marioRect.left < Coins47UpRect.left + Coins47UpRect.width &&
      marioRect.left + marioRect.width > Coins47UpRect.left &&
      marioRect.top < Coins47UpRect.top + Coins47UpRect.height &&
      marioRect.top + marioRect.height > Coins47UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin47.remove();
      coin47 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins48UpRect !== null &&
      marioRect.left < Coins48UpRect.left + Coins48UpRect.width &&
      marioRect.left + marioRect.width > Coins48UpRect.left &&
      marioRect.top < Coins48UpRect.top + Coins48UpRect.height &&
      marioRect.top + marioRect.height > Coins48UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin48.remove();
      coin48 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins49UpRect !== null &&
      marioRect.left < Coins49UpRect.left + Coins49UpRect.width &&
      marioRect.left + marioRect.width > Coins49UpRect.left &&
      marioRect.top < Coins49UpRect.top + Coins49UpRect.height &&
      marioRect.top + marioRect.height > Coins49UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin49.remove();
      coin49 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins50UpRect !== null &&
      marioRect.left < Coins50UpRect.left + Coins50UpRect.width &&
      marioRect.left + marioRect.width > Coins50UpRect.left &&
      marioRect.top < Coins50UpRect.top + Coins50UpRect.height &&
      marioRect.top + marioRect.height > Coins50UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin50.remove();
      coin50 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins51UpRect !== null &&
      marioRect.left < Coins51UpRect.left + Coins51UpRect.width &&
      marioRect.left + marioRect.width > Coins51UpRect.left &&
      marioRect.top < Coins51UpRect.top + Coins51UpRect.height &&
      marioRect.top + marioRect.height > Coins51UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin51.remove();
      coin51 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins52UpRect !== null &&
      marioRect.left < Coins52UpRect.left + Coins52UpRect.width &&
      marioRect.left + marioRect.width > Coins52UpRect.left &&
      marioRect.top < Coins52UpRect.top + Coins52UpRect.height &&
      marioRect.top + marioRect.height > Coins52UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin52.remove();
      coin52 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins53UpRect !== null &&
      marioRect.left < Coins53UpRect.left + Coins53UpRect.width &&
      marioRect.left + marioRect.width > Coins53UpRect.left &&
      marioRect.top < Coins53UpRect.top + Coins53UpRect.height &&
      marioRect.top + marioRect.height > Coins53UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin53.remove();
      coin53 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins54UpRect !== null &&
      marioRect.left < Coins54UpRect.left + Coins54UpRect.width &&
      marioRect.left + marioRect.width > Coins54UpRect.left &&
      marioRect.top < Coins54UpRect.top + Coins54UpRect.height &&
      marioRect.top + marioRect.height > Coins54UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin54.remove();
      coin54 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins55UpRect !== null &&
      marioRect.left < Coins55UpRect.left + Coins55UpRect.width &&
      marioRect.left + marioRect.width > Coins55UpRect.left &&
      marioRect.top < Coins55UpRect.top + Coins55UpRect.height &&
      marioRect.top + marioRect.height > Coins55UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin55.remove();
      coin55 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins56UpRect !== null &&
      marioRect.left < Coins56UpRect.left + Coins56UpRect.width &&
      marioRect.left + marioRect.width > Coins56UpRect.left &&
      marioRect.top < Coins56UpRect.top + Coins56UpRect.height &&
      marioRect.top + marioRect.height > Coins56UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin56.remove();
      coin56 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins57UpRect !== null &&
      marioRect.left < Coins57UpRect.left + Coins57UpRect.width &&
      marioRect.left + marioRect.width > Coins57UpRect.left &&
      marioRect.top < Coins57UpRect.top + Coins57UpRect.height &&
      marioRect.top + marioRect.height > Coins57UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin57.remove();
      coin57 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins58UpRect !== null &&
      marioRect.left < Coins58UpRect.left + Coins58UpRect.width &&
      marioRect.left + marioRect.width > Coins58UpRect.left &&
      marioRect.top < Coins58UpRect.top + Coins58UpRect.height &&
      marioRect.top + marioRect.height > Coins58UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin58.remove();
      coin58 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins59UpRect !== null &&
      marioRect.left < Coins59UpRect.left + Coins59UpRect.width &&
      marioRect.left + marioRect.width > Coins59UpRect.left &&
      marioRect.top < Coins59UpRect.top + Coins59UpRect.height &&
      marioRect.top + marioRect.height > Coins59UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin59.remove();
      coin59 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins60UpRect !== null &&
      marioRect.left < Coins60UpRect.left + Coins60UpRect.width &&
      marioRect.left + marioRect.width > Coins60UpRect.left &&
      marioRect.top < Coins60UpRect.top + Coins60UpRect.height &&
      marioRect.top + marioRect.height > Coins60UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin60.remove();
      coin60 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins61UpRect !== null &&
      marioRect.left < Coins61UpRect.left + Coins61UpRect.width &&
      marioRect.left + marioRect.width > Coins61UpRect.left &&
      marioRect.top < Coins61UpRect.top + Coins61UpRect.height &&
      marioRect.top + marioRect.height > Coins61UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin61.remove();
      coin61 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins62UpRect !== null &&
      marioRect.left < Coins62UpRect.left + Coins62UpRect.width &&
      marioRect.left + marioRect.width > Coins62UpRect.left &&
      marioRect.top < Coins62UpRect.top + Coins62UpRect.height &&
      marioRect.top + marioRect.height > Coins62UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin62.remove();
      coin62 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins63UpRect !== null &&
      marioRect.left < Coins63UpRect.left + Coins63UpRect.width &&
      marioRect.left + marioRect.width > Coins63UpRect.left &&
      marioRect.top < Coins63UpRect.top + Coins63UpRect.height &&
      marioRect.top + marioRect.height > Coins63UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin63.remove();
      coin63 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins64UpRect !== null &&
      marioRect.left < Coins64UpRect.left + Coins64UpRect.width &&
      marioRect.left + marioRect.width > Coins64UpRect.left &&
      marioRect.top < Coins64UpRect.top + Coins64UpRect.height &&
      marioRect.top + marioRect.height > Coins64UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin64.remove();
      coin64 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins65UpRect !== null &&
      marioRect.left < Coins65UpRect.left + Coins65UpRect.width &&
      marioRect.left + marioRect.width > Coins65UpRect.left &&
      marioRect.top < Coins65UpRect.top + Coins65UpRect.height &&
      marioRect.top + marioRect.height > Coins65UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin65.remove();
      coin65 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins66UpRect !== null &&
      marioRect.left < Coins66UpRect.left + Coins66UpRect.width &&
      marioRect.left + marioRect.width > Coins66UpRect.left &&
      marioRect.top < Coins66UpRect.top + Coins66UpRect.height &&
      marioRect.top + marioRect.height > Coins66UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin66.remove();
      coin66 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins67UpRect !== null &&
      marioRect.left < Coins67UpRect.left + Coins67UpRect.width &&
      marioRect.left + marioRect.width > Coins67UpRect.left &&
      marioRect.top < Coins67UpRect.top + Coins67UpRect.height &&
      marioRect.top + marioRect.height > Coins67UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin67.remove();
      coin67 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins68UpRect !== null &&
      marioRect.left < Coins68UpRect.left + Coins68UpRect.width &&
      marioRect.left + marioRect.width > Coins68UpRect.left &&
      marioRect.top < Coins68UpRect.top + Coins68UpRect.height &&
      marioRect.top + marioRect.height > Coins68UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin68.remove();
      coin68 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins69UpRect !== null &&
      marioRect.left < Coins69UpRect.left + Coins69UpRect.width &&
      marioRect.left + marioRect.width > Coins69UpRect.left &&
      marioRect.top < Coins69UpRect.top + Coins69UpRect.height &&
      marioRect.top + marioRect.height > Coins69UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin69.remove();
      coin69 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins70UpRect !== null &&
      marioRect.left < Coins70UpRect.left + Coins70UpRect.width &&
      marioRect.left + marioRect.width > Coins70UpRect.left &&
      marioRect.top < Coins70UpRect.top + Coins70UpRect.height &&
      marioRect.top + marioRect.height > Coins70UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin70.remove();
      coin70 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins71UpRect !== null &&
      marioRect.left < Coins71UpRect.left + Coins71UpRect.width &&
      marioRect.left + marioRect.width > Coins71UpRect.left &&
      marioRect.top < Coins71UpRect.top + Coins71UpRect.height &&
      marioRect.top + marioRect.height > Coins71UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin71.remove();
      coin71 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins72UpRect !== null &&
      marioRect.left < Coins72UpRect.left + Coins72UpRect.width &&
      marioRect.left + marioRect.width > Coins72UpRect.left &&
      marioRect.top < Coins72UpRect.top + Coins72UpRect.height &&
      marioRect.top + marioRect.height > Coins72UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin72.remove();
      coin72 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins73UpRect !== null &&
      marioRect.left < Coins73UpRect.left + Coins73UpRect.width &&
      marioRect.left + marioRect.width > Coins73UpRect.left &&
      marioRect.top < Coins73UpRect.top + Coins73UpRect.height &&
      marioRect.top + marioRect.height > Coins73UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin73.remove();
      coin73 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins74UpRect !== null &&
      marioRect.left < Coins74UpRect.left + Coins74UpRect.width &&
      marioRect.left + marioRect.width > Coins74UpRect.left &&
      marioRect.top < Coins74UpRect.top + Coins74UpRect.height &&
      marioRect.top + marioRect.height > Coins74UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin74.remove();
      coin74 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins75UpRect !== null &&
      marioRect.left < Coins75UpRect.left + Coins75UpRect.width &&
      marioRect.left + marioRect.width > Coins75UpRect.left &&
      marioRect.top < Coins75UpRect.top + Coins75UpRect.height &&
      marioRect.top + marioRect.height > Coins75UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin75.remove();
      coin75 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins76UpRect !== null &&
      marioRect.left < Coins76UpRect.left + Coins76UpRect.width &&
      marioRect.left + marioRect.width > Coins76UpRect.left &&
      marioRect.top < Coins76UpRect.top + Coins76UpRect.height &&
      marioRect.top + marioRect.height > Coins76UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin76.remove();
      coin76 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins77UpRect !== null &&
      marioRect.left < Coins77UpRect.left + Coins77UpRect.width &&
      marioRect.left + marioRect.width > Coins77UpRect.left &&
      marioRect.top < Coins77UpRect.top + Coins77UpRect.height &&
      marioRect.top + marioRect.height > Coins77UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin77.remove();
      coin77 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins78UpRect !== null &&
      marioRect.left < Coins78UpRect.left + Coins78UpRect.width &&
      marioRect.left + marioRect.width > Coins78UpRect.left &&
      marioRect.top < Coins78UpRect.top + Coins78UpRect.height &&
      marioRect.top + marioRect.height > Coins78UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin78.remove();
      coin78 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins79UpRect !== null &&
      marioRect.left < Coins79UpRect.left + Coins79UpRect.width &&
      marioRect.left + marioRect.width > Coins79UpRect.left &&
      marioRect.top < Coins79UpRect.top + Coins79UpRect.height &&
      marioRect.top + marioRect.height > Coins79UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin79.remove();
      coin79 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins80UpRect !== null &&
      marioRect.left < Coins80UpRect.left + Coins80UpRect.width &&
      marioRect.left + marioRect.width > Coins80UpRect.left &&
      marioRect.top < Coins80UpRect.top + Coins80UpRect.height &&
      marioRect.top + marioRect.height > Coins80UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin80.remove();
      coin80 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins81UpRect !== null &&
      marioRect.left < Coins81UpRect.left + Coins81UpRect.width &&
      marioRect.left + marioRect.width > Coins81UpRect.left &&
      marioRect.top < Coins81UpRect.top + Coins81UpRect.height &&
      marioRect.top + marioRect.height > Coins81UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin81.remove();
      coin81 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins82UpRect !== null &&
      marioRect.left < Coins82UpRect.left + Coins82UpRect.width &&
      marioRect.left + marioRect.width > Coins82UpRect.left &&
      marioRect.top < Coins82UpRect.top + Coins82UpRect.height &&
      marioRect.top + marioRect.height > Coins82UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin82.remove();
      coin82 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins83UpRect !== null &&
      marioRect.left < Coins83UpRect.left + Coins83UpRect.width &&
      marioRect.left + marioRect.width > Coins83UpRect.left &&
      marioRect.top < Coins83UpRect.top + Coins83UpRect.height &&
      marioRect.top + marioRect.height > Coins83UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin83.remove();
      coin83 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins84UpRect !== null &&
      marioRect.left < Coins84UpRect.left + Coins84UpRect.width &&
      marioRect.left + marioRect.width > Coins84UpRect.left &&
      marioRect.top < Coins84UpRect.top + Coins84UpRect.height &&
      marioRect.top + marioRect.height > Coins84UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin84.remove();
      coin84 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins85UpRect !== null &&
      marioRect.left < Coins85UpRect.left + Coins85UpRect.width &&
      marioRect.left + marioRect.width > Coins85UpRect.left &&
      marioRect.top < Coins85UpRect.top + Coins85UpRect.height &&
      marioRect.top + marioRect.height > Coins85UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin85.remove();
      coin85 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins86UpRect !== null &&
      marioRect.left < Coins86UpRect.left + Coins86UpRect.width &&
      marioRect.left + marioRect.width > Coins86UpRect.left &&
      marioRect.top < Coins86UpRect.top + Coins86UpRect.height &&
      marioRect.top + marioRect.height > Coins86UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin86.remove();
      coin86 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins87UpRect !== null &&
      marioRect.left < Coins87UpRect.left + Coins87UpRect.width &&
      marioRect.left + marioRect.width > Coins87UpRect.left &&
      marioRect.top < Coins87UpRect.top + Coins87UpRect.height &&
      marioRect.top + marioRect.height > Coins87UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin87.remove();
      coin87 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins88UpRect !== null &&
      marioRect.left < Coins88UpRect.left + Coins88UpRect.width &&
      marioRect.left + marioRect.width > Coins88UpRect.left &&
      marioRect.top < Coins88UpRect.top + Coins88UpRect.height &&
      marioRect.top + marioRect.height > Coins88UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin88.remove();
      coin88 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins89UpRect !== null &&
      marioRect.left < Coins89UpRect.left + Coins89UpRect.width &&
      marioRect.left + marioRect.width > Coins89UpRect.left &&
      marioRect.top < Coins89UpRect.top + Coins89UpRect.height &&
      marioRect.top + marioRect.height > Coins89UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin89.remove();
      coin89 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins90UpRect !== null &&
      marioRect.left < Coins90UpRect.left + Coins90UpRect.width &&
      marioRect.left + marioRect.width > Coins90UpRect.left &&
      marioRect.top < Coins90UpRect.top + Coins90UpRect.height &&
      marioRect.top + marioRect.height > Coins90UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin90.remove();
      coin90 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins91UpRect !== null &&
      marioRect.left < Coins91UpRect.left + Coins91UpRect.width &&
      marioRect.left + marioRect.width > Coins91UpRect.left &&
      marioRect.top < Coins91UpRect.top + Coins91UpRect.height &&
      marioRect.top + marioRect.height > Coins91UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin91.remove();
      coin91 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins92UpRect !== null &&
      marioRect.left < Coins92UpRect.left + Coins92UpRect.width &&
      marioRect.left + marioRect.width > Coins92UpRect.left &&
      marioRect.top < Coins92UpRect.top + Coins92UpRect.height &&
      marioRect.top + marioRect.height > Coins92UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin92.remove();
      coin92 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins93UpRect !== null &&
      marioRect.left < Coins93UpRect.left + Coins93UpRect.width &&
      marioRect.left + marioRect.width > Coins93UpRect.left &&
      marioRect.top < Coins93UpRect.top + Coins93UpRect.height &&
      marioRect.top + marioRect.height > Coins93UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin93.remove();
      coin93 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins94UpRect !== null &&
      marioRect.left < Coins94UpRect.left + Coins94UpRect.width &&
      marioRect.left + marioRect.width > Coins94UpRect.left &&
      marioRect.top < Coins94UpRect.top + Coins94UpRect.height &&
      marioRect.top + marioRect.height > Coins94UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin94.remove();
      coin94 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins95UpRect !== null &&
      marioRect.left < Coins95UpRect.left + Coins95UpRect.width &&
      marioRect.left + marioRect.width > Coins95UpRect.left &&
      marioRect.top < Coins95UpRect.top + Coins95UpRect.height &&
      marioRect.top + marioRect.height > Coins95UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin95.remove();
      coin95 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins96UpRect !== null &&
      marioRect.left < Coins96UpRect.left + Coins96UpRect.width &&
      marioRect.left + marioRect.width > Coins96UpRect.left &&
      marioRect.top < Coins96UpRect.top + Coins96UpRect.height &&
      marioRect.top + marioRect.height > Coins96UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin96.remove();
      coin96 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins97UpRect !== null &&
      marioRect.left < Coins97UpRect.left + Coins97UpRect.width &&
      marioRect.left + marioRect.width > Coins97UpRect.left &&
      marioRect.top < Coins97UpRect.top + Coins97UpRect.height &&
      marioRect.top + marioRect.height > Coins97UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin97.remove();
      coin97 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins98UpRect !== null &&
      marioRect.left < Coins98UpRect.left + Coins98UpRect.width &&
      marioRect.left + marioRect.width > Coins98UpRect.left &&
      marioRect.top < Coins98UpRect.top + Coins98UpRect.height &&
      marioRect.top + marioRect.height > Coins98UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin98.remove();
      coin98 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins99UpRect !== null &&
      marioRect.left < Coins99UpRect.left + Coins99UpRect.width &&
      marioRect.left + marioRect.width > Coins99UpRect.left &&
      marioRect.top < Coins99UpRect.top + Coins99UpRect.height &&
      marioRect.top + marioRect.height > Coins99UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin99.remove();
      coin99 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins100UpRect !== null &&
      marioRect.left < Coins100UpRect.left + Coins100UpRect.width &&
      marioRect.left + marioRect.width > Coins100UpRect.left &&
      marioRect.top < Coins100UpRect.top + Coins100UpRect.height &&
      marioRect.top + marioRect.height > Coins100UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin100.remove();
      coin100 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins101UpRect !== null &&
      marioRect.left < Coins101UpRect.left + Coins101UpRect.width &&
      marioRect.left + marioRect.width > Coins101UpRect.left &&
      marioRect.top < Coins101UpRect.top + Coins101UpRect.height &&
      marioRect.top + marioRect.height > Coins101UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin101.remove();
      coin101 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins102UpRect !== null &&
      marioRect.left < Coins102UpRect.left + Coins102UpRect.width &&
      marioRect.left + marioRect.width > Coins102UpRect.left &&
      marioRect.top < Coins102UpRect.top + Coins102UpRect.height &&
      marioRect.top + marioRect.height > Coins102UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin102.remove();
      coin102 = null;
      points += 100;
      coinsCollected++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {}, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      Coins103UpRect !== null &&
      marioRect.left < Coins103UpRect.left + Coins103UpRect.width &&
      marioRect.left + marioRect.width > Coins103UpRect.left &&
      marioRect.top < Coins103UpRect.top + Coins103UpRect.height &&
      marioRect.top + marioRect.height > Coins103UpRect.top
    ) {
      let audio = document.querySelector(".coins-up");
      audio.currentTime = 0;
      audio.play();
      coin103.classList.add("coin103");
      coin103.addEventListener("animationend", function () {
        if (currentClonescoin103 < maxClonesextraup) {
          coin103.classList.remove("coin103");
        }
      });
      coin103.parentNode.removeChild(coin103);
      coin103 = coin103.cloneNode(true);
      points += 1000;
      coinsCollected++;
      document.getElementById("container-game").appendChild(coin103);
      currentClonescoin103++;
      if (coinsCollected % 100 === 0) {
        life++;
        coinsCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }

      if (currentClonescoin103 >= maxClonescoin103) {
        coin103.style.animationPlayState = "paused";
      }
    }
    updateScore();

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      lifeUpRect !== null &&
      marioRect.left < lifeUpRect.left + lifeUpRect.width &&
      marioRect.left + marioRect.width > lifeUpRect.left &&
      marioRect.top < lifeUpRect.top + lifeUpRect.height &&
      marioRect.top + marioRect.height > lifeUpRect.top &&
      currentClones < maxClones
    ) {
      let audio = document.querySelector(".extra-life");
      audio.currentTime = 0;
      audio.play();
      vidaextra.classList.add("vidaextraup");
      vidaextra.addEventListener("animationend", function () {
        if (currentClones < maxClones) {
          vidaextra.classList.remove("vidaextraup");
        }
      });
      vidaextra.parentNode.removeChild(vidaextra);
      vidaextra = vidaextra.cloneNode(true);
      life += 1;
      points += 100000;
      document.getElementById("container-game").appendChild(vidaextra);
      currentClones++;
      if (currentClones >= maxClones) {
        vidaextra.style.animationPlayState = "paused";
      }

      let vidaextraImg = document.getElementById("vidaextra-img");
      vidaextraImg.classList.add("vidaextraup");
      vidaextraImg.style.display = "block";
      vidaextraImg.style.zIndex = 99;
      vidaextraImg.style.position = "absolute";
      vidaextraImg.style.left = `${
        marioRect.left + marioRect.width / 1 - vidaextraImg.width / 1
      }px`;
      vidaextraImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - vidaextraImg.height
      )}px`;

      setTimeout(() => {
        vidaextraImg.style.display = "none";
        vidaextraImg.classList.remove("vidaextraup");
      }, 1000);
    }

    updateScore();

    if (
      pointsElement !== null &&
      lifeElement !== null &&
      yoshiCoinCollectElement !== null &&
      coinsCollectedElement !== null
    ) {
      pointsElement.textContent = points;
      lifeElement.textContent = life;
      coinsCollectedElement.textContent = coinsCollected;
      yoshiCoinCollectElement.textContent = yoshiCoinCollected;
    }

    if (
      extraUpRect !== null &&
      marioRect.left < extraUpRect.left + extraUpRect.width &&
      marioRect.left + marioRect.width > extraUpRect.left &&
      marioRect.top < extraUpRect.top + extraUpRect.height &&
      marioRect.top + marioRect.height > extraUpRect.top &&
      currentClonesextraup < maxClonesextraup
    ) {
      let audio = document.querySelector(".power-extra");
      audio.currentTime = 0;
      audio.play();
      cogumelo.classList.add("power-up");
      cogumelo.addEventListener("animationend", function () {
        if (currentClonesextraup < maxClonesextraup) {
          cogumelo.classList.remove("power-up");
        }
      });

      cogumelo.parentNode.removeChild(cogumelo);
      cogumelo = cogumelo.cloneNode(true);
      points += 1000;
      document.getElementById("container-game").appendChild(cogumelo);
      currentClonesextraup++;

      isMarioBig = true;

      if (currentClonesextraup >= maxClonesextraup) {
        cogumelo.style.animationPlayState = "paused";
      }
    }
    updateScore();

    if (
      pointsElement !== null &&
      lifeElement !== null &&
      yoshiCoinCollectElement !== null &&
      coinsCollectedElement !== null
    ) {
      pointsElement.textContent = points;
      lifeElement.textContent = life;
      coinsCollectedElement.textContent = coinsCollected;
      yoshiCoinCollectElement.textContent = yoshiCoinCollected;
    }

    if (
      flowerUpRect !== null &&
      marioRect.left < flowerUpRect.left + flowerUpRect.width &&
      marioRect.left + marioRect.width > flowerUpRect.left &&
      marioRect.top < flowerUpRect.top + flowerUpRect.height &&
      marioRect.top + marioRect.height > flowerUpRect.top &&
      currentClonesflower < maxClonesflower
    ) {
      let audio = document.querySelector(".power-extra");
      audio.currentTime = 0;
      audio.play();
      flor.classList.add("flower");
      flor.addEventListener("animationend", function () {
        if (currentClonesflower < maxClonesflower) {
          flor.classList.remove("flower");
        }
      });
      flor.parentNode.removeChild(flor);
      flor = flor.cloneNode(true);
      points += 25000;
      document.getElementById("container-game").appendChild(flor);
      currentClonesflower++;
      if (currentClonesflower >= maxClonesflower) {
        flor.style.animationPlayState = "paused";
      }
    }
    updateScore();

    if (
      pointsElement !== null &&
      lifeElement !== null &&
      yoshiCoinCollectElement !== null &&
      coinsCollectedElement !== null
    ) {
      pointsElement.textContent = points;
      lifeElement.textContent = life;
      coinsCollectedElement.textContent = coinsCollected;
      yoshiCoinCollectElement.textContent = yoshiCoinCollected;
    }

    if (
      starUpRect !== null &&
      marioRect.left < starUpRect.left + starUpRect.width &&
      marioRect.left + marioRect.width > starUpRect.left &&
      marioRect.top < starUpRect.top + starUpRect.height &&
      marioRect.top + marioRect.height > starUpRect.top &&
      currentClonesstar < maxClonesstar
    ) {
      let audio = document.querySelector(".invencivel");
      let playaudio = document.querySelector(".overworld");

      audio.play();
      playaudio.pause();
      mario.classList.add("mario-invencible");

      star.classList.add("star");
      star.addEventListener("animationend", function () {
        if (currentClonesstar < maxClonesstar) {
          star.classList.remove("star");
        }
      });
      star.parentNode.removeChild(star);
      star = star.cloneNode(true);
      points += 25000;
      isMarioInvincible = true;
      setTimeout(() => {
        playaudio.volume = 1;
        playaudio.play();
        mario.classList.remove("mario-invencible");
        isMarioInvincible = false;
      }, 12100);
      document.getElementById("container-game").appendChild(star);
      currentClonesstar++;
      if (currentClonesstar >= maxClonesstar) {
        star.style.animationPlayState = "paused";
      }
    }
    updateScore();

    if (
      pointsElement !== null &&
      lifeElement !== null &&
      yoshiCoinCollectElement !== null &&
      coinsCollectedElement !== null
    ) {
      pointsElement.textContent = points;
      lifeElement.textContent = life;
      coinsCollectedElement.textContent = coinsCollected;
      yoshiCoinCollectElement.textContent = yoshiCoinCollected;
    }

    if (
      feathergetUpRect !== null &&
      marioRect.left < feathergetUpRect.left + feathergetUpRect.width &&
      marioRect.left + marioRect.width > feathergetUpRect.left &&
      marioRect.top < feathergetUpRect.top + feathergetUpRect.height &&
      marioRect.top + marioRect.height > feathergetUpRect.top &&
      currentClonesfeather < maxClonesfeather
    ) {
      let audio = document.querySelector(".featherget");
      audio.currentTime = 0;
      audio.play();
      featherget.classList.add("featherget");
      featherget.addEventListener("animationend", function () {
        if (currentClonesfeather < maxClonesfeather) {
          featherget.classList.remove("featherget");
        }
      });
      featherget.parentNode.removeChild(featherget);
      featherget = featherget.cloneNode(true);
      points += 25000;
      document.getElementById("container-game").appendChild(featherget);
      currentClonesfeather++;
      if (currentClonesfeather >= maxClonesfeather) {
        featherget.style.animationPlayState = "paused";
      }
    }
    updateScore();

    if (
      yoshiCoinUpRect !== null &&
      marioRect.left < yoshiCoinUpRect.left + yoshiCoinUpRect.width &&
      marioRect.left + marioRect.width > yoshiCoinUpRect.left &&
      marioRect.top < yoshiCoinUpRect.top + yoshiCoinUpRect.height &&
      marioRect.top + marioRect.height > yoshiCoinUpRect.top
    ) {
      let audio = document.querySelector(".yoshi-coin");
      audio.currentTime = 0;
      audio.play();
      yoshiCoin.remove();
      yoshiCoin = null;
      points += 50500;
      yoshiCoinCollected++;
      if (yoshiCoinCollected % 5 === 0) {
        life++;
        yoshiCoinCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {
        return;
      }, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      yoshiCoin2UpRect !== null &&
      marioRect.left < yoshiCoin2UpRect.left + yoshiCoin2UpRect.width &&
      marioRect.left + marioRect.width > yoshiCoin2UpRect.left &&
      marioRect.top < yoshiCoin2UpRect.top + yoshiCoin2UpRect.height &&
      marioRect.top + marioRect.height > yoshiCoin2UpRect.top
    ) {
      let audio = document.querySelector(".yoshi-coin");
      audio.currentTime = 0;
      audio.play();
      yoshiCoin2.remove();
      yoshiCoin2 = null;
      points += 50500;
      yoshiCoinCollected++;
      if (yoshiCoinCollected % 5 === 0) {
        life++;
        yoshiCoinCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {
        return;
      }, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      yoshiCoin3UpRect !== null &&
      marioRect.left < yoshiCoin3UpRect.left + yoshiCoin3UpRect.width &&
      marioRect.left + marioRect.width > yoshiCoin3UpRect.left &&
      marioRect.top < yoshiCoin3UpRect.top + yoshiCoin3UpRect.height &&
      marioRect.top + marioRect.height > yoshiCoin3UpRect.top
    ) {
      let audio = document.querySelector(".yoshi-coin");
      audio.currentTime = 0;
      audio.play();
      yoshiCoin3.remove();
      yoshiCoin3 = null;
      points += 50500;
      yoshiCoinCollected++;
      if (yoshiCoinCollected % 5 === 0) {
        life++;
        yoshiCoinCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {
        return;
      }, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      yoshiCoin4UpRect !== null &&
      marioRect.left < yoshiCoin4UpRect.left + yoshiCoin4UpRect.width &&
      marioRect.left + marioRect.width > yoshiCoin4UpRect.left &&
      marioRect.top < yoshiCoin4UpRect.top + yoshiCoin4UpRect.height &&
      marioRect.top + marioRect.height > yoshiCoin4UpRect.top
    ) {
      let audio = document.querySelector(".yoshi-coin");
      audio.currentTime = 0;
      audio.play();
      yoshiCoin4.remove();
      yoshiCoin4 = null;
      points += 50500;
      yoshiCoinCollected++;
      if (yoshiCoinCollected % 5 === 0) {
        life++;
        yoshiCoinCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {
        return;
      }, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    if (
      yoshiCoin5UpRect !== null &&
      marioRect.left < yoshiCoin5UpRect.left + yoshiCoin5UpRect.width &&
      marioRect.left + marioRect.width > yoshiCoin5UpRect.left &&
      marioRect.top < yoshiCoin5UpRect.top + yoshiCoin5UpRect.height &&
      marioRect.top + marioRect.height > yoshiCoin5UpRect.top
    ) {
      let audio = document.querySelector(".yoshi-coin");
      audio.currentTime = 0;
      audio.play();
      yoshiCoin5.remove();
      yoshiCoin5 = null;
      points += 50500;
      yoshiCoinCollected++;
      if (yoshiCoinCollected % 5 === 0) {
        life++;
        yoshiCoinCollected = 0;
        let lifeAudio = document.querySelector(".extra-life");
        lifeAudio.currentTime = 0;
        lifeAudio.play();
      }
      updateScore();
      setTimeout(function () {
        return;
      }, 5000);
    }

    function updateScore() {
      if (
        pointsElement !== null &&
        lifeElement !== null &&
        yoshiCoinCollectElement !== null &&
        coinsCollectedElement !== null
      ) {
        pointsElement.textContent = points;
        lifeElement.textContent = life;
        coinsCollectedElement.textContent = coinsCollected;
        yoshiCoinCollectElement.textContent = yoshiCoinCollected;
      }
    }

    // if (
    //   yoshiCoinUpRect !== null &&
    //   marioRect.left < yoshiCoinUpRect.left + yoshiCoinUpRect.width &&
    //   marioRect.left + marioRect.width > yoshiCoinUpRect.left &&
    //   marioRect.top < yoshiCoinUpRect.top + yoshiCoinUpRect.height &&
    //   marioRect.top + marioRect.height > yoshiCoinUpRect.top
    // ) {
    //   let audio = document.querySelector(".coins-up");
    //   audio.currentTime = 0;
    //   audio.play();
    //   yoshiCoin.remove();
    //   yoshiCoin = null;
    //   points += 50500;
    //   yoshiCoinCollected++;
    //   if (yoshiCoinCollected % 5 === 0) {
    //     life++;
    //     yoshiCoinCollected = 0;
    //     let lifeAudio = document.querySelector(".extra-life");
    //     lifeAudio.currentTime = 0;
    //     lifeAudio.play();
    //   }
    //   updateScore();
    //   setTimeout(function () {}, 5000);
    // }

    // function updateScore() {
    //   if (
    //     pointsElement !== null &&
    //     lifeElement !== null &&
    //     yoshiCoinCollectElement !== null &&
    //     coinsCollectedElement !== null
    //   ) {
    //     pointsElement.textContent = points;
    //     lifeElement.textContent = life;
    //     coinsCollectedElement.textContent = coinsCollected;
    //     yoshiCoinCollectElement.textContent = yoshiCoinCollected;
    //   }
    // }

    if (
      cascoredUpRect !== null &&
      marioRect.left < cascoredUpRect.left + cascoredUpRect.width &&
      marioRect.left + marioRect.width > cascoredUpRect.left &&
      marioRect.top < cascoredUpRect.top + cascoredUpRect.height &&
      marioRect.top + marioRect.height > cascoredUpRect.top
    ) {
      let audio = document.querySelector(".colision-kick");
      audio.play();

      cascored.classList.add("cascored-animation");
      cascored.src = "/images/cascored.gif";
      cascored.style.width = "40px";

      setTimeout(() => {
        cascored.remove();
      }, 4000);
    }

    if (
      koopaUpRect !== null &&
      marioRect.left < koopaUpRect.left + koopaUpRect.width &&
      marioRect.left + marioRect.width > koopaUpRect.left &&
      marioRect.top < koopaUpRect.top + koopaUpRect.height &&
      marioRect.top + marioRect.height > koopaUpRect.top
    ) {
      if (mario.classList.contains("mario-invencible")) {
        if (!invincibleCollisionAudioPlayed) {
          let audioInvencivel = new Audio("/soundtracks/kick.wav");
          audioInvencivel.play();
          invincibleCollisionAudioPlayed = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed = false;

        if (canLoseLife && life > 0) {
          life--;
          document.querySelector(".life").textContent = `x ${life}`;

          let removeVida = document.createElement("div");
          removeVida.classList.add("extra-up");
          document.body.appendChild(removeVida);
          setTimeout(() => {
            removeVida.remove();
          }, 1000);

          canLoseLife = false;
          setTimeout(() => {
            canLoseLife = true;
          }, 2000);
        }
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        invincibleCollisionAudioPlayed = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          let audio = document.querySelector(".powerdown");
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      }
    }

    if (
      koopa2UpRect !== null &&
      marioRect.left < koopa2UpRect.left + koopa2UpRect.width &&
      marioRect.left + marioRect.width > koopa2UpRect.left &&
      marioRect.top < koopa2UpRect.top + koopa2UpRect.height &&
      marioRect.top + marioRect.height > koopa2UpRect.top
    ) {
      if (mario.classList.contains("mario-invencible")) {
        if (!invincibleCollisionAudioPlayed) {
          let audioInvencivel = new Audio("/soundtracks/kick.wav");
          audioInvencivel.play();
          invincibleCollisionAudioPlayed = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed = false;

        if (canLoseLife && life > 0) {
          life--;
          document.querySelector(".life").textContent = `x ${life}`;

          let removeVida = document.createElement("div");
          removeVida.classList.add("extra-up");
          document.body.appendChild(removeVida);
          setTimeout(() => {
            removeVida.remove();
          }, 1000);

          canLoseLife = false;
          setTimeout(() => {
            canLoseLife = true;
          }, 2000);
        }
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        invincibleCollisionAudioPlayed = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          let audio = document.querySelector(".powerdown");
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      }
    }

    if (
      koopa3UpRect !== null &&
      marioRect.left < koopa3UpRect.left + koopa3UpRect.width &&
      marioRect.left + marioRect.width > koopa3UpRect.left &&
      marioRect.top < koopa3UpRect.top + koopa3UpRect.height &&
      marioRect.top + marioRect.height > koopa3UpRect.top
    ) {
      if (mario.classList.contains("mario-invencible")) {
        if (!invincibleCollisionAudioPlayed) {
          let audioInvencivel = new Audio("/soundtracks/kick.wav");
          audioInvencivel.play();
          invincibleCollisionAudioPlayed = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed = false;

        if (canLoseLife && life > 0) {
          life--;
          document.querySelector(".life").textContent = `x ${life}`;

          let removeVida = document.createElement("div");
          removeVida.classList.add("extra-up");
          document.body.appendChild(removeVida);
          setTimeout(() => {
            removeVida.remove();
          }, 1000);

          canLoseLife = false;
          setTimeout(() => {
            canLoseLife = true;
          }, 2000);
        }
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        invincibleCollisionAudioPlayed = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          let audio = document.querySelector(".powerdown");
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      }
    }

    if (
      koopa4UpRect !== null &&
      marioRect.left < koopa4UpRect.left + koopa4UpRect.width &&
      marioRect.left + marioRect.width > koopa4UpRect.left &&
      marioRect.top < koopa4UpRect.top + koopa4UpRect.height &&
      marioRect.top + marioRect.height > koopa4UpRect.top
    ) {
      if (mario.classList.contains("mario-invencible")) {
        if (!invincibleCollisionAudioPlayed) {
          let audioInvencivel = new Audio("/soundtracks/kick.wav");
          audioInvencivel.play();
          invincibleCollisionAudioPlayed = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed = false;

        if (canLoseLife && life > 0) {
          life--;
          document.querySelector(".life").textContent = `x ${life}`;

          let removeVida = document.createElement("div");
          removeVida.classList.add("extra-up");
          document.body.appendChild(removeVida);
          setTimeout(() => {
            removeVida.remove();
          }, 1000);

          canLoseLife = false;
          setTimeout(() => {
            canLoseLife = true;
          }, 2000);
        }
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        invincibleCollisionAudioPlayed = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          let audio = document.querySelector(".powerdown");
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      }
    }

    if (
      koopa5UpRect !== null &&
      marioRect.left < koopa5UpRect.left + koopa5UpRect.width &&
      marioRect.left + marioRect.width > koopa5UpRect.left &&
      marioRect.top < koopa5UpRect.top + koopa5UpRect.height &&
      marioRect.top + marioRect.height > koopa5UpRect.top
    ) {
      if (mario.classList.contains("mario-invencible")) {
        if (!invincibleCollisionAudioPlayed) {
          let audioInvencivel = new Audio("/soundtracks/kick.wav");
          audioInvencivel.play();
          invincibleCollisionAudioPlayed = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed = false;

        if (canLoseLife && life > 0) {
          life--;
          document.querySelector(".life").textContent = `x ${life}`;

          let removeVida = document.createElement("div");
          removeVida.classList.add("extra-up");
          document.body.appendChild(removeVida);
          setTimeout(() => {
            removeVida.remove();
          }, 1000);

          canLoseLife = false;
          setTimeout(() => {
            canLoseLife = true;
          }, 2000);
        }
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        invincibleCollisionAudioPlayed = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          let audio = document.querySelector(".powerdown");
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      }
    }

    if (
      koopa6UpRect !== null &&
      marioRect.left < koopa6UpRect.left + koopa6UpRect.width &&
      marioRect.left + marioRect.width > koopa6UpRect.left &&
      marioRect.top < koopa6UpRect.top + koopa6UpRect.height &&
      marioRect.top + marioRect.height > koopa6UpRect.top
    ) {
      if (mario.classList.contains("mario-invencible")) {
        if (!invincibleCollisionAudioPlayed) {
          let audioInvencivel = new Audio("/soundtracks/kick.wav");
          audioInvencivel.play();
          invincibleCollisionAudioPlayed = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed = false;

        if (canLoseLife && life > 0) {
          life--;
          document.querySelector(".life").textContent = `x ${life}`;

          let removeVida = document.createElement("div");
          removeVida.classList.add("extra-up");
          document.body.appendChild(removeVida);
          setTimeout(() => {
            removeVida.remove();
          }, 1000);

          canLoseLife = false;
          setTimeout(() => {
            canLoseLife = true;
          }, 2000);
        }
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        invincibleCollisionAudioPlayed = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          let audio = document.querySelector(".powerdown");
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      }
    }

    if (
      !mario.classList.contains("mario-invencible") &&
      rexlUpRect !== null &&
      marioRect.left < rexlUpRect.left + rexlUpRect.width &&
      marioRect.left + marioRect.width > rexlUpRect.left &&
      marioRect.top < rexlUpRect.top + rexlUpRect.height &&
      marioRect.top + marioRect.height > rexlUpRect.top
    ) {
      let audio = document.querySelector(".powerdown");

      audio.play();

      if (canLoseLife && life > 0) {
        life--;
        document.querySelector(".life").textContent = `x ${life}`;

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);

        canLoseLife = false;
        setTimeout(() => {
          canLoseLife = true;
        }, 2000);
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      } else if (
        mario.classList.contains("mario-invencible") &&
        rexlUpRect !== null &&
        marioRect.left < rexlUpRect.left + rexlUpRect.width &&
        marioRect.left + marioRect.width > rexlUpRect.left &&
        marioRect.top < rexlUpRect.top + rexlUpRect.height &&
        marioRect.top + marioRect.height > rexlUpRect.top
      ) {
        let audio = document.querySelector(".powerdown");

        setTimeout(() => {
          mario.classList.remove("colision-animation");
        }, 1000);

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);
      }
    }
    updateScore();

    // if (piranhaUpRect !== null && marioRect.left < piranhaUpRect.left + piranhaUpRect.width &&
    //   marioRect.left + marioRect.width > piranhaUpRect.left &&
    //   marioRect.top < piranhaUpRect.top + piranhaUpRect.height &&
    //   marioRect.top + marioRect.height > piranhaUpRect.top
    // ) {
    //   let audio = document.querySelector('.playerdown');

    //   let playaudio = document.querySelector('.overworld');
    //   let playsound = document.querySelector('.overworldhurry');
    //   let audiohurry = document.querySelector('.hurry-up');

    //   let allEnemies = document.querySelectorAll('.koopared, .koopared2, ' +
    //   '.chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, ' +
    //   '.koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, ' +
    //   '.piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3, .koopared3-start');

    //   playaudio.volume = 0;
    //   playsound.volume = 0;
    //   audiohurry.volume = 0;

    //   audio.currentTime = 0;
    //   audio.play();
    //   allEnemies.forEach(function(element) {
    //     element.style.animationPlayState = 'paused';
    //   });
    //   allEnemies.forEach(function(element) {
    //     element.remove();
    //   });

    //   mario.src = '/images/mario-death.gif';
    //   mario.style.width = '40px';

    //   botao.removeEventListener('click', handleClick);

    //   setTimeout(() => {
    //     audio.volume = 1;
    //   }, 100);

    //   mario.classList.add('colision-animation');

    //   setTimeout(() => {
    //     let divAnimation = document.querySelector('.animation');
    //     let rightImage = document.querySelector('.right-image');
    //     let leftImage = document.querySelector('.left-image');

    //     divAnimation.style.display = 'block';
    //     leftImage.style.display = 'block';
    //     rightImage.style.display = 'block';
    //     let newAudio = new Audio('/soundtracks/gameover.mp3');
    //     newAudio.play();
    //   }, 3000);
    // }
    // updateScore();

    // if (piranha2UpRect !== null && marioRect.left < piranha2UpRect.left + piranha2UpRect.width &&
    //   marioRect.left + marioRect.width > piranha2UpRect.left &&
    //   marioRect.top < piranha2UpRect.top + piranha2UpRect.height &&
    //   marioRect.top + marioRect.height > piranha2UpRect.top
    // ) {
    //   let audio = document.querySelector('.playerdown');

    //   let playaudio = document.querySelector('.overworld');
    //   let playsound = document.querySelector('.overworldhurry');
    //   let audiohurry = document.querySelector('.hurry-up');

    //   let allEnemies = document.querySelectorAll('.koopared, .koopared2, ' +
    //   '.chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, ' +
    //   '.koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, ' +
    //   '.piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3, .koopared3-start');

    //   playaudio.volume = 0;
    //   playsound.volume = 0;
    //   audiohurry.volume = 0;

    //   audio.currentTime = 0;
    //   audio.play();
    //   allEnemies.forEach(function(element) {
    //     element.style.animationPlayState = 'paused';
    //   });
    //   allEnemies.forEach(function(element) {
    //     element.remove();
    //   });

    //   mario.src = '/images/mario-death.gif';
    //   mario.style.width = '40px';

    //   botao.removeEventListener('click', handleClick);

    //   setTimeout(() => {
    //     audio.volume = 1;
    //   }, 100);

    //   mario.classList.add('colision-animation');

    //   setTimeout(() => {
    //     let divAnimation = document.querySelector('.animation');
    //     let rightImage = document.querySelector('.right-image');
    //     let leftImage = document.querySelector('.left-image');

    //     divAnimation.style.display = 'block';
    //     leftImage.style.display = 'block';
    //     rightImage.style.display = 'block';
    //     let newAudio = new Audio('/soundtracks/gameover.mp3');
    //     newAudio.play();
    //   }, 3000);
    // }
    // updateScore();

    if (
      !mario.classList.contains("mario-invencible") &&
      superkUpRect !== null &&
      marioRect.left < superkUpRect.left + superkUpRect.width &&
      marioRect.left + marioRect.width > superkUpRect.left &&
      marioRect.top < superkUpRect.top + superkUpRect.height &&
      marioRect.top + marioRect.height > superkUpRect.top
    ) {
      let audio = document.querySelector(".powerdown");

      audio.play();

      if (canLoseLife && life > 0) {
        life--;
        document.querySelector(".life").textContent = `x ${life}`;

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);

        canLoseLife = false;
        setTimeout(() => {
          canLoseLife = true;
        }, 2000);
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      } else if (
        mario.classList.contains("mario-invencible") &&
        superkUpRect !== null &&
        marioRect.left < superkUpRect.left + superkUpRect.width &&
        marioRect.left + marioRect.width > superkUpRect.left &&
        marioRect.top < superkUpRect.top + superkUpRect.height &&
        marioRect.top + marioRect.height > superkUpRect.top
      ) {
        let audio = document.querySelector(".powerdown");
        mario.classList.add("colision-animation");

        setTimeout(() => {
          mario.classList.remove("colision-animation");
        }, 1000);

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);
      }
    }
    updateScore();

    if (
      !mario.classList.contains("mario-invencible") &&
      cascodUpRect !== null &&
      marioRect.left < cascodUpRect.left + cascodUpRect.width &&
      marioRect.left + marioRect.width > cascodUpRect.left &&
      marioRect.top < cascodUpRect.top + cascodUpRect.height &&
      marioRect.top + marioRect.height > cascodUpRect.top
    ) {
      let audio = document.querySelector(".powerdown");

      audio.play();

      if (canLoseLife && life > 0) {
        life--;
        document.querySelector(".life").textContent = `x ${life}`;

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);

        canLoseLife = false;
        setTimeout(() => {
          canLoseLife = true;
        }, 2000);
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      } else if (
        mario.classList.contains("mario-invencible") &&
        cascodUpRect !== null &&
        marioRect.left < cascodUpRect.left + cascodUpRect.width &&
        marioRect.left + marioRect.width > cascodUpRect.left &&
        marioRect.top < cascodUpRect.top + cascodUpRect.height &&
        marioRect.top + marioRect.height > cascodUpRect.top
      ) {
        let audio = document.querySelector(".powerdown");

        setTimeout(() => {
          mario.classList.remove("colision-animation");
        }, 1000);

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);
      }
    }
    updateScore();

    if (
      !mario.classList.contains("mario-invencible") &&
      chuckfootbal2UpRect !== null &&
      marioRect.left < chuckfootbal2UpRect.left + chuckfootbal2UpRect.width &&
      marioRect.left + marioRect.width > chuckfootbal2UpRect.left &&
      marioRect.top < chuckfootbal2UpRect.top + chuckfootbal2UpRect.height &&
      marioRect.top + marioRect.height > chuckfootbal2UpRect.top
    ) {
      let audio = document.querySelector(".powerdown");

      audio.play();

      if (canLoseLife && life > 0) {
        life--;
        document.querySelector(".life").textContent = `x ${life}`;

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);

        canLoseLife = false;
        setTimeout(() => {
          canLoseLife = true;
        }, 2000);
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      } else if (
        mario.classList.contains("mario-invencible") &&
        chuckfootbal2UpRect !== null &&
        marioRect.left < chuckfootbal2UpRect.left + chuckfootbal2UpRect.width &&
        marioRect.left + marioRect.width > chuckfootbal2UpRect.left &&
        marioRect.top < chuckfootbal2UpRect.top + chuckfootbal2UpRect.height &&
        marioRect.top + marioRect.height > chuckfootbal2UpRect.top
      ) {
        let audio = document.querySelector(".powerdown");
        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);
      }
    }
    updateScore();

    if (
      !mario.classList.contains("mario-invencible") &&
      chuckfootbalUpRect !== null &&
      marioRect.left < chuckfootbalUpRect.left + chuckfootbalUpRect.width &&
      marioRect.left + marioRect.width > chuckfootbalUpRect.left &&
      marioRect.top < chuckfootbalUpRect.top + chuckfootbalUpRect.height &&
      marioRect.top + marioRect.height > chuckfootbalUpRect.top
    ) {
      let audio = document.querySelector(".powerdown");

      audio.play();

      if (canLoseLife && life > 0) {
        life--;
        document.querySelector(".life").textContent = `x ${life}`;

        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);

        canLoseLife = false;
        setTimeout(() => {
          canLoseLife = true;
        }, 2000);
      }

      if (life === 0) {
        clearInterval(countdown);
        clearInterval(gameInterval);
        clearInterval(checarColisao);
        removeEventListeners();

        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futbal, .chuck-futebal2, .superkoopa, .piranha, .piranha2, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futbal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".piranha-start, .piranha2-start, .cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
        );

        playaudio.volume = 0;
        playsound.volume = 0;
        audiohurry.volume = 0;

        audiolose.currentTime = 0;
        audiolose.play();
        allEnemies.forEach(function (element) {
          element.style.animationPlayState = "paused";
        });
        allEnemies.forEach(function (element) {
          element.remove();
        });

        let mario = document.querySelector(".mario");

        mario.src = "/images/mario-death.gif";
        mario.style.width = "40px";

        setTimeout(() => {
          audio.volume = 1;
        }, 100);

        mario.classList.add("colision-animation");

        setTimeout(() => {
          let divAnimation = document.querySelector(".animation");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 7000);
        }, 3000);
      } else if (
        mario.classList.contains("mario-invencible") &&
        chuckfootbalUpRect !== null &&
        marioRect.left < chuckfootbalUpRect.left + chuckfootbalUpRect.width &&
        marioRect.left + marioRect.width > chuckfootbalUpRect.left &&
        marioRect.top < chuckfootbalUpRect.top + chuckfootbalUpRect.height &&
        marioRect.top + marioRect.height > chuckfootbalUpRect.top
      ) {
        let audio = document.querySelector(".powerdown");
        let removeVida = document.createElement("div");
        removeVida.classList.add("extra-up");
        document.body.appendChild(removeVida);

        setTimeout(() => {
          removeVida.remove();
        }, 1000);
      }
    }

    updateScore();
  }
  checarColisao = setInterval(() => {
    checkCollision();
  }, 10);
});

// window.addEventListener("beforeunload", function (event) {
//   var audio = new Audio('/soundtracks/pause.wav');
//   audio.play();
//   event.preventDefault();
//   event.returnValue = "";
// });

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());
document.addEventListener("dragstart", (event) => event.preventDefault());
