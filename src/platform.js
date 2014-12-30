function Platform(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
}

Platform.prototype.draw = function(ctx) {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y);
    ctx.stroke();
};

