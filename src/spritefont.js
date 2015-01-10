function SpriteFont(spritesheet, charmap, colour) {
    this.charmap = charmap;
    this.charHeight = spritesheet.height;
    this.charWidth = spritesheet.width / charmap.length;

    this.charSheet = document.createElement('canvas');
    var h = spritesheet.height, w = spritesheet.width;
    this.charSheet.width = w;
    this.charSheet.height = h;
    this.ctx = this.charSheet.getContext('2d');
    this.ctx.drawImage(spritesheet, 0, 0);
    this.refData = this.ctx.getImageData(0, 0, w, h).data;
    this.recolour(colour);
}

SpriteFont.prototype.recolour = function(colour) {
    var h = this.charSheet.height, w = this.charSheet.width;
    var newImgData = this.ctx.createImageData(w, h),
        newData = newImgData.data;

    for (var i = 0, iMax = 4 * w * h; i < iMax; i += 4) {
        if (this.refData[i + 3] > 0) {
            newData[i] = colour.R;
            newData[i + 1] = colour.G;
            newData[i + 2] = colour.B;
            newData[i + 3] = this.refData[i];
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

