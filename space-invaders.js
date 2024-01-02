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

    function handleMouseMove(event) {
        const mouseX = event.clientX / window.innerWidth; // Normalize mouse position to a percentage
        const newSpaceshipX = mouseX * 100;
        spaceshipX = Math.max(0, Math.min(100, newSpaceshipX));
        spaceshipElement.style.left = `${spaceshipX}%`;
    }

    document.addEventListener('mousemove', handleMouseMove);

    function createAliens() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 5; j++) {
                const alien = document.createElement('div');
                alien.classList.add('alien');
                alien.style.left = `${j * 120}px`;
                alien.style.top = `${i * 50}px`;
                aliens.push(alien);
                aliensElement.appendChild(alien);
            }
        }
    }

    function moveAliens() {
        aliens.forEach((alien) => {
            const currentTop = parseFloat(alien.style.top) || 0;
            alien.style.top = `${currentTop + 0.1}px`; // Adjust the speed by changing this value

            if (currentTop > spaceInvadersElement.clientHeight - 40) {
                // Alien touched the bottom
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
    }

    function moveBullets() {
        bullets.forEach((bullet, index) => {
            const currentTop = parseFloat(bullet.style.bottom) || 50;
            bullet.style.bottom = `${currentTop + 2}px`; // Adjust the speed by changing this value

            if (currentTop > spaceInvadersElement.clientHeight) {
                bullet.remove();
                bullets.splice(index, 1);
            }

            checkCollision(bullet);
        });
    }

    function checkCollision(bullet) {
        aliens.forEach((alien, alienIndex) => {
            if (isColliding(bullet, alien)) {
                bullet.remove();
                bullets = bullets.filter((b) => b !== bullet);

                alien.remove();
                aliens = aliens.filter((a) => a !== alien);
                score++;
                scoreElement.textContent = `Score: ${score}`;
            }
        });
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
        bullets.forEach((bullet) => bullet.remove());
        aliens.forEach((alien) => alien.remove());
        bullets = [];
        aliens = [];
        score = 0;
        lives = 3;
        livesElement.textContent = `Lives: ${lives}`;
        scoreElement.textContent = `Score: ${score}`;
        createAliens();
        updateGame();
    }

    function autoShoot() {
        setInterval(() => {
            shootBullet();
        }, 300); // Adjust the interval for faster shooting
    }

    createAliens();
    updateGame();
    autoShoot();
});
