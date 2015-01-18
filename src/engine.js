function startGame(canvas, config, draw, update, globalHandlers,
    elementHandlers, initialWorld) {
    var dt = 1000 / config.fps;
    var ctx = canvas.getContext('2d'),
        container = canvas.parentNode;

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
}

