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
    this.sheet.drawSprite(ctx, this.x + this.xOffset, this.y - this.height,
        this.spriteIndex);
};

Pasi.prototype.update = function(g) {
    if (this.vx < 0) this.pose = -1;
    else if (this.vx > 0) this.pose = 1;
    this.spriteIndex = this.pose === 1 ? 0 : 2;

    if (this.leaping) {
        ++this.spriteIndex;
        if (++this.leapCounter === this.nLeapTicks) {
            this.leaping = false;
        }
    }
    this.x += this.vx;
    this.y += this.vy;
};

Pasi.prototype.wrap = function(width) {
    var halfWidth = this.width / 2;
    if (this.x + halfWidth < 0) {
        this.x = width + halfWidth;
    } else if (this.x - halfWidth > width) {
        this.x = -halfWidth;
    }
};

Pasi.prototype.getCollidingPlatform = function(yPrev, platforms) {
    var platform;
    for (var i = 0; i < platforms.length; i++) {
        platform = platforms[i];
        if (yPrev <= platform.y && this.y >= platform.y && this.vy > 0 &&
            Math.abs(this.x - platform.x) < (platform.width + this.width) / 2) {
            return platform;
        }
    }
    return null;
};

Pasi.prototype.leap = function() {
    if (!this.leaping) {
        this.leaping = true;
        this.leapCounter = 0;
        this.vy = -this.jumpSpeed;
    }
};

