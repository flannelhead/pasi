function Pasi(params) {
    this.sheet = params.spriteSheet;
    this.x = params.x;
    this.y = params.y;
    this.acceleration = params.acceleration;
    this.damping = params.damping;
    this.jumpSpeed = params.jumpSpeed;
    this.tiltFactor = params.tiltFactor;

    this.yPrev = this.y;
    this.vx = 0;
    this.vy = 0;
    this.highest = 0;
    this.spriteIndex = 0;
    this.pose = 1;  // 1 = right, -1 = left
    this.leaping = false;
    this.width = this.sheet.spriteWidth;
    this.baseWidth = 13;
    this.baseDxRight = 3;
    this.baseDxLeft = -7;
    this.xOffset = -this.width / 2 - 4;
    this.height = this.sheet.spriteHeight;
    this.poseThres = 2;
}

Pasi.prototype.draw = function(ctx) {
    this.sheet.drawSprite(ctx, this.x + this.xOffset, this.y - this.height + 3,
        this.spriteIndex);
};

Pasi.prototype.update = function() {
    if (this.vx < -1 * this.poseThres) this.pose = -1;
    else if (this.vx > this.poseThres) this.pose = 1;

    var goingUp = this.vy < 0;
    if (this.pose === -1) this.spriteIndex = goingUp ? 3 : 2;
    else this.spriteIndex = goingUp ? 0 : 1;

    this.yPrev = this.y;
    this.x += this.vx;
    this.y += this.vy;
    this.highest = Math.min(this.y, this.highest);
};

Pasi.prototype.wrap = function(width) {
    var halfWidth = this.width / 2;
    if (this.x + halfWidth < 0) {
        this.x = width + halfWidth;
    } else if (this.x - halfWidth > width) {
        this.x = -halfWidth;
    }
};

Pasi.prototype.getCollidingPlatform = function(platforms) {
    var platform;
    var baseX = this.pose === 1 ? this.x + this.baseDxRight :
        this.x + this.baseDxLeft;
    for (var i = 0; i < platforms.length; i++) {
        platform = platforms[i];
        if (this.yPrev <= platform.y && this.y >= platform.y && this.vy > 0 &&
            Math.abs(baseX - platform.x) <
            (platform.width + this.baseWidth) / 2) {
            return platform;
        }
    }
    return null;
};

Pasi.prototype.leap = function() {
    this.vy = -this.jumpSpeed;
};

