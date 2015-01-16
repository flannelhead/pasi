function ScrollingBackground(image, viewportWidth, viewportHeight) {
    this.image = image;
    this.vWidht = viewportWidth;
    this.vHeight = viewportHeight;
    this.bgWidth = image.width;
    this.bgHeight = image.height;
}

ScrollingBackground.prototype.draw = function(ctx, y) {
    var dy = y % this.bgHeight;
    ctx.drawImage(this.image, 0, 0, this.bgWidth, this.bgHeight - dy,
        0, dy, this.bgWidth, this.bgHeight - dy);
    if (dy > 0) {
        ctx.drawImage(this.image, 0, this.bgHeight - dy, this.bgWidth, dy + 1,
            0, 0, this.bgWidth, dy + 1);
    }
};

