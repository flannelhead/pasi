function SpriteSheet(image, nSprites) {
    this.image = image;
    this.nSprites = nSprites;
    this.spriteWidth = image.width / nSprites;
    this.spriteHeight = image.height;
}

SpriteSheet.prototype.draw = function(ctx, x, y, index) {
    console.log(x + ' ' + y);
    ctx.drawImage(this.image, index * this.spriteWidth, 0, this.spriteWidth,
        this.spriteHeight, x, y, this.spriteWidth, this.spriteHeight);
};

function spriteSheet(image, n) {
    var width = image.width / n;
    return {
        image: image,
        nFrames: n,
        frameWidth: width,
        frameHeight: image.height,
    };
}

function drawSpriteObject(ctx, object, offset) {
    if (!offset) offset = 0;
    var sheet = object.sheet;
    ctx.drawImage(object.sheet.image,
        (offset + object.animIndex) * sheet.frameWidth, 0,
        sheet.frameWidth, sheet.frameHeight,
        object.x, object.y,
        sheet.frameWidth, sheet.frameHeight
    );
}

function tickSpriteObject(object) {
    if (++object.tick === object.animTicks) {
        animateSpriteObject(object);
        object.tick = 0;
    }
}

function animateSpriteObject(object) {
    if (++object.animIndex === object.animLength) {
        object.animIndex = 0;
    }
}

