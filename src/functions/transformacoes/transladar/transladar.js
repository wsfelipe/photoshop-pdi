export function transladar(image, deltaX, deltaY) {
  let sourceCanvas;
  let width, height;
  let sourceCtx;

  if (image instanceof HTMLCanvasElement) {
    sourceCanvas = image;
    width = image.width;
    height = image.height;
    sourceCtx = image.getContext('2d');
  } else if (image instanceof ImageData) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;
    width = image.width;
    height = image.height;
    sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.putImageData(image, 0, 0);
  } else if (image instanceof HTMLImageElement) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;
    width = image.width;
    height = image.height;
    sourceCtx = sourceCanvas.getContext('2d');
    sourceCtx.drawImage(image, 0, 0);
  } else {
    throw new Error('Invalid image type. Expected Canvas, ImageData, or HTMLImageElement');
  }

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;
  const outputCtx = outputCanvas.getContext('2d');

  outputCtx.drawImage(sourceCanvas, deltaX, deltaY);

  return outputCanvas;
}

export function transladarPixelByPixel(image, deltaX, deltaY, wraparound = false) {
  let sourceImageData;
  let width, height;

  if (image instanceof HTMLCanvasElement) {
    const ctx = image.getContext('2d');
    sourceImageData = ctx.getImageData(0, 0, image.width, image.height);
    width = image.width;
    height = image.height;
  } else if (image instanceof ImageData) {
    sourceImageData = image;
    width = image.width;
    height = image.height;
  } else {
    throw new Error('This version only works with Canvas or ImageData');
  }

  const outputImageData = new ImageData(width, height);
  const sourceData = sourceImageData.data;
  const outputData = outputImageData.data;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let newX = x + deltaX;
      let newY = y + deltaY;

      if (wraparound) {
        newX = ((newX % width) + width) % width;
        newY = ((newY % height) + height) % height;
      } else {
        if (newX < 0 || newX >= width || newY < 0 || newY >= height) {
          continue;
        }
      }

      const sourceIndex = (y * width + x) * 4;
      const outputIndex = (newY * width + newX) * 4;

      outputData[outputIndex] = sourceData[sourceIndex];
      outputData[outputIndex + 1] = sourceData[sourceIndex + 1];
      outputData[outputIndex + 2] = sourceData[sourceIndex + 2];
      outputData[outputIndex + 3] = sourceData[sourceIndex + 3];
    }
  }

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;
  const ctx = outputCanvas.getContext('2d');
  ctx.putImageData(outputImageData, 0, 0);

  return outputCanvas;
}