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
            x: 0,
            y: height - sheet.spriteHeight,
            nLeapTicks: 4,
            speed: 4,
            jumpSpeed: 12,
            gammaFactor: 1
        })
    };
}

function main() {
    var config = {
        width: 180,
        height: 240,
        fps: 20,
        g: 1
    };
    startGame(document.getElementById('mainCanvas'), config, draw, update,
        [
            { name: 'keydown', fn: keydown },
            { name: 'keyup', fn: keyup },
            { name: 'deviceorientation', fn: orientation }
        ], [], initialWorld(config.width, config.height));
}

function draw(ctx, world) {
    ctx.clearRect(0, 0, world.width, world.height);
    world.pasi.draw(ctx);
    // ctx.clearRect(0, 0, config.width, config.height);
    // var pasiAnimOffset = world.pasi.pose === -1 ? 2 : 0;
    // world.pasi.sheet.draw(ctx, world.pasi.x, world.pasi.y,
    //     world.pasi.animIndex + pasiAnimOffset);
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

    world.pasi.update();
    // world.pasi.vy += world.g;
    // if (world.pasi.leaping) {
    //     tickPasi(world.pasi);
    // } else {
    //     world.pasi.vy += config.g;
    //     world.pasi.x += world.pasi.vx;
    //     if (world.pasi.x > config.width) {
    //         world.pasi.x = -world.pasi.sheet.spriteWidth;
    //     } else if (world.pasi.x < -world.pasi.sheet.spriteWidth) {
    //         world.pasi.x = config.width;
    //     }
    //     world.pasi.y += world.pasi.vy;
    //     if (world.pasi.y >= config.height - world.pasi.sheet.spriteHeight) {
    //         world.pasi.y = config.height - world.pasi.sheet.spriteHeight;
    //         startLeaping(world.pasi);
    //     }
    // }
}

function keydown(e, world) {
    if (e.keyCode === 39) {
        world.keys.right = true;
    } else if (e.keyCode === 37) {
        world.keys.left = true;
    }
    // if (e.keyCode === 39) {
    //     world.pasi.vx = config.pasiSpeed;
    //     world.pasi.pose = 1;
    // } else if (e.keyCode === 37) {
    //     world.pasi.vx = -config.pasiSpeed;
    //     world.pasi.pose = -1;
    // }
}

function keyup(e, world) {
    if (e.keyCode === 39) {
        world.keys.right = false;
    } else if (e.keyCode === 37) {
        world.keys.left = false;
    }
    // if (e.keyCode === 39 && world.pasi.vx > 0) {
    //     world.pasi.vx = 0;
    // } else if (e.keyCode === 37 && world.pasi.vx < 0) {
    //     world.pasi.vx = 0;
    // }
}

function orientation(e, world) {
    world.gamma = e.gamma;
    // world.pasi.vx = e.gamma * config.pasiSpeed / 10;
    // world.pasi.pose = e.gamma > 0 ? 1 : -1;
}

