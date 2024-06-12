document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = {
        x: canvas.width / 2,
        y: canvas.height - 100,
        width: 50,
        height: 100,
        speed: 5,
        dx: 0,
        dy: 0
    };

    function drawPlayer() {
        ctx.fillStyle = 'cyan';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function newPos() {
        player.x += player.dx;
        player.y += player.dy;

        detectWalls();
    }

    function detectWalls() {
        // Left wall
        if (player.x < 0) {
            player.x = 0;
        }

        // Right Wall
        if (player.x + player.width > canvas.width) {
            player.x = canvas.width - player.width;
        }

        // Top wall
        if (player.y < 0) {
            player.y = 0;
        }

        // Bottom wall
        if (player.y + player.height > canvas.height) {
            player.y = canvas.height - player.height;
        }
    }

    function update() {
        clear();
        drawPlayer();
        newPos();
        requestAnimationFrame(update);
    }

    function moveUp() {
        player.dy = -player.speed;
    }

    function moveDown() {
        player.dy = player.speed;
    }

    function moveRight() {
        player.dx = player.speed;
    }

    function moveLeft() {
        player.dx = -player.speed;
    }

    function keyDown(e) {
        if (e.key === 'ArrowRight' || e.key === 'd') {
            moveRight();
        } else if (e.key === 'ArrowLeft' || e.key === 'a') {
            moveLeft();
        } else if (e.key === 'ArrowUp' || e.key === 'w') {
            moveUp();
        } else if (e.key === 'ArrowDown' || e.key === 's') {
            moveDown();
        }
    }

    function keyUp(e) {
        if (
            e.key === 'ArrowRight' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowUp' ||
            e.key === 'ArrowDown' ||
            e.key === 'd' ||
            e.key === 'a' ||
            e.key === 'w' ||
            e.key === 's'
        ) {
            player.dx = 0;
            player.dy = 0;
        }
    }

    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);

    update();
});
