"use strict";
var buttoncolor = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var clickPattern = [];

var start = false;
var level = 0;

$(document).keypress(function () {
  if (!start) {
    $("#level-title").text("level" + level);
    nextSequence();
    start = true;
  }
});
$(".btn").click(function () {
  var chooseColor = $(this).attr("id");
  clickPattern.push(chooseColor);

  playSound(chooseColor);
  animatePress(chooseColor);

  checkAnswer(clickPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === clickPattern[currentLevel]) {
    if (clickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body ").addClass("game-over");
    $("#level-title").text("Game over, Press Any Key to Restart!");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startover();
  }
}

function nextSequence() {
  clickPattern = [];
  level++;
  $("#level-title").text("level" + level);
  var randomNum = Math.floor(Math.random() * 4);
  var randomColor = buttoncolor[randomNum];
  gamePattern.push(randomColor);

  $("#" + randomColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let relpath = `sound/${name}.mp3`;
  let audio = new Audio(relpath);
  audio.play();
}

function startover() {
  level = 0;
  gamePattern = [];
  start = false;
}
