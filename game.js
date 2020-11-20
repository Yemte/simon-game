var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
//this is  a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
var level = 0;
$(document).keydown(function() {
  if (!started) {
    // the h1 one header changes and displays the level of the game
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});
// a function the next sequence color
function nextSequence() {
  // reset the userClickedPattern array to empty
  userClickedPattern = [];
  // increase the level by one
  level++;
  // displays  the level of the game by changing h1's text
  $("#level-title").text("level " + level);
// random number from 0 t0 3
  var randomNumber = Math.round(Math.random() * 3);
// choose a random color from the button colors array  using the random number generated
  var randomChosenColor = buttonColors[randomNumber];
  // add the chosen random color to at the end of the game pattern array
  gamePattern.push(randomChosenColor);
// flash the random chosen color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
// play the sound for the random chosen color
  playSound(randomChosenColor);

}
// a function applied to all the buttones clicked with a class button
// use the clicked button id to add the clickedbutoncolor to the end of  userclickedbutton array
// calls the functions playsound() to play sound using the name of the color userChosenColor
// animatepress(),for the animation or flash the buttones
// calls checkAnswer()
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1)

});
// a function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// the function for the flash animation
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
// the function which checks if the answer is correct or not
// if player chosen color from useer clicked pattern is equal to the color in game gamePattern
// if the length of the aray in user clicked pattern array is equal to the length of the game pattern array,then it a success other wise its wrong
// calls the nextsequence() function  after a 100 milisecond delay
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("sucess");
  if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }
    }
else{
  console.log("wrong");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart")
  startOver();
}
}
// its a function to start over again and resets the level, gamepattern[] and started
function startOver(){
  level = 0;
  gamePattern =[];
  started = false;
}
