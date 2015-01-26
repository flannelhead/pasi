var BackgroundGenerator = {};

BackgroundGenerator.generateBackground = function(screenWidth, screenHeight,
    colorPairs) {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    var width = screenWidth, height = 3 * screenHeight;
    canvas.width = width;
    canvas.height = height;
    var dx = 0.15 * screenWidth, dy = 0.1 * screenHeight;
    var shift = 0.05 * screenHeight;
    var nPairs = colorPairs.length;
    var n = Math.ceil(height / (3 * dy + shift) / nPairs);
    var bigShift = height / n / nPairs;

    ctx.fillStyle = colorPairs[colorPairs.length - 1][1];
    ctx.fillRect(0, 0, width, height);

    function drawLayer(coords, y) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        coords.forEach(function(c) { ctx.lineTo(c.x, y + c.y); });
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
    }
    var yLevel = dy, colorIndex = 0;
    while (yLevel + shift + dy < height) {
        var x = 0, y = yLevel, coords = [];
        while (x < width) {
            x += dx * Math.random() + 0.1 * dx;
            y = -dy * Math.random() - 0.1 * dy;
            coords.push({x: x, y: y});
            x += dx * Math.random() + 0.1 * dx;
            y = dy * Math.random() + 0.1 * dy;
            coords.push({x: x, y: y});
        }
        ctx.fillStyle = colorPairs[colorIndex][0];
        drawLayer(coords, yLevel);
        ctx.fillStyle = colorPairs[colorIndex][1];
        drawLayer(coords, yLevel + shift);

        if (++colorIndex === colorPairs.length) colorIndex = 0;
        yLevel += bigShift;
    }

    return canvas;
};

