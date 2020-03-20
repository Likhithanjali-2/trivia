var words = ["rainbow","tablefan","beering","chairman","lipstick","newspaper","goldfish","facebook"];
var previousCard = '';
var presentCard = '';
var score = 0;
var riddleCount =0;
var visited =[];

window.onload=function(){
    var cards = document.querySelectorAll('.memory-card');

    (function shuffle() {
        cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 16);
        card.style.order = ramdomPos;
        });
    })();
   show = setInterval(start,1000*10);

   cards.forEach(card => card.addEventListener('click',flipCard));
}

function start(){
    hideCards();
    clearInterval(show);
    var minutes = 60 * 1,
    display= document.querySelector('#time');
    displayTime = startTimer(minutes, display);
    popUp = setInterval(startGame,100);
}

function hideCards(){
    var cards = document.querySelectorAll('.memory-card');
    for (var i = 0; i < cards.length; i++) {
        cards[i].classList.toggle('flip');
    }
}

function flipCard(){
    playAudio('Card-flip-sound-effect.mp3');
    previousCard = presentCard ;
    this.classList.toggle('flip');
    presentCard = this.classList[1];
    if (previousCard != '' && presentCard != '') {
        if(checkTheWord(previousCard+presentCard)==true){
            score += 10;
            document.getElementById("score").textContent = score;
            riddleCount += 1;
            endOfGame = setInterval(checkEndOfTheGame,100);
            previousCard = '';
            presentCard ='';
            riddle = setInterval(nextRiddle,100);
        }
    }
}

function playAudio(url) {
    new Audio(url).play();
}

function checkEndOfTheGame(){
    if(words.length <= riddleCount){
        clearInterval(displayTime);
        alert("Game Over!! Your SCORE:"+score);
        window.open("index.html");
    }
    clearInterval(endOfGame);
}

function checkTheWord(word){
    if(words[riddleCount]==word)
        return true;
    return false;
}

function nextRiddle(){
    clearInterval(riddle);
    if(words.length > riddleCount)
        alert("MatchUp the word '"+words[riddleCount]+"'.");
}

function startGame(){
    riddle = setInterval(nextRiddle,2000);
    clearInterval(popUp)
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    temp = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        trackTime = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
            if(score > 0){
                alert("Game Over!! Your SCORE:"+score);
                window.open("index.html");
            }
            else{
                alert("Game Over!! Sorry You lost this game");
            }
            display.style.color ="red";
            clearInterval(temp);
            window.open("index.html");
            return;
        }
    }, 1000);
}