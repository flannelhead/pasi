function game(container, config, draw, update, globalHandlers, elementHandlers,
    initialWorld) {
    var dt = 1000 / config.fps,
        canvas = document.createElement('canvas');
    container.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    function setupCanvas() {
        var w = container.offsetWidth,
            h = container.offsetHeight,
            m = Math.floor(w / config.width),
            n = Math.floor(h / config.height),
            scale = Math.max(Math.min(m, n), 1);

        var width = config.width * scale,
            height = config.height * scale;

        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        ctx.imageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;

        ctx.scale(scale, scale);
    }
    setupCanvas();

    var world = initialWorld;

    globalHandlers.forEach(function(handler) {
        window.addEventListener(handler.name, function(e) {
            handler.fn(e, world);
        });
    });

    elementHandlers.forEach(function(handler) {
        canvas.addEventListener(handler.name, function(e) {
            handler.fn(e, world);
        });
    });

    var then = 0;
    function loop(now) {
        window.requestAnimationFrame(loop);
        var delta = now - then;
        if (delta >= dt) {
            update(world);
            draw(ctx, world);
            then = now - (delta % dt);
        }
    }

    window.requestAnimationFrame(loop);

    return setupCanvas;
}

