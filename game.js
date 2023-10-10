var gamePattern = [];
var userPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;
var timing = 1000;
var userCanInteract = false;

startGame();

function startGame() {
    timing = 1000;
    level = 0;
    userPattern = [];
    gamePattern = [];
    gameStarted = false;
    $("h1").off("click").click(function() {
        if (!gameStarted) {
            gameStarted = true;
            $("h1").text("Level " + level);
            nextSequence();
        }
    });
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var gameChosenColor = buttonColors[randomNumber];
    gamePattern.push(gameChosenColor);
    playPattern(gamePattern);
}

function playPattern(pattern) {
    timing = timing -50;
    var i = 0;
    var interval = setInterval(function() {
        playSound(pattern[i]);
        animatePress(pattern[i])
        i++;
        if (i >= pattern.length) {
            clearInterval(interval);
            userCanInteract = true;
            comparePatterns();
        }
    }, timing);
}

function comparePatterns() {
    $(".btn").off("click").click(function() {
        if (userCanInteract) {
            var userChosenColor =  $(this).attr("id");
            userPattern.push(userChosenColor);
            playSound(userChosenColor);
            animatePress(userChosenColor);
            if (!checkAnswer()) {
                gameOver();
                return;
            }         
            if (userPattern.length === gamePattern.length) {       
                level++;
                $("h1").text("Level " + level);
                userPattern = [];
                userCanInteract = false;
                setTimeout(function() {
                    nextSequence();
                }, 1000);  
            }
        }
    }); 
}

function checkAnswer() {
    for (var x = 0; x < userPattern.length; x++){
        if (userPattern[x] !== gamePattern[x]) {
            return false;
        } 
    }
    return true;
}  

function playSound(name) {
    var mySound = new Audio("sounds/" + name + ".mp3");
    mySound.play();
};

function animatePress(currentColor) {
    var activeButton = $("#" + currentColor);
    activeButton.addClass("pressed");
    setTimeout(function() {
        activeButton.removeClass("pressed"); 
    }, 100);
};

function gameOver() {
    $("h1").text("Game Over, Restart!");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
        playSound("gameOver");
    }, 300);  
    userCanInteract = false;
    startGame();
}
