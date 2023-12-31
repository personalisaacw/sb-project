// game.js

const canvas = document.getElementById('arcade-game');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Score
let score = 0;

// Hearts array
const hearts = [];

// Add event listener to track cursor position
let cursorX = canvas.width / 2;
document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX - canvas.getBoundingClientRect().left;
});

// Heart class
class Heart {
  constructor() {
    this.x = Math.random() * (canvas.width - 30);
    this.y = 0;
    this.radius = 15;
    this.color = '#ff0000';
    this.speed = 2;
  }

  update() {
    this.y += this.speed;

    // Check collision with cursor
    const distance = Math.sqrt((this.x - cursorX) ** 2 + (this.y - canvas.height) ** 2);
    if (distance < this.radius) {
      // Increase score and reset heart position
      score++;
      this.x = Math.random() * (canvas.width - 30);
      this.y = 0;
    }

    // Check if heart reaches the bottom
    if (this.y > canvas.height) {
      // Reset heart position
      this.x = Math.random() * (canvas.width - 30);
      this.y = 0;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// Create initial hearts
for (let i = 0; i < 5; i++) {
  hearts.push(new Heart());
}

// Draw score
function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// Update game objects
function update() {
  for (const heart of hearts) {
    heart.update();
  }
}

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const heart of hearts) {
    heart.draw();
  }

  drawScore();
}

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
