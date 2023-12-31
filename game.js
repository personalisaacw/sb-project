// game.js

const canvas = document.getElementById('arcade-game');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Player object
const player = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 50,
  width: 100,
  height: 50,
  color: '#ff1493',
  speed: 5,
};

// Heart object
const heart = {
  x: Math.random() * (canvas.width - 30),
  y: 0,
  radius: 15,
  color: '#ff0000',
  speed: 2,
};

// Score
let score = 0;

// Draw player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw heart
function drawHeart() {
  ctx.beginPath();
  ctx.arc(heart.x, heart.y, heart.radius, 0, Math.PI * 2);
  ctx.fillStyle = heart.color;
  ctx.fill();
  ctx.closePath();
}

// Draw score
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Update game objects
function update() {
  // Move heart
  heart.y += heart.speed;

  // Check collision
  if (
    heart.x > player.x &&
    heart.x < player.x + player.width &&
    heart.y > player.y &&
    heart.y < player.y + player.height
  ) {
    // Increase score and reset heart position
    score++;
    heart.x = Math.random() * (canvas.width - 30);
    heart.y = 0;
  }

  // Check if heart reaches the bottom
  if (heart.y > canvas.height) {
    // Reset heart position
    heart.x = Math.random() * (canvas.width - 30);
    heart.y = 0;
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawHeart();
  drawScore();
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Handle player movement
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && player.x > 0) {
    player.x -= player.speed;
  } else if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
});

// Start the game loop
gameLoop();
