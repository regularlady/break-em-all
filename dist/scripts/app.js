var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60) };

  var canvas = document.createElement('canvas');
  var width = 400;
  var height = 520;
  canvas.width = width;
  canvas.height = height;
  var context = canvas.getContext('2d');

  window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
  };

  var step = function() {
    update();
    render();
    animate(step);
  };

  var update = function() {

  };

// Use an object constructor to create paddles.

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

// Append a method named render to each of the four constructor's prototypes, for example: Paddle.prototype.render.

Paddle.prototype.render = function() {
  context.fillStyle = "#FFFFFF";
  context.fillRect(this.x, this.y, this.width, this.height);
};

// Use an object constructor to create the player's paddle.

function Player() {
  this.paddle = new Paddle(175, 580, 50, 10);
}

// Use an object constructor to create the computer's paddle.

function Computer() {
  this.paddle = new Paddle(175, 10, 50, 10);
}

// render the player's constructor prototype

Player.prototype.render = function() {
  this.paddle.render();
};

// render the player's constructor prototype

Computer.prototype.render = function() {
  this.paddle.render();
};

// Use an object constructor to create the ball.

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 0;
  this.y_speed = 3;
  this.radius = 5;
}

Ball.prototype.render = function() {
  context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "#FFFFFF";
  context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

var render = function() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
  };
