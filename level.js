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

const genres = {
    reggae: [
        'Max Romeo - Chase The Devil',
        'Damian _ Jr. Gong_ Marley - Welcome To Jamrock',
        'Alborosie - Kingston Town',
        'Sister Nancy - BAM BAM',
        'Eek-a-mouse - anarexol',
        'Damian Marley - Road to Zion',
        'Eek-a-Mouse - Ganja Smuggling',
        'Eek-a-Mouse - Wa-Do-Dem',
        'Chaka Demus & Pliers - Murder She Wrote',
        'M-Beat - Incredible',
        'Bob Marley - Could You Be Loved',
        'Bob Marley - Kaya',
        'Wiz Khalifa Ft. Alborosie - Still Blazin',
        'Bob Marley - Is This Love',
        'Inner Circle - Sweat',
        'Bob Marley - Buffalo Soldier',
        'Gentleman - Superior',
        'Snoop Lion - _ Smoke The Weed_ ft. Collie Buddz',
        'Bob Marley - Three Little Birds',
        'Bob Marley - Jammin',
        'Alpha Blondy - I Wish You Were Here',
        'Bob Marley - Natural Mystic',
        'Patrice - Soulstorm',
        'Junior Kelly - Rasta Should Be Deeper',
        'Bob Marley - Pimpers Paradise',
        'Yellowman - Zungguzungguguzungguzeng',
    ],
    rap: [
        'Juice WRLD Ft Benny Blanco - Real Shit',
        'Lil Baby, Lil Durk ft Rodwave - Rich Off Pain',
        'Polo G – I Know',
        'Charlie Puth - Light Switch',
        'Poschte',
        'LCone - Chueche feat. Mimiks',
        'Gascho Prix Nachtverbindig'
    ],
    pop: [
        'Kygo, Selena Gomez – It Aint Me',
        'Ariana Grande - Into You',
        'The Wanted - Glad You Came',
        'P!nk - Who Knew',
        'Flo Rida - My House',
        'Katy Perry - Hot N Cold',
        'Justin Bieber - Peaches',
        'Sara Bareilles - Love Song',
        'Selena Gomez - Love You Like a Love Song',
        'Ke$ha - Die Young',
        'twenty one pilots - Ride',
        'The Chainsmokers - Closer',
        'Ariana Grande ft. Nicki Minaj - Side To Side',
        'Demi Lovato - Heart Attack',
        'Charlie Puth - We Dont Talk Anymore',
        'Taylor Swift - Shake It Off',
        'Avicii - Wake Me Up',
        'Dua Lipa - New Rules',
        'The Weeknd - Blinding Lights',
        'Charlie Puth - Attention',
        'Shawn Mendes ‒ Theres Nothing Holding Me Back',
        'David Guetta & Sia - Flames',
        'Avril Lavigne - Complicated',
        'Aaliyah - Are You That Somebody',
        'Chris Brown - Run It!',
        'The Chainsmokers & Coldplay - Something Just Like This',
        'Ed Sheeran - Perfect',
        'Portugal. The Man - Feel It Still',
        'Pharrell Williams - Happy',
        'Britney Spears - Oops! I Did It Again',
        'One Direction - Drag Me Down',
        'Meghan Trainor - All About That Bass',
        'Lil Nas X - Old Town Road',
        'Britney Spears - Toxic',
        'Taylor Swift - 22',
        'Echosmith - Cool Kids',
    ]
}

const genre = window.location.hash.replace("#", "")
let mode = localStorage.getItem("mode");
let songs = genres[genre];
let folder;

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
    audio.src = `./music/${genre}/${song}.mp3`;
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