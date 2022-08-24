const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const modeBtn = document.getElementsByClassName('modebtn');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const btnmode = document.getElementById("btnmode")
let genre = null;

loaduserinput()

function loaduserinput() {
  document.getElementById("username").value = localStorage.getItem("username");
  document.getElementById("myImage").src = localStorage.getItem("myImage");
}

function saveuserinput() {
  const username = document.getElementById("username").value
  const myImage = document.getElementById("myImage").src
  const score = 0;
  if (username == "") {
    alert("!sie müssen einen Username wählen")
  } else {
    localStorage.setItem("score", score);
    localStorage.setItem("myImage", myImage)
    localStorage.setItem("username", username);
    if (!genre) {
      alert("Bitte wähle ein Genre aus!")
    } else {
      window.location.href = `game.html#${genre}`;
    }
  }
}

Array.from(modeBtn).forEach(element => {
  element.addEventListener("click", () => {
    Array.from(document.getElementsByClassName("chosen")).forEach(element => element.classList.remove("chosen"))
    element.classList.add("chosen")
    genre = element.value
  })
});