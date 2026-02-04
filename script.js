//Declaração de Variáveis
const nomeMusica = document.getElementById('nome-musica');
const nomeArtista = document.getElementById('artista');
let song = document.getElementById('audio');
let img = document.getElementById('img');
const play = document.getElementById('play');
const pause = document.getElementById('pause');
const prev = document.getElementById('previous');
const next = document.getElementById('skip');
const progressContainer = document.getElementById('container-progress');
const shuffle = document.getElementById('shuffle');
const repeat = document.getElementById('repeat');
let currentTime = document.getElementById('current-time');
let totalTime = document.getElementById('total-time');
let like = document.getElementById('like');


// Objetos - Musicas
const musica1 = {
    nomeMusica: 'Towards the Sun',
    nomeArtista: 'Rihanna',
    arquivo: 'musica1',
    like: true,
}
const musica2 = {
    nomeMusica: 'Riot',
    nomeArtista: 'XXXTENTACION',
    arquivo: 'musica2',
    like: false,
}
const musica3 = {
    nomeMusica: 'My Hero',
    nomeArtista: 'Foo Fighters',
    arquivo: 'musica3',
    like: false,
}
const musica4 = {
    nomeMusica: 'Deixa Alagar',
    nomeArtista: 'Grupo Revelação',
    arquivo: 'musica4',
    like: false,
}

let playlist = [musica1, musica2, musica3, musica4];
let sortedPlaylist = [...playlist]
let musicaAtual = 0;
let shuffleVerifier = false;
let repeatVerifier = false;


// Função - Inicializadora
function initialize() {
    img.src = `musicas/${sortedPlaylist[musicaAtual].arquivo}.jpg`;
    song.src = `musicas/${sortedPlaylist[musicaAtual].arquivo}.mp3`;
    nomeMusica.innerText = sortedPlaylist[musicaAtual].nomeMusica;
    nomeArtista.innerText = sortedPlaylist[musicaAtual].nomeArtista;
    likeStyle();
}


// Função - Toca Música
function playMusica() {
    song.play();
    play.style.display = "none";
    pause.style.display = "block";
}


// Função - Pausa Música
function pauseMusica() {
    song.pause();
    play.style.display = "block";
    pause.style.display = "none";
}


// Função - Próxima Música
function nextMusica() {
    musicaAtual++;
    if (musicaAtual > sortedPlaylist.length - 1) {
        musicaAtual = 0;
    }
    initialize();
    playMusica();
}


// Função - Música Anterior
function previousMusica() {
    musicaAtual--;
    if (musicaAtual < 0) {
        musicaAtual = sortedPlaylist.length - 1;
    }
    initialize();
    playMusica();
}


// Função - Atualiza Barra de Progresso
function updateProgress() {
    const progressBar = document.getElementById('current-progress');
    let progress = (song.currentTime / song.duration) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
    currentTime.innerText = convertTime(song.currentTime);
}


// Função - Manipular momento da música
function newDuration(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    let jumpTo = (clickX / width) * song.duration;
    song.currentTime = jumpTo;
}


// Funções - Embaralhar Música
function shufflePlaylist(list) {
    for (let i = list.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [list[i], list[randomIndex]] = [list[randomIndex], list[i]];
    }
}


function shuffleStyle() {
    if (shuffleVerifier) {
        shuffle.style.fontSize = '1.75em';
        shuffle.style.color = 'rgb(238, 61, 30)';
    } else {
        shuffle.style.fontSize = '1.5em';
        shuffle.style.color = 'white';
    }
}

function applyShuffle() {
    shuffleVerifier = !shuffleVerifier;

    if (shuffleVerifier) {
        shufflePlaylist(sortedPlaylist);
    } else {
        sortedPlaylist = [...playlist];
    }

    shuffleStyle();
    musicaAtual = 0;
    initialize();
}


// Função - Repetição da música
function repeatStyle() {
        if (repeatVerifier == false) {
        repeat.style.fontSize = '1.75em';
        repeat.style.color = 'rgb(238, 61, 30)';
    } else {
        repeat.style.fontSize = '1.5em';
        repeat.style.color = 'white';
    }
}


function repeatSong() {
    repeatVerifier = !repeatVerifier;
    repeatStyle();
}


// Função - Fim da música
function endSong() {
    if (repeatVerifier) {
        song.currentTime = 0;
        playMusica();
    } else {
        nextMusica();
    }
}


// Funções - timer
function maxTime() {
    totalTime.innerText = convertTime(song.duration);
}

function convertTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time - min*60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}


// Função - like
function likeStyle() {
    if (sortedPlaylist[musicaAtual].like) {
        like.style.fontSize = '1.75em';
        like.style.color = 'rgb(238, 61, 30)';
    } else {
        like.style.fontSize = '1.5em';
        like.style.color = 'white';
    }
}


function buttonIsLiked() {
    sortedPlaylist[musicaAtual].like = !sortedPlaylist[musicaAtual].like
    likeStyle();
}

initialize();

// Eventos de Clique
song.addEventListener('ended', endSong)
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('loadedmetadata', maxTime);
play.addEventListener('click', playMusica);
pause.addEventListener('click', pauseMusica);
prev.addEventListener('click', previousMusica);
next.addEventListener('click', nextMusica);
progressContainer.addEventListener('click', newDuration);
shuffle.addEventListener('click', applyShuffle);
repeat.addEventListener('click', repeatSong);
like.addEventListener('click', buttonIsLiked);