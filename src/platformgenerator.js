function PlatformGenerator(branchImg, width, xFirst, yFirst) {
    this.width = width;

    this.xSpaceMin = 30;
    this.xSpaceRandom = 30;
    this.ySpaceMin = 15;
    this.ySpaceRandom = 60;

    this.branchImg = branchImg;
    this.platforms = [new Platform(branchImg, xFirst, yFirst)];
}

PlatformGenerator.prototype.generatePlatforms = function(yLower, yUpper) {
    var highestPlatform = this.platforms[this.platforms.length - 1];

    var newPlatforms = this.platforms.filter(function(platform) {
        return platform.y <= yLower;
    });

    while (highestPlatform.y > yUpper) {
        var toss = Math.random() < 0.5 ? -1 : 1,
            dx = toss * (this.xSpaceMin + this.xSpaceRandom * Math.random()),
            dy = this.ySpaceMin + this.ySpaceRandom * Math.random();
        var x = Math.min(Math.max(highestPlatform.x + dx,
            highestPlatform.width / 2), this.width - highestPlatform.width / 2);
        highestPlatform = new Platform(this.branchImg, Math.round(x),
            Math.round(highestPlatform.y - dy));
        newPlatforms.push(highestPlatform);
    }

    this.platforms = newPlatforms;
};

