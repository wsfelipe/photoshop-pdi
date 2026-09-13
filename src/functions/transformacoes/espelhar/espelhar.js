export function espelhar(image, direction = 'horizontal') {
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
    throw new Error(
      'Invalid image type. Expected Canvas, ImageData, or HTMLImageElement'
    );
  }

  const outputCanvas = document.createElement('canvas');
  outputCanvas.width = width;
  outputCanvas.height = height;

  const outputCtx = outputCanvas.getContext('2d');

  if (direction === 'horizontal') {
    // Espelha esquerda <-> direita
    outputCtx.translate(width, 0);
    outputCtx.scale(-1, 1);
  } else if (direction === 'vertical') {
    // Espelha cima <-> baixo
    outputCtx.translate(0, height);
    outputCtx.scale(1, -1);
  } else {
    throw new Error(
      'Invalid direction. Expected "horizontal" or "vertical"'
    );
  }

  outputCtx.drawImage(sourceCanvas, 0, 0, width, height);

  return outputCanvas;
}