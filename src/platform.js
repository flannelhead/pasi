function Platform(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
}

Platform.prototype.draw = function(ctx) {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y + 1);
    ctx.lineTo(this.x + this.width / 2, this.y + 1);
    ctx.stroke();
};

