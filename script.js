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

const songs = [
  'Juice WRLD Ft Benny Blanco - Real Shit',
  'Lil Baby, Lil Durk ft Rodwave - Rich Off Pain',
  'Polo G – I Know',
  'Charlie Puth - Light Switch',
  'Poschte',
  'LCone - Chueche feat. Mimiks',
  'Gascho Prix Nachtverbindig'
];

let songIndex = 2;

loadSong(songs[songIndex]);

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

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

audio.addEventListener('timeupdate', durTime);

Array.from(modeBtn).forEach(element => {
  element.addEventListener("click", () => {
    Array.from(document.getElementsByClassName("chosen")).forEach(element => element.classList.remove("chosen"))
    element.classList.add("chosen")
    genre = element.value
  })
});