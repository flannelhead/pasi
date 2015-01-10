function SpriteFont(spritesheet, charmap, colour) {
    this.charmap = charmap;
    this.charHeight = spritesheet.height;
    this.charWidth = spritesheet.width / charmap.length;

    this.charSheet = document.createElement('canvas');
    var h = spritesheet.height, w = spritesheet.width;
    canvas.width = w;
    canvas.height = h;
    this.ctx = canvas.getContext('2d');
    this.ctx.drawImage(spritesheet, 0, 0);
    this.refData = this.ctx.getImageData(0, 0, w, h).data;
    this.recolour(colour);
}

SpriteFont.prototype.recolour = function(colour) {
    var newImgData = ctx.createImageData(w, h),
        newData = newImgData.data;

    var i = 0;
    for (var y = 0; y < h; ++y) {
        for (var x = 0; x < w; ++x) {
            if (this.refData[i + 3] > 0) {
                newData[i] = colour.R;
                newData[++i] = colour.G;
                newData[++i] = colour.B;
                newData[++i] = this.refData[i];
            }
        }
    }

    this.ctx.putImageData(newImgData, 0, 0);
};

SpriteFont.prototype.drawText = function(ctx, x, y, text) {
    var len = text.length, idx;
    for (var i = 0; i < len; ++i) {
        idx = this.charmap.indexOf(text[i]);
        if (idx !== -1) {
            ctx.drawImage(this.charSheet, idx * this.charWidth, 0,
                this.charWidth, this.charHeight,
                x + i * this.charWidth, y, this.charWidth, this.charHeight);
        }
    }
};

