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
let answerButtons = document.getElementsByClassName("answer");

for (let button of answerButtons) {
    button.addEventListener("click", (event) => levelcorrect(event.target))
}


const rap = [
    'Juice WRLD Ft Benny Blanco - Real Shit',
    'Lil Baby, Lil Durk ft Rodwave - Rich Off Pain',
    'Polo G – I Know',
    'Charlie Puth - Light Switch',
    'Poschte',
    'LCone - Chueche feat. Mimiks',
    'Gascho Prix Nachtverbindig'
];

const pop = [
    "pop song 1",
    "pop song 2",
    "pop song 3",
    "pop song 4",
    "pop song 5",
    "pop song 6",
    "pop song 7",
    "pop song 8"
];

let mode = localStorage.getItem("mode");
let songs;
let folder;

function levelsongs(){
    debugger
    if(mode=="1"){
        songs = rap
        folder = rap
    } else if(mode=="2"){
        songs = pop
    }
}
levelsongs()
const songIndex = Math.floor(Math.random() * songs.length);
const currentSong = songs[songIndex]

loadSong(currentSong);
populateAnswers(currentSong);

document.getElementById("username").innerText = localStorage.getItem("username");
document.getElementById("score").innerText = localStorage.getItem("score");
document.getElementById("myImage").src = localStorage.getItem("myImage");


function shuffle(list) {
    return Array.from(list).sort((a, b) => 0.5 - Math.random());
}

function populateAnswers(song) {
    const shuffledSongs = shuffle(songs.filter(other => other != song))
    const answers = shuffle(shuffledSongs.slice(-3).concat([song]))

    Array.from(answerButtons).forEach(button => { button.innerText = answers.pop() })
}

let timeout;

function wait() {
    timeout = setTimeout(gonextlvl, 300);
}

function waitwrong() {
    timeout = setTimeout(wronganswer, 300);
}

function gonextlvl() {
    location.reload();
}

function wronganswer() {
    window.location = "./congrats.html"
}

function levelcorrect(pressedButton) {
    if (pressedButton.innerText == currentSong) {
        let score = document.getElementById("score").innerText = localStorage.getItem("score");
        localStorage.setItem("score", Number(score) + 1);
        pressedButton.classList.add("correctanswer")
        wait()
    } else {
        pressedButton.classList.add("wronganswer")
        waitwrong()
    }
}

function loadSong(song, folder) {
    title.innerText = "Wie heisst dieser Song?";
    audio.src = `./music/${song}.mp3`;
    cover.src = `./images/fragezeichen.jpg`;
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

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);