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
    button.addEventListener("click", (event) => levelcorrect(event.target.innerText))
}

const songs = [
    'Juice WRLD Ft Benny Blanco - Real Shit',
    'Lil Baby, Lil Durk ft Rodwave - Rich Off Pain',
    'Polo G – I Know',
    'Charlie Puth - Light Switch',
    'Poschte',
    'LCone - Chueche feat. Mimiks',
    'Gascho Prix Nachtverbindig'
];

const songIndex = Math.floor(Math.random() * songs.length);
const currentSong = songs[songIndex]

loadSong(currentSong);
populateAnswers(currentSong);

document.getElementById("username").innerText = localStorage.getItem("username");
document.getElementById("score").innerText = localStorage.getItem("score");
document.getElementById("myImage").src = localStorage.getItem("myImage");

function populateAnswers(song) {

    const randomanswer = Math.floor(Math.random() * answerButtons.length);

    Array.from(answerButtons).forEach((button, i) => {
        if (randomanswer == i) {
            button.innerText = song;
        } else {
            const wronganswer = Math.floor(Math.random() * answerButtons.length);
            button.innerText = songs[wronganswer];
            // let a = 0;
            // while (a < 1) {
            // const wronganswer = Math.floor(Math.random() * answerButtons.length);
            // if (randomanswer != wronganswer) {
            // button.innerText = songs[wronganswer];
            // i++;
            // } else{}
            // } 
        }
    })

}

function levelcorrect(givenAnswer) {
    if (givenAnswer == currentSong) {
        let score = document.getElementById("score").innerText = localStorage.getItem("score");
        localStorage.setItem("score", Number(score) + 1);
        window.location = "./game.html"
    }
}

function loadSong(song) {
    title.innerText = "Wie heisst dieser Song?";
    audio.src = `music/${song}.mp3`;
    cover.src = `images/fragezeichen.jpg`;
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

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);