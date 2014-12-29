function Pasi(params) {
    this.sheet = params.spriteSheet;
    this.x = params.x;
    this.y = params.y;
    this.speed = params.speed;
    this.nLeapTicks = params.nLeapTicks;

    this.vx = 0;
    this.vy = 0;
    this.spriteIndex = 0;
    this.pose = 1;  // 1 = right, -1 = left
    this.leaping = false;
}

Pasi.prototype.draw = function(ctx) {
    this.sheet.drawSprite(ctx, this.x, this.y, this.spriteIndex);
};

