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
const btnStartElt = document.querySelector(".start");
const btnPauseElt = document.createElement("button");
btnPauseElt.setAttribute("class", "pause");
btnPauseElt.textContent = "Pause";
const btnResetElt = document.querySelector(".reset");

let startTime = 3; //30min
let breakTime = 302; //5min
let isBreak = false;
let roundsNbr = 0;
roundsElt.textContent = `Pomodoro ${roundsNbr}`;
/*
timeElt.textContent = `${Math.trunc(startTime / 60)}:${
  startTime % 60 < 10 ? `0${startTime % 60}` : startTime % 60
}`;*/
displayTime(timeElt, startTime);
/*
breakElt.textContent = `${Math.trunc(breakTime / 60)}:${
  breakTime % 60 < 10 ? `0${breakTime % 60}` : breakTime % 60
}`;*/
displayTime(breakElt, breakTime);
btnStartElt.addEventListener("click", () => {
  //I added this instruction here to avoid the dela of 1sec. after the click

  startTime--;
  timeElt.textContent = `${Math.trunc(startTime / 60)}:${
    startTime % 60 < 10 ? `0${startTime % 60}` : startTime % 60
  }`;

  let timer = setInterval(() => {
    if (startTime > 0) {
      startTime--;
      timeElt.textContent = `${Math.trunc(startTime / 60)}:${
        startTime % 60 < 10 ? `0${startTime % 60}` : startTime % 60
      }`;
    } else if (startTime === 0) {
      timeElt.classList.remove("active");
      breakElt.classList.add("active");
      breakTime--;
      breakElt.textContent = `${Math.trunc(breakTime / 60)}:${
        breakTime % 60 < 10 ? `0${breakTime % 60}` : breakTime % 60
      }`;
    }
  }, 1000);
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
