var ImageUtils = {};

ImageUtils.tmpCanvas = document.createElement('canvas');
ImageUtils.tmpCtx = ImageUtils.tmpCanvas.getContext('2d');

ImageUtils.toImageData = function(image) {
    ImageUtils.tmpCanvas.width = image.width;
    ImageUtils.tmpCanvas.height = image.height;
    ImageUtils.tmpCtx.drawImage(image, 0, 0);
    return ImageUtils.tmpCtx.getImageData(0, 0, image.width, image.height);
};

ImageUtils.mirror = function(image) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.translate(image.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0);
    return canvas;
};

ImageUtils.flipSheet = function(image) {
    var mirrored = ImageUtils.mirror(image);
    var canvas = document.createElement('canvas');
    canvas.width = 2 * image.width;
    canvas.height = image.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    ctx.drawImage(mirrored, image.width, 0);
    return canvas;
};

