function SpriteSheet(image, nSprites, mirror) {
    this.image = image;
    this.nSprites = nSprites;
    this.spriteWidth = image.width / nSprites;
    this.spriteHeight = image.height;

    if (mirror) {
        this.image = ImageUtils.flipSheet(image);
        this.nSprites *= 2;
    }
}

SpriteSheet.prototype.drawSprite = function(ctx, x, y, index) {
    ctx.drawImage(this.image, index * this.spriteWidth, 0, this.spriteWidth,
        this.spriteHeight, Math.round(x), Math.round(y),
        this.spriteWidth, this.spriteHeight);
};

