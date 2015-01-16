function Platform(image, x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.image = image;
    this.imageWidth = image.width;
    this.imageHeight = image.height;
}

Platform.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight,
        this.x - this.imageWidth / 2, this.y, this.imageWidth, this.imageHeight);
};

