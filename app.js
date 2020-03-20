var words = ["rainbow","tablefan","beering","chairman"];
var previousCard = '';
var presentCard = '';
var score = 0;
var riddleCount =0;
var visited =[];

window.onload=function(){
    var cards = document.querySelectorAll('.memory-card');
    (function shuffle() {
        cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 8);
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
    popUp = setInterval(startGame,1000);
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
    console.log("welcome");
    this.classList.toggle('flip');
    presentCard = this.classList[1];
    console.log("this -->",this);
    console.log(previousCard ,presentCard);
    if (previousCard != '' && presentCard != '') {
        if(checkTheWord(previousCard+presentCard)==true){
            score += 10;
            document.getElementById("score").textContent = score;
            riddleCount += 1;
            endOfGame = setInterval(checkEndOfTheGame,1000);
            //console.log("score",score);
            //fixToFrontFace();
            previousCard = '';
            presentCard ='';
            riddle = setInterval(nextRiddle,1000);
        }else{
            // // flipToBack(this);
            // console.log("-->",this,visited);
            // console.log(visited[0],visited[1]);
            // visited[0].toggle('flip');
            // visited[1].toggle('flip');
            // visited = [];
        }   
    }
}

function playAudio(url) {
    new Audio(url).play();
}

function checkEndOfTheGame(){
    if(words.length <= riddleCount){
        // console.log("Game Over");
        clearInterval(displayTime);
        alert("Game Over!! Your SCORE:"+score);
        window.open("index.html");
    }
    clearInterval(endOfGame);
}

// function flipToBack(){
//     console.log("-->",this);
    

// }

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


// function hideCards(){
//     //document.getElementsByClassName("front-face").style
//     //document.getElementsByClassName('.memory-card').classList.add('flip');
//     //console.log(document.getElementsByClassName('.front-face').style);
//     //console.log(document.getElementsByClassName(".memory-card").classList);
//     //console.log(document.getElementsByClassName('front-face'));
//     //console.log(document.querySelectorAll('.memory-card'));
//     frontFace = document.getElementsByClassName('front-face');
//     for(var i=0 ; i < frontFace.length ; i++){
//         frontFace[i].style.display="none";
//     }    
//     //unlockCards();
// }



//cards.forEach(card => card.addEventListener('click', flipCard));
//cards.forEach(card => card.onclick(flipCard));
// console.log(document.getElementById('btn'));
// document.getElementById("btn").addEventListener('click',flipCard);
//.addEventListener('click',flipCard);
// document.getElementById("myBtn").addEventListener("click", function(){
//     document.getElementById("demo").innerHTML = "Hello World";
//   },false);