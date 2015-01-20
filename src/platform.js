function Platform(sheet, x, y) {
    this.x = x;
    this.y = y;
    this.sheet = sheet;
    this.mirrored = Math.random() > 0.5;
    this.imageWidth = sheet.spriteWidth;
    this.imageHeight = sheet.spriteHeight;
    this.updateCollidingBox();
}

Platform.prototype.draw = function(ctx) {
    this.sheet.drawSprite(ctx, this.x, this.y, 0, this.mirrored);
};

Platform.prototype.updateCollidingBox = function() {
    this.collidingBox = {
        left: this.x + 1,
        right: this.x + 37,
        top: this.y,
        bottom: this.y + 3
    };
};

