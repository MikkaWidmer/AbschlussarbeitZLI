const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const mode = document.getElementById("mode");
const btnmode = document.getElementById("btnmode")

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

let hrefTo = "";

function chooseMode(mode) {
  if (mode == "1") {
    hrefTo = "./genre/rap.html"
    localStorage.setItem("hrefTo", hrefTo);
  } else if (mode == "2") {
    hrefTo = "./genre/hiphop.html"
    localStorage.setItem("hrefTo", hrefTo);
  } else if (mode == "3") {
    hrefTo = "./genre/reggae.html"
    localStorage.setItem("hrefTo", hrefTo);
  } else if (mode == "4") {
    hrefTo = "./genre/charts.html"
    localStorage.setItem("hrefTo", hrefTo);
  }
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
    if (hrefTo == "") {
      alert("Bitte wähle ein Genre aus!")
    } else {
      window.location.href = hrefTo;
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

audio.addEventListener('timeupdate', DurTime);