export function aumentar(
  image,
  scale = 100
) {
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

  const numericScale = Number(scale);

  if (!Number.isFinite(numericScale) || numericScale <= 0) {
    throw new Error('Scale must be greater than 0');
  }

  const factor = numericScale / 100;

  const newWidth = Math.max(1, Math.round(width * factor));
  const newHeight = Math.max(1, Math.round(height * factor));

  const outputCanvas = document.createElement('canvas');

  outputCanvas.width = newWidth;
  outputCanvas.height = newHeight;

  const outputCtx = outputCanvas.getContext('2d');

  outputCtx.imageSmoothingEnabled = true;
  outputCtx.imageSmoothingQuality = 'high';

  outputCtx.drawImage(
    sourceCanvas,
    0,
    0,
    width,
    height,
    0,
    0,
    newWidth,
    newHeight
  );

  return outputCanvas;
}