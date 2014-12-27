var config = {
    width: 180,
    height: 240,
    fps: 20,
    pasiSpeed: 2,
    pasiJumpSpeed: 12,
    pasiLeapTicks: 4,
    g: 1
};

window.addEventListener('load', main);

function main() {
    var pasiSheet = spriteSheet(document.getElementById('pasi'), 4);
    var world = {
        pasi: {
            animIndex: 0,
            animLength: 2,
            sheet: pasiSheet,
            tick: 0,
            animTicks: 5,
            vx: 0,
            vy: 0,
            pose: 1,
            x: 0,
            y: config.height - pasiSheet.frameHeight,
            leaping: false,
            leapTick: 0
        }
    };

    var updateScaling = game(document.getElementsByTagName('body')[0],
        config, draw, update, [
        { name: 'keydown', fn: keydown },
        { name: 'keyup', fn: keyup },
        { name: 'deviceorientation', fn: orientation }
    ], [], world);
    window.addEventListener('resize', updateScaling);
}

function draw(ctx, world) {
    ctx.clearRect(0, 0, config.width, config.height);
    var pasiAnimOffset = world.pasi.pose === -1 ? 2 : 0;
    drawSpriteObject(ctx, world.pasi, pasiAnimOffset);
}

function update(world) {
    if (world.pasi.leaping) {
        tickPasi(world.pasi);
    } else {
        world.pasi.vy += config.g;
        world.pasi.x += world.pasi.vx;
        if (world.pasi.x > config.width) {
            world.pasi.x = -world.pasi.sheet.frameWidth;
        } else if (world.pasi.x < -world.pasi.sheet.frameWidth) {
            world.pasi.x = config.width;
        }
        world.pasi.y += world.pasi.vy;
        if (world.pasi.y >= config.height - world.pasi.sheet.frameHeight) {
            world.pasi.y = config.height - world.pasi.sheet.frameHeight;
            startLeaping(world.pasi);
        }
    }
}

function startLeaping(pasi) {
    pasi.leaping = true;
    pasi.leapTick = 0;
    pasi.animIndex = 1;
}

function tickPasi(pasi) {
    if (++pasi.leapTick === config.pasiLeapTicks) {
        pasi.leaping = false;
        pasi.animIndex = 0;
        pasi.vy = -config.pasiJumpSpeed;
    }
}

function keydown(e, world) {
    if (e.keyCode === 39) {
        world.pasi.vx = config.pasiSpeed;
        world.pasi.pose = 1;
    } else if (e.keyCode === 37) {
        world.pasi.vx = -config.pasiSpeed;
        world.pasi.pose = -1;
    }
}

function keyup(e, world) {
    if (e.keyCode === 39 && world.pasi.vx > 0) {
        world.pasi.vx = 0;
    } else if (e.keyCode === 37 && world.pasi.vx < 0) {
        world.pasi.vx = 0;
    }
}

function orientation(e, world) {
    world.pasi.vx = e.gamma * config.pasiSpeed / 10;
    world.pasi.pose = e.gamma > 0 ? 1 : -1;
}

