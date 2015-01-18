function Platform(sheet, x, y) {
    this.x = x;
    this.y = y;
    this.width = 35;
    this.sheet = sheet;
    this.mirrored = Math.random() > 0.5;
    this.imageWidth = sheet.spriteWidth;
    this.imageHeight = sheet.spriteHeight;
}

Platform.prototype.draw = function(ctx) {
    this.sheet.drawSprite(ctx, this.x - this.imageWidth / 2, this.y,
        0, this.mirrored);
};

