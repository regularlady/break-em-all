/*  tells the browser that you wish to perform an animation and requests
that the browser call a specified function to update an animation before
the next repaint. */

var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

// initalize the canvas to paint on
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);
var keysDown = {};

var render = function() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
  };

var update = function() {
  player.update();
  };

// action that will act as animate's callback

var step = function() {
   update();
   render();
   animate(step);
 };

// Use an object constructor to create paddles.

function Paddle(x, y, width, height) {
 this.x = x;
 this.y = y;
 this.width = width;
 this.height = height;
 this.x_speed = 0;
 this.y_speed = 0;
};

// Append a method named render to each of the four constructor's prototypes, for example: Paddle.prototype.render.

Paddle.prototype.render = function() {
  context.fillStyle = "#FFFFFF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

/* The method should update the current position of a paddle based on how
many pixels the paddle should move in a single key press.
Additionally, the method should take into account edge cases,
such as if the paddle moves all the way to either edge of the table: */

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) {
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 400) {
    this.x = 400 - this.width;
    this.x_speed = 0;
  }
};

// Use an object constructor to create, then render the computer's paddle.

function Computer() {
  this.paddle = new Paddle(175, 10, 50, 10);
};

Computer.prototype.render = function() {
  this.paddle.render();
};

// Use an object constructor to create, then render the player's paddle.

function Player() {
   this.paddle = new Paddle(175, 580, 50, 10);
};

Player.prototype.render = function() {
  this.paddle.render();
};

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 37) {
      this.paddle.move(-5, 0);
    } else if (value == 39) {
      this.paddle.move(5, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

// Use an object constructor to create, then render the ball.

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
};

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();
};

// The animation needs an initial trigger, such as when the window first loads.

document.body.appendChild(canvas);
animate(step);

/* Window object to listen for the player's key presses */

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});
