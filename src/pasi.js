function Pasi(params) {
    this.sheet = params.spriteSheet;
    this.width = this.sheet.spriteWidth;
    this.height = this.sheet.spriteHeight;
    this.x = params.x;
    this.y = params.y;
    this.xOffset = -this.width / 2 - 4;
    this.speed = params.speed;
    this.nLeapTicks = params.nLeapTicks;
    this.gammaFactor = params.gammaFactor;

    this.vx = 0;
    this.vy = 0;
    this.spriteIndex = 0;
    this.pose = 1;  // 1 = right, -1 = left
    this.leaping = false;
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

