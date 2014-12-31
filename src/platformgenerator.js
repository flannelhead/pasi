function PlatformGenerator(width, xFirst, yFirst) {
    this.width = width;

    this.xSpaceMin = 30;
    this.xSpaceRandom = 5;
    this.ySpaceMin = 60;
    this.ySpaceRandom = 10;

    this.platforms = [new Platform(xFirst, yFirst)];
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
        var x = Math.min(Math.max(highestPlatform.x + dx, 0), this.width);
        highestPlatform = new Platform(Math.round(x),
            Math.round(highestPlatform.y - dy));
        newPlatforms.push(highestPlatform);
    }

    this.platforms = newPlatforms;
};

