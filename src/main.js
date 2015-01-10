window.addEventListener('load', main);

function initialWorld(width, height) {
    var sheet = new SpriteSheet(document.getElementById('pasi'), 4);
    var world = {
        keys: {left: false, right: false},
        gamma: 0,

        width: width,
        height: height,
        g: 1,

        pasiSheet: sheet,

        cameraRatio: 0.3,

    };

    restart(world);
    return world;
}

function restart(world) {
    world.pasi = new Pasi({
        spriteSheet: world.pasiSheet,
        x: world.width / 2,
        y: 0,
        nLeapTicks: 3,
        speed: 4,
        jumpSpeed: 13,
        tiltFactor: 0.6
    });
    // Give Pasi an initial kick.
    world.pasi.vy = -world.pasi.jumpSpeed;
    world.yCamera = 0;
    world.platformGenerator = new PlatformGenerator(world.width,
        world.width / 2, -2);
}

function calculateGameDimensions(preferredHeight, minAspect, maxAspect) {
    var vwWidth = window.innerWidth,
        vwHeight = window.innerHeight;

    var scale = Math.max(Math.floor(vwHeight / preferredHeight), 1),
        actualHeight = Math.floor(vwHeight / scale);

    var minWidth = Math.round(actualHeight * minAspect),
        maxWidth = Math.round(actualHeight * maxAspect),
        actualWidth = Math.min(Math.max(Math.floor(vwWidth / scale),
            minWidth), maxWidth);

    return {width: actualWidth, height: actualHeight};
}

function main() {
    var dimensions = calculateGameDimensions(320, 9/16, 3/4);
    console.log(dimensions.width);
    console.log(dimensions.height);
    var config = {
        width: dimensions.width,
        height: dimensions.height,
        fps: 20
    };

    var initWorld = initialWorld(config.width, config.height);

    startGame(document.getElementById('mainCanvas'), config, draw, update,
        [
            { name: 'keydown', fn: keydown },
            { name: 'keyup', fn: keyup },
            { name: 'deviceorientation', fn: orientation },
            { name: 'click', fn: click }
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
        world.pasi.vx = world.pasi.tiltFactor * world.gamma;
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

// Return, space
var restartKeys = [13, 32];
function keyup(e, world) {
    if (e.keyCode === 39) {
        world.keys.right = false;
    } else if (e.keyCode === 37) {
        world.keys.left = false;
    } else if (restartKeys.indexOf(e.keyCode) !== -1) {
        restart(world);
    }
}

function orientation(e, world) {
    world.gamma = e.gamma;
}

function click(e, world) {
    restart(world);
}

