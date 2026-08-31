export function diminuir(image, scale = 100) {
  let sourceCanvas;

  if (image instanceof HTMLCanvasElement) {
    sourceCanvas = image;
  } else if (image instanceof ImageData) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.width;
    sourceCanvas.height = image.height;

    const ctx = sourceCanvas.getContext('2d');
    ctx.putImageData(image, 0, 0);
  } else if (image instanceof HTMLImageElement) {
    sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = image.naturalWidth || image.width;
    sourceCanvas.height = image.naturalHeight || image.height;

    const ctx = sourceCanvas.getContext('2d');
    ctx.drawImage(
      image,
      0,
      0,
      sourceCanvas.width,
      sourceCanvas.height
    );
  } else {
    throw new Error(
      'Invalid image type. Expected Canvas, ImageData, or HTMLImageElement'
    );
  }

  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  const factor = Math.max(0.01, Math.min(1, Number(scale) / 100));

  const newWidth = Math.max(1, Math.round(width * factor));
  const newHeight = Math.max(1, Math.round(height * factor));

  const outputCanvas = document.createElement('canvas');

  outputCanvas.width = newWidth;
  outputCanvas.height = newHeight;

  const ctx = outputCanvas.getContext('2d', {
    alpha: true,
  });

  // Configuração de qualidade
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
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