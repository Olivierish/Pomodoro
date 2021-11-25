//navbar & burger menu handling
function toggleClassName() {
  const sidebarElt = document.querySelector(".sidebar");
  const openElt = document.getElementById("open");
  const closeElt = document.getElementById("close");

  sidebarElt.classList.toggle("active");

  if (sidebarElt.classList.contains("active")) {
    openElt.style.display = "none";
    closeElt.style.display = "block";
  } else {
    openElt.style.display = "block";
    closeElt.style.display = "none";
  }
}

const pomoContainerElt = document.querySelector(".pomo-info");
const roundsElt = document.querySelector(".rounds");
const timeElt = document.querySelector(".time");
const breakElt = document.querySelector(".break");
const btnsElt = document.querySelector(".btns");
const btnStartElt = document.querySelector(".start");
const btnPauseElt = document.createElement("button");
btnPauseElt.setAttribute("class", "pause");
btnPauseElt.textContent = "Pause";
const btnResetElt = document.querySelector(".reset");
const ringtoneEndWorkElt = document.querySelector(".ringtone-end-work");
const ringtoneEndBreakElt = document.querySelector(".ringtone-end-break");
const ringtoneEndSessionElt = document.querySelector(".ringtone-end-session");
const coffeeBreakElt = document.querySelector(".coffee-break");

let checkInterval = false; // To avoid the click spams
const initTime = 60 * 1,
  initBreak = 15; 
let startTime = initTime;
let breakTime = initBreak;
let pause = false;
let isReset = false; // To avoid the click spams
let isRinging = false;
let roundsNbr = 0; // A pomodoro session has 4 rounds.

let tl; //Animate Tree timeline GSAP
let myTimer; //setInterval content

roundsElt.textContent = `Pomodoro ${"🍅".repeat(roundsNbr + 1)}`;

displayTime(timeElt, startTime);
displayTime(breakElt, breakTime);

setup(); //Initialize the tree

btnStartElt.addEventListener("click", () => {
  btnsElt.replaceChild(btnPauseElt, btnStartElt);
  if (checkInterval === false) {
    isReset = false;
    checkInterval = true;
    pause = false;
    roundsElt.textContent = `Pomodoro ${"🍅".repeat(roundsNbr + 1)}`;
    playAgain(startTime);
    //I added this next 2 instructions here to avoid the delay of 1sec. after the click
    startTime--;
    displayTime(timeElt, startTime);

    myTimer = setInterval(() => {
      if (startTime === 0 && isRinging === false) {
        ringtoneEndWorkElt.play();
        isRinging = true;
        setup(); //Initialize the tree
        coffeeBreakElt.style.display = "block";
      }
      if (pause === false && startTime > 0) {
        coffeeBreakElt.style.display = "none";
        startTime--;
        displayTime(timeElt, startTime);
      } else if (pause === false && breakTime === 0 && startTime === 0) {
        startTime = initTime;
        breakTime = initBreak;
        coffeeBreakElt.style.display = "none";
        ringtoneEndBreakElt.play();
        playAgain(startTime);
        isRinging = false;
        if (roundsNbr < 3) {
          roundsNbr++;
        } else {
          setTimeout(function () {
            ringtoneEndSessionElt.play();
          }, 2000);
          reset();
          tl.kill();
          setup();
          return;
        }

        roundsElt.textContent = `Pomodoro ${"🍅".repeat(roundsNbr + 1)}`;
        displayTime(timeElt, startTime);
        timeElt.classList.add("active");
        breakElt.classList.remove("active");
      } else if (pause === false && startTime === 0) {
        timeElt.classList.remove("active");
        breakElt.classList.add("active");
        breakTime--;
        displayTime(breakElt, breakTime);
      }
    }, 1000);
  } else {
    return;
  }
});

btnPauseElt.addEventListener("click", () => {
  pause = !pause;
  if (pause) {
    btnPauseElt.textContent = "Start";
    tl.pause();
  } else {
    tl.play();
    btnPauseElt.textContent = "Pause";
  }
});

btnResetElt.addEventListener("click", () => {
  if (isReset == false) {
    reset();
    isReset = true; //They will be no action taken if a user spams the reset button
    setup();
    tl.kill();
  }
});

window.onload = () => {
  document.querySelector(".mask").scrollIntoView({ behavior: "smooth" });
  document.querySelector(".mask").scrollTop = document.scrollHeight + 0;
};

function displayTime(element, time) {
  element.textContent = `${Math.trunc(time / 60)}:${
    time % 60 < 10 ? `0${time % 60}` : time % 60
  }`;
}

function reset() {
  clearInterval(myTimer);
  roundsNbr = 0;
  checkInterval = false;
  startTime = initTime;
  breakTime = initBreak;
  displayTime(timeElt, startTime);
  displayTime(breakElt, breakTime);
  timeElt.classList.add("active");
  breakElt.classList.remove("active");
  if (btnsElt.contains(btnPauseElt)) {
    btnsElt.replaceChild(btnStartElt, btnPauseElt);
  }
}

function setup() {
  TweenMax.set("#shadow", {
    scale: 0,
    transformOrigin: "15px 8px",
  });
  TweenMax.set("#tree", {
    scale: 0,
    transformOrigin: "154px bottom",
  });
  TweenMax.set("#leaf-rb", {
    scale: 0,
    rotation: "-60cw",
    y: -15,
    transformOrigin: "left bottom",
  });
  TweenMax.set("#leaf-rm", {
    scale: 0,
    rotation: "-50cw",
    y: 30,
    transformOrigin: "left bottom",
  });
  TweenMax.set("#leaf-lb", {
    scale: 0,
    rotation: "60cw",
    y: -80,
    transformOrigin: "right bottom",
  });
  TweenMax.set("#leaf-lm", {
    scale: 0,
    rotation: "40cw",
    y: -90,
    transformOrigin: "right bottom",
  });

  TweenMax.set("#leaf-top", {
    scale: 0,
    transformOrigin: "center bottom",
  });

  TweenMax.set("#leaf-rb g", {
    scale: 0,
    transformOrigin: "left 60px",
  });
  TweenMax.set("#leaf-rm g", {
    scale: 0,
    transformOrigin: "22px 140px",
  });
  TweenMax.set("#leaf-lb g", {
    scale: 0,
    transformOrigin: "right 56px",
  });
  TweenMax.set("#leaf-lm g", {
    scale: 0,
    transformOrigin: "106px bottom",
  });
}

function animate(duration) {
  var tl = new TimelineMax({
    delay: 0,
    //repeat: -1,
    //repeatDelay: 2,
    yoyo: true,
  });

  tl.to(
    "#shadow",
    2,
    {
      scale: 1,
    },
    0
  )
    .to(
      "#tree",
      2,
      {
        scale: 1,
      },
      0
    )
    .to(
      "#leaf-rb",
      2,
      {
        scale: 1,
        rotation: "0cw",
        y: 0,
        delay: 0.35,
      },
      0
    )
    .to(
      "#leaf-rm",
      2,
      {
        scale: 1,
        rotation: "0cw",
        y: 0,
        delay: 0.35,
      },
      0
    )
    .to(
      "#leaf-lb",
      2,
      {
        scale: 1,
        rotation: "0cw",
        y: 0,
        delay: 0.35,
      },
      0
    )
    .to(
      "#leaf-lm",
      2,
      {
        scale: 1,
        rotation: "0cw",
        y: 0,
        delay: 0.35,
      },
      0
    )
    .to(
      "#leaf-top",
      2.5,
      {
        scale: 1,
        delay: 0.35,
      },
      0
    )
    .to(
      "#leaf-lb g",
      2.25,
      {
        scale: 1,
        delay: 0.5,
      },
      0
    )
    .to(
      "#leaf-lm g",
      2.25,
      {
        scale: 1,
        delay: 0.6,
      },
      0
    )
    .to(
      "#leaf-rb g",
      2.25,
      {
        scale: 1,
        delay: 0.5,
      },
      0
    )
    .to(
      "#leaf-rm g",
      2.25,
      {
        scale: 1,
        delay: 0.6,
      },
      0
    );
  tl.duration(duration);
  return tl;
}

function stopAndReset() {
  gsap.globalTimeline.clear();
  TweenMax.set("#tree", { clearProps: "all" });
  TweenMax.set("#shadow", { clearProps: "all" });
  TweenMax.set("#leaf-top", { clearProps: "all" });
  TweenMax.set("#leaf-rb", { clearProps: "all" });
  TweenMax.set("#leaf-rm", { clearProps: "all" });
  TweenMax.set("#leaf-lb", { clearProps: "all" });
  TweenMax.set("#leaf-lm", { clearProps: "all" });
  TweenMax.set("#leaf-top", { clearProps: "all" });
  TweenMax.set("#leaf-rb g", { clearProps: "all" });
  TweenMax.set("#leaf-rm g", { clearProps: "all" });
  TweenMax.set("#leaf-lb g", { clearProps: "all" });
  TweenMax.set("#leaf-lm g", { clearProps: "all" });
}

function playAgain(duration) {
  stopAndReset();
  setup();
  tl = animate(duration);
}
