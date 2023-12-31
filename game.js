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
let cursorY = canvas.height / 2;

document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX - canvas.getBoundingClientRect().left;
  cursorY = e.clientY - canvas.getBoundingClientRect().top;
});

// Heart class
class Heart {
  constructor() {
    this.x = Math.random() * (canvas.width - 30);
    this.y = Math.random() * (canvas.height - 30);
    this.radius = 15;
    this.color = '#ff0000';
  }

  isCursorInside() {
    const distance = Math.sqrt((this.x - cursorX) ** 2 + (this.y - cursorY) ** 2);
    return distance < this.radius;
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
    if (heart.isCursorInside()) {
      // Increase score and reset heart position
      score++;
      heart.x = Math.random() * (canvas.width - 30);
      heart.y = Math.random() * (canvas.height - 30);
    }
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

// Handle mouse click events
document.addEventListener('click', () => {
  for (const heart of hearts) {
    if (heart.isCursorInside()) {
      // Incr
