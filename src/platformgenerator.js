function PlatformGenerator(branchSheet, width, xFirst, yFirst) {
    this.width = width;

    this.xSpaceMin = 45;
    this.xSpaceRandom = 90;
    this.ySpaceMin = 10;
    this.ySpaceMax = 60;
    this.spacingFactor = 0.02;

    this.branchSheet = branchSheet;
    this.platforms = [new Platform(branchSheet, xFirst, yFirst)];
    this.highestPlatform = this.platforms[0];
}

PlatformGenerator.prototype.generatePlatforms = function(yLower, yUpper) {
    var newPlatforms = this.platforms.filter(function(platform) {
        return platform.y <= yLower;
    });

    var highestPlatform = this.highestPlatform;
    var ySpaceRandom = Math.min(Math.max(this.spacingFactor * Math.abs(yLower),
        1), this.ySpaceMax - this.ySpaceMin);
    while (highestPlatform.y > yUpper) {
        var toss;
        if (highestPlatform.x < this.xSpaceMin) toss = 1;
        else if (highestPlatform.x > this.width - this.xSpaceMin) toss = -1;
        else toss = Math.random() < 0.5 ? -1 : 1;
        var dx = toss * (this.xSpaceMin + this.xSpaceRandom * Math.random()),
            dy = this.ySpaceMin + ySpaceRandom * Math.random();
        var x = Math.min(Math.max(highestPlatform.x + dx,
            0), this.width - highestPlatform.width);
        highestPlatform = new Platform(this.branchSheet, Math.round(x),
            Math.round(highestPlatform.y - dy));
        newPlatforms.push(highestPlatform);
    }

    this.platforms = newPlatforms;
    this.highestPlatform = highestPlatform;
};

