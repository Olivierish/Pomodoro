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

//Pomodoro
/*
.affichage{
  .bloc .travail{
    p(txt: travail)
    p.affichageT
  }
  .block .pause{
    p(txt:repos)
    p.affichageP
  }
}
.container-btns{
  .btn b1(txt:commencer)
  .btn b2(txt:Pause)
  .btn b3(txt:reset)
}
*/
const pomoContainerElt = document.querySelector(".pomo-info");
const roundsElt = document.querySelector(".rounds");
const timeElt = document.querySelector(".time");
const breakElt = document.querySelector(".break");
const btnsElt = document.querySelector(".btns");
const btnStartElt = document.querySelector(".start");
const btnPauseElt = document.querySelector(".pause");
const btnResetElt = document.querySelector(".reset");

let checkInterval = false; // To avoid the click spams
const initTime = 10,
  initBreak = 9; //30min //5min
let startTime = initTime;
let breakTime = initBreak;
let pause = false;
let roundsNbr = 2;

let timer; //setInterval content

roundsElt.textContent = `Pomodoro ${"🍅".repeat(roundsNbr)}`;

displayTime(timeElt, startTime);
displayTime(breakElt, breakTime);

btnStartElt.addEventListener("click", () => {
  if (checkInterval === false) {
    checkInterval = true;
    pause = false;

    //I added this next 2 instructions here to avoid the delay of 1sec. after the click
    startTime--;
    displayTime(timeElt, startTime);

    timer = setInterval(() => {
      if (pause === false && startTime > 0) {
        startTime--;
        displayTime(timeElt, startTime);
      } else if (pause === false && breakTime === 0 && startTime === 0) {
        startTime = initTime;
        breakTime = initBreak;
        roundsNbr++;
        roundsElt.textContent = `Pomodoro ${"🍅".repeat(roundsNbr)}`;
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
});

window.onload = () => {
  //window.scrollTo(0, document.body.scrollHeight);
  document.querySelector(".mask").scrollIntoView({ behavior: "smooth" });
  document.querySelector(".mask").scrollTop = document.scrollHeight + 0;
};

function displayTime(element, time) {
  element.textContent = `${Math.trunc(time / 60)}:${
    time % 60 < 10 ? `0${time % 60}` : time % 60
  }`;
}
