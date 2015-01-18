function SpriteSheet(image, nSprites, mirror) {
    this.image = image;
    this.nSprites = nSprites;
    this.spriteWidth = image.width / nSprites;
    this.spriteHeight = image.height;

    if (mirror) {
        this.flippedImage = SpriteSheet.flip(image);
        this.mirrored = true;
    }
}

SpriteSheet.flip = function(image) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.translate(image.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0);
    return canvas;
};

SpriteSheet.prototype.drawSprite = function(ctx, x, y, index, mirror) {
    var image = this.image, idx = index;
    if (mirror) {
        image = this.flippedImage;
        idx = this.nSprites - 1 - index;
    }
    ctx.drawImage(image, idx * this.spriteWidth, 0, this.spriteWidth,
        this.spriteHeight, Math.round(x), Math.round(y),
        this.spriteWidth, this.spriteHeight);
};

