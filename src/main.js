window.addEventListener('load', main);

function initialWorld(width, height) {
    var world = {
        keys: {left: false, right: false},
        gamma: 0,

        width: width,
        height: height,
        g: 1,

        resources: {
            pasiSheet: new SpriteSheet(document.getElementById('pasi'), 4),
            numbers: new SpriteFont(document.getElementById('numbers'),
                '0123456789', {R: 255, G: 255, B: 255}),
            background: new ScrollingBackground(
                document.getElementById('background'), width, height),
            branchImg: document.getElementById('branch')
        },

        cameraRatio: 0.3,
        scrollFactor: 0.5
    };

    restart(world);
    return world;
}

function restart(world) {
    world.pasi = new Pasi({
        spriteSheet: world.resources.pasiSheet,
        x: world.width / 2,
        y: 0,
        acceleration: 1.5,
        damping: 1,
        jumpSpeed: 13,
        tiltFactor: 0.6
    });
    // Give Pasi an initial kick.
    world.pasi.vy = -world.pasi.jumpSpeed;
    world.yCamera = 0;
    world.score = 0;
    world.penalty = 0;
    world.platformGenerator = new PlatformGenerator(world.resources.branchImg,
        world.width, world.width / 2, -2);
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
    var dimensions = calculateGameDimensions(260, 9/16, 3/4);
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
    world.resources.background.draw(ctx,
        Math.abs(world.scrollFactor * world.yCamera));

    ctx.save();
    ctx.translate(0, world.height - world.yCamera);

    world.platformGenerator.platforms.forEach(function(platform) {
        platform.draw(ctx);
    });

    world.pasi.draw(ctx);

    ctx.restore();

    world.resources.numbers.drawText(ctx, world.width - 1, 2,
        world.score.toString(), 'r');
}

function update(world) {
    if (world.keys.right) {
        world.pasi.vx += world.pasi.acceleration;
    } else if (world.keys.left) {
        world.pasi.vx -= world.pasi.acceleration;
    } else if (world.gamma) {
        world.pasi.vx = world.pasi.tiltFactor * world.gamma;
    } else if (world.pasi.vx < 0) {
        world.pasi.vx += world.pasi.damping;
        if (world.pasi.vx > 0) world.pasi.vx = 0;
    } else if (world.pasi.vx > 0) {
        world.pasi.vx -= world.pasi.damping;
        if (world.pasi.vx < 0) world.pasi.vx = 0;
    }
    world.pasi.vy += world.g;

    world.pasi.update(world.g);
    world.pasi.wrap(world.width);

    if (world.yCamera - world.pasi.y > world.cameraRatio * world.height) {
        var oldCamera = world.yCamera;
        world.yCamera = world.pasi.y + world.cameraRatio * world.height;
    }

    world.platformGenerator.generatePlatforms(world.yCamera,
        world.yCamera - world.height);

    var collidingPlatform =
        world.pasi.getCollidingPlatform(world.platformGenerator.platforms);
    if (collidingPlatform !== null) {
        world.pasi.y = collidingPlatform.y;
        world.pasi.leap();
        world.penalty += 5;
    }

    world.score = Math.max(Math.round(-world.pasi.highest / 5) - world.penalty,
        0);
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

