let mario;
let marioState = "small";
let marioWidthSmall = 40;
let marioHeightSmall = 45;
let marioWidthBig = 66;
let marioHeightBig = 64;
let marioWidthBigCape = 75;
let marioHeightBigCape = 58;
let marioWidthBigFire = 40;
let marioHeightBigFire = 55;
let jumping = false;
let checarColisao;
let gameInterval;
let countdown;
let renderMario;
let keysPressed = {};
let marioPosition = 10;
let isMovingRight = true;
let isMovingLeft = true;
let marioSpeed = 8;
let jumpDirection = null;
let lastKeyPressed = null;
let jumpSound = document.querySelector(".jump-sound");
let marioKeyRightPressed = "/images/mario-small-right.gif";
let marioKeyLeftPressed = "/images/mario-small-left.gif";
let marioStoppedRight = "/images/mario-small-right.gif";
let marioStoppedLeft = "/images/mario-small-left.gif";
let marioKeyRightPressedSmall = "/images/mario-small-right.gif";
let marioKeyLeftPressedSmall = "/images/mario-small-left.gif";
let marioStoppedRightSmall = "/images/mario-small-right.gif";
let marioStoppedLeftSmall = "/images/mario-small-left.gif";
let marioKeyRightPressedBig = "/images/mario-big-right.gif";
let marioKeyLeftPressedBig = "/images/mario-big-left.gif";
let marioStoppedRightBig = "/images/mario-big-right.gif";
let marioStoppedLeftBig = "/images/mario-big-left.gif";
let marioKeyRightPressedBigCape = "/images/mario-cape-right.gif";
let marioKeyLeftPressedBigCape = "/images/mario-cape-left.gif";
let marioStoppedRightBigCape = "/images/mario-cape-right.gif";
let marioStoppedLeftBigCape = "/images/mario-cape-left.gif";
let marioKeyRightPressedBigFire = "/images/mario-fire-right.gif";
let marioKeyLeftPressedBigFire = "/images/mario-fire-left.gif";
let marioStoppedRightBigFire = "/images/mario-fire-right.gif";
let marioStoppedLeftBigFire = "/images/mario-fire-left.gif";

let keysConfiguradas = ["ArrowLeft", "ArrowRight", "Space"];

function jump() {
  if (!keysConfiguradas.includes("Space") || jumping) {
    return;
  }
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
  if (!keysConfiguradas.includes(event.code)) {
    return;
  }
  keysPressed[event.code] = true;
  if (event.code === "Space" && !jumping) {
    jump();
  }
}

function handleKeyUp(event) {
  if (!keysConfiguradas.includes(event.code)) {
    return;
  }
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

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function transformMarioSmall() {
  marioState = "small";
  marioKeyRightPressed = marioKeyRightPressedSmall;
  marioKeyLeftPressed = marioKeyLeftPressedSmall;
  marioStoppedRight = marioStoppedRightSmall;
  marioStoppedLeft = marioStoppedLeftSmall;
  mario.style.width = marioWidthSmall + "px";
  mario.style.height = marioHeightSmall + "px";
}

function transformMario() {
  marioState = "big";
  marioKeyRightPressed = marioKeyRightPressedBig;
  marioKeyLeftPressed = marioKeyLeftPressedBig;
  marioStoppedRight = marioStoppedRightBig;
  marioStoppedLeft = marioStoppedLeftBig;
  mario.style.width = marioWidthBig + "px";
  mario.style.height = marioHeightBig + "px";
}

function transformMarioCape() {
  marioState = "cape";
  marioKeyRightPressed = marioKeyRightPressedBigCape;
  marioKeyLeftPressed = marioKeyLeftPressedBigCape;
  marioStoppedRight = marioStoppedRightBigCape;
  marioStoppedLeft = marioStoppedLeftBigCape;
  mario.style.width = marioWidthBigCape + "px";
  mario.style.height = marioHeightBigCape + "px";
}

function transformMarioFire() {
  marioState = "fire";
  marioKeyRightPressed = marioKeyRightPressedBigFire;
  marioKeyLeftPressed = marioKeyLeftPressedBigFire;
  marioStoppedRight = marioStoppedRightBigFire;
  marioStoppedLeft = marioStoppedLeftBigFire;
  mario.style.width = marioWidthBigFire + "px";
  mario.style.height = marioHeightBigFire + "px";
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

    keys.forEach((code) => {
      if (code === "ArrowLeft") {
        marioPosition -= marioSpeed;
        marioPosition = Math.max(marioPosition, cenarioContainerWidth * 0);
        if (isMovingRight) {
          isMovingRight = false;
          mario.src = marioKeyLeftPressed;
        }
        lastKeyPressed = "ArrowLeft";
      } else if (code === "ArrowRight") {
        let maxMarioPosition = cenarioContainerWidth * 0.7 - marioWidth;
        marioPosition += marioSpeed;
        marioPosition = Math.min(marioPosition, maxMarioPosition);
        if (
          isMovingLeft &&
          (!lastKeyPressed || lastKeyPressed !== "ArrowLeft")
        ) {
          isMovingRight = true;
          mario.src = marioKeyRightPressed;
        }
        lastKeyPressed = "ArrowRight";
      } else {
        return;
      }
    });

    if (jumping && jumpDirection === "right") {
      marioPosition += marioSpeed;
    } else if (jumping && jumpDirection === "left") {
      marioPosition -= marioSpeed;
    }

    let distanceFromLeft = marioPosition / cenarioContainerWidth;
    let distanceFromRight =
      (cenarioContainerWidth * 1 - (marioPosition + marioWidth)) /
      cenarioContainerWidth;
    let threshold = 1;

    let cenario = document.querySelector(".cenario");
    let senario = document.querySelector(".senario");
    let senarioWidth = senario.offsetWidth;
    let cenarioWidth = cenario.offsetWidth;
    let maxCenarioPosition = cenarioWidth - cenarioContainerWidth;
    let maxSenarioPosition = senarioWidth - cenarioContainerWidth;
    let cenarioSpeed = 8;

    let senarioPosition = parseFloat(getComputedStyle(senario).left) || 0;
    let cenarioPosition = parseFloat(getComputedStyle(cenario).left) || 0;

    if (
      shouldMoveCenario ||
      (isMovingRight && distanceFromLeft <= threshold) ||
      (isMovingLeft && distanceFromRight <= threshold)
    ) {
      senarioPosition -= cenarioSpeed * (isMovingRight ? 1 : -1);
      cenarioPosition -= cenarioSpeed * (isMovingRight ? 1 : -1);
    }

    let finishPointerImage = document.querySelector(
      "#container-game .finishpointer"
    );
    let cenarioFinishPosition = -7850;

    if (
      cenarioPosition <= cenarioFinishPosition &&
      cenarioFinishPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (finishPointerImage !== null) {
        finishPointerImage.style.display = "block";
        let finishPointerImageLeft = cenarioFinishPosition - cenarioPosition;
        finishPointerImage.style.right = `${finishPointerImageLeft}px`;
        finishPointerImage.classList.add("animate-clearmission");
      }
    } else {
      if (finishPointerImage !== null) {
        finishPointerImage.style.display = "none";
        finishPointerImage.classList.remove("animate-clearmission");
      }
    }

    let stake1Image = document.querySelector("#container-game .stake1");
    let cenarioStake1Position = -7800;

    if (
      cenarioPosition <= cenarioStake1Position &&
      cenarioStake1Position <= cenarioPosition + cenarioContainerWidth
    ) {
      stake1Image.style.display = "block";
      let stake1ImageLeft = cenarioStake1Position - cenarioPosition;
      stake1Image.style.right = `${stake1ImageLeft}px`;
    } else {
      stake1Image.style.display = "none";
    }

    let stake2Image = document.querySelector("#container-game .stake2");
    let cenarioStake2Position = -7880;

    if (
      cenarioPosition <= cenarioStake2Position &&
      cenarioStake2Position <= cenarioPosition + cenarioContainerWidth
    ) {
      stake2Image.style.display = "block";
      let stake2ImageLeft = cenarioStake2Position - cenarioPosition;
      stake2Image.style.right = `${stake2ImageLeft}px`;
    } else {
      stake2Image.style.display = "none";
    }

    let pipeImage = document.querySelector("#container-game .pipe");
    let cenariopipePosition = -6900;

    if (
      cenarioPosition <= cenariopipePosition &&
      cenariopipePosition <= cenarioPosition + cenarioContainerWidth
    ) {
      pipeImage.style.display = "block";
      let pipeImageLeft = cenariopipePosition - cenarioPosition;
      pipeImage.style.right = `${pipeImageLeft}px`;
    } else {
      pipeImage.style.display = "none";
    }

    let pipe2Image = document.querySelector("#container-game .pipe2");
    let cenariopipe2Position = -5000;

    if (
      cenarioPosition <= cenariopipe2Position &&
      cenariopipe2Position <= cenarioPosition + cenarioContainerWidth
    ) {
      pipe2Image.style.display = "block";
      let pipe2ImageLeft = cenariopipe2Position - cenarioPosition;
      pipe2Image.style.right = `${pipe2ImageLeft}px`;
    } else {
      pipe2Image.style.display = "none";
    }

    let chuckfootbalupImage = document.querySelector(
      "#container-game .chuckfootbalup"
    );
    let cenariochuckfootbalupPosition = -8200;

    if (
      cenarioPosition <= cenariochuckfootbalupPosition &&
      cenariochuckfootbalupPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      chuckfootbalupImage.style.display = "block";
      let chuckfootbalupImageLeft =
        cenariochuckfootbalupPosition - cenarioPosition;
      chuckfootbalupImage.style.right = `${chuckfootbalupImageLeft}px`;
    } else {
      chuckfootbalupImage.style.display = "none";
    }

    let cascoredImage = document.querySelector("#container-game .cascored");
    let cenariocascoredPosition = 770;

    if (
      cenarioPosition <= cenariocascoredPosition &&
      cenariocascoredPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (cascoredImage !== null) {
        cascoredImage.style.display = "block";
        let cascoredImageLeft = cenariocascoredPosition - cenarioPosition;
        cascoredImage.style.right = `${cascoredImageLeft}px`;
      }
    } else {
      if (cascoredImage !== null) {
        cascoredImage.style.display = "none";
      }
    }

    let Coin1Image = document.querySelector("#container-game .coin1");
    let cenarioCoin1Position = 100;

    if (
      cenarioPosition <= cenarioCoin1Position &&
      cenarioCoin1Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin1Image !== null) {
        Coin1Image.style.display = "block";
        let Coin1ImageLeft = cenarioCoin1Position - cenarioPosition;
        Coin1Image.style.right = `${Coin1ImageLeft}px`;
      }
    } else {
      if (Coin1Image !== null) {
        Coin1Image.style.display = "none";
      }
    }

    let Coin2Image = document.querySelector("#container-game .coin2");
    let cenarioCoin2Position = 50;

    if (
      cenarioPosition <= cenarioCoin2Position &&
      cenarioCoin2Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin2Image !== null) {
        Coin2Image.style.display = "block";
        let Coin2ImageLeft = cenarioCoin2Position - cenarioPosition;
        Coin2Image.style.right = `${Coin2ImageLeft}px`;
      }
    } else {
      if (Coin2Image !== null) {
        Coin2Image.style.display = "none";
      }
    }

    let Coin3Image = document.querySelector("#container-game .coin3");
    let cenarioCoin3Position = -0;

    if (
      cenarioPosition <= cenarioCoin3Position &&
      cenarioCoin3Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin3Image !== null) {
        Coin3Image.style.display = "block";
        let Coin3ImageLeft = cenarioCoin3Position - cenarioPosition;
        Coin3Image.style.right = `${Coin3ImageLeft}px`;
      }
    } else {
      if (Coin3Image !== null) {
        Coin3Image.style.display = "none";
      }
    }

    let Coin4Image = document.querySelector("#container-game .coin4");
    let cenarioCoin4Position = -50;

    if (
      cenarioPosition <= cenarioCoin4Position &&
      cenarioCoin4Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin4Image !== null) {
        Coin4Image.style.display = "block";
        let Coin4ImageLeft = cenarioCoin4Position - cenarioPosition;
        Coin4Image.style.right = `${Coin4ImageLeft}px`;
      }
    } else {
      if (Coin4Image !== null) {
        Coin4Image.style.display = "none";
      }
    }

    let Coin5Image = document.querySelector("#container-game .coin5");
    let cenarioCoin5Position = -500;

    if (
      cenarioPosition <= cenarioCoin5Position &&
      cenarioCoin5Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin5Image !== null) {
        Coin5Image.style.display = "block";
        let Coin5ImageLeft = cenarioCoin5Position - cenarioPosition;
        Coin5Image.style.right = `${Coin5ImageLeft}px`;
      }
    } else {
      if (Coin5Image !== null) {
        Coin5Image.style.display = "none";
      }
    }

    let Coin6Image = document.querySelector("#container-game .coin6");
    let cenarioCoin6Position = -550;

    if (
      cenarioPosition <= cenarioCoin6Position &&
      cenarioCoin6Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin6Image !== null) {
        Coin6Image.style.display = "block";
        let Coin6ImageLeft = cenarioCoin6Position - cenarioPosition;
        Coin6Image.style.right = `${Coin6ImageLeft}px`;
      }
    } else {
      if (Coin6Image !== null) {
        Coin6Image.style.display = "none";
      }
    }

    let Coin7Image = document.querySelector("#container-game .coin7");
    let cenarioCoin7Position = -600;

    if (
      cenarioPosition <= cenarioCoin7Position &&
      cenarioCoin7Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin7Image !== null) {
        Coin7Image.style.display = "block";
        let Coin7ImageLeft = cenarioCoin7Position - cenarioPosition;
        Coin7Image.style.right = `${Coin7ImageLeft}px`;
      }
    } else {
      if (Coin7Image !== null) {
        Coin7Image.style.display = "none";
      }
    }

    let Coin8Image = document.querySelector("#container-game .coin8");
    let cenarioCoin8Position = -650;

    if (
      cenarioPosition <= cenarioCoin8Position &&
      cenarioCoin8Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin8Image !== null) {
        Coin8Image.style.display = "block";
        let Coin8ImageLeft = cenarioCoin8Position - cenarioPosition;
        Coin8Image.style.right = `${Coin8ImageLeft}px`;
      }
    } else {
      if (Coin8Image !== null) {
        Coin8Image.style.display = "none";
      }
    }

    let Coin9Image = document.querySelector("#container-game .coin9");
    let cenarioCoin9Position = -700;

    if (
      cenarioPosition <= cenarioCoin9Position &&
      cenarioCoin9Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin9Image !== null) {
        Coin9Image.style.display = "block";
        let Coin9ImageLeft = cenarioCoin9Position - cenarioPosition;
        Coin9Image.style.right = `${Coin9ImageLeft}px`;
      }
    } else {
      if (Coin9Image !== null) {
        Coin9Image.style.display = "none";
      }
    }

    let Coin10Image = document.querySelector("#container-game .coin10");
    let cenarioCoin10Position = -750;

    if (
      cenarioPosition <= cenarioCoin10Position &&
      cenarioCoin10Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin10Image !== null) {
        Coin10Image.style.display = "block";
        let Coin10ImageLeft = cenarioCoin10Position - cenarioPosition;
        Coin10Image.style.right = `${Coin10ImageLeft}px`;
      }
    } else {
      if (Coin10Image !== null) {
        Coin10Image.style.display = "none";
      }
    }

    let Coin11Image = document.querySelector("#container-game .coin11");
    let cenarioCoin11Position = -1200;

    if (
      cenarioPosition <= cenarioCoin11Position &&
      cenarioCoin11Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin11Image !== null) {
        Coin11Image.style.display = "block";
        let Coin11ImageLeft = cenarioCoin11Position - cenarioPosition;
        Coin11Image.style.right = `${Coin11ImageLeft}px`;
      }
    } else {
      if (Coin11Image !== null) {
        Coin11Image.style.display = "none";
      }
    }

    let Coin12Image = document.querySelector("#container-game .coin12");
    let cenarioCoin12Position = -1250;

    if (
      cenarioPosition <= cenarioCoin12Position &&
      cenarioCoin12Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin12Image !== null) {
        Coin12Image.style.display = "block";
        let Coin12ImageLeft = cenarioCoin12Position - cenarioPosition;
        Coin12Image.style.right = `${Coin12ImageLeft}px`;
      }
    } else {
      if (Coin12Image !== null) {
        Coin12Image.style.display = "none";
      }
    }

    let Coin13Image = document.querySelector("#container-game .coin13");
    let cenarioCoin13Position = -1300;

    if (
      cenarioPosition <= cenarioCoin13Position &&
      cenarioCoin13Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin13Image !== null) {
        Coin13Image.style.display = "block";
        let Coin13ImageLeft = cenarioCoin13Position - cenarioPosition;
        Coin13Image.style.right = `${Coin13ImageLeft}px`;
      }
    } else {
      if (Coin13Image !== null) {
        Coin13Image.style.display = "none";
      }
    }

    let Coin14Image = document.querySelector("#container-game .coin14");
    let cenarioCoin14Position = -1400;

    if (
      cenarioPosition <= cenarioCoin14Position &&
      cenarioCoin14Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin14Image !== null) {
        Coin14Image.style.display = "block";
        let Coin14ImageLeft = cenarioCoin14Position - cenarioPosition;
        Coin14Image.style.right = `${Coin14ImageLeft}px`;
      }
    } else {
      if (Coin14Image !== null) {
        Coin14Image.style.display = "none";
      }
    }

    let Coin15Image = document.querySelector("#container-game .coin15");
    let cenarioCoin15Position = -1450;

    if (
      cenarioPosition <= cenarioCoin15Position &&
      cenarioCoin15Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin15Image !== null) {
        Coin15Image.style.display = "block";
        let Coin15ImageLeft = cenarioCoin15Position - cenarioPosition;
        Coin15Image.style.right = `${Coin15ImageLeft}px`;
      }
    } else {
      if (Coin15Image !== null) {
        Coin15Image.style.display = "none";
      }
    }

    let Coin16Image = document.querySelector("#container-game .coin16");
    let cenarioCoin16Position = -1500;

    if (
      cenarioPosition <= cenarioCoin16Position &&
      cenarioCoin16Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin16Image !== null) {
        Coin16Image.style.display = "block";
        let Coin16ImageLeft = cenarioCoin16Position - cenarioPosition;
        Coin16Image.style.right = `${Coin16ImageLeft}px`;
      }
    } else {
      if (Coin16Image !== null) {
        Coin16Image.style.display = "none";
      }
    }

    let Coin17Image = document.querySelector("#container-game .coin17");
    let cenarioCoin17Position = -2150;

    if (
      cenarioPosition <= cenarioCoin17Position &&
      cenarioCoin17Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin17Image !== null) {
        Coin17Image.style.display = "block";
        let Coin17ImageLeft = cenarioCoin17Position - cenarioPosition;
        Coin17Image.style.right = `${Coin17ImageLeft}px`;
      }
    } else {
      if (Coin17Image !== null) {
        Coin17Image.style.display = "none";
      }
    }

    let Coin18Image = document.querySelector("#container-game .coin18");
    let cenarioCoin18Position = -2200;

    if (
      cenarioPosition <= cenarioCoin18Position &&
      cenarioCoin18Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin18Image !== null) {
        Coin18Image.style.display = "block";
        let Coin18ImageLeft = cenarioCoin18Position - cenarioPosition;
        Coin18Image.style.right = `${Coin18ImageLeft}px`;
      }
    } else {
      if (Coin18Image !== null) {
        Coin18Image.style.display = "none";
      }
    }

    let Coin19Image = document.querySelector("#container-game .coin19");
    let cenarioCoin19Position = -2250;

    if (
      cenarioPosition <= cenarioCoin19Position &&
      cenarioCoin19Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin19Image !== null) {
        Coin19Image.style.display = "block";
        let Coin19ImageLeft = cenarioCoin19Position - cenarioPosition;
        Coin19Image.style.right = `${Coin19ImageLeft}px`;
      }
    } else {
      if (Coin19Image !== null) {
        Coin19Image.style.display = "none";
      }
    }

    let Coin20Image = document.querySelector("#container-game .coin20");
    let cenarioCoin20Position = -2300;

    if (
      cenarioPosition <= cenarioCoin20Position &&
      cenarioCoin20Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin20Image !== null) {
        Coin20Image.style.display = "block";
        let Coin20ImageLeft = cenarioCoin20Position - cenarioPosition;
        Coin20Image.style.right = `${Coin20ImageLeft}px`;
      }
    } else {
      if (Coin20Image !== null) {
        Coin20Image.style.display = "none";
      }
    }

    let Coin21Image = document.querySelector("#container-game .coin21");
    let cenarioCoin21Position = -2350;

    if (
      cenarioPosition <= cenarioCoin21Position &&
      cenarioCoin21Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin21Image !== null) {
        Coin21Image.style.display = "block";
        let Coin21ImageLeft = cenarioCoin21Position - cenarioPosition;
        Coin21Image.style.right = `${Coin21ImageLeft}px`;
      }
    } else {
      if (Coin21Image !== null) {
        Coin21Image.style.display = "none";
      }
    }

    let Coin22Image = document.querySelector("#container-game .coin22");
    let cenarioCoin22Position = -3000;

    if (
      cenarioPosition <= cenarioCoin22Position &&
      cenarioCoin22Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin22Image !== null) {
        Coin22Image.style.display = "block";
        let Coin22ImageLeft = cenarioCoin22Position - cenarioPosition;
        Coin22Image.style.right = `${Coin22ImageLeft}px`;
      }
    } else {
      if (Coin22Image !== null) {
        Coin22Image.style.display = "none";
      }
    }

    let Coin23Image = document.querySelector("#container-game .coin23");
    let cenarioCoin23Position = -3050;

    if (
      cenarioPosition <= cenarioCoin23Position &&
      cenarioCoin23Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin23Image !== null) {
        Coin23Image.style.display = "block";
        let Coin23ImageLeft = cenarioCoin23Position - cenarioPosition;
        Coin23Image.style.right = `${Coin23ImageLeft}px`;
      }
    } else {
      if (Coin23Image !== null) {
        Coin23Image.style.display = "none";
      }
    }

    let Coin24Image = document.querySelector("#container-game .coin24");
    let cenarioCoin24Position = -3100;

    if (
      cenarioPosition <= cenarioCoin24Position &&
      cenarioCoin24Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin24Image !== null) {
        Coin24Image.style.display = "block";
        let Coin24ImageLeft = cenarioCoin24Position - cenarioPosition;
        Coin24Image.style.right = `${Coin24ImageLeft}px`;
      }
    } else {
      if (Coin24Image !== null) {
        Coin24Image.style.display = "none";
      }
    }

    let Coin25Image = document.querySelector("#container-game .coin25");
    let cenarioCoin25Position = -3150;

    if (
      cenarioPosition <= cenarioCoin25Position &&
      cenarioCoin25Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin25Image !== null) {
        Coin25Image.style.display = "block";
        let Coin25ImageLeft = cenarioCoin25Position - cenarioPosition;
        Coin25Image.style.right = `${Coin25ImageLeft}px`;
      }
    } else {
      if (Coin25Image !== null) {
        Coin25Image.style.display = "none";
      }
    }

    let Coin26Image = document.querySelector("#container-game .coin26");
    let cenarioCoin26Position = -3200;

    if (
      cenarioPosition <= cenarioCoin26Position &&
      cenarioCoin26Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin26Image !== null) {
        Coin26Image.style.display = "block";
        let Coin26ImageLeft = cenarioCoin26Position - cenarioPosition;
        Coin26Image.style.right = `${Coin26ImageLeft}px`;
      }
    } else {
      if (Coin26Image !== null) {
        Coin26Image.style.display = "none";
      }
    }

    let Coin27Image = document.querySelector("#container-game .coin27");
    let cenarioCoin27Position = -3250;

    if (
      cenarioPosition <= cenarioCoin27Position &&
      cenarioCoin27Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin27Image !== null) {
        Coin27Image.style.display = "block";
        let Coin27ImageLeft = cenarioCoin27Position - cenarioPosition;
        Coin27Image.style.right = `${Coin27ImageLeft}px`;
      }
    } else {
      if (Coin27Image !== null) {
        Coin27Image.style.display = "none";
      }
    }

    let Coin28Image = document.querySelector("#container-game .coin28");
    let cenarioCoin28Position = -3300;

    if (
      cenarioPosition <= cenarioCoin28Position &&
      cenarioCoin28Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin28Image !== null) {
        Coin28Image.style.display = "block";
        let Coin28ImageLeft = cenarioCoin28Position - cenarioPosition;
        Coin28Image.style.right = `${Coin28ImageLeft}px`;
      }
    } else {
      if (Coin28Image !== null) {
        Coin28Image.style.display = "none";
      }
    }

    let Coin29Image = document.querySelector("#container-game .coin29");
    let cenarioCoin29Position = -3450;

    if (
      cenarioPosition <= cenarioCoin29Position &&
      cenarioCoin29Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin29Image !== null) {
        Coin29Image.style.display = "block";
        let Coin29ImageLeft = cenarioCoin29Position - cenarioPosition;
        Coin29Image.style.right = `${Coin29ImageLeft}px`;
      }
    } else {
      if (Coin29Image !== null) {
        Coin29Image.style.display = "none";
      }
    }

    let Coin30Image = document.querySelector("#container-game .coin30");
    let cenarioCoin30Position = -3500;

    if (
      cenarioPosition <= cenarioCoin30Position &&
      cenarioCoin30Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin30Image !== null) {
        Coin30Image.style.display = "block";
        let Coin30ImageLeft = cenarioCoin30Position - cenarioPosition;
        Coin30Image.style.right = `${Coin30ImageLeft}px`;
      }
    } else {
      if (Coin30Image !== null) {
        Coin30Image.style.display = "none";
      }
    }

    let Coin31Image = document.querySelector("#container-game .coin31");
    let cenarioCoin31Position = -3550;

    if (
      cenarioPosition <= cenarioCoin31Position &&
      cenarioCoin31Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin31Image !== null) {
        Coin31Image.style.display = "block";
        let Coin31ImageLeft = cenarioCoin31Position - cenarioPosition;
        Coin31Image.style.right = `${Coin31ImageLeft}px`;
      }
    } else {
      if (Coin31Image !== null) {
        Coin31Image.style.display = "none";
      }
    }

    let Coin32Image = document.querySelector("#container-game .coin32");
    let cenarioCoin32Position = -3600;

    if (
      cenarioPosition <= cenarioCoin32Position &&
      cenarioCoin32Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin32Image !== null) {
        Coin32Image.style.display = "block";
        let Coin32ImageLeft = cenarioCoin32Position - cenarioPosition;
        Coin32Image.style.right = `${Coin32ImageLeft}px`;
      }
    } else {
      if (Coin32Image !== null) {
        Coin32Image.style.display = "none";
      }
    }

    let Coin33Image = document.querySelector("#container-game .coin33");
    let cenarioCoin33Position = -3650;

    if (
      cenarioPosition <= cenarioCoin33Position &&
      cenarioCoin33Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin33Image !== null) {
        Coin33Image.style.display = "block";
        let Coin33ImageLeft = cenarioCoin33Position - cenarioPosition;
        Coin33Image.style.right = `${Coin33ImageLeft}px`;
      }
    } else {
      if (Coin33Image !== null) {
        Coin33Image.style.display = "none";
      }
    }

    let Coin34Image = document.querySelector("#container-game .coin34");
    let cenarioCoin34Position = -3700;

    if (
      cenarioPosition <= cenarioCoin34Position &&
      cenarioCoin34Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin34Image !== null) {
        Coin34Image.style.display = "block";
        let Coin34ImageLeft = cenarioCoin34Position - cenarioPosition;
        Coin34Image.style.right = `${Coin34ImageLeft}px`;
      }
    } else {
      if (Coin34Image !== null) {
        Coin34Image.style.display = "none";
      }
    }

    let Coin35Image = document.querySelector("#container-game .coin35");
    let cenarioCoin35Position = -3750;

    if (
      cenarioPosition <= cenarioCoin35Position &&
      cenarioCoin35Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin35Image !== null) {
        Coin35Image.style.display = "block";
        let Coin35ImageLeft = cenarioCoin35Position - cenarioPosition;
        Coin35Image.style.right = `${Coin35ImageLeft}px`;
      }
    } else {
      if (Coin35Image !== null) {
        Coin35Image.style.display = "none";
      }
    }

    let Coin36Image = document.querySelector("#container-game .coin36");
    let cenarioCoin36Position = -4750;

    if (
      cenarioPosition <= cenarioCoin36Position &&
      cenarioCoin36Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin36Image !== null) {
        Coin36Image.style.display = "block";
        let Coin36ImageLeft = cenarioCoin36Position - cenarioPosition;
        Coin36Image.style.right = `${Coin36ImageLeft}px`;
      }
    } else {
      if (Coin36Image !== null) {
        Coin36Image.style.display = "none";
      }
    }

    let Coin37Image = document.querySelector("#container-game .coin37");
    let cenarioCoin37Position = -4800;

    if (
      cenarioPosition <= cenarioCoin37Position &&
      cenarioCoin37Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin37Image !== null) {
        Coin37Image.style.display = "block";
        let Coin37ImageLeft = cenarioCoin37Position - cenarioPosition;
        Coin37Image.style.right = `${Coin37ImageLeft}px`;
      }
    } else {
      if (Coin37Image !== null) {
        Coin37Image.style.display = "none";
      }
    }

    let Coin38Image = document.querySelector("#container-game .coin38");
    let cenarioCoin38Position = -4850;

    if (
      cenarioPosition <= cenarioCoin38Position &&
      cenarioCoin38Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin38Image !== null) {
        Coin38Image.style.display = "block";
        let Coin38ImageLeft = cenarioCoin38Position - cenarioPosition;
        Coin38Image.style.right = `${Coin38ImageLeft}px`;
      }
    } else {
      if (Coin38Image !== null) {
        Coin38Image.style.display = "none";
      }
    }

    let Coin39Image = document.querySelector("#container-game .coin39");
    let cenarioCoin39Position = -5050;

    if (
      cenarioPosition <= cenarioCoin39Position &&
      cenarioCoin39Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin39Image !== null) {
        Coin39Image.style.display = "block";
        let Coin39ImageLeft = cenarioCoin39Position - cenarioPosition;
        Coin39Image.style.right = `${Coin39ImageLeft}px`;
      }
    } else {
      if (Coin39Image !== null) {
        Coin39Image.style.display = "none";
      }
    }

    let Coin40Image = document.querySelector("#container-game .coin40");
    let cenarioCoin40Position = -5100;

    if (
      cenarioPosition <= cenarioCoin40Position &&
      cenarioCoin40Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin40Image !== null) {
        Coin40Image.style.display = "block";
        let Coin40ImageLeft = cenarioCoin40Position - cenarioPosition;
        Coin40Image.style.right = `${Coin40ImageLeft}px`;
      }
    } else {
      if (Coin40Image !== null) {
        Coin40Image.style.display = "none";
      }
    }

    let Coin41Image = document.querySelector("#container-game .coin41");
    let cenarioCoin41Position = -5150;

    if (
      cenarioPosition <= cenarioCoin41Position &&
      cenarioCoin41Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin41Image !== null) {
        Coin41Image.style.display = "block";
        let Coin41ImageLeft = cenarioCoin41Position - cenarioPosition;
        Coin41Image.style.right = `${Coin41ImageLeft}px`;
      }
    } else {
      if (Coin41Image !== null) {
        Coin41Image.style.display = "none";
      }
    }

    let Coin42Image = document.querySelector("#container-game .coin42");
    let cenarioCoin42Position = -5800;

    if (
      cenarioPosition <= cenarioCoin42Position &&
      cenarioCoin42Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin42Image !== null) {
        Coin42Image.style.display = "block";
        let Coin42ImageLeft = cenarioCoin42Position - cenarioPosition;
        Coin42Image.style.right = `${Coin42ImageLeft}px`;
      }
    } else {
      if (Coin42Image !== null) {
        Coin42Image.style.display = "none";
      }
    }

    let Coin43Image = document.querySelector("#container-game .coin43");
    let cenarioCoin43Position = -5850;

    if (
      cenarioPosition <= cenarioCoin43Position &&
      cenarioCoin43Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin43Image !== null) {
        Coin43Image.style.display = "block";
        let Coin43ImageLeft = cenarioCoin43Position - cenarioPosition;
        Coin43Image.style.right = `${Coin43ImageLeft}px`;
      }
    } else {
      if (Coin43Image !== null) {
        Coin43Image.style.display = "none";
      }
    }

    let Coin44Image = document.querySelector("#container-game .coin44");
    let cenarioCoin44Position = -5900;

    if (
      cenarioPosition <= cenarioCoin44Position &&
      cenarioCoin44Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin44Image !== null) {
        Coin44Image.style.display = "block";
        let Coin44ImageLeft = cenarioCoin44Position - cenarioPosition;
        Coin44Image.style.right = `${Coin44ImageLeft}px`;
      }
    } else {
      if (Coin44Image !== null) {
        Coin44Image.style.display = "none";
      }
    }

    let Coin45Image = document.querySelector("#container-game .coin45");
    let cenarioCoin45Position = -6200;

    if (
      cenarioPosition <= cenarioCoin45Position &&
      cenarioCoin45Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin45Image !== null) {
        Coin45Image.style.display = "block";
        let Coin45ImageLeft = cenarioCoin45Position - cenarioPosition;
        Coin45Image.style.right = `${Coin45ImageLeft}px`;
      }
    } else {
      if (Coin45Image !== null) {
        Coin45Image.style.display = "none";
      }
    }

    let Coin46Image = document.querySelector("#container-game .coin46");
    let cenarioCoin46Position = -6250;

    if (
      cenarioPosition <= cenarioCoin46Position &&
      cenarioCoin46Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin46Image !== null) {
        Coin46Image.style.display = "block";
        let Coin46ImageLeft = cenarioCoin46Position - cenarioPosition;
        Coin46Image.style.right = `${Coin46ImageLeft}px`;
      }
    } else {
      if (Coin46Image !== null) {
        Coin46Image.style.display = "none";
      }
    }

    let Coin47Image = document.querySelector("#container-game .coin47");
    let cenarioCoin47Position = -6300;

    if (
      cenarioPosition <= cenarioCoin47Position &&
      cenarioCoin47Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin47Image !== null) {
        Coin47Image.style.display = "block";
        let Coin47ImageLeft = cenarioCoin47Position - cenarioPosition;
        Coin47Image.style.right = `${Coin47ImageLeft}px`;
      }
    } else {
      if (Coin47Image !== null) {
        Coin47Image.style.display = "none";
      }
    }

    let Coin48Image = document.querySelector("#container-game .coin48");
    let cenarioCoin48Position = -6350;

    if (
      cenarioPosition <= cenarioCoin48Position &&
      cenarioCoin48Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin48Image !== null) {
        Coin48Image.style.display = "block";
        let Coin48ImageLeft = cenarioCoin48Position - cenarioPosition;
        Coin48Image.style.right = `${Coin48ImageLeft}px`;
      }
    } else {
      if (Coin48Image !== null) {
        Coin48Image.style.display = "none";
      }
    }

    let Coin49Image = document.querySelector("#container-game .coin49");
    let cenarioCoin49Position = -6700;

    if (
      cenarioPosition <= cenarioCoin49Position &&
      cenarioCoin49Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin49Image !== null) {
        Coin49Image.style.display = "block";
        let Coin49ImageLeft = cenarioCoin49Position - cenarioPosition;
        Coin49Image.style.right = `${Coin49ImageLeft}px`;
      }
    } else {
      if (Coin49Image !== null) {
        Coin49Image.style.display = "none";
      }
    }

    let Coin50Image = document.querySelector("#container-game .coin50");
    let cenarioCoin50Position = -6750;

    if (
      cenarioPosition <= cenarioCoin50Position &&
      cenarioCoin50Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin50Image !== null) {
        Coin50Image.style.display = "block";
        let Coin50ImageLeft = cenarioCoin50Position - cenarioPosition;
        Coin50Image.style.right = `${Coin50ImageLeft}px`;
      }
    } else {
      if (Coin50Image !== null) {
        Coin50Image.style.display = "none";
      }
    }

    let Coin51Image = document.querySelector("#container-game .coin51");
    let cenarioCoin51Position = -6950;

    if (
      cenarioPosition <= cenarioCoin51Position &&
      cenarioCoin51Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin51Image !== null) {
        Coin51Image.style.display = "block";
        let Coin51ImageLeft = cenarioCoin51Position - cenarioPosition;
        Coin51Image.style.right = `${Coin51ImageLeft}px`;
      }
    } else {
      if (Coin51Image !== null) {
        Coin51Image.style.display = "none";
      }
    }

    let Coin52Image = document.querySelector("#container-game .coin52");
    let cenarioCoin52Position = -7000;

    if (
      cenarioPosition <= cenarioCoin52Position &&
      cenarioCoin52Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin52Image !== null) {
        Coin52Image.style.display = "block";
        let Coin52ImageLeft = cenarioCoin52Position - cenarioPosition;
        Coin52Image.style.right = `${Coin52ImageLeft}px`;
      }
    } else {
      if (Coin52Image !== null) {
        Coin52Image.style.display = "none";
      }
    }

    let Coin53Image = document.querySelector("#container-game .coin53");
    let cenarioCoin53Position = 700;

    if (
      cenarioPosition <= cenarioCoin53Position &&
      cenarioCoin53Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin53Image !== null) {
        Coin53Image.style.display = "block";
        let Coin53ImageLeft = cenarioCoin53Position - cenarioPosition;
        Coin53Image.style.right = `${Coin53ImageLeft}px`;
      }
    } else {
      if (Coin53Image !== null) {
        Coin53Image.style.display = "none";
      }
    }

    let Coin54Image = document.querySelector("#container-game .coin54");
    let cenarioCoin54Position = 650;

    if (
      cenarioPosition <= cenarioCoin54Position &&
      cenarioCoin54Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin54Image !== null) {
        Coin54Image.style.display = "block";
        let Coin54ImageLeft = cenarioCoin54Position - cenarioPosition;
        Coin54Image.style.right = `${Coin54ImageLeft}px`;
      }
    } else {
      if (Coin54Image !== null) {
        Coin54Image.style.display = "none";
      }
    }

    let Coin55Image = document.querySelector("#container-game .coin55");
    let cenarioCoin55Position = 600;

    if (
      cenarioPosition <= cenarioCoin55Position &&
      cenarioCoin55Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin55Image !== null) {
        Coin55Image.style.display = "block";
        let Coin55ImageLeft = cenarioCoin55Position - cenarioPosition;
        Coin55Image.style.right = `${Coin55ImageLeft}px`;
      }
    } else {
      if (Coin55Image !== null) {
        Coin55Image.style.display = "none";
      }
    }

    let Coin56Image = document.querySelector("#container-game .coin56");
    let cenarioCoin56Position = 550;

    if (
      cenarioPosition <= cenarioCoin56Position &&
      cenarioCoin56Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin56Image !== null) {
        Coin56Image.style.display = "block";
        let Coin56ImageLeft = cenarioCoin56Position - cenarioPosition;
        Coin56Image.style.right = `${Coin56ImageLeft}px`;
      }
    } else {
      if (Coin56Image !== null) {
        Coin56Image.style.display = "none";
      }
    }

    let Coin57Image = document.querySelector("#container-game .coin57");
    let cenarioCoin57Position = 500;

    if (
      cenarioPosition <= cenarioCoin57Position &&
      cenarioCoin57Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin57Image !== null) {
        Coin57Image.style.display = "block";
        let Coin57ImageLeft = cenarioCoin57Position - cenarioPosition;
        Coin57Image.style.right = `${Coin57ImageLeft}px`;
      }
    } else {
      if (Coin57Image !== null) {
        Coin57Image.style.display = "none";
      }
    }

    let Coin58Image = document.querySelector("#container-game .coin58");
    let cenarioCoin58Position = 400;

    if (
      cenarioPosition <= cenarioCoin58Position &&
      cenarioCoin58Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin58Image !== null) {
        Coin58Image.style.display = "block";
        let Coin58ImageLeft = cenarioCoin58Position - cenarioPosition;
        Coin58Image.style.right = `${Coin58ImageLeft}px`;
      }
    } else {
      if (Coin58Image !== null) {
        Coin58Image.style.display = "none";
      }
    }

    let Coin59Image = document.querySelector("#container-game .coin59");
    let cenarioCoin59Position = 350;

    if (
      cenarioPosition <= cenarioCoin59Position &&
      cenarioCoin59Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin59Image !== null) {
        Coin59Image.style.display = "block";
        let Coin59ImageLeft = cenarioCoin59Position - cenarioPosition;
        Coin59Image.style.right = `${Coin59ImageLeft}px`;
      }
    } else {
      if (Coin59Image !== null) {
        Coin59Image.style.display = "none";
      }
    }

    let Coin60Image = document.querySelector("#container-game .coin60");
    let cenarioCoin60Position = 300;

    if (
      cenarioPosition <= cenarioCoin60Position &&
      cenarioCoin60Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin60Image !== null) {
        Coin60Image.style.display = "block";
        let Coin60ImageLeft = cenarioCoin60Position - cenarioPosition;
        Coin60Image.style.right = `${Coin60ImageLeft}px`;
      }
    } else {
      if (Coin60Image !== null) {
        Coin60Image.style.display = "none";
      }
    }

    let Coin61Image = document.querySelector("#container-game .coin61");
    let cenarioCoin61Position = 250;

    if (
      cenarioPosition <= cenarioCoin61Position &&
      cenarioCoin61Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin61Image !== null) {
        Coin61Image.style.display = "block";
        let Coin61ImageLeft = cenarioCoin61Position - cenarioPosition;
        Coin61Image.style.right = `${Coin61ImageLeft}px`;
      }
    } else {
      if (Coin61Image !== null) {
        Coin61Image.style.display = "none";
      }
    }

    let Coin62Image = document.querySelector("#container-game .coin62");
    let cenarioCoin62Position = 200;

    if (
      cenarioPosition <= cenarioCoin62Position &&
      cenarioCoin62Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin62Image !== null) {
        Coin62Image.style.display = "block";
        let Coin62ImageLeft = cenarioCoin62Position - cenarioPosition;
        Coin62Image.style.right = `${Coin62ImageLeft}px`;
      }
    } else {
      if (Coin62Image !== null) {
        Coin62Image.style.display = "none";
      }
    }

    let Coin63Image = document.querySelector("#container-game .coin63");
    let cenarioCoin63Position = -4000;

    if (
      cenarioPosition <= cenarioCoin63Position &&
      cenarioCoin63Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin63Image !== null) {
        Coin63Image.style.display = "block";
        let Coin63ImageLeft = cenarioCoin63Position - cenarioPosition;
        Coin63Image.style.right = `${Coin63ImageLeft}px`;
      }
    } else {
      if (Coin63Image !== null) {
        Coin63Image.style.display = "none";
      }
    }

    let Coin64Image = document.querySelector("#container-game .coin64");
    let cenarioCoin64Position = -4050;

    if (
      cenarioPosition <= cenarioCoin64Position &&
      cenarioCoin64Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin64Image !== null) {
        Coin64Image.style.display = "block";
        let Coin64ImageLeft = cenarioCoin64Position - cenarioPosition;
        Coin64Image.style.right = `${Coin64ImageLeft}px`;
      }
    } else {
      if (Coin64Image !== null) {
        Coin64Image.style.display = "none";
      }
    }

    let Coin65Image = document.querySelector("#container-game .coin65");
    let cenarioCoin65Position = -4100;

    if (
      cenarioPosition <= cenarioCoin65Position &&
      cenarioCoin65Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin65Image !== null) {
        Coin65Image.style.display = "block";
        let Coin65ImageLeft = cenarioCoin65Position - cenarioPosition;
        Coin65Image.style.right = `${Coin65ImageLeft}px`;
      }
    } else {
      if (Coin65Image !== null) {
        Coin65Image.style.display = "none";
      }
    }

    let Coin66Image = document.querySelector("#container-game .coin66");
    let cenarioCoin66Position = -4280;

    if (
      cenarioPosition <= cenarioCoin66Position &&
      cenarioCoin66Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin66Image !== null) {
        Coin66Image.style.display = "block";
        let Coin66ImageLeft = cenarioCoin66Position - cenarioPosition;
        Coin66Image.style.right = `${Coin66ImageLeft}px`;
      }
    } else {
      if (Coin66Image !== null) {
        Coin66Image.style.display = "none";
      }
    }

    let Coin67Image = document.querySelector("#container-game .coin67");
    let cenarioCoin67Position = -4330;

    if (
      cenarioPosition <= cenarioCoin67Position &&
      cenarioCoin67Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin67Image !== null) {
        Coin67Image.style.display = "block";
        let Coin67ImageLeft = cenarioCoin67Position - cenarioPosition;
        Coin67Image.style.right = `${Coin67ImageLeft}px`;
      }
    } else {
      if (Coin67Image !== null) {
        Coin67Image.style.display = "none";
      }
    }

    let Coin68Image = document.querySelector("#container-game .coin68");
    let cenarioCoin68Position = -4380;

    if (
      cenarioPosition <= cenarioCoin68Position &&
      cenarioCoin68Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin68Image !== null) {
        Coin68Image.style.display = "block";
        let Coin68ImageLeft = cenarioCoin68Position - cenarioPosition;
        Coin68Image.style.right = `${Coin68ImageLeft}px`;
      }
    } else {
      if (Coin68Image !== null) {
        Coin68Image.style.display = "none";
      }
    }

    let Coin69Image = document.querySelector("#container-game .coin69");
    let cenarioCoin69Position = -4420;

    if (
      cenarioPosition <= cenarioCoin69Position &&
      cenarioCoin69Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin69Image !== null) {
        Coin69Image.style.display = "block";
        let Coin69ImageLeft = cenarioCoin69Position - cenarioPosition;
        Coin69Image.style.right = `${Coin69ImageLeft}px`;
      }
    } else {
      if (Coin69Image !== null) {
        Coin69Image.style.display = "none";
      }
    }

    let Coin70Image = document.querySelector("#container-game .coin70");
    let cenarioCoin70Position = -2511;

    if (
      cenarioPosition <= cenarioCoin70Position &&
      cenarioCoin70Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin70Image !== null) {
        Coin70Image.style.display = "block";
        let Coin70ImageLeft = cenarioCoin70Position - cenarioPosition;
        Coin70Image.style.right = `${Coin70ImageLeft}px`;
      }
    } else {
      if (Coin70Image !== null) {
        Coin70Image.style.display = "none";
      }
    }

    let Coin71Image = document.querySelector("#container-game .coin71");
    let cenarioCoin71Position = -2550;

    if (
      cenarioPosition <= cenarioCoin71Position &&
      cenarioCoin71Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin71Image !== null) {
        Coin71Image.style.display = "block";
        let Coin71ImageLeft = cenarioCoin71Position - cenarioPosition;
        Coin71Image.style.right = `${Coin71ImageLeft}px`;
      }
    } else {
      if (Coin71Image !== null) {
        Coin71Image.style.display = "none";
      }
    }

    let Coin72Image = document.querySelector("#container-game .coin72");
    let cenarioCoin72Position = -2600;

    if (
      cenarioPosition <= cenarioCoin72Position &&
      cenarioCoin72Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin72Image !== null) {
        Coin72Image.style.display = "block";
        let Coin72ImageLeft = cenarioCoin72Position - cenarioPosition;
        Coin72Image.style.right = `${Coin72ImageLeft}px`;
      }
    } else {
      if (Coin72Image !== null) {
        Coin72Image.style.display = "none";
      }
    }

    let Coin73Image = document.querySelector("#container-game .coin73");
    let cenarioCoin73Position = -2650;

    if (
      cenarioPosition <= cenarioCoin73Position &&
      cenarioCoin73Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin73Image !== null) {
        Coin73Image.style.display = "block";
        let Coin73ImageLeft = cenarioCoin73Position - cenarioPosition;
        Coin73Image.style.right = `${Coin73ImageLeft}px`;
      }
    } else {
      if (Coin73Image !== null) {
        Coin73Image.style.display = "none";
      }
    }

    let Coin74Image = document.querySelector("#container-game .coin74");
    let cenarioCoin74Position = -2550;

    if (
      cenarioPosition <= cenarioCoin74Position &&
      cenarioCoin74Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin74Image !== null) {
        Coin74Image.style.display = "block";
        let Coin74ImageLeft = cenarioCoin74Position - cenarioPosition;
        Coin74Image.style.right = `${Coin74ImageLeft}px`;
      }
    } else {
      if (Coin74Image !== null) {
        Coin74Image.style.display = "none";
      }
    }

    let Coin75Image = document.querySelector("#container-game .coin75");
    let cenarioCoin75Position = -2600;

    if (
      cenarioPosition <= cenarioCoin75Position &&
      cenarioCoin75Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin75Image !== null) {
        Coin75Image.style.display = "block";
        let Coin75ImageLeft = cenarioCoin75Position - cenarioPosition;
        Coin75Image.style.right = `${Coin75ImageLeft}px`;
      }
    } else {
      if (Coin75Image !== null) {
        Coin75Image.style.display = "none";
      }
    }

    let Coin76Image = document.querySelector("#container-game .coin76");
    let cenarioCoin76Position = -2650;

    if (
      cenarioPosition <= cenarioCoin76Position &&
      cenarioCoin76Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin76Image !== null) {
        Coin76Image.style.display = "block";
        let Coin76ImageLeft = cenarioCoin76Position - cenarioPosition;
        Coin76Image.style.right = `${Coin76ImageLeft}px`;
      }
    } else {
      if (Coin76Image !== null) {
        Coin76Image.style.display = "none";
      }
    }

    let Coin77Image = document.querySelector("#container-game .coin77");
    let cenarioCoin77Position = -3050;

    if (
      cenarioPosition <= cenarioCoin77Position &&
      cenarioCoin77Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin77Image !== null) {
        Coin77Image.style.display = "block";
        let Coin77ImageLeft = cenarioCoin77Position - cenarioPosition;
        Coin77Image.style.right = `${Coin77ImageLeft}px`;
      }
    } else {
      if (Coin77Image !== null) {
        Coin77Image.style.display = "none";
      }
    }

    let Coin78Image = document.querySelector("#container-game .coin78");
    let cenarioCoin78Position = -3100;

    if (
      cenarioPosition <= cenarioCoin78Position &&
      cenarioCoin78Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin78Image !== null) {
        Coin78Image.style.display = "block";
        let Coin78ImageLeft = cenarioCoin78Position - cenarioPosition;
        Coin78Image.style.right = `${Coin78ImageLeft}px`;
      }
    } else {
      if (Coin78Image !== null) {
        Coin78Image.style.display = "none";
      }
    }

    let Coin79Image = document.querySelector("#container-game .coin79");
    let cenarioCoin79Position = -3150;

    if (
      cenarioPosition <= cenarioCoin79Position &&
      cenarioCoin79Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin79Image !== null) {
        Coin79Image.style.display = "block";
        let Coin79ImageLeft = cenarioCoin79Position - cenarioPosition;
        Coin79Image.style.right = `${Coin79ImageLeft}px`;
      }
    } else {
      if (Coin79Image !== null) {
        Coin79Image.style.display = "none";
      }
    }

    let Coin80Image = document.querySelector("#container-game .coin80");
    let cenarioCoin80Position = -3200;

    if (
      cenarioPosition <= cenarioCoin80Position &&
      cenarioCoin80Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin80Image !== null) {
        Coin80Image.style.display = "block";
        let Coin80ImageLeft = cenarioCoin80Position - cenarioPosition;
        Coin80Image.style.right = `${Coin80ImageLeft}px`;
      }
    } else {
      if (Coin80Image !== null) {
        Coin80Image.style.display = "none";
      }
    }

    let Coin81Image = document.querySelector("#container-game .coin81");
    let cenarioCoin81Position = -3250;

    if (
      cenarioPosition <= cenarioCoin81Position &&
      cenarioCoin81Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin81Image !== null) {
        Coin81Image.style.display = "block";
        let Coin81ImageLeft = cenarioCoin81Position - cenarioPosition;
        Coin81Image.style.right = `${Coin81ImageLeft}px`;
      }
    } else {
      if (Coin81Image !== null) {
        Coin81Image.style.display = "none";
      }
    }

    let Coin82Image = document.querySelector("#container-game .coin82");
    let cenarioCoin82Position = -3300;

    if (
      cenarioPosition <= cenarioCoin82Position &&
      cenarioCoin82Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin82Image !== null) {
        Coin82Image.style.display = "block";
        let Coin82ImageLeft = cenarioCoin82Position - cenarioPosition;
        Coin82Image.style.right = `${Coin82ImageLeft}px`;
      }
    } else {
      if (Coin82Image !== null) {
        Coin82Image.style.display = "none";
      }
    }

    let Coin83Image = document.querySelector("#container-game .coin83");
    let cenarioCoin83Position = -3350;

    if (
      cenarioPosition <= cenarioCoin83Position &&
      cenarioCoin83Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin83Image !== null) {
        Coin83Image.style.display = "block";
        let Coin83ImageLeft = cenarioCoin83Position - cenarioPosition;
        Coin83Image.style.right = `${Coin83ImageLeft}px`;
      }
    } else {
      if (Coin83Image !== null) {
        Coin83Image.style.display = "none";
      }
    }

    let Coin84Image = document.querySelector("#container-game .coin84");
    let cenarioCoin84Position = -3400;

    if (
      cenarioPosition <= cenarioCoin84Position &&
      cenarioCoin84Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin84Image !== null) {
        Coin84Image.style.display = "block";
        let Coin84ImageLeft = cenarioCoin84Position - cenarioPosition;
        Coin84Image.style.right = `${Coin84ImageLeft}px`;
      }
    } else {
      if (Coin84Image !== null) {
        Coin84Image.style.display = "none";
      }
    }

    let Coin85Image = document.querySelector("#container-game .coin85");
    let cenarioCoin85Position = -3450;

    if (
      cenarioPosition <= cenarioCoin85Position &&
      cenarioCoin85Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin85Image !== null) {
        Coin85Image.style.display = "block";
        let Coin85ImageLeft = cenarioCoin85Position - cenarioPosition;
        Coin85Image.style.right = `${Coin85ImageLeft}px`;
      }
    } else {
      if (Coin85Image !== null) {
        Coin85Image.style.display = "none";
      }
    }

    let Coin86Image = document.querySelector("#container-game .coin86");
    let cenarioCoin86Position = -3500;

    if (
      cenarioPosition <= cenarioCoin86Position &&
      cenarioCoin86Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin86Image !== null) {
        Coin86Image.style.display = "block";
        let Coin86ImageLeft = cenarioCoin86Position - cenarioPosition;
        Coin86Image.style.right = `${Coin86ImageLeft}px`;
      }
    } else {
      if (Coin86Image !== null) {
        Coin86Image.style.display = "none";
      }
    }

    let Coin87Image = document.querySelector("#container-game .coin87");
    let cenarioCoin87Position = -3550;

    if (
      cenarioPosition <= cenarioCoin87Position &&
      cenarioCoin87Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin87Image !== null) {
        Coin87Image.style.display = "block";
        let Coin87ImageLeft = cenarioCoin87Position - cenarioPosition;
        Coin87Image.style.right = `${Coin87ImageLeft}px`;
      }
    } else {
      if (Coin87Image !== null) {
        Coin87Image.style.display = "none";
      }
    }

    let Coin88Image = document.querySelector("#container-game .coin88");
    let cenarioCoin88Position = -3600;

    if (
      cenarioPosition <= cenarioCoin88Position &&
      cenarioCoin88Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin88Image !== null) {
        Coin88Image.style.display = "block";
        let Coin88ImageLeft = cenarioCoin88Position - cenarioPosition;
        Coin88Image.style.right = `${Coin88ImageLeft}px`;
      }
    } else {
      if (Coin88Image !== null) {
        Coin88Image.style.display = "none";
      }
    }

    let Coin89Image = document.querySelector("#container-game .coin89");
    let cenarioCoin89Position = -3650;

    if (
      cenarioPosition <= cenarioCoin89Position &&
      cenarioCoin89Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin89Image !== null) {
        Coin89Image.style.display = "block";
        let Coin89ImageLeft = cenarioCoin89Position - cenarioPosition;
        Coin89Image.style.right = `${Coin89ImageLeft}px`;
      }
    } else {
      if (Coin89Image !== null) {
        Coin89Image.style.display = "none";
      }
    }

    let Coin90Image = document.querySelector("#container-game .coin90");
    let cenarioCoin90Position = -3700;

    if (
      cenarioPosition <= cenarioCoin90Position &&
      cenarioCoin90Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin90Image !== null) {
        Coin90Image.style.display = "block";
        let Coin90ImageLeft = cenarioCoin90Position - cenarioPosition;
        Coin90Image.style.right = `${Coin90ImageLeft}px`;
      }
    } else {
      if (Coin90Image !== null) {
        Coin90Image.style.display = "none";
      }
    }

    let Coin91Image = document.querySelector("#container-game .coin91");
    let cenarioCoin91Position = -3750;

    if (
      cenarioPosition <= cenarioCoin91Position &&
      cenarioCoin91Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin91Image !== null) {
        Coin91Image.style.display = "block";
        let Coin91ImageLeft = cenarioCoin91Position - cenarioPosition;
        Coin91Image.style.right = `${Coin91ImageLeft}px`;
      }
    } else {
      if (Coin91Image !== null) {
        Coin91Image.style.display = "none";
      }
    }

    let Coin92Image = document.querySelector("#container-game .coin92");
    let cenarioCoin92Position = -7150;

    if (
      cenarioPosition <= cenarioCoin92Position &&
      cenarioCoin92Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin92Image !== null) {
        Coin92Image.style.display = "block";
        let Coin92ImageLeft = cenarioCoin92Position - cenarioPosition;
        Coin92Image.style.right = `${Coin92ImageLeft}px`;
      }
    } else {
      if (Coin92Image !== null) {
        Coin92Image.style.display = "none";
      }
    }

    let Coin93Image = document.querySelector("#container-game .coin93");
    let cenarioCoin93Position = -7200;

    if (
      cenarioPosition <= cenarioCoin93Position &&
      cenarioCoin93Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin93Image !== null) {
        Coin93Image.style.display = "block";
        let Coin93ImageLeft = cenarioCoin93Position - cenarioPosition;
        Coin93Image.style.right = `${Coin93ImageLeft}px`;
      }
    } else {
      if (Coin93Image !== null) {
        Coin93Image.style.display = "none";
      }
    }

    let Coin94Image = document.querySelector("#container-game .coin94");
    let cenarioCoin94Position = -7250;

    if (
      cenarioPosition <= cenarioCoin94Position &&
      cenarioCoin94Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin94Image !== null) {
        Coin94Image.style.display = "block";
        let Coin94ImageLeft = cenarioCoin94Position - cenarioPosition;
        Coin94Image.style.right = `${Coin94ImageLeft}px`;
      }
    } else {
      if (Coin94Image !== null) {
        Coin94Image.style.display = "none";
      }
    }

    let Coin95Image = document.querySelector("#container-game .coin95");
    let cenarioCoin95Position = -7300;

    if (
      cenarioPosition <= cenarioCoin95Position &&
      cenarioCoin95Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin95Image !== null) {
        Coin95Image.style.display = "block";
        let Coin95ImageLeft = cenarioCoin95Position - cenarioPosition;
        Coin95Image.style.right = `${Coin95ImageLeft}px`;
      }
    } else {
      if (Coin95Image !== null) {
        Coin95Image.style.display = "none";
      }
    }

    let Coin96Image = document.querySelector("#container-game .coin96");
    let cenarioCoin96Position = -7350;

    if (
      cenarioPosition <= cenarioCoin96Position &&
      cenarioCoin96Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin96Image !== null) {
        Coin96Image.style.display = "block";
        let Coin96ImageLeft = cenarioCoin96Position - cenarioPosition;
        Coin96Image.style.right = `${Coin96ImageLeft}px`;
      }
    } else {
      if (Coin96Image !== null) {
        Coin96Image.style.display = "none";
      }
    }

    let Coin97Image = document.querySelector("#container-game .coin97");
    let cenarioCoin97Position = -7400;

    if (
      cenarioPosition <= cenarioCoin97Position &&
      cenarioCoin97Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin97Image !== null) {
        Coin97Image.style.display = "block";
        let Coin97ImageLeft = cenarioCoin97Position - cenarioPosition;
        Coin97Image.style.right = `${Coin97ImageLeft}px`;
      }
    } else {
      if (Coin97Image !== null) {
        Coin97Image.style.display = "none";
      }
    }

    let Coin98Image = document.querySelector("#container-game .coin98");
    let cenarioCoin98Position = -7450;

    if (
      cenarioPosition <= cenarioCoin98Position &&
      cenarioCoin98Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin98Image !== null) {
        Coin98Image.style.display = "block";
        let Coin98ImageLeft = cenarioCoin98Position - cenarioPosition;
        Coin98Image.style.right = `${Coin98ImageLeft}px`;
      }
    } else {
      if (Coin98Image !== null) {
        Coin98Image.style.display = "none";
      }
    }

    let Coin99Image = document.querySelector("#container-game .coin99");
    let cenarioCoin99Position = -7500;

    if (
      cenarioPosition <= cenarioCoin99Position &&
      cenarioCoin99Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin99Image !== null) {
        Coin99Image.style.display = "block";
        let Coin99ImageLeft = cenarioCoin99Position - cenarioPosition;
        Coin99Image.style.right = `${Coin99ImageLeft}px`;
      }
    } else {
      if (Coin99Image !== null) {
        Coin99Image.style.display = "none";
      }
    }

    let Coin100Image = document.querySelector("#container-game .coin100");
    let cenarioCoin100Position = -7550;

    if (
      cenarioPosition <= cenarioCoin100Position &&
      cenarioCoin100Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin100Image !== null) {
        Coin100Image.style.display = "block";
        let Coin100ImageLeft = cenarioCoin100Position - cenarioPosition;
        Coin100Image.style.right = `${Coin100ImageLeft}px`;
      }
    } else {
      if (Coin100Image !== null) {
        Coin100Image.style.display = "none";
      }
    }

    let Coin101Image = document.querySelector("#container-game .coin101");
    let cenarioCoin101Position = -7600;

    if (
      cenarioPosition <= cenarioCoin101Position &&
      cenarioCoin101Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin101Image !== null) {
        Coin101Image.style.display = "block";
        let Coin101ImageLeft = cenarioCoin101Position - cenarioPosition;
        Coin101Image.style.right = `${Coin101ImageLeft}px`;
      }
    } else {
      if (Coin101Image !== null) {
        Coin101Image.style.display = "none";
      }
    }

    let Coin102Image = document.querySelector("#container-game .coin102");
    let cenarioCoin102Position = -7650;

    if (
      cenarioPosition <= cenarioCoin102Position &&
      cenarioCoin102Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (Coin102Image !== null) {
        Coin102Image.style.display = "block";
        let Coin102ImageLeft = cenarioCoin102Position - cenarioPosition;
        Coin102Image.style.right = `${Coin102ImageLeft}px`;
      }
    } else {
      if (Coin102Image !== null) {
        Coin102Image.style.display = "none";
      }
    }

    let yoshiCoinImage = document.querySelector("#container-game .yoshicoin");
    let cenarioYoshiCoinPosition = 440;

    if (
      cenarioPosition <= cenarioYoshiCoinPosition &&
      cenarioYoshiCoinPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (yoshiCoinImage !== null) {
        yoshiCoinImage.style.display = "block";
        let yoshiCoinImageLeft = cenarioYoshiCoinPosition - cenarioPosition;
        yoshiCoinImage.style.right = `${yoshiCoinImageLeft}px`;
      }
    } else {
      if (yoshiCoinImage !== null) {
        yoshiCoinImage.style.display = "none";
      }
    }

    let yoshiCoin2Image = document.querySelector(
      "#container-game .yoshicoin2"
    );
    let cenarioYoshiCoin2Position = -1360;

    if (
      cenarioPosition <= cenarioYoshiCoin2Position &&
      cenarioYoshiCoin2Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (yoshiCoin2Image !== null) {
        yoshiCoin2Image.style.display = "block";
        let yoshiCoin2ImageLeft = cenarioYoshiCoin2Position - cenarioPosition;
        yoshiCoin2Image.style.right = `${yoshiCoin2ImageLeft}px`;
      }
    } else {
      if (yoshiCoin2Image !== null) {
        yoshiCoin2Image.style.display = "none";
      }
    }

    let yoshiCoin3Image = document.querySelector(
      "#container-game .yoshicoin3"
    );
    let cenarioYoshiCoin3Position = -3380;

    if (
      cenarioPosition <= cenarioYoshiCoin3Position &&
      cenarioYoshiCoin3Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (yoshiCoin3Image !== null) {
        yoshiCoin3Image.style.display = "block";
        let yoshiCoin3ImageLeft = cenarioYoshiCoin3Position - cenarioPosition;
        yoshiCoin3Image.style.right = `${yoshiCoin3ImageLeft}px`;
      }
    } else {
      if (yoshiCoin3Image !== null) {
        yoshiCoin3Image.style.display = "none";
      }
    }

    let yoshiCoin4Image = document.querySelector(
      "#container-game .yoshicoin4"
    );
    let cenarioYoshiCoin4Position = -4955;

    if (
      cenarioPosition <= cenarioYoshiCoin4Position &&
      cenarioYoshiCoin4Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (yoshiCoin4Image !== null) {
        yoshiCoin4Image.style.display = "block";
        let yoshiCoin4ImageLeft = cenarioYoshiCoin4Position - cenarioPosition;
        yoshiCoin4Image.style.right = `${yoshiCoin4ImageLeft}px`;
      }
    } else {
      if (yoshiCoin4Image !== null) {
        yoshiCoin4Image.style.display = "none";
      }
    }

    let yoshiCoin5Image = document.querySelector(
      "#container-game .yoshicoin5"
    );
    let cenarioYoshiCoin5Position = -6855;

    if (
      cenarioPosition <= cenarioYoshiCoin5Position &&
      cenarioYoshiCoin5Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (yoshiCoin5Image !== null) {
        yoshiCoin5Image.style.display = "block";
        let yoshiCoin5ImageLeft = cenarioYoshiCoin5Position - cenarioPosition;
        yoshiCoin5Image.style.right = `${yoshiCoin5ImageLeft}px`;
      }
    } else {
      if (yoshiCoin5Image !== null) {
        yoshiCoin5Image.style.display = "none";
      }
    }

    let blocoImage = document.querySelector("#container-game .bloco");
    let cenarioblocoPosition = -4550;

    if (
      cenarioPosition <= cenarioblocoPosition &&
      cenarioblocoPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (blocoImage !== null) {
        blocoImage.style.display = "block";
        let blocoImageLeft = cenarioblocoPosition - cenarioPosition;
        blocoImage.style.right = `${blocoImageLeft}px`;
      }
    } else {
      if (blocoImage !== null) {
        blocoImage.style.display = "none";
      }
    }

    let flowerImage = document.querySelector("#container-game .flower");
    let cenarioflowerPosition = -4550;

    if (
      cenarioPosition <= cenarioflowerPosition &&
      cenarioflowerPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (flowerImage !== null) {
        flowerImage.style.display = "block";
        let flowerImageLeft = cenarioflowerPosition - cenarioPosition;
        flowerImage.style.right = `${flowerImageLeft}px`;
      }
    } else {
      if (flowerImage !== null) {
        flowerImage.style.display = "none";
      }
    }

    let bloco1Image = document.querySelector("#container-game .bloco1");
    let cenariobloco1Position = -5300;

    if (
      cenarioPosition <= cenariobloco1Position &&
      cenariobloco1Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (bloco1Image !== null) {
        bloco1Image.style.display = "block";
        let bloco1ImageLeft = cenariobloco1Position - cenarioPosition;
        bloco1Image.style.right = `${bloco1ImageLeft}px`;
      }
    } else {
      if (bloco1Image !== null) {
        bloco1Image.style.display = "none";
      }
    }

    let extraupImage = document.querySelector("#container-game .extra-up");
    let cenarioextraupPosition = -5300;

    if (
      cenarioPosition <= cenarioextraupPosition &&
      cenarioextraupPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (extraupImage !== null) {
        extraupImage.style.display = "block";
        let extraupImageLeft = cenarioextraupPosition - cenarioPosition;
        extraupImage.style.right = `${extraupImageLeft}px`;
      }
    } else {
      if (extraupImage !== null) {
        extraupImage.style.display = "none";
      }
    }

    let bloco2Image = document.querySelector("#container-game .bloco2");
    let cenariobloco2Position = -1880;

    if (
      cenarioPosition <= cenariobloco2Position &&
      cenariobloco2Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (bloco2Image !== null) {
        bloco2Image.style.display = "block";
        let bloco2ImageLeft = cenariobloco2Position - cenarioPosition;
        bloco2Image.style.right = `${bloco2ImageLeft}px`;
      }
    } else {
      if (bloco2Image !== null) {
        bloco2Image.style.display = "none";
      }
    }

    let powerupImage = document.querySelector("#container-game .power-up");
    let cenariopowerupPosition = -1880;

    if (
      cenarioPosition <= cenariopowerupPosition &&
      cenariopowerupPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (powerupImage !== null) {
        powerupImage.style.display = "block";
        let powerupImageLeft = cenariopowerupPosition - cenarioPosition;
        powerupImage.style.right = `${powerupImageLeft}px`;
      }
    } else {
      if (powerupImage !== null) {
        powerupImage.style.display = "none";
      }
    }

    let bloco3Image = document.querySelector("#container-game .bloco3");
    let cenariobloco3Position = -7100;

    if (
      cenarioPosition <= cenariobloco3Position &&
      cenariobloco3Position <= cenarioPosition + cenarioContainerWidth
    ) {
      if (bloco3Image !== null) {
        bloco3Image.style.display = "block";
        let bloco3ImageLeft = cenariobloco3Position - cenarioPosition;
        bloco3Image.style.right = `${bloco3ImageLeft}px`;
      }
    } else {
      if (bloco3Image !== null) {
        bloco3Image.style.display = "none";
      }
    }

    let featherImage = document.querySelector("#container-game .feather");
    let cenariofeatherPosition = -7100;

    if (
      cenarioPosition <= cenariofeatherPosition &&
      cenariofeatherPosition <= cenarioPosition + cenarioContainerWidth
    ) {
      if (featherImage !== null) {
        featherImage.style.display = "block";
        let featherImageLeft = cenariofeatherPosition - cenarioPosition;
        featherImage.style.right = `${featherImageLeft}px`;
      }
    } else {
      if (featherImage !== null) {
        featherImage.style.display = "none";
      }
    }

    cenarioPosition = Math.max(cenarioPosition, -maxCenarioPosition);
    cenarioPosition = Math.min(cenarioPosition, 0);
    senarioPosition = Math.max(senarioPosition, -maxSenarioPosition);
    senarioPosition = Math.min(senarioPosition, 0);
    cenario.style.left = `${cenarioPosition}px`;
    senario.style.left = `${senarioPosition}px`;
    mario.style.marginLeft = `${marioPosition}px`;
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);

  gameInterval = setInterval(() => {
    updatePosition();
  }, 50);
}

function simularEventoTecla(code) {
  let eventoPressionar = new KeyboardEvent("keydown", {
    bubbles: true,
    key: code,
    code: code,
    which: code,
  });

  let eventoSoltar = new KeyboardEvent("keyup", {
    bubbles: true,
    key: code,
    code: code,
    which: code,
  });

  document.dispatchEvent(eventoPressionar);
  setTimeout(() => {
    document.dispatchEvent(eventoSoltar);
  }, 50);
}

botao.addEventListener("click", () => {
  iniciarJogo();
  function ocultarCursor() {
    document.documentElement.style.cursor = "none";
  }
  botao.style.display = "none";
  ocultarCursor();

  function handleCollision() {
    if (marioState === "small") {
      transformMario();
    } else if (marioState === "big") {
      transformMarioCape();
    } else if (marioState === "cape") {
      transformMarioFire();
    }
  }

  let waiting = document.querySelector(".waiting");
  let rouletteblock = document.querySelector(".rouletteblock");
  rouletteblock.style.display = "block";

  waiting.volume = 0;
  waiting.pause();

  simularEventoTecla("ArrowRight");

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
  document.querySelector(".star").classList.add("star-start");
  document.querySelector(".coin103").classList.add("coin103-start");

  var timeLeft = 300;
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
          ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
          ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
          ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
        let divAnimation = document.querySelector(".gameovertimeup");
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
        }, 8000);
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
  let finishpointer = document.querySelector(".finishpointer");

  let pointsElement = document.querySelector(".points");
  let lifeElement = document.querySelector(".life");
  let coinsCollectedElement = document.querySelector(".moedasup");
  let yoshiCoinCollectElement = document.querySelector(".yoshiup");
  let points = 0;
  let life = 5;
  let coinsCollected = 0;
  let yoshiCoinCollected = 0;
  let maxClones = 1;
  let maxClonesextraup = 1;
  let maxClonesflower = 1;
  let maxClonesstar = 1;
  let maxClonesfeather = 1;
  let maxClonescoin103 = 1;
  let canLoseLife = true;
  let currentClones = 0;
  let currentClonesextraup = 0;
  let currentClonesflower = 0;
  let currentClonesstar = 0;
  let currentClonesfeather = 0;
  let currentClonescoin103 = 0;
  let invincibleCollisionAudioPlayed1 = false;
  let invincibleCollisionAudioPlayed2 = false;
  let invincibleCollisionAudioPlayed3 = false;
  let invincibleCollisionAudioPlayed4 = false;
  let invincibleCollisionAudioPlayed5 = false;
  let invincibleCollisionAudioPlayed6 = false;

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
    let FinishPointerUpRect = null;

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
    if (finishpointer !== null) {
      FinishPointerUpRect = finishpointer.getBoundingClientRect();
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
      let collectcImg = document.getElementById("collectcoin");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
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
    
      if (marioState === "small") {
        transformMario();
      }
    
      cogumelo.parentNode.removeChild(cogumelo);
      cogumelo = cogumelo.cloneNode(true);
      points += 8000;
      document.getElementById("container-game").appendChild(cogumelo);
      currentClonesextraup++;
    
      if (currentClonesextraup >= maxClonesextraup) {
        cogumelo.style.animationPlayState = "paused";
      }
      let collectcImg = document.getElementById("collectall");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;
    
      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
    
      if (keysPressed["ArrowLeft"]) {
        mario.src = marioStoppedLeft;
      } else if (keysPressed["ArrowRight"]) {
        mario.src = marioStoppedRight;
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
    
      if (marioState === "small") {
        transformMarioFire();
      } else if (marioState === "big") {
        transformMarioFire();
      }
    
      flor.parentNode.removeChild(flor);
      flor = flor.cloneNode(true);
      points += 8000;
      document.getElementById("container-game").appendChild(flor);
      currentClonesflower++;
    
      if (currentClonesflower >= maxClonesflower) {
        flor.style.animationPlayState = "paused";
      }
      let collectcImg = document.getElementById("collectall");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;
    
      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
    
      if (keysPressed["ArrowLeft"]) {
        mario.src = marioStoppedLeft;
      } else if (keysPressed["ArrowRight"]) {
        mario.src = marioStoppedRight;
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
      let collectcImg = document.getElementById("collectall");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;

      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
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
    
      if (marioState === "small") {
        transformMarioCape();
      } else if (marioState === "big") {
        transformMarioCape();
      } else if (marioState === "fire") {
        transformMarioCape();
      }
    
      featherget.parentNode.removeChild(featherget);
      featherget = featherget.cloneNode(true);
      points += 8000;
      document.getElementById("container-game").appendChild(featherget);
      currentClonesfeather++;
    
      if (currentClonesfeather >= maxClonesfeather) {
        featherget.style.animationPlayState = "paused";
      }
      let collectcImg = document.getElementById("collectall");
      collectcImg.classList.add("collectc");
      collectcImg.style.display = "block";
      collectcImg.style.zIndex = 99;
      collectcImg.style.position = "absolute";
      collectcImg.style.left = `${
        marioRect.left + marioRect.width / 1 - collectcImg.width / 1
      }px`;
      collectcImg.style.bottom = `${Math.min(
        marioRect.top - 280,
        window.innerHeight - collectcImg.height
      )}px`;
    
      setTimeout(() => {
        collectcImg.style.display = "none";
        collectcImg.classList.remove("collectc");
      }, 1000);
    
      if (keysPressed["ArrowLeft"]) {
        mario.src = marioStoppedLeft;
      } else if (keysPressed["ArrowRight"]) {
        mario.src = marioStoppedRight;
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
    //   cascoredUpRect !== null &&
    //   marioRect.left < cascoredUpRect.left + cascoredUpRect.width &&
    //   marioRect.left + marioRect.width > cascoredUpRect.left &&
    //   marioRect.top < cascoredUpRect.top + cascoredUpRect.height &&
    //   marioRect.top + marioRect.height > cascoredUpRect.top
    // ) {
    //   let audio = document.querySelector(".colision-kick");
    //   audio.play();
    
    //   if (marioRect.left < cascoredUpRect.left) {
    //     cascored.classList.remove("cascored-left-animation");
    //     cascored.classList.add("cascored-right-animation");
    //   } else {
    //     cascored.classList.remove("cascored-right-animation");
    //     cascored.classList.add("cascored-left-animation");
    //   }
    
    //   cascored.src = "/images/cascored.gif";
    //   cascored.style.width = "40px";
    
    //   setTimeout(() => {
    //     cascored.remove();
    //   }, 2500);
    // }
    

    if (
      koopaUpRect !== null &&
      marioRect.left < koopaUpRect.left + koopaUpRect.width &&
      marioRect.left + marioRect.width > koopaUpRect.left &&
      marioRect.top < koopaUpRect.top + koopaUpRect.height &&
      marioRect.top + marioRect.height > koopaUpRect.top
    ) {
      if (mario.classList.contains("mario-invencible")) {
        if (!invincibleCollisionAudioPlayed1) {
          let audioInvencivel1 = new Audio("/soundtracks/kick.wav");
          audioInvencivel1.play();
          invincibleCollisionAudioPlayed1 = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed1 = false;

        if (canLoseLife && life > 0) {
          transformMarioSmall();
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

        invincibleCollisionAudioPlayed1 = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
        if (!invincibleCollisionAudioPlayed2) {
          let audioInvencivel2 = new Audio("/soundtracks/kick.wav");
          audioInvencivel2.play();
          invincibleCollisionAudioPlayed2 = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed2 = false;

        if (canLoseLife && life > 0) {
          transformMarioSmall();
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

        invincibleCollisionAudioPlayed2 = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
        if (!invincibleCollisionAudioPlayed3) {
          let audioInvencivel3 = new Audio("/soundtracks/kick.wav");
          audioInvencivel3.play();
          invincibleCollisionAudioPlayed3 = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed3 = false;

        if (canLoseLife && life > 0) {
          transformMarioSmall();
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

        invincibleCollisionAudioPlayed3 = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
        if (!invincibleCollisionAudioPlayed4) {
          let audioInvencivel4 = new Audio("/soundtracks/kick.wav");
          audioInvencivel4.play();
          invincibleCollisionAudioPlayed4 = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed4 = false;

        if (canLoseLife && life > 0) {
          transformMarioSmall();
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

        invincibleCollisionAudioPlayed4 = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
        if (!invincibleCollisionAudioPlayed5) {
          let audioInvencivel5 = new Audio("/soundtracks/kick.wav");
          audioInvencivel5.play();
          invincibleCollisionAudioPlayed5 = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed5 = false;

        if (canLoseLife && life > 0) {
          transformMarioSmall();
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

        invincibleCollisionAudioPlayed5 = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
        if (!invincibleCollisionAudioPlayed6) {
          let audioInvencivel6 = new Audio("/soundtracks/kick.wav");
          audioInvencivel6.play();
          invincibleCollisionAudioPlayed6 = true;
        }
      } else {
        let audio = document.querySelector(".powerdown");
        audio.play();
        invincibleCollisionAudioPlayed6 = false;

        if (canLoseLife && life > 0) {
          transformMarioSmall();
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

        invincibleCollisionAudioPlayed6 = false;
        let audiolose = document.querySelector(".playerdown");
        let playaudio = document.querySelector(".overworld");
        let playsound = document.querySelector(".overworldhurry");
        let audiohurry = document.querySelector(".hurry-up");

        let allEnemies = document.querySelectorAll(
          ".koopared, .koopared2,  .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
        audio.play();

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
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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
            ".chuck-futebal, .chuck-futebal2, .superkoopa, .cascodoido, .rexl, " +
            ".koopared-start, .koopared2-start, .chuck-futebal-start, .chuck-futebal2-start, .superkoopa-start, " +
            ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start"
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
          let divAnimation = document.querySelector(".gameovertimeup");
          let rightImage = document.querySelector(".right-image");
          let leftImage = document.querySelector(".left-image");

          divAnimation.style.display = "block";
          leftImage.style.display = "block";
          rightImage.style.display = "block";
          let newAudio = new Audio("/soundtracks/gameover.mp3");
          newAudio.play();
          setTimeout(() => {
            location.reload();
          }, 8000);
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

    if (
      FinishPointerUpRect !== null &&
      marioRect.left < FinishPointerUpRect.left + FinishPointerUpRect.width &&
      marioRect.left + marioRect.width > FinishPointerUpRect.left &&
      marioRect.top < FinishPointerUpRect.top + FinishPointerUpRect.height &&
      marioRect.top + marioRect.height > FinishPointerUpRect.top
    ) {
      clearInterval(countdown);
      clearInterval(gameInterval);
      clearInterval(checarColisao);
      removeEventListeners();

      let curseclear = document.querySelector("#container-game .curseclear");
      curseclear.style.display = "flex";
      let curseclearbonus = document.querySelector(
        "#container-game .curseclearbonus"
      );
      curseclearbonus.style.display = "flex";

      let playaudio = document.querySelector(".overworld");
      let playsound = document.querySelector(".overworldhurry");
      let audiohurry = document.querySelector(".hurry-up");
      let finishMission = document.querySelector(".missionend");
      let finishMissionContinue = document.querySelector(
        ".missionendcontinue"
      );

      let allEnemies = document.querySelectorAll(
        ".rouletteblock, .koopared, .koopared2, .koopared3, .koopagreen, .koopagreen2, .koopagreen3, " +
          ".chuck-footbal, .chuck-footbal2, .superkoopa, .cascodoido, .rexl, " +
          ".koopared-start, .koopared2-start, .chuck-footbal-start, .chuck-footbal2-start, .superkoopa-start, " +
          ".cascodoido-start, .rexl-start, .koopared3-start, .koopagreen-start, .koopagreen2-start, .koopagreen3-start, " +
          ".mario-voando, .mario-voando-start, .power-up, power-up-start, .extra-up, .extra-up-start, .flower, .flower-start, .star, .star-start, " +
          ".feather, .feather-start, .chuckfootbalup, .pipe, .pipe2, .yoshicoin, .yoshicoin2, .yoshicoin3, .yoshicoin4, .yoshicoin5, .stake1, .stake2, .finishpointer, " +
          ".cenario, .senario, .coin103, .coin103-start, .bloco, .bloco1, .bloco2, .bloco3"
      );
      let start = 1;
      let end = 102;

      for (let i = start; i <= end; i++) {
        let className = `.coin${i}`;
        let elements = document.querySelectorAll(className);

        elements.forEach((element) => {
          element.classList.remove(...element.classList);
          element.remove();
        });
      }

      playaudio.volume = 0;
      playsound.volume = 0;
      audiohurry.volume = 0;

      finishMission.currentTime = 0;
      finishMission.play();

      setTimeout(() => {
        finishMissionContinue.play();
      }, 8500);

      allEnemies.forEach(function (element) {
        element.style.animationPlayState = "paused";
        element.remove();
      });

      let mario = document.querySelector(".mario");
      if (marioState === "small") {
        mario.src = "/images/mario-small-left.gif";
        mario.style.width = "35px";
      } else if (marioState === "big") {
        mario.src = "/images/mario-big-left.gif";
        mario.style.width = "60px";
      } else if (marioState === "cape") {
        mario.src = "/images/mario-cape-left.gif";
        mario.style.width = "80px";
      } else if (marioState === "fire") {
        mario.src = "/images/mario-fire-left.gif";
        mario.style.width = "40px";
      }

      mario.classList.add("mission-animation");

      setTimeout(() => {
        let mario = document.querySelector(".mario");
        if (marioState === "small") {
          mario.src = "/images/mariosmallmissionclear.png";
          mario.style.width = "35px";
        } else if (marioState === "big") {
          mario.src = "/images/mariobigmissionclear.png";
          mario.style.width = "40px";
        } else if (marioState === "cape") {
          mario.src = "/images/mariobigmissionclear.png";
          mario.style.width = "40px";
        } else if (marioState === "fire") {
          mario.src = "/images/mariobigmissionclear.png";
          mario.style.width = "40px";
        }

        let checkpointClear = document.querySelector(".checkpointclear");
        let checkpointClear2 = document.querySelector(
          ".checkpointclear:nth-of-type(1)"
        );
        checkpointClear2.style.display = "block";
        let currentNumber = 0;
        let finalNumber = Math.floor(Math.random() * 99) + 1;

        let animationInterval = setInterval(() => {
          currentNumber++;
          checkpointClear.textContent = currentNumber;
          checkpointClear2.textContent = currentNumber;

          if (currentNumber === finalNumber) {
            clearInterval(animationInterval);
          }
        }, 10);
      }, 8500);
      document.documentElement.style.cursor = "auto";

      setTimeout(() => {
        window.location.href = "/betaboss.html";
      }, 15000);
    }
  }

  checarColisao = setInterval(() => {
    checkCollision();
  }, 10);
});

let checarColisaoPowerUp;
let bloco = document.querySelector(".bloco");
let marios = document.querySelector(".mario");

function verificarColisaoPowerUp() {
  let marioRects = marios.getBoundingClientRect();
  let blocoUpRect = null;
  if (bloco !== null) {
    blocoUpRect = bloco.getBoundingClientRect();
  }

  if (
    blocoUpRect !== null &&
    marioRects.left < blocoUpRect.left + blocoUpRect.width &&
    marioRects.left + marioRects.width > blocoUpRect.left &&
    marioRects.top < blocoUpRect.top + blocoUpRect.height &&
    marioRects.top + marioRects.height > blocoUpRect.top
  ) {
    bloco.src = "/images/emptyblock.png";
    let audio = new Audio("/soundtracks/powerupappears.wav");
    audio.play();

    document.querySelector(".flower").classList.add("flower-start");
    clearInterval(checarColisaoPowerUp);
  }
}

checarColisaoPowerUp = setInterval(() => {
  verificarColisaoPowerUp();
}, 10);

let checarColisaoExtraUp;
let bloco1 = document.querySelector(".bloco1");
let marioss = document.querySelector(".mario");

function verificarColisaoExtraUp() {
  let marioRectss = marioss.getBoundingClientRect();
  let bloco1UpRect = null;
  if (bloco1 !== null) {
    bloco1UpRect = bloco1.getBoundingClientRect();
  }

  if (
    bloco1UpRect !== null &&
    marioRectss.left < bloco1UpRect.left + bloco1UpRect.width &&
    marioRectss.left + marioRectss.width > bloco1UpRect.left &&
    marioRectss.top < bloco1UpRect.top + bloco1UpRect.height &&
    marioRectss.top + marioRectss.height > bloco1UpRect.top
  ) {
    bloco1.src = "/images/emptyblock.png";
    let audio = new Audio("/soundtracks/powerupappears.wav");
    audio.play();

    document.querySelector(".extra-up").classList.add("extra-up-start");
    bloco1.style.display = "block";

    clearInterval(checarColisaoExtraUp);
  }
}

checarColisaoExtraUp = setInterval(() => {
  verificarColisaoExtraUp();
}, 10);

let checarColisaoFlowerUp;
let bloco2 = document.querySelector(".bloco2");
let marioF = document.querySelector(".mario");

function verificarColisaoFlowerUp() {
  let marioRectf = marioF.getBoundingClientRect();
  let bloco2UpRect = null;
  if (bloco2 !== null) {
    bloco2UpRect = bloco2.getBoundingClientRect();
  }

  if (
    bloco2UpRect !== null &&
    marioRectf.left < bloco2UpRect.left + bloco2UpRect.width &&
    marioRectf.left + marioRectf.width > bloco2UpRect.left &&
    marioRectf.top < bloco2UpRect.top + bloco2UpRect.height &&
    marioRectf.top + marioRectf.height > bloco2UpRect.top
  ) {
    bloco2.src = "/images/emptyblock.png";
    let audio = new Audio("/soundtracks/powerupappears.wav");
    audio.play();

    document.querySelector(".power-up").classList.add("power-up-start");
    bloco2.style.display = "block";

    clearInterval(checarColisaoFlowerUp);
  }
}

checarColisaoFlowerUp = setInterval(() => {
  verificarColisaoFlowerUp();
}, 10);

let checarColisaoFeatherUp;
let bloco3 = document.querySelector(".bloco3");
let marioFa = document.querySelector(".mario");

function verificarColisaoFeatherUp() {
  let marioRectfs = marioFa.getBoundingClientRect();
  let bloco3UpRect = null;
  if (bloco3 !== null) {
    bloco3UpRect = bloco3.getBoundingClientRect();
  }

  if (
    bloco3UpRect !== null &&
    marioRectfs.left < bloco3UpRect.left + bloco3UpRect.width &&
    marioRectfs.left + marioRectfs.width > bloco3UpRect.left &&
    marioRectfs.top < bloco3UpRect.top + bloco3UpRect.height &&
    marioRectfs.top + marioRectfs.height > bloco3UpRect.top
  ) {
    bloco3.src = "/images/emptyblock.png";
    let audio = new Audio("/soundtracks/powerupappears.wav");
    audio.play();

    document.querySelector(".feather").classList.add("feather-start");
    bloco3.style.display = "block";

    clearInterval(checarColisaoFeatherUp);
  }
}

checarColisaoFeatherUp = setInterval(() => {
  verificarColisaoFeatherUp();
}, 10);


let checarColisaocascoredUp;
let cascored = document.querySelector(".cascored");
let mariocas = document.querySelector(".mario");

function verificarColisaocascoredUp() {
  let marioXcas = mariocas.getBoundingClientRect();
  let cascoredUpRect = null;
  if (cascored !== null) {
    cascoredUpRect = cascored.getBoundingClientRect();
  }

  if (
      cascoredUpRect !== null &&
      marioXcas.left < cascoredUpRect.left + cascoredUpRect.width &&
      marioXcas.left + marioXcas.width > cascoredUpRect.left &&
      marioXcas.top < cascoredUpRect.top + cascoredUpRect.height &&
      marioXcas.top + marioXcas.height > cascoredUpRect.top
    ) {
      let audio = document.querySelector(".colision-kick");
      audio.play();
    
      if (marioXcas.left < cascoredUpRect.left) {
        cascored.classList.remove("cascored-right-animation");
        cascored.classList.add("cascored-left-animation");
        setTimeout(() =>{
          cascored.remove();
        },5500);
      } else {
        cascored.classList.remove("cascored-left-animation");
        cascored.classList.add("cascored-right-animation");
        setTimeout(() =>{
          cascored.remove();
        },5500);
      }
    
      cascored.src = "/images/cascored.gif";
      cascored.style.width = "40px";

    clearInterval(checarColisaocascoredUp);
  }
}

checarColisaocascoredUp = setInterval(() => {
  verificarColisaocascoredUp();
}, 10);

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());
document.addEventListener("dragstart", (event) => event.preventDefault());
