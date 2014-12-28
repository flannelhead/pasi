function SpriteSheet(image, nSprites) {
    this.image = image;
    this.nSprites = nSprites;
    this.spriteWidth = image.width / nSprites;
    this.spriteHeight = image.height;
}

SpriteSheet.prototype.draw = function(ctx, x, y, index) {
    ctx.drawImage(this.image, index * this.spriteWidth, 0, this.spriteWidth,
        this.spriteHeight, x, y, this.spriteWidth, this.spriteHeight);
};

