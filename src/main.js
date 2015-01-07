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
            y: 0,
            nLeapTicks: 3,
            speed: 4,
            jumpSpeed: 13,
            gammaFactor: 0.4
        }),

        yCamera: 0,
        cameraRatio: 0.3,

        platformGenerator: new PlatformGenerator(width, width / 2, -2)
    };
}

function main() {
    var config = {
        width: 200,
        height: 300,
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

    ctx.save();
    ctx.translate(0, world.height - world.yCamera);

    world.platformGenerator.platforms.forEach(function(platform) {
        platform.draw(ctx);
    });

    world.pasi.draw(ctx);

    ctx.restore();
}

function update(world) {
    if (world.keys.right) {
        world.pasi.vx = world.pasi.speed;
    } else if (world.keys.left) {
        world.pasi.vx = -world.pasi.speed;
    } else {
        world.pasi.vx = world.pasi.gammaFactor * world.gamma;
    }
    world.pasi.vy += world.g;

    world.pasi.update(world.g);
    world.pasi.wrap(world.width);

    if (world.yCamera - world.pasi.y > world.cameraRatio * world.height) {
        world.yCamera = world.pasi.y + world.cameraRatio * world.height;
    }

    world.platformGenerator.generatePlatforms(world.yCamera,
        world.yCamera - world.height);

    var collidingPlatform =
        world.pasi.getCollidingPlatform(world.platformGenerator.platforms);
    if (collidingPlatform !== null) {
        world.pasi.y = collidingPlatform.y;
        world.pasi.leap();
    }
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

