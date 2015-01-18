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
    this.pose = 1;  // 1 = right, -1 = left
    this.width = this.sheet.spriteWidth;
    this.height = this.sheet.spriteHeight;
    this.poseThres = 0.5;
}

Pasi.prototype.draw = function(ctx) {
    var spriteIndex = this.vy < 0 ? 0 : 1;
    this.sheet.drawSprite(ctx, this.x, this.y - this.height + 3,
        spriteIndex, this.pose === -1);
};

Pasi.prototype.update = function() {
    if (this.vx < -1 * this.poseThres) this.pose = -1;
    else if (this.vx > this.poseThres) this.pose = 1;

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
    var myCollBox = this.getCollidingBox();
    var platform, platCollBox;
    for (var i = platforms.length - 1; i >= 0; --i) {
        platform = platforms[i];
        platCollBox = platform.getCollidingBox();
        if (myCollBox.left < platCollBox.right &&
            myCollBox.right > platCollBox.left &&
            this.yPrev <= platCollBox.top &&
            this.y >= platCollBox.top) {
            return platform;
        }
    }
    return null;
};

Pasi.prototype.jump = function() {
    this.vy = -this.jumpSpeed;
};

Pasi.prototype.getCollidingBox = function() {
    var box = {
        left: this.x + 4,
        right: this.x + 20,
        top: this.y - 28,
        bottom: this.y
    };

    if (this.pose === -1) {
        box.left = this.x + 2;
        box.right = this.x + 18;
    }

    return box;
};

