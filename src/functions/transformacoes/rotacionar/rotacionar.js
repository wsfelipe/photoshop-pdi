export function rotacionar(image, angle = 0) {
  const radians = (angle * Math.PI) / 180;

  let sourceCanvas;
  let width;
  let height;

  if (image instanceof HTMLCanvasElement) {
    sourceCanvas = image;
    width = image.width;
    height = image.height;
  } else if (image instanceof ImageData) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;
    width = image.width;
    height = image.height;
    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.putImageData(image, 0, 0);
  } else if (image instanceof HTMLImageElement) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;
    width = image.width;
    height = image.height;
    const sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.drawImage(image, 0, 0);
  } else {
    throw new Error('Invalid image type. Expected Canvas, ImageData, or HTMLImageElement');
  }

  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const rotatedWidth = Math.ceil(width * cos + height * sin);
  const rotatedHeight = Math.ceil(width * sin + height * cos);

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = rotatedWidth;
  outputCanvas.height = rotatedHeight;
  const outputCtx = outputCanvas.getContext('2d');

  outputCtx.translate(rotatedWidth / 2, rotatedHeight / 2);
  outputCtx.rotate(radians);
  outputCtx.translate(-width / 2, -height / 2);
  outputCtx.drawImage(sourceCanvas, 0, 0, width, height);

  return outputCanvas;
}
