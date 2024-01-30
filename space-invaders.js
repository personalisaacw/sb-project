document.addEventListener('DOMContentLoaded', function () {
    const spaceInvadersElement = document.getElementById('space-invaders');
    const spaceshipElement = document.getElementById('spaceship');
    const bulletsElement = document.getElementById('bullets');
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const aliensElement = document.getElementById('aliens');

    let spaceshipX = 50;
    let bullets = [];
    let aliens = [];
    let score = 0;
    let lives = 3;
    let waveShapes = ['pyramid', 'inverted-pyramid', 'oval', 'donut'];
    let gameActive = false;

    function createExplosion(left, top) {
        const explosion = document.createElement('div');
        explosion.classList.add('explosion');
        explosion.style.left = `${left - 25}px`;
        explosion.style.top = `${top - 20}px`;
        spaceInvadersElement.appendChild(explosion);

        setTimeout(() => {
            explosion.remove();
        }, 1000);
    }

    function handleMouseMove(event) {
        if (gameActive) {
            const mouseX = event.clientX / window.innerWidth;
            const newSpaceshipX = mouseX * 100;
            spaceshipX = Math.max(0, Math.min(100, newSpaceshipX));
            spaceshipElement.style.left = `${spaceshipX}%`;
        }
    }

    document.addEventListener('mousemove', handleMouseMove);

    function handleKeyDown(event) {
        if (gameActive) {
            if (event.key === 'ArrowLeft') {
                spaceshipX -= 5;
            } else if (event.key === 'ArrowRight') {
                spaceshipX += 5;
            }

            spaceshipX = Math.max(0, Math.min(100, spaceshipX));
            spaceshipElement.style.left = `${spaceshipX}%`;
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    function createAliens(shape) {
        clearAliens(); // Clear previous aliens
        switch (shape) {
            case 'pyramid':
                createPyramidAliens();
                break;
            case 'inverted-pyramid':
                createInvertedPyramidAliens();
                break;
            case 'oval':
                createOvalAliens();
                break;
            case 'donut':
                createDonutAliens();
                break;
            default:
                break;
        }
    }

    function clearAliens() {
        aliens.forEach((alien) => alien.remove());
        aliens = [];
    }
    
// Updated createPyramidAliens function with adjusted startX
function createPyramidAliens() {
    const numRows = 3;
    const alienWidth = 70;
    const alienHeight = 30;
    const spaceBetweenRows = 20;
    
    // Adjusted startX value
    const startX = 410; // Change this value to your desired horizontal position
    
    const startY = -130;

    const rows = [
        { numAliens: 5 },
        { numAliens: 3 },
        { numAliens: 1 }
    ];

    rows.forEach((row, rowIndex) => {
        const numAliensInRow = row.numAliens;
        const rowWidth = numAliensInRow * alienWidth + (numAliensInRow - 1) * spaceBetweenRows;
        const rowStartX = startX - rowWidth / 2;

        for (let j = 0; j < numAliensInRow; j++) {
            const leftOffset = j * (alienWidth + spaceBetweenRows);
            createAlien(rowStartX + leftOffset, startY + rowIndex * (alienHeight + spaceBetweenRows));
        }
    });
}


function createInvertedPyramidAliens() {
    const numRows = 3;
    const alienWidth = 70;
    const alienHeight = 30;
    const spaceBetweenRows = 20;
    
    // Adjusted startX value
    const startX = 410; // Change this value to your desired horizontal position
    
    const startY = -130;

    const rows = [
        { numAliens: 1 },
        { numAliens: 3 },
        { numAliens: 5 }
    ];

    rows.forEach((row, rowIndex) => {
        const numAliensInRow = row.numAliens;
        const rowWidth = numAliensInRow * alienWidth + (numAliensInRow - 1) * spaceBetweenRows;
        const rowStartX = startX - rowWidth / 2;

        for (let j = 0; j < numAliensInRow; j++) {
            const leftOffset = j * (alienWidth + spaceBetweenRows);
            createAlien(rowStartX + leftOffset, startY + rowIndex * (alienHeight + spaceBetweenRows));
        }
    });
}
    
    // Update createOvalAliens function
    function createOvalAliens() {
        const numAliens = 16;
        const alienWidth = 70;
        const alienHeight = 30;
        const radiusX = 200;
        const radiusY = 80;
        const centerX = spaceInvadersElement.clientWidth / 2;
        const centerY = -130;
    
        for (let i = 0; i < numAliens; i++) {
            const angle = (i / numAliens) * 2 * Math.PI;
            const x = centerX + radiusX * Math.cos(angle) - alienWidth / 2;
            const y = centerY + radiusY * Math.sin(angle) - alienHeight / 2;
            createAlien(x, y);
        }
    }
    
    // Update createDonutAliens function
    function createDonutAliens() {
        const numAliens = 24;
        const alienWidth = 70;
        const alienHeight = 30;
        const outerRadius = 150;
        const innerRadius = 80;
        const centerX = spaceInvadersElement.clientWidth / 2;
        const centerY = -130;
    
        for (let i = 0; i < numAliens; i++) {
            const angle = (i / numAliens) * 2 * Math.PI;
            const x = centerX + outerRadius * Math.cos(angle) - alienWidth / 2;
            const y = centerY + outerRadius * Math.sin(angle) - alienHeight / 2;
            createAlien(x, y);
        }
    
        for (let i = 0; i < numAliens; i++) {
            const angle = (i / numAliens) * 2 * Math.PI;
            const x = centerX + innerRadius * Math.cos(angle) - alienWidth / 2;
            const y = centerY + innerRadius * Math.sin(angle) - alienHeight / 2;
            createAlien(x, y);
        }
    }         

    function createAlien(left, top) {
        const alien = document.createElement('div');
        alien.classList.add('alien');
        alien.style.left = `${left}px`;
        alien.style.top = `${top}px`;
        aliens.push(alien);
        aliensElement.appendChild(alien);
    }

    let moveDirection = 1; // 1 for right, -1 for left
    let moveCounter = 0; // To track the movement distance
    
    function moveAliens() {
        aliens.forEach((alien) => {
            const currentTop = parseFloat(alien.style.top) || 0;
            const currentLeft = parseFloat(alien.style.left) || 0;
    
            // Move 10,000 pixels to the right initially
            if (moveCounter < 10000) {
                alien.style.left = `${currentLeft + moveDirection * 0.1}px`;
            } else {
                // Enter the loop after moving 10,000 pixels right
                const loopCounter = moveCounter - 10000;
    
                // Move 20,000 pixels left, then 20,000 pixels right in a loop
                if (loopCounter < 20000) {
                    alien.style.left = `${currentLeft - 0.1}px`; // Move left
                } else {
                    alien.style.left = `${currentLeft + 0.1}px`; // Move right
                }
    
                // Reset the loop after completing both left and right movements
                if (loopCounter >= 40000) {
                    moveCounter = 0;
                }
            }
    
            // Update the top position
            alien.style.top = `${currentTop + 0.1}px`;
    
            // Increment the moveCounter
            moveCounter++;
    
            if (currentTop > spaceInvadersElement.clientHeight - 40) {
                // If an alien reaches the bottom, decrement lives and reset aliens
                lives--;
                livesElement.textContent = `Lives: ${lives}`;
                resetAliens();
            }
        });
    }
    
          

    function resetAliens() {
        aliens.forEach((alien) => {
            alien.style.top = '0px';
        });
    }

    function shootBullet() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = `${spaceshipX}%`;
        bulletsElement.appendChild(bullet);
        bullets.push(bullet);

        playShootSound();
    }

    function playShootSound() {
        const shootSound = document.getElementById('shootSound');
        shootSound.volume = 0.1;
        shootSound.currentTime = 0; // Rewind to the beginning to allow rapid successive plays
        shootSound.play();
    }

    function moveBullets() {
        bullets.forEach((bullet, index) => {
            const currentTop = parseFloat(bullet.style.bottom) || 50;
            bullet.style.bottom = `${currentTop + 2}px`;

            if (currentTop > spaceInvadersElement.clientHeight) {
                bullet.remove();
                bullets.splice(index, 1);
            }

            checkCollision(bullet);
        });
    }

    function checkCollision(bullet) {
        let collisionDetected = false;
    
        aliens.forEach((alien, alienIndex) => {
            if (isColliding(bullet, alien)) {
                bullet.remove();
                bullets = bullets.filter((b) => b !== bullet);
 
                createExplosion(
                    parseFloat(alien.style.left) + alien.clientWidth / 2,
                    parseFloat(alien.style.top) + alien.clientHeight / 2
                );   

                alien.remove();
                aliens = aliens.filter((a) => a !== alien);
                score += 10000;
                collisionDetected = true;
                playAlienDeathSound(); // Play the alien death sound
            }
        });
    
        if (collisionDetected) {
            updateScore();
        }
    
        if (aliens.length === 0) {
            nextWave();
        }
    }    
    
    function playAlienDeathSound() {
        const alienDeathSound = document.getElementById('alienDeathSound');
        alienDeathSound.volume = 0.1; // Adjust the volume as needed
        alienDeathSound.currentTime = 0; // Rewind to the beginning to allow rapid successive plays
        alienDeathSound.play();
    }

    function updateScore() {
        scoreElement.textContent = score;
    }

    function nextWave() {
        const randomShape = waveShapes[Math.floor(Math.random() * waveShapes.length)];
        createAliens(randomShape);
    }

    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
    
        return (
            rect1.top < rect2.bottom &&
            rect1.bottom > rect2.top &&
            rect1.left < rect2.right &&
            rect1.right > rect2.left
        );
    }
    
    function updateGame() {
        moveAliens();
        moveBullets();

        if (lives <= 0) {
            alert('Game Over! Your score is ' + score);
            resetGame();
        } else {
            requestAnimationFrame(updateGame);
        }
    }

    function resetGame() {
        clearAliens(); // Clear aliens when resetting the game
        bullets.forEach((bullet) => bullet.remove());
        bullets = [];
        score = 0;
        lives = 3;
        livesElement.textContent = `Lives: ${lives}`;
        updateScore();
        createAliens(waveShapes[0]);
    }

    function autoShoot() {
        setInterval(() => {
            if (gameActive) {
                shootBullet();
            }
        }, 300);
    }

    function startGame() {
        gameActive = true;
        document.querySelector('.start-container').style.display = 'none';
        document.getElementById('gameContainer').style.display = 'block';
        resetGame();
        updateGame();
        autoShoot();
    }

    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', startGame);

    resetGame();
});
