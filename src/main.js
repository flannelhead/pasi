window.addEventListener('load', main);

function initialWorld(width, height) {
    var sheet = new SpriteSheet(document.getElementById('pasi'), 4);
    return {
        keys: {left: false, right: false},
        gamma: 0,

        width: width,
        height: height,
        g: 1,

        pasi: new Pasi({
            spriteSheet: sheet,
            x: width / 2,
            y: height - sheet.spriteHeight,
            nLeapTicks: 4,
            speed: 4,
            jumpSpeed: 12,
            gammaFactor: 1
        }),

        platformGenerator: new PlatformGenerator(width, width / 2, height - 2)
    };
}

function main() {
    var config = {
        width: 180,
        height: 240,
        fps: 20
    };

    var initWorld = initialWorld(config.width, config.height);
    initWorld.pasi.vy = -initWorld.pasi.jumpSpeed;

    startGame(document.getElementById('mainCanvas'), config, draw, update,
        [
            { name: 'keydown', fn: keydown },
            { name: 'keyup', fn: keyup },
            { name: 'deviceorientation', fn: orientation }
        ], [], initWorld);
}

function draw(ctx, world) {
    ctx.clearRect(0, 0, world.width, world.height);

    world.platformGenerator.platforms.forEach(function(platform) {
        platform.draw(ctx);
    });

    world.pasi.draw(ctx);
}

function update(world) {
    if (world.keys.right) {
        world.pasi.vx = world.pasi.speed;
    } else if (world.keys.left) {
        world.pasi.vx = -world.pasi.speed;
    } else {
        world.pasi.vx = world.pasi.gammaFactor * world.gamma;
    }

    world.pasi.x += world.pasi.vx;
    world.pasi.y += world.pasi.vy;
    world.pasi.vy += world.g;

    world.pasi.wrap(world.width);
    world.pasi.update();

    world.platformGenerator.generatePlatforms(world.height, 0);
}

function keydown(e, world) {
    if (e.keyCode === 39) {
        world.keys.right = true;
    } else if (e.keyCode === 37) {
        world.keys.left = true;
    }
}

function keyup(e, world) {
    if (e.keyCode === 39) {
        world.keys.right = false;
    } else if (e.keyCode === 37) {
        world.keys.left = false;
    }
}

function orientation(e, world) {
    world.gamma = e.gamma;
}

