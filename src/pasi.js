function Pasi(params) {
    this.sheet = params.spriteSheet;
    this.x = params.x;
    this.y = params.y;
    this.speed = params.speed;
    this.jumpSpeed = params.jumpSpeed;
    this.nLeapTicks = params.nLeapTicks;
    this.gammaFactor = params.gammaFactor;

    this.vx = 0;
    this.vy = 0;
    this.spriteIndex = 0;
    this.pose = 1;  // 1 = right, -1 = left
    this.leaping = false;
    this.width = this.sheet.spriteWidth;
    this.xOffset = -this.width / 2 - 4;
    this.height = this.sheet.spriteHeight;
}

Pasi.prototype.draw = function(ctx) {
    this.sheet.drawSprite(ctx, this.x + this.xOffset, this.y,
        this.spriteIndex);
};

Pasi.prototype.update = function(ctx) {
    if (this.vx < 0) this.pose = -1;
    else if (this.vx > 0) this.pose = 1;
    this.spriteIndex = this.pose === 1 ? 0 : 2;
};

Pasi.prototype.wrap = function(width) {
    var halfWidth = this.width / 2;
    if (this.x + halfWidth < 0) {
        this.x = width + halfWidth;
    } else if (this.x - halfWidth > width) {
        this.x = -halfWidth;
    }
};

