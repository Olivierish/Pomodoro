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
const roundsElt = document.querySelector(".rounds");
const timeElt = document.querySelector(".time");
const btnStartElt = document.querySelector(".start");
const btnPauseElt = document.createElement("button");
btnPauseElt.setAttribute("class", "pause");
btnPauseElt.textContent = "Pause";
const btnResetElt = document.querySelector(".reset");

console.log(roundsElt, timeElt, btnStartElt, btnResetElt, btnPauseElt);

let startTime = 1800; //30min
let breakTime = 300; //5min
let isBreak = false;
let roundsNbr = 0;
roundsElt.textContent = `Pomodoro ${roundsNbr}`;

window.onload = () => {
  //window.scrollTo(0, document.body.scrollHeight);
  document.querySelector(".mask").scrollIntoView({ behavior: "smooth" });
  document.querySelector(".mask").scrollTop = document.scrollHeight + 0;
};
