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

// update the ball and player's position

var update = function() {
  ball.update(player.paddle, computer.paddle);
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

// As a player, I want the ball to bounce off the paddles and two sides of the table

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 0) { // hitting the left wall, turn the ball around
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 400) { // hitting the right wall, turn the ball around
    this.x = 395;
    this.x_speed = -this.x_speed;
  }

  if(this.y < 0 || this.y > 600) { // a point was scored so put a new ball on the board
    this.x_speed = 0;
    this.y_speed = 3;
    this.x = 200; // new ball on the middle board
    this.y = 300;
  }

  // calculate what happens when the ball hits a paddle

  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle, hit the ball in the opposite direction
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle, hit the ball in the opposite direction
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }
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
